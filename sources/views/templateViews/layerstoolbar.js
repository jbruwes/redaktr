import { JetView } from "webix-jet";
export default class LayersToolbarView extends JetView {
    config() {
        return {
            view: "toolbar",
            cols: [{
                    view: "icon",
                    icon: "mdi mdi-file-document-outline",
                    click: () => {
                        var id = webix.uid();
                        $$("layers").add({
                            id: id,
                            title: "",
                            markCheckbox: true,
                            icon: 'mdi mdi-monitor-lock',
                            rect: new fabric.Rect({
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
                            })
                        });
                        $$("layers").select(id);
                        $$("layers").edit(id);
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
/* global webix */
/* global $$ */
