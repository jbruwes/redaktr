import {
	JetView
} from "webix-jet";
export default class AceView extends JetView {
	config() {
		return {
			view: "ace-editor",
			id: "ace-css",
			theme: "tomorrow",
			mode: "css",
			cdn: "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.5"
		};
	}
	init(ace) {
		var cb = (text) => {
			if ($$('sidebar').getSelectedId() === 'css') {
				$$("ace-css").getEditor(true).then(editor => {
					var session = editor.getSession();
					session.that = this;
					session.setUseWrapMode(true);
					session.setValue(text, -1);
					session.on('change', this._aceChange, this);
					editor.resize();
				});
			}
		};
		this.app.S3.getObject({
			Bucket: 'redaktr',
			Key: AWS.config.credentials.identityId + '.css'
		}, (err, data) => {
			if (err) cb('');
			else cb(data.Body.toString());
		});
		/*
		webix.ajax("//www.redaktr.com/" + AWS.config.credentials.identityId + ".css?" + webix.uid(), {
			error: (text, data, XmlHttpRequest) => cb(''),
			success: (text, data, XmlHttpRequest) => cb(text)
		});
		*/
	}
	_aceChange(e, session) {
		var that = session.that;
		if (that.app.lastXHRPostAce) that.app.lastXHRPostAce.abort();
		that.app.lastXHRPostAce = that.app.S3.putObject({
			Bucket: 'redaktr',
			ContentType: 'text/css',
			Key: AWS.config.credentials.identityId + ".css",
			Body: $$('ace-css').getEditor().getValue()
		}, (err, data) => {
			if (err) {
				if (err.code !== "RequestAbortedError") webix.message({
					text: err.message,
					type: "error"
				})
			} else webix.message("CSS save complete");
		});
	}
}
/* global webix */
/* global AWS */
/* global $$ */