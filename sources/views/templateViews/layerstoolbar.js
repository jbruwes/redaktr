import { JetView } from "webix-jet";
export default class LayersToolbarView extends JetView {
    config() {
        return {
            view: "toolbar",
            cols: [{
                    view: "icon",
                    icon: "mdi mdi-file-document-outline",
                    click: () => {
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
                        that._body.find("#body").append($('<div data-fixed><div id="' + id + '" style=margin-left:0;margin-right:0;margin-top:0;height:100px;"></div></div>'));
                        that._zIndex(that._body, '#', that);
                        fabricDocument.find("body").append($('<div data-fixed><div id="' + id + '" style="margin-left:0;margin-right:0;margin-top:0;height:100px;"></div></div>'));
                        that._zIndex(fabricDocument, '', that);
                        $$("fabric").getCanvas().add(rect);

                        $$("layers").select(id);
                        $$("layers").edit(id);

                        /*   
					var selection = this._list.getSelection().getItem(0);
					var newNode = qx.data.marshal.Json.createModel({
						rect: null,
						title: id,
						visible: true,
						icon: 'redaktr/icon/037-file-empty.svg'
					});
					var rect = new fabric.Rect({
						opacity: 0,
						borderColor: 'rgba(102,153,255,1)',
						cornerColor: 'rgba(102,153,255,1)',
						cornerStyle: 'circle',
						originX: 'center',
						originY: 'center',
						lockScalingFlip: true,
						parentItem: newNode
					});
					newNode.setRect(rect);
					this._canvas.add(rect);
					this._model.insertAfter(selection, newNode);
					this._list.getSelection().push(newNode);
					this.zIndex();
                    */



                    }
                },
                {
                    view: "icon",
                    icon: "mdi mdi-pencil",
                    click: () => {
                        var id = $$("layers").getSelectedId();
                        if (id) $$("layers").edit(id);
                    }
                }, {
                    view: "icon",
                    icon: "mdi mdi-delete-outline",
                    click: () => {
                        var id = $$("layers").getSelectedId();
                        if (id) {
                            var newId = $$("layers").getPrevId(id);
                            if (!newId) newId = $$("layers").getNextId(id);
                            $$("layers").remove(id);
                            if (newId) $$("layers").select(newId);
                        }
                    }
                }, {
                    view: "icon",
                    icon: "mdi mdi-arrow-up-bold-box-outline",
                    click: () => {
                        var id = $$("layers").getSelectedId();
                        if (id) $$("layers").moveUp(id);
                    }
                }, {
                    view: "icon",
                    icon: "mdi mdi-arrow-down-bold-box-outline",
                    click: () => {
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
