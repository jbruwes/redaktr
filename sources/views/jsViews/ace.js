import {
	JetView
} from "webix-jet";
export default class AceView extends JetView {
	config() {
		return {
			view: "ace-editor",
			id: "ace-js",
			theme: "tomorrow",
			mode: "javascript",
			cdn: "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.5"
		};
	}
	init(ace) {
		var cb = (text) => {
			if ($$('sidebar').getSelectedId() === 'js') {
				$$('ace-js').getEditor(true).then(editor => {
					var session = editor.getSession();
					session.that = this;
					session.setUseWrapMode(true);
					session.setValue(text.replace(/^function redaktr\(\){try{/, '').replace(/}catch\(e\){}}$/, ''), -1);
					session.on('change', this._aceChange, this);
					editor.resize();
				});
			}
		};
		webix.ajax("//www.redaktr.com/" + AWS.config.credentials.identityId + ".js?" + webix.uid(), {
			error: (text, data, XmlHttpRequest) => cb(''),
			success: (text, data, XmlHttpRequest) => cb(text)
		});
	}
	_aceChange(e, session) {
		var that = session.that;
		if (that.app.lastXHRPostDocAce) that.app.lastXHRPostDocAce.abort();
		that.app.lastXHRPostDocAce = that.app.S3.putObject({
			Bucket: 'base.redaktr.com',
			ContentType: 'application/javascript',
			Key: AWS.config.credentials.identityId + ".js",
			Body: 'function redaktr(){try{' + $$('ace-js').getEditor().getValue() + '}catch(e){}}'
		}, (err, data) => {
			if (err) {
				if (err.code !== "RequestAbortedError") webix.message({
					text: err.message,
					type: "error"
				})
			} else webix.message("JS save complete");
		});
	}
}
/* global webix */
/* global AWS */
/* global $$ */