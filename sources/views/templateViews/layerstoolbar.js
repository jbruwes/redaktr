import { JetView } from "webix-jet";
export default class LayersToolbarView extends JetView {
    config() {
        return {
            view: "toolbar",
            cols: [{
                    view: "icon",
                    icon: "mdi mdi-file-document-outline",
                    click: _ => {
                        var id = "layer-" + webix.uid(),
                            that = this.getParentView(),
                            fabricDocument = $($$("fabric").getIframe()).contents(),
                            rect = new fabric.Rect({
                                hasControls: true,
                                hasBorders: true,
                                opacity: 0,
                                borderColor: 'rgba(102,153,255,1)',
                                cornerColor: 'rgba(102,153,255,1)',
                                cornerStyle: 'circle',
                                originX: 'center',
                                originY: 'center',
                                lockScalingFlip: true,
                                id: id
                            });
                        $$("layers").add({
                            id: id,
                            title: id,
                            markCheckbox: true,
                            icon: 'mdi mdi-monitor-lock',
                            rect: rect
                        });
                        that._body.find("#body:first>.pusher").append($('<div data-fixed><div id="' + id + '" style=margin-left:0;margin-right:0;margin-top:0;height:100px;"></div></div>'));
                        that._zIndex(that._body, '#', that);
                        fabricDocument.find("body:first>.pusher").append($('<div data-fixed><div id="' + id + '" style="margin-left:0;margin-right:0;margin-top:0;height:100px;"></div></div>'));
                        that._zIndex(fabricDocument, '', that);
                        $$("fabric").getCanvas().add(rect);
                        $$("layers").select(id);
                        $$("layers").edit(id);
                    }
                },
                {
                    view: "icon",
                    icon: "mdi mdi-pencil",
                    click: _ => {
                        var id = $$("layers").getSelectedId();
                        if (id) $$("layers").edit(id);
                    }
                }, {
                    view: "icon",
                    icon: "mdi mdi-delete-outline",
                    click: _ => {
                        var id = $$("layers").getSelectedId(),
                            rect = $$("layers").getSelectedItem().rect,
                            that = this.getParentView(),
                            fabricDocument = $($$("fabric").getIframe()).contents();
                        if (id) {
                            if (id === 'content') webix.message("Delete is prohibited", "debug");
                            else {
                                var newId = $$("layers").getPrevId(id);
                                if (!newId) newId = $$("layers").getNextId(id);
                                that._body.find("#" + id).remove();
                                that._body.find('#body:first>.pusher>div:not([data-relative]):not([id]):empty,#body:first>.pusher>div[data-relative]:not(:first):not([id]):empty').remove();
                                that._zIndex(that._body, '#', that);
                                fabricDocument.find("#" + id).remove();
                                fabricDocument.find('body:first>.pusher>div:not([id]):empty').remove();
                                that._zIndex(fabricDocument, '', that);
                                if (newId) $$("layers").select(newId);
                                $$("fabric").getCanvas().remove(rect);
                                $$("layers").remove(id);
                            }
                        }
                    }
                }, {
                    view: "icon",
                    icon: "mdi mdi-arrow-up-bold-box-outline",
                    click: _ => {
                        var id = $$("layers").getSelectedId();
                        if (id) $$("layers").moveUp(id);
                    }
                }, {
                    view: "icon",
                    icon: "mdi mdi-arrow-down-bold-box-outline",
                    click: _ => {
                        var id = $$("layers").getSelectedId();
                        if (id) $$("layers").moveDown(id);
                    }
                }, {}
            ]
        };
    }
}
/* global fabric */
/* global webix */
/* global $$ */
/* global $ */
