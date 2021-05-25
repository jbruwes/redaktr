import { JetView } from 'webix-jet';
import ValidateEmailView from './settingsViews/validateEmail';
export default class SettingsView extends JetView {
  config() {
    return {
      rows: [{
        view: 'form',
        autoheight: false,
        scroll: true,
        elements: [{
          template: 'Project name',
          type: 'section',
        }, {
          id: 'name',
          view: 'label',
          label: '-',
        }, {
          template: 'Domain',
          type: 'section',
        }, {
          id: 'domain',
          view: 'label',
          label: '-',
          labelWidth: 33,
        }, {
          template: 'Yandex Metrika',
          type: 'section',
        }, {
          id: 'metrika',
          view: 'text',
        }, {
          template: 'Google Analytics',
          type: 'section',
        }, {
          id: 'analytics',
          view: 'text',
        }, {
          template: 'Icon',
          type: 'section',
          css: 'webix_section',
        }, {
          view: 'uploader',
          id: 'uploader',
          value: 'Upload Icon',
          multiple: false,
          autosend: false,
          name: 'files',
          link: 'bglist',
          accept: 'image/vnd.microsoft.icon',
        }, {
          view: 'list',
          id: 'bglist',
          type: 'uploader',
          template: '{common.removeIcon()}{common.percent()}{common.fileName()}',
          autoheight: true,
          borderless: true,
        }, {
          template: 'Email',
          type: 'section',
        }, {
          id: 'email',
          view: 'search',
          icon: false,
        }, {
          id: 'verifyButton',
          view: 'button',
          disabled: true,
          value: 'Verify email',
          click: () => this.validateemail.showWindow(this.cognitoUser, this),
        }, {}, {}],
        elementsConfig: {
          labelAlign: 'right',
        },
      }],
    };
  }
  init() {
    this.validateemail = this.ui(ValidateEmailView);
    this.app.S3.headObject({
      Bucket: 'redaktr',
      Key: this.app.identityId + '/favicon.ico',
    }, (err, data) => {
      if (!err && $$('sidebar').getSelectedId() === 'settings') {
        $$('uploader').files.data.clearAll();
        $$('uploader').addFile({
          name: 'favicon.ico',
          sname: this.app.identityId + '.ico',
        }, 0);
      }
      $$('uploader').attachEvent('onAfterFileAdd', (file) => {
        file.file.sname = 'favicon.ico';
        this.app.S3.putObject({
          Bucket: 'redaktr',
          Key: this.app.identityId + '/favicon.ico',
          ContentType: file.file.type,
          Body: file.file,
        }, (err, data) => {
          if (err) {
            webix.message({
              text: err.message,
              type: 'error',
            });
          } else webix.message('Settings save complete');
        });
      });
      $$('uploader').files.attachEvent('onAfterDelete', (file) => {
        this.app.S3.deleteObject({
          Bucket: 'redaktr',
          Key: this.app.identityId + '/favicon.ico',
        }, (err, data) => {
          if (err) {
            webix.message({
              text: err.message,
              type: 'error',
            });
          } else webix.message('Settings save complete');
        });
      });
    });
    this.app.S3.getObject({
      Bucket: 'redaktr',
      Key: this.app.identityId + '.json',
    }, (err, data) => {
      if (err) {
        webix.message({
          text: err.message,
          type: 'error',
        });
        this.prop = {};
        this._onChange();
      } else {
        this.prop = JSON.parse(data.Body.toString());
        if (this.prop.name) $$('name').setValue('http://redaktr.com/' + this.prop.name);
        if (this.prop.domain) $$('domain').setValue(this.prop.domain);
        if (this.prop.metrika) $$('metrika').setValue(this.prop.metrika);
        if (this.prop.analytics) $$('analytics').setValue(this.prop.analytics);
        this._onChange();
      }
    });
    const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
    const cognitoUser = this.cognitoUser = this.app.userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          webix.message({
            text: err.message,
            type: 'error',
          });
        } else {
          cognitoUser.getUserAttributes((err, result) => {
            if (err) {
              webix.message({
                text: err.message,
                type: 'error',
              });
            } else {
              for (const item of result) {
                if (item.Name === 'email') $$('email').setValue(item.Value);
                if (item.Name === 'email_verified') {
                  $$('email').config.icon = (item.Value === 'true') ? 'mdi mdi-shield-check' : 'mdi mdi-shield-off';
                  $$('email').refresh();
                  if (item.Value === 'false') $$('verifyButton').enable();
                }
              }
              $$('email').attachEvent('onChange', (_) => {
                cognitoUser.updateAttributes([new AmazonCognitoIdentity.CognitoUserAttribute({
                  Name: 'email',
                  Value: $$('email').getValue(),
                })], function(err, result) {
                  if (err) {
                    webix.message({
                      text: err.message,
                      type: 'error',
                    });
                  } else {
                    $$('email').config.icon = 'mdi mdi-shield-off';
                    $$('email').refresh();
                    $$('verifyButton').enable();
                  }
                });
              });
            }
          });
        }
      });
    }
  }
  _onChange() {
    $$('metrika').attachEvent("onChange", (value) => {
      this.prop.metrika = value;
      this._save();
    });
    $$('analytics').attachEvent("onChange", (value) => {
      this.prop.analytics = value;
      this._save();
    });
  }
  async _save() {
    try {
      await this.app.S3.putObject({
        Bucket: 'redaktr',
        Key: this.app.identityId + '.json',
        ContentType: 'application/json',
        Body: webix.ajax().stringify(this.prop),
      }).promise();
      webix.message('Settings save complete');
    } catch (e) {
      webix.message({
        text: e,
        type: 'error',
      });
    }
  }
}
