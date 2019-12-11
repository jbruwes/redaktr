import $ from "jquery/dist/jquery.slim";
import {
  JetView
} from "webix-jet";
export default class LayersToolbarView extends JetView {
  config() {
    return {
      view: "toolbar",
      cols: [{
          view: "icon",
          icon: "mdi mdi-file-document-outline",
          click: _ => {
            var id = webix.uid().toString(),
              that = this.getParentView(),
              fabricDocument = $($$("fabric").getIframe()).contents();
            this._undo();
            that._body.find("#body:first>.pusher").append($('<div data-fixed><div id="' + "layer-" + id + '" style=margin-left:0;margin-right:0;margin-top:0;height:100px;"></div></div>'));
            that._zIndex(that._body, '#', that);
            fabricDocument.find("body:first>.pusher").append($('<div data-fixed><div id="' + "layer-" + id + '" style="margin-left:0;margin-right:0;margin-top:0;height:100px;"></div></div>'));
            that._zIndex(fabricDocument, '', that);
            $$("layers").add({
              id: id,
              value: "layer-" + id,
              markCheckbox: true,
              icon: 'mdi mdi-monitor-lock'
            });
            var rect = new fabric.Rect({
              hasControls: true,
              hasBorders: true,
              opacity: 0,
              borderColor: 'rgba(102,153,255,1)',
              cornerColor: 'rgba(102,153,255,1)',
              cornerStyle: 'circle',
              originX: 'center',
              originY: 'center',
              lockScalingFlip: true
            });
            rect.toObject = (function(toObject) {
              return function() {
                return fabric.util.object.extend(toObject.call(this), {
                  id: this.id
                });
              };
            })(rect.toObject);
            $$("fabric").getCanvas().add(rect);
            rect.id = id;
            $$("layers").select(id);
            $$("layers").edit(id);
          }
        },
        {
          view: "icon",
          icon: "mdi mdi-pencil",
          click: _ => {
            var id = $$("layers").getSelectedId();
            if (id) {
              this._undo();
              $$("layers").edit(id);
            }
          }
        }, {
          view: "icon",
          icon: "mdi mdi-delete-outline",
          click: _ => {
            var item = $$("layers").getSelectedItem(),
              that = this.getParentView(),
              fabricDocument = $($$("fabric").getIframe()).contents();
            if (item) {
              if (item.value === 'content') webix.message("Delete is prohibited", "debug");
              else {
                this._undo();
                var newId = $$("layers").getPrevId(item.id);
                if (!newId) newId = $$("layers").getNextId(item.id);
                that._body.find("#" + item.value).remove();
                that._body.find('#body:first>.pusher>div:not([id]):empty').remove();
                that._zIndex(that._body, '#', that);
                fabricDocument.find("#" + item.value).remove();
                fabricDocument.find('body:first>.pusher>div:not([id]):empty').remove();
                that._zIndex(fabricDocument, '', that);
                if (newId) $$("layers").select(newId);
                $$('fabric').getCanvas().forEachObject(obj => {
                  if (obj.id && obj.id === item.id) $$("fabric").getCanvas().remove(obj)
                });
                $$("layers").remove(item.id);
              }
            }
          }
        }, {
          view: "icon",
          icon: "mdi mdi-arrow-up-bold-box-outline",
          click: _ => {
            var id = $$("layers").getSelectedId();
            if (id) {
              this._undo();
              $$("layers").moveUp(id);
            }
          }
        }, {
          view: "icon",
          icon: "mdi mdi-arrow-down-bold-box-outline",
          click: _ => {
            var id = $$("layers").getSelectedId();
            if (id) {
              this._undo();
              $$("layers").moveDown(id);
            }
          }
        }, {}
      ]
    };
  }
  _undo() {
    var that = this.getParentView(),
      fabricDocument = $($$("fabric").getIframe()).contents();
    that._redo = [];
    that._undo.push([
      that._body.find('#body:first>.pusher').html(),
      fabricDocument.find('body:first>.pusher').html(),
      webix.ajax().stringify($$('fabric').getCanvas()),
      $$("layers").serialize(),
      $$("layers").getSelectedId()
    ]);
  }
}
/* global fabric */
/* global webix */
/* global $$ */
/* global $ */