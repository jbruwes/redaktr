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
					/*
					{
						template: "Verification",
						type: "section"
					},
					{
						id: "yandex",
						view: "text",
						label: "Yandex",
						labelWidth: 56
					},
					{
						id: "google",
						view: "text",
						label: "Google",
						labelWidth: 56
					},
					*/
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
			Key: AWS.config.credentials.identityId + '.ico'
		}, (err, data) => {
			if (!err && $$('sidebar').getSelectedId() === 'settings') {
				$$("uploader").files.data.clearAll();
				$$("uploader").addFile({
					name: 'favicon.ico',
					sname: AWS.config.credentials.identityId + ".ico"
				}, 0);
			}
			$$("uploader").attachEvent("onAfterFileAdd", file => {
				file.file.sname = 'favicon.ico';
				this.app.S3.putObject({
					Bucket: 'redaktr',
					Key: AWS.config.credentials.identityId + '.ico',
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
					Key: AWS.config.credentials.identityId + '.ico'
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
				"id": AWS.config.credentials.identityId
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
					//if (data.Item.google) $$("google").setValue(data.Item.google);
					//if (data.Item.yandex) $$("yandex").setValue(data.Item.yandex);
				} else webix.message({
					text: "Something went wrong",
					type: "error"
				});
				//$$("google").attachEvent("onChange", _ => this._save());
				//$$("yandex").attachEvent("onChange", _ => this._save());
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
	/*
	_save() {
		var y = $$("yandex").getValue(),
			g = $$("google").getValue(),
			UpdateExpressionSet = '',
			UpdateExpressionRemove = '',
			params = {
				TableName: "redaktr",
				Key: {
					"id": AWS.config.credentials.identityId
				},
				//ExpressionAttributeValues: {},
				ReturnValues: "UPDATED_NEW"
			};
		if (y) {
			UpdateExpressionSet = 'yandex = :y';
			if (!params.ExpressionAttributeValues) params.ExpressionAttributeValues = {};
			params.ExpressionAttributeValues[":y"] = y;
		} else UpdateExpressionRemove = 'yandex';
		if (g) {
			UpdateExpressionSet = UpdateExpressionSet + (UpdateExpressionSet ? ", " : "") + 'google = :g';
			if (!params.ExpressionAttributeValues) params.ExpressionAttributeValues = {};
			params.ExpressionAttributeValues[":g"] = g;
		} else UpdateExpressionRemove = UpdateExpressionRemove + (UpdateExpressionRemove ? ", " : "") + 'google';
		params.UpdateExpression = (UpdateExpressionSet ? "set " + UpdateExpressionSet : "") + (UpdateExpressionRemove ? " remove " + UpdateExpressionRemove : "");
		this.app.DocumentClient.update(params, function(err, data) {
			if (err) webix.message({
				text: err,
				type: "error"
			});
			else webix.message("Settings save complete");
		});
	}
	*/
}
/* global webix */
/* global AWS */
/* global $$ */