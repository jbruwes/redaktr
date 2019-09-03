import $script from "scriptjs";
import {
	JetView
} from "webix-jet";
import PasswordView from "./signinViews/password";
export default class SignInView extends JetView {
	config() {
		var that, AmazonCognitoIdentity = require('amazon-cognito-identity-js'),
			userPool = new AmazonCognitoIdentity.CognitoUserPool({
				UserPoolId: 'us-east-1_isPFINeJO',
				ClientId: '4vvur02v4d5smj3pvtj0tu8qda'
			}),
			appShow = item => {
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
			},
			cbRefresh = err => {
				if (err) {
					var cognitoUser = userPool.getCurrentUser();
					if (cognitoUser) cognitoUser.getSession((err, session) => {
						if (err) webix.message({
							text: err,
							type: "error"
						});
						else cognitoUser.refreshSession(session.getRefreshToken(), (err, session) => {
							if (err) webix.message({
								text: err,
								type: "error"
							});
							else {
								AWS.config.credentials.params.Logins['cognito-idp.us-east-1.amazonaws.com/us-east-1_isPFINeJO'] = session.getIdToken().getJwtToken();
								AWS.config.credentials.refresh(err => {
									if (err) {
										AWS.config.credentials.params.Logins = [];
										webix.message({
											text: err,
											type: "error"
										});
									} else that.timeoutId = webix.delay(_ => AWS.config.credentials.refresh(cbRefresh), this, [], new Date(AWS.config.credentials.expireTime) - new Date() - 100000);
								});
							}
						});
					});
				} else that.timeoutId = webix.delay(_ => AWS.config.credentials.refresh(cbRefresh), this, [], new Date(AWS.config.credentials.expireTime) - new Date() - 100000);
			},
			check = _ => {
				this.app.DocumentClient.get({
					TableName: "redaktr",
					Key: {
						"id": AWS.config.credentials.identityId
					},
					ProjectionExpression: "id,#name",
					ExpressionAttributeNames: {
						"#name": "name"
					}
				}, (err, data) => {
					if (err) {
						AWS.config.credentials.params.Logins = [];
						webix.message({
							text: err,
							type: "error"
						});
					} else if (data.Item) {
						that = this.app;
						that.timeoutId = webix.delay(_ => AWS.config.credentials.refresh(cbRefresh), this, [], new Date(AWS.config.credentials.expireTime) - new Date() - 100000);
						appShow(data.Item);
					} else {
						AWS.config.credentials.params.Logins = [];
						webix.message({
							text: "Access Denied",
							type: "error"
						});
					}
				});
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
						template: "<h1 class='redaktrHeader'>REDAKTR<div>website control&nbsp;panel</div></h1>",
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
												if (!this.authenticationData || !(this.authenticationData.Username === $$('username').getValue() && this.authenticationData.Password === $$('password').getValue())) {
													this.authenticationData = {
														Username: $$('username').getValue(),
														Password: $$('password').getValue(),
													}
													var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(this.authenticationData),
														cognitoUser = new AmazonCognitoIdentity.CognitoUser({
															Username: $$('username').getValue(),
															Pool: userPool
														}),
														that = this;
													cognitoUser.authenticateUser(authenticationDetails, {
														onSuccess: result => {
															AWS.config.credentials.params.Logins = [];
															AWS.config.credentials.params.Logins['cognito-idp.us-east-1.amazonaws.com/us-east-1_isPFINeJO'] = result.getIdToken().getJwtToken();
															AWS.config.credentials.clearCachedId();
															AWS.config.credentials.get(err => {
																if (err) {
																	AWS.config.credentials.params.Logins = [];
																	webix.message({
																		text: err,
																		type: "error"
																	});
																} else {
																	if (AWS.config.credentials.identityId) check();
																	else AWS.config.credentials.refresh(check);
																}
															});
														},
														onFailure: err => {
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
											}
										}]
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
							label: "𝔚𝔢𝔫𝔦𝔤 𝔚𝔢𝔟 𝔚𝔬𝔯𝔨𝔰𝔥𝔬𝔭",
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