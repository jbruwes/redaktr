import {
	JetView
} from "webix-jet";
export default class PropertiesView extends JetView {
	config() {
		return {
			view: "form",
			id: "propForm",
			scroll: true,
			elements: [{
				rows: [{
					template: "Title",
					type: "section",
					css: "webix_section"
				}, {
					view: "text",
					id: "title",
					label: "<span class='mdi mdi-dark mdi-24px mdi-window-maximize'></span>",
					labelWidth: 33,
					on: {
						onChange: value => {
							var id, item;
							if (!this.getParentView()._lockProperties) {
								id = $$("tree").getSelectedId();
								item = $$("tree").getItem(id);
								item.title = value;
								$$("tree").updateItem(id, item);
							}
						}
					}
				}, {
					template: "Description",
					type: "section",
					css: "webix_section"
				}, {
					view: "textarea",
					id: "description",
					label: "<span class='mdi mdi-dark mdi-24px mdi-card-text-outline'></span>",
					labelWidth: 33,
					height: 100,
					on: {
						onChange: value => {
							var id, item;
							if (!this.getParentView()._lockProperties) {
								id = $$("tree").getSelectedId();
								item = $$("tree").getItem(id);
								item.description = value;
								$$("tree").updateItem(id, item);
							}
						}
					}
				}, {
					template: "Keywords",
					type: "section",
					css: "webix_section"
				}, {
					view: "textarea",
					id: "keywords",
					label: "<span class='mdi mdi-dark mdi-24px mdi-key-change'></span>",
					labelWidth: 33,
					height: 100,
					on: {
						onChange: value => {
							var id, item;
							if (!this.getParentView()._lockProperties) {
								id = $$("tree").getSelectedId();
								item = $$("tree").getItem(id);
								item.keywords = value;
								$$("tree").updateItem(id, item);
							}
						}
					}
				},{
					template: "Hard Link",
					type: "section",
					css: "webix_section"
				}, {
					view: "text",
					id: "url",
					name: "url",
					label: "<span class='mdi mdi-dark mdi-24px mdi-link-variant'></span>",
					invalidMessage: "Prohibited symbols are used",
					labelWidth: 33,
					on: {
						onChange: value => {
							var id, item;
							if (!this.getParentView()._lockProperties && $$('propForm').validate()) {
								id = $$("tree").getSelectedId();
								item = $$("tree").getItem(id);
								item.url = value;
								$$("tree").updateItem(id, item);
							}
						}
					}
				}, /*{
					template: "Last Modification",
					type: "section",
					css: "webix_section"
				}, {
					view: "datepicker",
					id: "lastmod",
					label: "<span class='mdi mdi-dark mdi-24px mdi-calendar'></span>",
					labelWidth: 33,
					on: {
						onChange: value => {
							var id, item;
							if (!this.getParentView()._lockProperties) {
								id = $$("tree").getSelectedId();
								item = $$("tree").getItem(id);
								var format = webix.Date.dateToStr("%Y-%m-%d");
								item.lastmod = format(value);
								$$("tree").updateItem(id, item);
							}
						}
					}
				},*/ {
					template: "Change Frequency",
					type: "section",
					css: "webix_section"
				}, {
					view: "richselect",
					id: "changefreq",
					label: "<span class='mdi mdi-dark mdi-24px mdi-current-ac'></span>",
					labelWidth: 33,
					options: ["always","hourly","daily","weekly","monthly","yearly","never"],
					on: {
						onChange: value => {
							var id, item;
							if (!this.getParentView()._lockProperties) {
								id = $$("tree").getSelectedId();
								item = $$("tree").getItem(id);
								item.changefreq = value;
								$$("tree").updateItem(id, item);
							}
						}
					}
				}, {
					template: "Priority",
					type: "section",
					css: "webix_section"
				}, {
					view: "slider",
					id: "priority",
					label: '<span class="mdi mdi-dark mdi-24px mdi-flag-variant-outline"></span>',
					labelWidth: 33,
					min: "0",
					max: "1",
					step: "0.1",
					value: "0.5",
					type:"alt",
					on: {
						onChange: value => {
							var id, item;
							if (!this.getParentView()._lockProperties) {
								id = $$("tree").getSelectedId();
								item = $$("tree").getItem(id);
								item.priority = value.toFixed(1);
								$$("tree").updateItem(id, item);
							}
						}
					}
				}, {
					template: "Image",
					type: "section",
					css: "webix_section"
				}, {
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
								//this.app.S3.headObject({
								//	Bucket: 'redaktr',
								//	Key: this.app.identityId + '/' + file.name
								//}, (err, data) => {
									//file.file.sname = (err ? '' : webix.uid() + '/') + file.name;
									file.file.sname = webix.uid() + '/' + file.name;
									this.app.S3.putObject({
										Bucket: 'redaktr',
										Key: this.app.identityId + '/' + file.file.sname,
										ContentType: file.file.type,
										Body: file.file
									}, (err, data) => {
										if (err) webix.message({
											text: err.message,
											type: "error"
										});
										else this._image();
									});
								//});
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
				url: value => {
					return !value || !/[\s;,?:@&=+$]/.test(value);
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