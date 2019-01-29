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
            url: "https://api.redaktr.com/tree"
        };
    }
    init(view, url) {
        var lastXHRGetContent = null;
        var lastXHRPostTree = null;
        this.app.attachEvent("onBeforeAjax", function(mode, url, params, xhr) {
            if (mode === 'POST' && !url.indexOf('https://api.redaktr.com/tree')) {
                lastXHRPostTree = xhr;
            }
            if (mode === 'GET' && !url.indexOf('https://api.redaktr.com/content')) {
                lastXHRGetContent = xhr;
            }
        });
        var onChangeFnc = function(id) {
            webix.delay(() => {
                if (lastXHRPostTree) { lastXHRPostTree.abort(); }
                webix.ajax().post("https://api.redaktr.com/tree", JSON.stringify($$("tree").data.serialize(), function(key, value) {
                    if (typeof value === 'string' && !value.length) {
                        return undefined; // удаляем все строковые свойства
                    }
                    return value;
                }), function(text, xml, xhr) {
                    webix.message("Tree save complete");
                });
            });
        };
        var onSelectFnc = function(id) {
            if (lastXHRGetContent) { lastXHRGetContent.abort(); }
            var content = $$("tinymce").getEditor();
            content.setProgressState(1);
            webix.ajax("https://api.redaktr.com/content/" + id, {
                success: function(text, data, XmlHttpRequest) {
                    content.setProgressState(0);
                    content.getWin().scrollTo(0, 0);
                    content.setContent(text);
                    content.focus();
                    content.undoManager.clear();
                    content.nodeChanged();
                },
                error: function(text, data, XmlHttpRequest) {
                    webix.message(text);
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
