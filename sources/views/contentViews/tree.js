import { JetView } from "webix-jet";
export default class TreeView extends JetView {
    config() {
        return {
            view: "edittree",
            id: "tree",
            select: true,
            activeTitle: true,
            template: "{common.icon()} {common.checkbox()} {common.folder()} #value#",
            checkboxRefresh: true,
            editable: true,
            editor: "popup",
            editValue: "value",
            editaction: "dblclick",
            url: "https://res.redaktr.com/" + AWS.config.credentials.identityId + ".json"
        };
    }
    init(view, url) {
        var S3 = new AWS.S3({ apiVersion: '2006-03-01', correctClockSkew: true });
        var lastXHRGetContent = null;
        var lastXHRPostTree = null;
        this.app.attachEvent("onBeforeAjax", (mode, url, params, xhr) => {
            if (mode === 'GET' && !url.indexOf('https://content.redaktr.com')) {
                lastXHRGetContent = xhr;
            }
        });
        var onChangeFnc = (id) => {
            webix.delay(() => {
                if (lastXHRPostTree) { lastXHRPostTree.abort(); }
                lastXHRPostTree = S3.putObject({
                        Bucket: 'res.redaktr.com',
                        Key: AWS.config.credentials.identityId + '.json',
                        ContentType: 'application/json',
                        Body: webix.ajax().stringify($$("tree").data.serialize())
                    },
                    (err, data) => {
                        if (err) { if (err.code !== "RequestAbortedError") webix.message({ text: err.message, type: "error" }) }
                        else webix.message("Tree save complete");
                    }
                );
            });
        };
        var onSelectFnc = (id) => {
            if (lastXHRGetContent) { lastXHRGetContent.abort(); }
            var tinymce = $$("tinymce").getEditor();
            tinymce.setProgressState(1);
            webix.ajax("https://content.redaktr.com/" + AWS.config.credentials.identityId + "/" + id + ".htm", {
                success: (text, data, XmlHttpRequest) => {
                    tinymce.setProgressState(0);
                    tinymce.getWin().scrollTo(0, 0);
                    tinymce.setContent(text);
                    //tinymce.focus();
                    tinymce.undoManager.clear();
                    tinymce.nodeChanged();
                    $$("ace").getEditor(true).then(function(editor) {
                        editor.getSession().setValue(text, -1);
                    });
                },
                error: (text, data, XmlHttpRequest) => {
                    tinymce.setProgressState(0);
                    tinymce.getWin().scrollTo(0, 0);
                    tinymce.setContent('');
                    //tinymce.focus();
                    tinymce.undoManager.clear();
                    tinymce.nodeChanged();
                    $$("ace").getEditor().getSession().setValue("");
                }
            });
        };
        view.attachEvent("onAfterLoad", () => { view.select(view.getFirstId()) });
        view.data.attachEvent("onAfterAdd", onChangeFnc);
        view.data.attachEvent("onAfterDelete", onChangeFnc);
        view.data.attachEvent("onDataUpdate", onChangeFnc);
        view.data.attachEvent("onDataMove", onChangeFnc);
        view.attachEvent("onItemCheck", onChangeFnc);
        view.attachEvent("onAfterSelect", onSelectFnc);
    }
    destroy() {
        this.app.detachEvent("onBeforeAjax");
    }
}

/* global webix */
/* global AWS */
/* global $$ */
