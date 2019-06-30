import {
	JetView
} from "webix-jet";
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
						id: "title",
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
					}
				],
				elementsConfig: {
					"labelAlign": "right"
				}
			}]
		};
	}
	init() {
		webix.ajax("https://base.redaktr.com/" + AWS.config.credentials.identityId + ".ico?" + webix.uid(), (text, data, XmlHttpRequest) => {
			if ($$('sidebar').getSelectedId() === 'settings') {
				$$("uploader").files.data.clearAll();
				$$("uploader").addFile({
					name: 'favicon.ico',
					sname: AWS.config.credentials.identityId + ".ico"
				}, 0);
				$$("uploader").attachEvent("onAfterFileAdd", file => {
					file.file.sname = 'favicon.ico';
					this.app.S3.putObject({
						Bucket: 'base.redaktr.com',
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
						Bucket: 'base.redaktr.com',
						Key: AWS.config.credentials.identityId + '.ico'
					}, (err, data) => {
						if (err) webix.message({
							text: err.message,
							type: "error"
						});
						else webix.message("Settings save complete");
					});
				});
			}
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
					if (data.Item.title) $$("title").setValue("http://redaktr.com/" + data.Item.title);
					if (data.Item.domain) $$("domain").setValue(data.Item.domain);
					if (data.Item.google) $$("google").setValue(data.Item.google);
					if (data.Item.yandex) $$("yandex").setValue(data.Item.yandex);
				} else webix.message({
					text: "Something went wrong",
					type: "error"
				});
				$$("google").attachEvent("onChange", _ => this._save());
				$$("yandex").attachEvent("onChange", _ => this._save());
			}
		});
	}
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
}
/* global webix */
/* global AWS */
/* global $$ */