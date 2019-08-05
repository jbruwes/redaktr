import {
	JetView
} from "webix-jet";
export default class CdnView extends JetView {
	config() {
		return {
			id: "cdn",
			view: "datatable",
			select: "row",
			url: "//www.redaktr.com/" + AWS.config.credentials.identityId + ".cdn.json?" + webix.uid(),
			columns: [{
				id: "url",
				editor: "text",
				header: "JS path",
				fillspace: true
			}],
			editable: true,
			on: {
				onAfterLoad: _ => {
					$$("cdn").data.attachEvent("onStoreUpdated", _ => {
						if (this.app.lastXHRPostCdnJs) this.app.lastXHRPostCdnJs.abort();
						this.app.lastXHRPostCdnJs = this.app.S3.putObject({
							Bucket: 'redaktr',
							Key: AWS.config.credentials.identityId + '.cdn.json',
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
			}
		};
	}
}
/* global webix */
/* global AWS */
/* global $$ */