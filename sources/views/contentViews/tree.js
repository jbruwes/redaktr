import {
  JetView
} from "webix-jet";
export default class TreeView extends JetView {
  config() {
    var onChangeFnc = id => {
      var tree = $$("tree").data.serialize();
      webix.promise.all([
        $$("tinymce").getEditor(true),
        $$("ace-content").getEditor(true)
      ]).then(editors => {
        if (!tree.length) {
          $$("tinymce").$scope.setValue('');
          editors[0].setMode('readonly');
          editors[1].setValue("");
          editors[1].setReadOnly(true);
        } else {
          editors[0].setMode('design');
          editors[1].setReadOnly(false);
        }
      });
      if (this.app.lastXHRPostTree) this.app.lastXHRPostTree.abort();
      this.app.lastXHRPostTree = this.app.S3.putObject({
        Bucket: 'redaktr',
        Key: this.app.identityId + '.json',
        ContentType: 'application/json',
        Body: webix.ajax().stringify(tree)
      }, (err, data) => {
        if (err) {
          if (err.code !== "RequestAbortedError") webix.message({
            text: err.message,
            type: "error"
          })
        } else webix.message("Tree save complete");
      });
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
      on: {
        "onAfterLoad": _ => {
          if (!$$('sidebar').getSelectedId() || $$('sidebar').getSelectedId() === 'content') {
            $$('tree').data.attachEvent("onStoreUpdated", onChangeFnc);
            $$("tinymce").getEditor(true).then(tinymce => {
              var id = $$('tree').getFirstId();
              if (id) $$('tree').select(id);
              else {
                tinymce.setMode('readonly');
                $$("ace-content").getEditor(true).then(ace => ace.setReadOnly(true));
              }
            });
          }
        },
        "onItemCheck": onChangeFnc,
        "onAfterSelect": id => {
          var item = $$('tree').getItem(id);
          this.getParentView()._lockProperties = true;
          $$("contentItem").define("header", "<span class='mdi mdi-file-document-outline'></span> " + item.value);
          $$("contentItem").refresh();
          item.lastmod = new Date().toISOString();
          item.inserted = item.inserted ? item.inserted : item.lastmod;
          $$("tree").updateItem(id, item);
          $$('url').setValue(item.url);
          //$$('lastmod').setValue(item.lastmod ? item.lastmod : new Date());
          $$('changefreq').setValue(item.changefreq ? item.changefreq : 'always');
          $$('priority').setValue(item.priority ? Number(item.priority).toFixed(1) : "0.5");
          $$('description').setValue(item.description);
          $$('keywords').setValue(item.keywords);
          $$('title').setValue(item.title);
          $$('icon').setValue(item.icon);
          $$("uploader").files.data.clearAll();
          if (item.image) $$("uploader").addFile({
            name: item.image.split("/").pop(),
            sname: item.image
          }, 0);
          this.getParentView()._lockProperties = false;
          this.app.S3.getObject({
            Bucket: 'redaktr',
            Key: this.app.identityId + '/' + id + '.htm'
          }, (err, data) => {
            if (err) {
              if (err.code === 'AccessDenied' || err.code === 'NoSuchKey') {
                if (this.app.lastXHRPostContent) this.app.lastXHRPostContent.abort();
                this.app.lastXHRPostContent = this.app.S3.putObject({
                  Bucket: 'redaktr',
                  ContentType: 'text/html',
                  Key: this.app.identityId + "/" + id + ".htm",
                  Body: ''
                }, (err, data) => {
                  if (err) webix.message({
                    text: err.message,
                    type: "error"
                  });
                });
              }
              if ($$('sidebar').getSelectedId() === 'content') {
                $$("tinymce").$scope.setValue("");
                $$("ace-content").$scope.setValue("");
              }
            } else {
              if ($$('sidebar').getSelectedId() === 'content') {
                $$("tinymce").$scope.setValue(data.Body.toString());
                $$("ace-content").$scope.setValue(data.Body.toString());
              }
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
          $$("contentItem").define("header", "<span class='mdi mdi-file-document-outline'></span> " + state.value);
          $$("contentItem").refresh();
          return true;
        }
      }
    };
  }
  init() {
    this.app.S3.getObject({
      Bucket: 'redaktr',
      Key: this.app.identityId + '.json'
    }, (err, data) => {
      if (err) webix.message({
        text: err.message,
        type: "error"
      });
      else if (!$$('sidebar').getSelectedId() || $$('sidebar').getSelectedId() === 'content') {
        $$("tree").clearAll();
        $$("tree").parse(data.Body.toString());
      }
    });
  }
}
/* global webix */
/* global AWS */
/* global $$ */