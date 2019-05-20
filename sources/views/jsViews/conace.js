import { JetView } from "webix-jet";
export default class AceView extends JetView {
	config() {
		return {
			view: "ace-editor",
			id:"con-js",
			theme: "tomorrow",
			mode: "js",
			cdn: "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.4"
		};
	}
	init(ace) {
		var cb = (text) => {
			if ($$('sidebar').getSelectedId() === 'js') {
				$$('con-js').getEditor(true).then(editor => {
					var session = editor.getSession();
					session.that = this;
					session.setUseWorker(false);
					session.setUseWrapMode(true);
					session.setValue(text, -1);
					session.on('change', this._aceChange, this);
					editor.resize();
				});
			}
		};
		webix.ajax("https://base.redaktr.com/" + AWS.config.credentials.identityId + ".redaktr.js", { error: (text, data, XmlHttpRequest) => cb(''), success: (text, data, XmlHttpRequest) => cb(text) });
	}
	_aceChange(e, session) {
		var that = session.that;
		if (that.lastXHRPost) that.lastXHRPost.abort();
		that.lastXHRPost = that.app.S3.putObject({
			Bucket: 'base.redaktr.com',
			ContentType: 'application/javascript',
			Key: AWS.config.credentials.identityId + "redaktr.js",
			Body: $$('doc-js').getEditor().getValue()
		}, (err, data) => {
			if (err) { if (err.code !== "RequestAbortedError") webix.message({ text: err.message, type: "error" }) }
			else webix.message("Content ready JS save complete");
		});
	}
}
/* global webix */
/* global AWS */
/* global $$ */
