import {
	JetView
} from "webix-jet";
import ValidateEmailView from "./settingsViews/validateEmail";
export default class SettingsView extends JetView {
	config() {
		return {
			rows: [{
				view: "form",
				autoheight: false,
				elements: [{
						template: "Project name",
						type: "section"
					}, {
						id: "name",
						view: "label",
						label: "-"
					},
					{
						template: "Domain",
						type: "section"
					}, {
						id: "domain",
						view: "label",
						label: "-",
						labelWidth: 33
					},
					{
						template: "Icon",
						type: "section",
						css: "webix_section"
					}, {
						view: "uploader",
						id: "uploader",
						value: 'Upload Icon',
						multiple: false,
						autosend: false,
						name: "files",
						link: "bglist",
						accept: "image/vnd.microsoft.icon"
					}, {
						view: "list",
						id: "bglist",
						type: "uploader",
						template: "{common.removeIcon()}{common.percent()}{common.fileName()}",
						autoheight: true,
						borderless: true
					}, {
						template: "Email",
						type: "section"
					}, {
						id: "email",
						view: "search",
						icon: false
					},
					{
						id: "verifyButton",
						view: "button",
						disabled: true,
						value: "Verify email",
						click: _ => this.validateemail.showWindow(this.cognitoUser, this)
					}
				],
				elementsConfig: {
					"labelAlign": "right"
				}
			}]
		};
	}
	init() {
		this.validateemail = this.ui(ValidateEmailView);
		this.app.S3.headObject({
			Bucket: 'redaktr',
			Key: this.app.identityId + '/favicon.ico'
		}, (err, data) => {
			if (!err && $$('sidebar').getSelectedId() === 'settings') {
				$$("uploader").files.data.clearAll();
				$$("uploader").addFile({
					name: 'favicon.ico',
					sname: this.app.identityId + ".ico"
				}, 0);
			}
			$$("uploader").attachEvent("onAfterFileAdd", file => {
				file.file.sname = 'favicon.ico';
				this.app.S3.putObject({
					Bucket: 'redaktr',
					Key: this.app.identityId + '/favicon.ico',
					ContentType: file.file.type,
					Body: file.file
				}, (err, data) => {
					if (err) webix.message({
						text: err.message,
						type: "error"
					});
					else webix.message("Settings save complete");
				});
			});
			$$("uploader").files.attachEvent("onAfterDelete", file => {
				this.app.S3.deleteObject({
					Bucket: 'redaktr',
					Key: this.app.identityId + '/favicon.ico'
				}, (err, data) => {
					if (err) webix.message({
						text: err.message,
						type: "error"
					});
					else webix.message("Settings save complete");
				});
			});
		});
		this.app.DocumentClient.get({
			TableName: "redaktr",
			Key: {
				"id": this.app.identityId
			}
		}, (err, data) => {
			if ($$('sidebar').getSelectedId() === 'settings') {
				if (err) webix.message({
					text: err,
					type: "error"
				});
				else if (data.Item) {
					if (data.Item.name) $$("name").setValue("http://redaktr.com/" + data.Item.name);
					if (data.Item.domain) $$("domain").setValue(data.Item.domain);
				} else webix.message({
					text: "Something went wrong",
					type: "error"
				});
			}
		});
		var AmazonCognitoIdentity = require('amazon-cognito-identity-js'),
			cognitoUser = this.cognitoUser = this.app.userPool.getCurrentUser();
		if (cognitoUser) cognitoUser.getSession((err, session) => {
			if (err) webix.message({
				text: err.message,
				type: "error"
			});
			else cognitoUser.getUserAttributes((err, result) => {
				if (err) webix.message({
					text: err.message,
					type: "error"
				});
				else {
					for (const item of result) {
						if (item.Name === 'email') $$("email").setValue(item.Value);
						if (item.Name === 'email_verified') {
							$$("email").config.icon = (item.Value === 'true') ? "mdi mdi-shield-check" : "mdi mdi-shield-off";
							$$("email").refresh();
							if (item.Value === 'false') $$("verifyButton").enable();
						}
					}
					$$('email').attachEvent("onChange", _ => {
						cognitoUser.updateAttributes([new AmazonCognitoIdentity.CognitoUserAttribute({
							Name: 'email',
							Value: $$("email").getValue()
						})], function(err, result) {
							if (err) webix.message({
								text: err.message,
								type: "error"
							});
							else {
								$$("email").config.icon = "mdi mdi-shield-off";
								$$("email").refresh();
								$$("verifyButton").enable();
							}
						});
					});
				}
			});
		});
	}
}
/* global webix */
/* global AWS */
/* global $$ */