import { JetView } from "webix-jet";
export default class LayersView extends JetView {
    config() {
        return {
            view: "editlist",
            id: "layers",
            select: "row",
            editable: true,
            editaction: "dblclick",
            editor: "text",
            editValue: "title",
            type: {
                markCheckbox: function(obj) {
                    return "<span class='check mdi mdi-18px mdi-checkbox-" + (obj.markCheckbox ? "marked-" : "blank-") + "outline'></span>";
                }
            },
            onClick: {
                "check": (e, id) => {
                    var item = $$('layers').getItem(id),
                        item1 = this.getParentView()._body.find("#" + item.title),
                        item2 = $($$("fabric").getIframe()).contents().find("#" + item.title);
                    item.markCheckbox = item.markCheckbox ? 0 : 1;
                    $$('layers').updateItem(id, item);
                    if (item.markCheckbox) {
                        item1.removeAttr("hidden");
                        item2.removeAttr("hidden");
                        item1.parent("div:not([id])").removeAttr("hidden");
                        item2.parent("div:not([id])").removeAttr("hidden");
                    }
                    else {
                        item1.attr("hidden", "");
                        item2.attr("hidden", "");
                        item1.parent("div:not([id])").attr("hidden", "");
                        item2.parent("div:not([id])").attr("hidden", "");
                    }
                }
            },
            template: "<span class='mdi mdi-18px mdi-#icon#'></span> #title#{common.markCheckbox()}",
            on: {
                'onSelectChange': _ => this.getParentView()._makeSelection(this.getParentView(), true),
                'data->onStoreUpdated': _ => this.getParentView()._redraw(this.getParentView()),
                'onBeforeEditStop': (state, editor, ignore) => {
                    var that = this.getParentView(),
                        fabricDocument = $($$("fabric").getIframe()).contents();
                    if (!ignore) {
                        if (!/^[A-Za-z][-A-Za-z0-9_]+$/g.test(state.value)) {
                            webix.message("Prohibited symbols are used", "debug");
                            return false;
                        }
                        if (!state.value || ((state.old !== state.value) && that._body.find("#" + state.value).length !== 0)) {
                            webix.message(state.value ? "The id is already exists" : "The id is empty", "debug");
                            return false;
                        }
                        that._body.find("#" + state.old).attr('id', state.value);
                        that._zIndex(that._body, '#', that);
                        fabricDocument.find("#" + state.old).attr('id', state.value);
                        that._zIndex(fabricDocument, '', that);
                        $$('layers').getItem(state.old).rect.id = state.value;
                        $$('layers').data.changeId(state.old, state.value);
                    }
                    return true;
                },
                'onBeforeEditStart': id => {
                    if (id === 'content' || id === 'menu' || id === 'button') {
                        webix.message("Rename is prohibited", "debug");
                        return false;
                    }
                    else return true;
                }
            }
        };
    }
}
/* global webix */
/* global $$ */
/* global $ */
