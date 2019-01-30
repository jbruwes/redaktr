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
            url: "https://assets.redaktr.com/" + AWS.config.credentials.identityId + ".json"
        };
    }
    init(view, url) {
        var S3 = new AWS.S3({ apiVersion: '2006-03-01', correctClockSkew: true });
        var lastXHRGetContent = null;
        var lastXHRPostTree = null;
        this.app.attachEvent("onBeforeAjax", function(mode, url, params, xhr) {
            if (mode === 'GET' && !url.indexOf('https://content.redaktr.com')) {
                lastXHRGetContent = xhr;
            }
        });
        var onChangeFnc = function(id) {
            webix.delay(() => {
                if (lastXHRPostTree) { lastXHRPostTree.abort(); }
                lastXHRPostTree = S3.putObject({
                        Bucket: 'assets.redaktr.com',
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
        var onSelectFnc = function(id) {
            if (lastXHRGetContent) { lastXHRGetContent.abort(); }
            var content = $$("tinymce").getEditor();
            content.setProgressState(1);
            webix.ajax("https://content.redaktr.com/" + AWS.config.credentials.identityId + "/" + id + ".htm", {
                success: function(text, data, XmlHttpRequest) {
                    content.setProgressState(0);
                    content.getWin().scrollTo(0, 0);
                    content.setContent(text);
                    content.focus();
                    content.undoManager.clear();
                    content.nodeChanged();
                },
                error: function(text, data, XmlHttpRequest) {
                    content.setProgressState(0);
                    content.getWin().scrollTo(0, 0);
                    content.setContent('');
                    content.focus();
                    content.undoManager.clear();
                    content.nodeChanged();
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
