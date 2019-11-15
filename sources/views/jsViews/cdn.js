import {
	JetView
} from "webix-jet";
export default class CdnView extends JetView {
	config() {
		return {
			id: "cdn",
			view: "datatable",
			select: "row",
			columns: [{
				id: "url",
				editor: "text",
				header: "JS path",
				fillspace: true
			}],
			editable: true
		};
	}
	init() {
		this.app.S3.getObject({
			Bucket: 'redaktr',
			Key: this.app.identityId + '.cdn.json'
		}, (err, data) => {
			if (err) webix.message({
				text: err.message,
				type: "error"
			});
			else if ($$('sidebar').getSelectedId() === 'js') {
				$$("cdn").clearAll();
				$$("cdn").parse(data.Body.toString());
			}
			if ($$('sidebar').getSelectedId() === 'js') {
				$$("cdn").data.attachEvent("onStoreUpdated", _ => {
					if (this.app.lastXHRPostCdnJs) this.app.lastXHRPostCdnJs.abort();
					this.app.lastXHRPostCdnJs = this.app.S3.putObject({
						Bucket: 'redaktr',
						Key: this.app.identityId + '.cdn.json',
						ContentType: 'application/json',
						Body: webix.ajax().stringify($$('cdn').serialize())
					}, (err, data) => {
						if (err) {
							if (err.code !== "RequestAbortedError") webix.message({
								text: err.message,
								type: "error"
							})
						} else webix.message("JS cdn list save complete");
					});
				});
			}
		});
	}
}
/* global webix */
/* global AWS */
/* global $$ */