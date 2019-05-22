import { JetView } from "webix-jet";
export default class SettingsView extends JetView {
	config() {

		return {
			rows: [{
				view: "form",
				autoheight: false,
				elements: [
					{ template: "Project name", type: "section" }, { view: "label", label: "https://redaktr.com/help" },
					{ template: "Domain", type: "section" }, { view: "label", label: "-", labelWidth: 33 },
					{ template: "Verification", type: "section" },
					{ view: "text", label: "Yandex", labelWidth: 56 }, { view: "text", label: "Google", labelWidth: 56 },
					{ template: "Icon", type: "section", css: "webix_section" }, {
						view: "uploader",
						id: "uploader",
						value: 'Upload Icon',
						multiple: false,
						autosend: false,
						name: "files",
						link: "bglist",
						accept: "image/vnd.microsoft.icon",
						on: {
							"onAfterFileAdd": file => {
								file.file.sname = 'favicon.ico';
								this.app.S3.putObject({
									Bucket: 'base.redaktr.com',
									Key: AWS.config.credentials.identityId + '.ico',
									ContentType: file.file.type,
									Body: file.file
								}, (err, data) => {
									if (err) webix.message({ text: err.message, type: "error" });
									//else this._image();
								});
							},
							"files->onAfterDelete": file => {
								this.app.S3.deleteObject({
									Bucket: 'base.redaktr.com',
									Key: AWS.config.credentials.identityId + '.ico'
								}, (err, data) => {
									if (err) webix.message({ text: err.message, type: "error" });
									//else this._image();
								});
							}
						}
					}, {
						view: "list",
						id: "bglist",
						type: "uploader",
						template: "{common.removeIcon()}{common.percent()}{common.fileName()}",
						autoheight: true,
						borderless: true
					}
				],
				elementsConfig: { "labelAlign": "right" }
			}]
		};
	}
}
/* global webix */
/* global AWS */
/* global $$ */
