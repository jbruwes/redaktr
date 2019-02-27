import { JetView } from "webix-jet";
export default class AceView extends JetView {
    config() {
        return {
            id: "ace",
            view: "ace-editor",
            theme: "tomorrow",
            mode: "html",
            cdn: "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.3"
        };
    }
    init() {
        $$("ace").getEditor(true).then(editor => {
            editor.that = this;
            var session = editor.getSession();
            session.setUseWorker(false);
            session.setUseWrapMode(true);
        });
    }
	_aceChange() {
		$$("ace").getEditor(true).then(editor => {
			var that = editor.that.getParentView();
			$$("tinymce").setValue('<!DOCTYPE html><html><head>' + editor.that.header + '</head><body>' + $$("ace").getValue() + '</body></html>');
			that.save(null, that);
		});
	}
	setValue(text) {
		$$("ace").getEditor(true).then((editor) => {
			var	html = text;
			this.header = '';
			if (html.match(/<html[^>]*>[\s\S]*<\/html>/gi)) {
				this.header = html.match(/<head[^>]*>[\s\S]*<\/head>/gi);
				this.header = this.header ? this.header[0].replace(/^<head>/, '').replace(/<\/head>$/, '') : '';
				html = html.match(/<body[^>]*>[\s\S]*<\/body>/gi);
				html = html ? html[0].replace(/^<body>/, '').replace(/<\/body>$/, '').trim() : '';
			}
			var session = editor.getSession();
			session.off('change', this._aceChange);
			session.setValue(html, -1);
			session.on('change', this._aceChange);
			editor.resize();
		});
	}
}
/* global $$ */
