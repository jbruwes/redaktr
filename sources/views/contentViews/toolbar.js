import {
  JetView
} from "webix-jet";
export default class ToolbarView extends JetView {
  config() {
    return {
      view: "toolbar",
      cols: [{
          view: "icon",
          icon: "mdi mdi-file-document-outline",
          click: _ => {
            var sel = $$("tree").getSelectedId(),
              item = null;
            if (sel) {
              var parent = $$("tree").getParentId(sel);
              if (!parent) parent = sel;
              item = $$("tree").add({
                url: '',
                description: '',
                title: '',
                icon: '',
                lastmod: '',
                date: new Date().toISOString(),
                keywords: '',
                image: '',
                priority: '',
                changefreq: '',
                visible: true,
                value: "article-" + webix.uid()
              }, parent === sel ? 0 : $$("tree").getBranchIndex(sel) + 1, parent);
              $$("tree").open(parent);
            } else item = $$("tree").add({
              url: '',
              description: '',
              title: '',
              lastmod: '',
              date: new Date().toISOString(),
              keywords: '',
              image: '',
              priority: '',
              changefreq: '',
              visible: true,
              value: "article-" + webix.uid()
            });
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
            var sel = $$("tree").getSelectedId(),
              sel2 = $$("tree").getNextSiblingId(sel) || $$("tree").getPrevSiblingId(sel) || $$("tree").getParentId(sel);
            if (sel2) webix.confirm("Are you sure?", result => {
              if (result) {
                $$("tree").remove(sel);
                $$("tree").select(sel2);
              }
            });
            else webix.message({
              text: "You can't delete the root of the tree",
              type: "error"
            });
          }
        }, {
          view: "icon",
          icon: "mdi mdi-arrow-up-bold-box-outline",
          click: _ => {
            var sel = $$("tree").getSelectedId();
            if ($$("tree").getPrevSiblingId(sel)) $$("tree").move(sel, $$("tree").getBranchIndex(sel) - 1, null, {
              parent: $$("tree").getParentId(sel)
            });
          }
        }, {
          view: "icon",
          icon: "mdi mdi-arrow-down-bold-box-outline",
          click: _ => {
            var sel = $$("tree").getSelectedId();
            if ($$("tree").getNextSiblingId(sel)) $$("tree").move(sel, $$("tree").getBranchIndex(sel) + 1, null, {
              parent: $$("tree").getParentId(sel)
            });
          }
        }, {
          view: "icon",
          icon: "mdi mdi-arrow-left-bold-box-outline",
          click: _ => {
            var sel = $$("tree").getSelectedId(),
              par = $$("tree").getParentId(sel);
            if (par) {
              var parent = $$("tree").getParentId(par);
              if (parent) $$("tree").move(sel, $$("tree").getBranchIndex(par) + 1, null, {
                parent: parent
              });
            }
          }
        }, {
          view: "icon",
          icon: "mdi mdi-arrow-right-bold-box-outline",
          click: _ => {
            var sel = $$("tree").getSelectedId(),
              sib = $$("tree").getPrevSiblingId(sel);
            if (sib) {
              $$("tree").move(sel, -1, null, {
                parent: sib
              });
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