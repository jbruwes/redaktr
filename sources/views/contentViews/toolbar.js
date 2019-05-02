import { JetView } from "webix-jet";
export default class ToolbarView extends JetView {
    config() {
        return {
            view: "toolbar",
            cols: [{
                    view: "icon",
                    icon: "mdi mdi-file-document-outline",
                    click: _ => {
                        var sel = $$("tree").getSelectedId();
                        var item = null;
                        if (sel) item = $$("tree").add({ checked: true, value: "article-" + webix.uid() }, $$("tree").getBranchIndex(sel) + 1, $$("tree").getParentId(sel) || 0);
                        else item = $$("tree").add({ checked: true, value: "article-" + webix.uid() });
                        $$("tree").select(item);
                        $$("tree").edit(item);
                    }
                },
                {
                    view: "icon",
                    icon: "mdi mdi-pencil",
                    click: _ => $$("tree").edit($$("tree").getSelectedId())
                }, {
                    view: "icon",
                    icon: "mdi mdi-delete-outline",
                    click: _ => {
                        var sel = $$("tree").getSelectedId();
                        var sel2 = $$("tree").getNextSiblingId(sel) || $$("tree").getPrevSiblingId(sel) || $$("tree").getParentId(sel);
                        webix.confirm("Are you sure?", result => {
                            if (result) {
                                $$("tree").remove(sel);
                                $$("tree").select(sel2);
                            }
                        });
                    }
                }, {
                    view: "icon",
                    icon: "mdi mdi-arrow-up-bold-box-outline",
                    click: _ => {
                        var sel = $$("tree").getSelectedId();
                        if ($$("tree").getPrevSiblingId(sel)) $$("tree").move(sel, $$("tree").getBranchIndex(sel) - 1, null, { parent: $$("tree").getParentId(sel) });
                    }
                }, {
                    view: "icon",
                    icon: "mdi mdi-arrow-down-bold-box-outline",
                    click: _ => {
                        var sel = $$("tree").getSelectedId();
                        if ($$("tree").getNextSiblingId(sel)) $$("tree").move(sel, $$("tree").getBranchIndex(sel) + 1, null, { parent: $$("tree").getParentId(sel) });
                    }
                }, {
                    view: "icon",
                    icon: "mdi mdi-arrow-left-bold-box-outline",
                    click: _ => {
                        var sel = $$("tree").getSelectedId(),
                            par = $$("tree").getParentId(sel);
                        if (par) $$("tree").move(sel, $$("tree").getBranchIndex(par) + 1, null, { parent: $$("tree").getParentId(par) });
                    }
                }, {
                    view: "icon",
                    icon: "mdi mdi-arrow-right-bold-box-outline",
                    click: _ => {
                        var sel = $$("tree").getSelectedId(),
                            sib = $$("tree").getPrevSiblingId(sel);
                        if (sib) {
                            $$("tree").move(sel, -1, null, { parent: sib });
                            $$("tree").open(sib);
                        }
                    }
                }, {}
            ]
        };
    }
}
/* global webix */
/* global $$ */
