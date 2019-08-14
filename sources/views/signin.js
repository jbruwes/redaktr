import $script from "scriptjs";
import {
	JetView
} from "webix-jet";
import PasswordView from "./signinViews/password";
export default class SignInView extends JetView {
	config() {
		var appShow = item => {
			$$("sidebar").clearAll();
			$$("toolbar").addView({
				id: "play",
				view: "icon",
				icon: "mdi mdi-play-circle",
				click: _ => {
					window.open("https://redaktr.com/" + item.name + "/?" + webix.uid(), "_tab");
				}
			});
			this.show("content").then(function(value) {
				$$("tinymce").getEditor(true).then(editor => {
					$$("sidebar").add({
						id: "content",
						icon: "mdi mdi-book-open-page-variant",
						value: "Content"
					}, 0);
					$$("sidebar").add({
						id: "template",
						icon: "mdi mdi-language-html5",
						value: "Template"
					}, 1);
					$$("sidebar").add({
						id: "css",
						icon: "mdi mdi-language-css3",
						value: "CSS"
					}, 2);
					$$("sidebar").add({
						id: "js",
						icon: "mdi mdi-language-javascript",
						value: "JavaScript"
					}, 3);
					$$("sidebar").add({
						id: "settings",
						icon: "mdi mdi-settings",
						value: "Settings"
					}, 4);
					$$("sidebar").add({
						id: "signout",
						icon: "mdi mdi-logout-variant",
						value: "Sign Out"
					});
					$$("sidebar").select("content");
				});
			}, function(reason) {
				webix.message({
					text: "Something goes wrong",
					type: "error"
				});
			});
		};
		var check = _ => {
				this.app.DocumentClient.get({
					TableName: "redaktr",
					Key: {
						"id": AWS.config.credentials.identityId
					}
				}, (err, data) => {
					if (err) webix.message({
						text: err,
						type: "error"
					});
					else if (data.Item) {
						if (AWS.config.credentials.params.Logins['accounts.google.com'] && AWS.config.credentials.params.Logins['cognito-idp.us-east-1.amazonaws.com/us-east-1_isPFINeJO']) {
							this.app.CognitoIdentity.unlinkIdentity({
								IdentityId: AWS.config.credentials.identityId,
								Logins: {
									'accounts.google.com': AWS.config.credentials.params.Logins['accounts.google.com'],
									'cognito-idp.us-east-1.amazonaws.com/us-east-1_isPFINeJO': AWS.config.credentials.params.Logins['cognito-idp.us-east-1.amazonaws.com/us-east-1_isPFINeJO']
								},
								LoginsToRemove: [
									'accounts.google.com'
								]
							}, (err, data) => {
								if (err) webix.message({
									text: err,
									type: "error"
								});
							});
						}
						appShow(data.Item);
					} else webix.message({
						text: "Access Denied",
						type: "error"
					});
				});
			},
			signIn = (err) => {
				if (err) {
					webix.message({
						text: err,
						type: "error"
					});
				} else {
					if (AWS.config.credentials.identityId) check();
					else AWS.config.credentials.refresh(_ => check());
				}
			};
		return {
			css: "signInView",
			cols: [{
				gravity: 0.38
			}, {
				css: "signInViewRight",
				rows: [{
						paddingX: 10,
						cols: [{}, {
							view: "label",
							label: '<div class="redaktr-circle-logo-container"><div class="redaktr-circle-logo"><span class="mdi mdi-48px mdi-glassdoor largeLogoRedaktr"></span></div></div>',
							height: 152,
							width: 152
						}]
					},
					{
						gravity: 2
					},
					{
						id: "header_template",
						view: "template",
						template: "<h1 class='redaktrHeader'>RΞDΔKTR<div>website control&nbsp;panel</div></h1>",
						minHeight: 150,
						type: "clean"
					},
					{
						css: "signInViewField",
						padding: 30,
						cols: [{
							rows: [{
								view: "form",
								id: "log_form",
								width: 300,
								borderless: true,
								elements: [{
										view: "text",
										label: "Username",
										name: "username",
										id: "username"
									},
									{
										view: "text",
										type: "password",
										label: "Password",
										name: "password",
										id: "password"
									},
									{
										cols: [{
											view: "button",
											value: "Login",
											css: "webix_primary",
											click: _ => {
												var authenticationData = {
														Username: $$('username').getValue(),
														Password: $$('password').getValue(),
													},
													AmazonCognitoIdentity = require('amazon-cognito-identity-js'),
													authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData),
													poolData = {
														UserPoolId: 'us-east-1_isPFINeJO',
														ClientId: '4vvur02v4d5smj3pvtj0tu8qda'
													},
													userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData),
													userData = {
														Username: $$('username').getValue(),
														Pool: userPool
													},
													cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData),
													that = this;
												cognitoUser.authenticateUser(authenticationDetails, {
													onSuccess: (result) => {
														var accessToken = result.getAccessToken().getJwtToken();
														AWS.config.credentials.params.Logins['cognito-idp.us-east-1.amazonaws.com/us-east-1_isPFINeJO'] = result.idToken.jwtToken;
														AWS.config.credentials.clearCachedId();
														AWS.config.credentials.expired = false;
														AWS.config.credentials.get(signIn);
													},
													onFailure: (err) => {
														webix.message({
															text: err.message,
															type: "error"
														});
													},
													newPasswordRequired: function(userAttributes, requiredAttributes) {
														delete userAttributes.email_verified;
														delete userAttributes.phone_number_verified;
														that.newpass.showWindow(cognitoUser, userAttributes, this);
													}
												});
											}
										}]
									}, {
										view: "button",
										label: "Sign In with Google",
										type: "iconButton",
										icon: "mdi mdi-google",
										click: (id, e) => {
											$script('//apis.google.com/js/platform.js', () => {
												window.gapi.load('auth2', () => {
													var auth2 = window.gapi.auth2.init({
														client_id: '1098421926055-ss56dm06c6fuupnjdrjj7er0l7b705on.apps.' +
															'googleusercontent.com'
													});
													auth2.signIn({
														prompt: 'select_account'
													}).then((value) => {
														AWS.config.credentials.params.Logins['accounts.google.com'] = value.getAuthResponse().id_token;
														AWS.config.credentials.clearCachedId();
														AWS.config.credentials.expired = false;
														if (!e.altKey) AWS.config.credentials.get(signIn);
													}, (reason) => {
														webix.message({
															text: reason.error,
															type: "error"
														});
													});
												});
											});
										}
									}
								]
							}]
						}, {}]
					}, {}, {
						padding: 2,
						cols: [{}, {
							id: "www",
							view: "button",
							css: "webix_transparent",
							type: "icon",
							width: 300,
							label: "𝔚𝔢𝔫𝔦𝔤 𝔚𝔢𝔟 𝔚𝔢𝔯𝔨𝔰𝔱𝔞𝔱𝔱",
							icon: "mdi mdi-cursor-default-click-outline",
							click: () => {
								window.open("https://w--w--w.com", "_blank");
							}
						}]
					}
				]
			}]
		};
	}
	init() {
		this.newpass = this.ui(PasswordView);
	}
}
/* global AWS */
/* global webix */
/* global FB */
/* global $$ */