import {JetView} from 'webix-jet';
import PasswordView from './signinViews/password';
import ForgetPasswordView from './signinViews/forgetPassword';
export default class SignInView extends JetView {
  config() {
    let that;
    const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
    const userPool = (this.app.userPool = new AmazonCognitoIdentity.CognitoUserPool({
      UserPoolId: 'us-east-1_isPFINeJO',
      ClientId: '4vvur02v4d5smj3pvtj0tu8qda',
    }));
    var cbRefresh = (err) => {
      if (err) {
        const cognitoUser = userPool.getCurrentUser();
        if (cognitoUser) {
          cognitoUser.getSession((err, session) => {
            if (err) {
              webix.message({
                text: err,
                type: 'error',
              });
            } else {
              cognitoUser.refreshSession(
                session.getRefreshToken(),
                (err, session) => {
                  if (err) {
                    webix.message({
                      text: err,
                      type: 'error',
                    });
                  } else {
                    AWS.config.credentials.params.Logins[
                      'cognito-idp.us-east-1.amazonaws.com/us-east-1_isPFINeJO'
                    ] = session.getIdToken().getJwtToken();
                    AWS.config.credentials.refresh((err) => {
                      if (err) {
                        AWS.config.credentials.params.Logins = [];
                        webix.message({
                          text: err,
                          type: 'error',
                        });
                      } else {
                        that.timeoutId = webix.delay(
                          (_) => AWS.config.credentials.refresh(cbRefresh),
                          this,
                          [],
                          new Date(AWS.config.credentials.expireTime) - new Date() - 1000 * 60 * 5);
                      }
                    });
                  }
                }
              );
            }
          });
        }
      } else {
        that.timeoutId = webix.delay(
          (_) => AWS.config.credentials.refresh(cbRefresh),
          this,
          [],
          new Date(AWS.config.credentials.expireTime) - new Date() - 1000 * 60 * 5
        );
      }
    };
    const appShow = (name) => {
      this.app.timeoutId = webix.delay(
        (_) => AWS.config.credentials.refresh(cbRefresh),
        this,
        [],
        new Date(AWS.config.credentials.expireTime) - new Date() - 1000 * 60 * 5
      );
      webix.UIManager.removeHotKey('enter', clickLogin);
      // webix.UIManager.removeHotKey("enter", null, $$('username'));
      // webix.UIManager.removeHotKey("enter", null, $$('password'));
      // webix.UIManager.removeHotKey("enter", null, $$('login'));

      $$('sidebar').clearAll();
      $$('toolbar').addView({
        id: 'play',
        view: 'icon',
        icon: 'mdi mdi-play-circle',
        click: (_) => {
          window.open('https://redaktr.com/' + name + '/?' + webix.uid(), '_tab');
        },
      });
      this.show('content').then(
        function(value) {
          $$('tinymce')
            .getEditor(true)
            .then((editor) => {
              $$('sidebar').add(
                {
                  id: 'content',
                  icon: 'mdi mdi-book-open-page-variant',
                  value: 'Content',
                },
                0
              );
              $$('sidebar').add(
                {
                  id: 'template',
                  icon: 'mdi mdi-language-html5',
                  value: 'Template',
                },
                1
              );
              $$('sidebar').add(
                {
                  id: 'css',
                  icon: 'mdi mdi-language-css3',
                  value: 'CSS',
                },
                2
              );
              $$('sidebar').add(
                {
                  id: 'js',
                  icon: 'mdi mdi-language-javascript',
                  value: 'JavaScript',
                },
                3
              );
              if (name !== 'demo') {
                $$('sidebar').add(
                  {
                    id: 'settings',
                    icon: 'mdi mdi-settings',
                    value: 'Settings',
                  },
                  4
                );
              }
              $$('sidebar').add({
                id: 'signout',
                icon: 'mdi mdi-logout-variant',
                value: 'Sign Out',
              });
              $$('sidebar').select('content');
            });
        },
        function(reason) {
          webix.message({
            text: 'Something goes wrong',
            type: 'error',
          });
        }
      );
    };
    const check = (_) => {
      this.app.identityId = AWS.config.credentials.identityId;
      this.app.S3.getObject({
        Bucket: 'redaktr',
        Key: this.app.identityId + '.json',
      }, (err, data) => {
        if (err) {
          if (err.code === 'NotFound' || err.code === 'AccessDenied') {
            /** ***************************************************************/
            /* Новый проект                                                 */
            /** ***************************************************************/

            const id = webix.uid();
            that = this.app;

            webix.promise
              .all([

                this.app.S3.putObject({
                  Bucket: 'redaktr',
                  Key: this.app.identityId + '.json',
                  ContentType: 'application/json',
                  Body:
                    '{' +
                    '"id":"' + AWS.config.credentials.identityId + '",' +
                    '"name":"' + $$('username').getValue() + '"' +
                    '}',
                }).promise(),
                this.app.S3.putObject({
                  Bucket: 'redaktr',
                  Key: this.app.identityId + '/index.json',
                  ContentType: 'application/json',
                  Body:
                    '{"link":"","text":"","date":"","image":"","visible":true,"value":"' +
                    $$('username').getValue() +
                    '","id":' +
                    id +
                    '}',
                }).promise(),
                this.app.S3.putObject({
                  Bucket: 'redaktr',
                  Key: this.app.identityId + '/' + id + '.htm',
                  ContentType: 'text/html',
                  Body: '',
                }).promise(),
                this.app.S3.putObject({
                  Bucket: 'redaktr',
                  Key: this.app.identityId + '/index.cdn.json',
                  ContentType: 'application/json',
                  Body: '[]',
                }).promise(),
                this.app.S3.putObject({
                  Bucket: 'redaktr',
                  Key: this.app.identityId + '/index.js',
                  ContentType: 'application/javascript',
                  Body: 'function redaktr(){try{}catch(e){}}',
                }).promise(),
                this.app.S3.putObject({
                  Bucket: 'redaktr',
                  Key: this.app.identityId + '/index.css',
                  ContentType: 'text/css',
                  Body: '',
                }).promise(),
                this.app.S3.putObject({
                  Bucket: 'redaktr',
                  Key: this.app.identityId + '/index.cdn.css',
                  ContentType: 'text/css',
                  Body: '',
                }).promise(),
                this.app.S3.putObject({
                  Bucket: 'redaktr',
                  Key: this.app.identityId + '.html',
                  ContentType: 'text/html',
                  Body:
                    '<!DOCTYPE html><html><head>' +
                    '<meta charset="utf-8">' +
                    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
                    '<script async src="https://cdn.redaktr.com/redaktr.min.js"></script>' +
                    // '<link rel="stylesheet" href="https://cdn.redaktr.com/redaktr.cdn.min.css">' +
                    '<link rel="stylesheet" href="https://cdn.redaktr.com/redaktr.min.css">' +
                    '<base href="/' +
                    this.app.identityId +
                    '/">' +
                    '<link rel="icon" href="favicon.ico" type="image/vnd.microsoft.icon">' +
                    '</head><body>' +
                    '<div class="ui sidebar very wide vertical accordion menu"></div>' +
                    '<div class="ui main menu fixed" hidden><a class="launch icon item"><i class="content icon"></i></a><div class="header item"></div></div>' +
                    '<div class="pusher"><div data-static="" class="ui container" style="z-index:1"><div id="content" style="margin:0px;flex:1 1 auto"><main></main></div></div></div>' +
                    '</body></html>',
                }).promise(),
              ])
              .then(
                (results) => {
                  // this.app.timeoutId = webix.delay(_ => AWS.config.credentials.refresh(cbRefresh), this, [], new Date(AWS.config.credentials.expireTime) - new Date() - 100000);
                  appShow($$('username').getValue());
                },
                (err) => {
                  AWS.config.credentials.params.Logins = [];
                  this.authenticationData = null;
                  webix.message({
                    text: 'Something went wrong',
                    type: 'error',
                  });
                }
              );
          } else {
            AWS.config.credentials.params.Logins = [];
            this.authenticationData = null;
            webix.message({
              text: err,
              type: 'error',
            });
          }
        } else {
          data = JSON.parse(data.Body.toString());
          that = this.app;
          // this.app.timeoutId = webix.delay(_ => AWS.config.credentials.refresh(cbRefresh), this, [], new Date(AWS.config.credentials.expireTime) - new Date() - 100000);
          appShow(data.name);
        }
      });
    };
    var clickLogin = (_) => {
      if (
        !this.authenticationData ||
        !(
          this.authenticationData.Username === $$('username').getValue() &&
          this.authenticationData.Password === $$('password').getValue()
        )
      ) {
        this.authenticationData = {
          Username: $$('username').getValue(),
          Password: $$('password').getValue(),
        };
        const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
          this.authenticationData
        );
        const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
          Username: $$('username').getValue(),
          Pool: userPool,
        });
        const that = this;
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: (result) => {
            AWS.config.region = 'us-east-1';
            AWS.config.correctClockSkew = true;
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
              IdentityPoolId: 'us-east-1:92faa262-cf0e-4586-98d5-2f74fa89baec',
              Logins: {},
            });

            AWS.config.credentials.params.Logins = [];
            AWS.config.credentials.params.Logins[
              'cognito-idp.us-east-1.amazonaws.com/us-east-1_isPFINeJO'
            ] = result.getIdToken().getJwtToken();
            AWS.config.credentials.clearCachedId();
            AWS.config.credentials.get((err) => {
              if (err) {
                AWS.config.credentials.params.Logins = [];
                this.authenticationData = null;
                webix.message({
                  text: err,
                  type: 'error',
                });
              } else {
                this.app.S3 = new AWS.S3({
                  correctClockSkew: true,
                  useAccelerateEndpoint: true,
                });
                if (AWS.config.credentials.identityId) {
                  this.app.identityId = AWS.config.credentials.identityId;
                  check();
                } else AWS.config.credentials.refresh(check);
              }
            });
          },
          onFailure: (err) => {
            this.authenticationData = null;
            webix.message({
              text: err.message,
              type: 'error',
            });
          },
          newPasswordRequired: function(userAttributes, requiredAttributes) {
            that.authenticationData = null;
            delete userAttributes.email_verified;
            delete userAttributes.phone_number_verified;
            that.newpass.showWindow(cognitoUser, userAttributes, this);
          },
        });
      }
    };
    const result = {
      css: 'signInView',
      cols: [
        {
          gravity: 0.38,
        },
        {
          css: 'signInViewRight',
          rows: [
            {
              css: 'signInViewField',
              padding: 0,
              cols: [
                {
                  rows: [
                    {
                      view: 'form',
                      id: 'log_form',
                      width: 272,
                      borderless: true,
                      elements: [
                        {
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
                        {
                          view: 'button',
                          value: 'Forgot your password?',
                          css: 'webix_transparent',
                          click: (_) => {
                            const username = $$(
                              'username'
                            ).getValue();
                            if (username) {
                              const cognitoUser = new AmazonCognitoIdentity.CognitoUser(
                                {
                                  Username: username,
                                  Pool: userPool,
                                }
                              );
                              const that = this;
                              // that.forgetpass.showWindow(cognitoUser, this);
                              cognitoUser.forgotPassword({
                                onSuccess: (result) =>
                                  webix.message({
                                    text: result,
                                  }),
                                onFailure: (err) =>
                                  webix.message({
                                    text: err.message,
                                    type: 'error',
                                  }),
                                inputVerificationCode() {
                                  that.forgetpass.showWindow(
                                    cognitoUser,
                                    this
                                  );
                                },
                              });
                            } else {
                              webix.message({
                                text:
                                  'Please fill the username field',
                                type: 'debug',
                              });
                            }
                          },
                        },
                      ],
                    },
                  ],
                },
                {},
              ],
            },
            {},
            {
              padding: 2,
              cols: [
                {},
                {
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
                },
              ],
            },
          ],
        },
      ],
    };
    if (this.app.config.size === 'wide') {
      result.cols[1].rows.unshift({
        // id: "header_template",
        view: 'template',
        template:
          "<h1 class='redaktrHeader'>REDAKTR<div>website control&nbsp;panel</div></h1>",
        minHeight: 150,
        type: 'clean',
      });
    }
    result.cols[1].rows.unshift({
      gravity: this.app.config.size === 'wide' ? 2 : 1,
    });
    if (this.app.config.size === 'wide') {
      result.cols[1].rows.unshift({
        paddingX: 10,
        cols: [
          {},
          {
            view: 'label',
            label:
              '<div class="redaktr-circle-logo-container"><div class="redaktr-circle-logo"><span class="mdi mdi-48px mdi-glassdoor largeLogoRedaktr"></span></div></div>',
            height: 152,
            width: 152,
          },
        ],
      });
    }
    webix.UIManager.addHotKey('enter', clickLogin, $$('username'));
    webix.UIManager.addHotKey('enter', clickLogin, $$('password'));
    webix.UIManager.addHotKey('enter', clickLogin, $$('login'));
    return result;
  }
  init() {
    this.newpass = this.ui(PasswordView);
    this.forgetpass = this.ui(ForgetPasswordView);
  }
}
/* global AWS */
/* global webix */
/* global FB */
/* global $$ */
