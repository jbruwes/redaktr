import {
  JetView,
} from 'webix-jet';
export default class SignInViewLocal extends JetView {
  config() {
    let that;
    /* AmazonCognitoIdentity = require('amazon-cognito-identity-js'),
			userPool = this.app.userPool = new AmazonCognitoIdentity.CognitoUserPool({
				UserPoolId: 'us-east-1_isPFINeJO',
				ClientId: '4vvur02v4d5smj3pvtj0tu8qda'
			}),*/
    const appShow = (item) => {
      webix.UIManager.removeHotKey('enter', clickLogin);
      // webix.UIManager.removeHotKey("enter", null, $$('username'));
      // webix.UIManager.removeHotKey("enter", null, $$('password'));
      // webix.UIManager.removeHotKey("enter", null, $$('login'));

      $$('sidebar').clearAll();
      // $$("toolbar").addView({
      //	id: "play",
      //	view: "icon",
      //	icon: "mdi mdi-play-circle",
      //	click: _ => {
      //		window.open("https://redaktr.com/" + item.name + "/?" + webix.uid(), "_tab");
      //	}
      // });
      this.show('content').then(function(value) {
        $$('tinymce').getEditor(true).then((editor) => {
          $$('sidebar').add({
            id: 'content',
            icon: 'mdi mdi-book-open-page-variant',
            value: 'Content',
          }, 0);
          $$('sidebar').add({
            id: 'template',
            icon: 'mdi mdi-language-html5',
            value: 'Template',
          }, 1);
          $$('sidebar').add({
            id: 'css',
            icon: 'mdi mdi-language-css3',
            value: 'CSS',
          }, 2);
          $$('sidebar').add({
            id: 'js',
            icon: 'mdi mdi-language-javascript',
            value: 'JavaScript',
          }, 3);
          // $$("sidebar").add({
          //    id: "settings",
          //    icon: "mdi mdi-settings",
          //    value: "Settings"
          // }, 4);
          $$('sidebar').add({
            id: 'signout',
            icon: 'mdi mdi-logout-variant',
            value: 'Sign Out',
          });
          $$('sidebar').select('content');
        });
      }, function(reason) {
        webix.message({
          text: 'Something goes wrong',
          type: 'error',
        });
      });
    };
    var clickLogin = (_) => {
      if (!this.authenticationData || !(this.authenticationData.Username === $$('username').getValue() && this.authenticationData.Password === $$('password').getValue())) {
        this.authenticationData = {
          Username: $$('username').getValue(),
          Password: $$('password').getValue(),
        };
        webix.ajax().headers({
          'Content-type': 'application/json',
          // }).post("//s3.redaktr:9000/minio/webrpc", {
        }).post('//s3.redaktr.mggt.ru/minio/webrpc', {
          id: 1,
          jsonrpc: '2.0',
          params: {
            username: $$('username').getValue(),
            password: $$('password').getValue(),
          },
          method: 'Web.Login',
        }).then((data) => {
          const res = data.json();
          if (res.error) {
            webix.message({
              text: res.error.message,
              type: 'error',
            });
          } else {
            this.app.S3 = new AWS.S3({
              correctClockSkew: true,
              // useAccelerateEndpoint: true,
              accessKeyId: $$('username').getValue(),
              secretAccessKey: $$('password').getValue(),
              // endpoint: 'http://s3.redaktr',
              endpoint: 'http://s3.redaktr.mggt.ru',
              s3ForcePathStyle: true,
              signatureVersion: 'v4',
            });
            this.app.identityId = 'us-east-1:' + $$('username').getValue();
            appShow($$('username').getValue());
          }
        });
      }
    };
    const result = {
      css: 'signInView',
      cols: [{
        gravity: 0.38,
      }, {
        css: 'signInViewRight',
        rows: [{
          css: 'signInViewField',
          padding: 0,
          cols: [{
            rows: [{
              view: 'form',
              id: 'log_form',
              width: 272,
              borderless: true,
              elements: [{
                view: 'text',
                placeholder: 'Username',
                name: 'username',
                id: 'username',
              },
              {
                view: 'text',
                type: 'password',
                placeholder: 'Password',
                name: 'password',
                id: 'password',
              },
              {
                view: 'button',
                value: 'Login',
                id: 'login',
                css: 'webix_primary',
                click: clickLogin,
              },
              ],
            }],
          }, {}],
        }, {}, {
          padding: 2,
          cols: [{}, {
            id: 'www',
            view: 'button',
            css: 'webix_transparent',
            type: 'icon',
            width: 268,
            label: '𝔚𝔢𝔫𝔦𝔤 𝔚𝔢𝔟 𝔚𝔬𝔯𝔨𝔰𝔥𝔬𝔭',
            icon: 'mdi mdi-cursor-default-click-outline',
            click: () => {
              window.open('https://w--w--w.com', '_blank');
            },
          }],
        }],
      }],
    };
    if (this.app.config.size === 'wide') {
      result.cols[1].rows.unshift({
      // id: "header_template",
        view: 'template',
        template: "<h1 class='redaktrHeader'>REDAKTR<div>website control&nbsp;panel</div></h1>",
        minHeight: 150,
        type: 'clean',
      });
    }
    result.cols[1].rows.unshift({
      gravity: (this.app.config.size === 'wide') ? 2 : 1,
    });
    if (this.app.config.size === 'wide') {
      result.cols[1].rows.unshift({
        paddingX: 10,
        cols: [{}, {
          view: 'label',
          label: '<div class="redaktr-circle-logo-container"><div class="redaktr-circle-logo"><span class="mdi mdi-48px mdi-glassdoor largeLogoRedaktr"></span></div></div>',
          height: 152,
          width: 152,
        }],
      });
    }
    webix.UIManager.addHotKey('enter', clickLogin, $$('username'));
    webix.UIManager.addHotKey('enter', clickLogin, $$('password'));
    webix.UIManager.addHotKey('enter', clickLogin, $$('login'));
    return result;
  }
}
/* global AWS */
/* global webix */
/* global FB */
/* global $$ */
