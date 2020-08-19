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
			cdn: "//unpkg.com/ace-builds/src-min"
		};
	}
	init(ace) {
		var cb = (text) => {
			if ($$('sidebar').getSelectedId() === 'js') {
				$$('ace-js').getEditor(true).then(editor => {
					var session = editor.getSession();
					this.timeoutId = [];
					session.that = this;
					session.setUseWrapMode(true);
					session.setValue(text.replace(/^function redaktr\(\){try{/, '').replace(/}catch\(e\){}}$/, ''), -1);
					session.on('change', this._aceChange, this);
					editor.resize();
				});
			}
		};
		this.app.S3.getObject({
			Bucket: 'redaktr',
			Key: this.app.identityId + '.js'
		}, (err, data) => {
			if (err) cb('');
			else cb(data.Body.toString());
		});
	}
	_aceChange(e, session) {
		session.that.timeoutId.push(webix.delay(function() {
			this.timeoutId.pop();
			if (!this.timeoutId.length) {
				if (this.app.lastXHRPostDocAce) this.app.lastXHRPostDocAce.abort();
				this.app.lastXHRPostDocAce = this.app.S3.putObject({
					Bucket: 'redaktr',
					ContentType: 'application/javascript',
					Key: this.app.identityId + ".js",
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
		}, session.that, [], 1000));
	}
}
/* global webix */
/* global AWS */
/* global $$ */