import { JetView } from "webix-jet";
export default class PropertiesView extends JetView {
	config() {
		return {
			view: "form",
			id: "propForm",
			scroll: true,
			elements: [{
				rows: [{ template: "Hard Link", type: "section", css: "webix_section" }, {
					view: "text",
					id: "link",
					name: "link",
					label: "<span class='mdi mdi-dark mdi-24px mdi-link-variant'></span>",
					invalidMessage: "Prohibited symbols are used",
					labelWidth: 33,
					on: {
						onChange: value => {
							var id, item;
							if (!this.getParentView()._lockProperties && $$('propForm').validate()) {
								id = $$("tree").getSelectedId();
								item = $$("tree").getItem(id);
								item.link = value;
								$$("tree").updateItem(id, item);
							}
						}
					}
				}, { template: "Date", type: "section", css: "webix_section" }, {
					view: "datepicker",
					id: "date",
					label: "<span class='mdi mdi-dark mdi-24px mdi-calendar'></span>",
					labelWidth: 33,
					on: {
						onChange: value => {
							var id, item;
							if (!this.getParentView()._lockProperties) {
								id = $$("tree").getSelectedId();
								item = $$("tree").getItem(id);
								item.date = value;
								$$("tree").updateItem(id, item);
							}
						}
					}
				}, { template: "Description", type: "section", css: "webix_section" }, {
					view: "textarea",
					id: "text",
					label: "<span class='mdi mdi-dark mdi-24px mdi-card-text-outline'></span>",
					labelWidth: 33,
					height: 200,
					on: {
						onChange: value => {
							var id, item;
							if (!this.getParentView()._lockProperties) {
								id = $$("tree").getSelectedId();
								item = $$("tree").getItem(id);
								item.text = value;
								$$("tree").updateItem(id, item);
							}
						}
					}
				}, { template: "Image", type: "section", css: "webix_section" }, {
					view: "uploader",
					id: "uploader",
					value: 'Upload Image',
					multiple: false,
					autosend: false,
					name: "files",
					link: "bglist",
					accept: "image/png, image/gif, image/jpeg",
					on: {
						"onAfterFileAdd": file => {
							if (!this.getParentView()._lockProperties) {
								this.app.S3.headObject({
									Bucket: 'base.redaktr.com',
									Key: AWS.config.credentials.identityId + '/' + file.name
								}, (err, data) => {
									file.file.sname = (err ? '' : webix.uid() + '/') + file.name;
									this.app.S3.putObject({
										Bucket: 'base.redaktr.com',
										Key: AWS.config.credentials.identityId + '/' + file.file.sname,
										ContentType: file.file.type,
										Body: file.file
									}, (err, data) => {
										if (err) webix.message({ text: err.message, type: "error" });
										else this._image();
									});
								});
							}
						},
						"files->onAfterDelete": file => this._image()
					}
				}, {
					view: "list",
					id: "bglist",
					type: "uploader",
					template: "{common.removeIcon()}{common.percent()}{common.fileName()}",
					autoheight: true,
					borderless: true
				}]
			}, {}],
			rules: {
				link: value => {
					return !value || !/[;,//?:@&=+$_]/.test(value);
				}
			},

		};
	}
	_image() {
		var id, item, image;
		id = $$("tree").getSelectedId();
		item = $$("tree").getItem(id);
		if (!this.getParentView()._lockProperties && item) {
			image = $$('bglist').getItem($$('bglist').getFirstId());
			if (image && image.file.sname) item.image = image.file.sname;
			else item.image = "";
			$$("tree").updateItem(id, item);
		}
	}
}
/* global webix */
/* global AWS */
/* global $$ */
