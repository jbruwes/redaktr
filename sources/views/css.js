import { JetView } from "webix-jet";
export default class CssView extends JetView {
    config() {
        return {
            rows: [{
                    view: "ace-editor",
                    id: "ace-css",
                    theme: "tomorrow",
                    mode: "css",
                    cdn: "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.4"
                }
            ]
        };
    }
    init() {
        var cb = (text) => {
            $$("ace-css").getEditor(true).then(editor => {
                var session = editor.getSession();
                session.that = this;
                session.setUseWorker(false);
                session.setUseWrapMode(true);
                session.setValue(text, -1);
                session.on('change', this._aceChange, this);
                editor.resize();
            });
        };
        webix.ajax("https://base.redaktr.com/" + AWS.config.credentials.identityId + ".css", { error: (text, data, XmlHttpRequest) => cb(''), success: (text, data, XmlHttpRequest) => cb(text) });
    }
    _aceChange() {
        webix.message("CSS save complete");
    }
    //_saveAce(session){
    //    webix.message("CSS save complete");
    /*
		var that = e ? this.that.getParentView() : self;
		if (that.lastXHRPostContent) that.lastXHRPostContent.abort();
		that.lastXHRPostContent = that.app.S3.putObject({
			Bucket: 'content.redaktr.com',
			ContentType: 'text/html',
			Key: AWS.config.credentials.identityId + "/" + $$("tree").getSelectedId() + ".htm",
			Body: $$("tinymce").getValue()
		}, (err, data) => {
			if (err) { if (err.code !== "RequestAbortedError") webix.message({ text: err.message, type: "error" }) }
			else webix.message("Content save complete");
		});
		*/
    //}
}
/* global webix */
/* global AWS */
/* global $$ */
