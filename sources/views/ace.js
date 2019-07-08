import {
	JetView
} from "webix-jet";
export default class AceView extends JetView {
	config() {
		return {
			view: "ace-editor",
			theme: "tomorrow",
			mode: "html",
			cdn: "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.5"
		};
	}
	init(ace) {
		ace.getEditor(true).then(editor => {
			var session = editor.getSession();
			session.that = this;
			//session.setUseWorker(false);
			session.on("changeAnnotation", function() {
				var annotations = session.getAnnotations() || [],
					len = annotations.length,
					i = len;
						while (i--)
							if (/doctype first\. Expected/.test(annotations[i].text)) annotations.splice(i, 1);
						if (len > annotations.length) session.setAnnotations(annotations);
			});
			session.setUseWrapMode(true);
		});
	}
	_aceChange(e, session) {
		var that = session.that.getParentView();
		$$("tinymce").$scope.setValue('<!DOCTYPE html><html><head>' + session.that.header + '</head><body>' + session.that.getRoot().getEditor().getValue() + '</body></html>');
		that._save(null, that);
	}
	setValue(text) {
		this.getRoot().getEditor(true).then((editor) => {
			var html = text;
			this.header = '';
			if (html.match(/<html[^>]*>[\s\S]*<\/html>/gi)) {
				this.header = html.match(/<head[^>]*>[\s\S]*<\/head>/gi);
				this.header = this.header ? this.header[0].replace(/^<head>/, '').replace(/<\/head>$/, '') : '';
				html = html.match(/<body[^>]*>[\s\S]*<\/body>/gi);
				html = html ? html[0].replace(/^<body>/, '').replace(/<\/body>$/, '').trim() : '';
			}
			var session = editor.getSession();
			session.off('change', this._aceChange, this);
			session.setValue(html, -1);
			session.on('change', this._aceChange, this);
			editor.resize();
		});
	}
}
/* global $$ */