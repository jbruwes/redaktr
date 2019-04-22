import { JetView } from "webix-jet";
export default class TreeView extends JetView {
    config() {

        var lastXHRPostTree = null,
            //lastXHRGetContent = null,
            onChangeFnc = id => {
                webix.delay(() => {
                    if (lastXHRPostTree) { lastXHRPostTree.abort(); }
                    var tree = $$("tree").data.serialize(),
                        tinymce = $$("tinymce").getEditor(),
                        ace = $$("ace").getEditor();
                    if (!tree.length) {
                        $$("tinymce").$scope.setValue('');
                        tinymce.setMode('readonly');
                        ace.setValue("");
                        ace.setReadOnly(true);
                    }
                    else {
                        tinymce.setMode('design');
                        ace.setReadOnly(false);
                    }
                    lastXHRPostTree = this.app.S3.putObject({
                        Bucket: 'base.redaktr.com',
                        Key: AWS.config.credentials.identityId + '.json',
                        ContentType: 'application/json',
                        Body: webix.ajax().stringify(tree)
                    }, (err, data) => {
                        if (err) { if (err.code !== "RequestAbortedError") webix.message({ text: err.message, type: "error" }) }
                        else webix.message("Tree save complete");
                    });
                });
            };

        return {
            view: "edittree",
            id: "tree",
            select: true,
            activeTitle: true,
            template: "{common.icon()} {common.checkbox()} {common.folder()} #value#",
            checkboxRefresh: true,
            editable: true,
            onContext: {},
            editor: "text",
            editValue: "value",
            editaction: "dblclick",
            url: "https://base.redaktr.com/" + AWS.config.credentials.identityId + ".json",
            on: {
                "onAfterLoad": function() {
                    $$("tinymce").getEditor(true).then(editor => { this.select(this.getFirstId()) });
                },
                "data->onAfterAdd": onChangeFnc,
                "data->onAfterDelete": onChangeFnc,
                "data->onDataUpdate": onChangeFnc,
                "data->onDataMove": onChangeFnc,
                //"data->onStoreUpdated":onChangeFnc,
                "onItemCheck": onChangeFnc,
                "onAfterSelect": (id) => {
                    webix.ajax("https://content.redaktr.com/" + AWS.config.credentials.identityId + "/" + id + ".htm", {
                        success: (text, data, XmlHttpRequest) => {
                            try { $$("tinymce").$scope.setValue(text) }
                            catch (e) {}
                            try { $$("ace").$scope.setValue(text) }
                            catch (e) {}
                        },
                        error: (text, data, XmlHttpRequest) => {
                            try { $$("tinymce").$scope.setValue("") }
                            catch (e) {}
                            try { $$("ace").$scope.setValue("") }
                            catch (e) {}
                        }
                    });
                }
            }
        };
    }
    init() {
        //this.app.attachEvent("onBeforeAjax", (mode, url, params, xhr) => {
        //    if (mode === 'GET' && !url.indexOf('https://content.redaktr.com')) {
        //        this.lastXHRGetContent = xhr;
        //    }
        //});
    }
    destroy() {
        //this.app.detachEvent("onBeforeAjax");
    }
}
/* global webix */
/* global AWS */
/* global $$ */
