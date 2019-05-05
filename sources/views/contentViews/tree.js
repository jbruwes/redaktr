import { JetView } from "webix-jet";
export default class TreeView extends JetView {
    config() {

        var lastXHRPostTree = null,
            //lastXHRGetContent = null,
            onChangeFnc = id => {
                //webix.delay(() => {
                var tree = $$("tree").data.serialize(),
                    tinymce = $$("tinymce").getEditor(),
                    ace = $$("ace").getEditor();
                if (tinymce && ace) {
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
                    if (lastXHRPostTree) lastXHRPostTree.abort();
                    lastXHRPostTree = this.app.S3.putObject({
                        Bucket: 'base.redaktr.com',
                        Key: AWS.config.credentials.identityId + '.json',
                        ContentType: 'application/json',
                        Body: webix.ajax().stringify(tree)
                    }, (err, data) => {
                        if (err) { if (err.code !== "RequestAbortedError") webix.message({ text: err.message, type: "error" }) }
                        else webix.message("Tree save complete");
                    });
                }
                //});
            };

        return {
            view: "edittree",
            id: "tree",
            select: true,
            activeTitle: true,
            type: {
                visible: function(obj) {
                    return "<span class='check mdi mdi-18px mdi-checkbox-" + (obj.visible ? "marked-" : "blank-") + "outline'></span>";
                }
            },
            onClick: {
                "check": function(e, id) {
                    var item = this.getItem(id);
                    item.visible = item.visible ? false : true;
                    this.updateItem(id, item);
                }
            },
            template: "{common.icon()} {common.visible()} {common.folder()} #value#",
            checkboxRefresh: true,
            editable: true,
            onContext: {},
            editor: "text",
            editValue: "value",
            editaction: "dblclick",
            url: "https://base.redaktr.com/" + AWS.config.credentials.identityId + ".json",
            on: {
                "onAfterLoad": _ => {
                    $$('tree').data.attachEvent("onStoreUpdated", onChangeFnc);
                    $$("tinymce").getEditor(true).then(editor => { $$('tree').select($$('tree').getFirstId()) });
                },
                "onItemCheck": onChangeFnc,
                "onAfterSelect": id => {
                    webix.ajax("https://content.redaktr.com/" + AWS.config.credentials.identityId + "/" + id + ".htm", {
                        success: (text, data, XmlHttpRequest) => {
                            //try { 
                            $$("tinymce").$scope.setValue(text);
                            //}
                            //catch (e) {}
                            //try { 
                            $$("ace").$scope.setValue(text);
                            //    }
                            //catch (e) {}
                        },
                        error: (text, data, XmlHttpRequest) => {
                            //try { 
                            $$("tinymce").$scope.setValue("");
                            //}
                            //catch (e) {}
                            //try {
                            $$("ace").$scope.setValue("");
                            //}
                            //catch (e) {}
                        }
                    });
                },
                'onBeforeEditStop': (state, editor, ignore) => {
                    if (!(ignore && state.old)) {
                        if (/[;,//?:@&=+$_]/.test(state.value)) {
                            webix.message("Prohibited symbols are used", "debug");
                            return false;
                        }
                        if (!state.value) {
                            webix.message("Can't be empty", "debug");
                            return false;
                        }
                    }
                    return true;
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
