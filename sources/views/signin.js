import $script from "scriptjs";
import {
	JetView
} from "webix-jet";
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
					else if (data.Item) appShow(data.Item);
					else webix.message({
						text: "Registration is Temporarily Unavailable",
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
						template: "<h1 class='redaktrHeader'>RΞDΔKTR<div>website creator</div></h1>",
						minHeight: 150,
						type: "clean"
					},
					{
						css: "signInViewField",
						padding: 30,
						cols: [
							/*{
														id: "a1",
														rows: [{
															responsive: "a1",
															cols: [{
																	minWidth: 200,
																	view: "button",
																	label: "Sign In with Facebook",
																	type: "iconButton",
																	icon: "mdi mdi-facebook",
																	click: () => {
																		$script('//connect.facebook.net/en_US/sdk.js', () => {
																			FB.init({
																				appId: '606212879479370',
																				cookie: true,
																				xfbml: true,
																				version: 'v3.2'
																			});
																			FB.login((response) => {
																				if (response.status === 'connected') {
																					delete AWS.config.credentials.params.Logins['accounts.google.com'];
																					AWS.config.credentials.params.Logins['graph.facebook.com'] = response.authResponse.accessToken;
																					AWS.config.credentials.clearCachedId();
																					AWS.config.credentials.expired = false;
																					AWS.config.credentials.get(signIn);

																				}
																			}, {
																				scope: 'email'
																			});
																		});
																	}
																},*/
							{
								width: 200,
								view: "button",
								label: "Sign In with Google",
								type: "iconButton",
								icon: "mdi mdi-google",
								click: () => {
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
												AWS.config.credentials.get(signIn);
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
							/*]
							}]
						}*/
							, {}
						]
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
}
/* global AWS */
/* global webix */
/* global FB */
/* global $$ */