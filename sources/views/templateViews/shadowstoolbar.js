import { JetView } from "webix-jet";
export default class ShadowToolbarView extends JetView {
    config() {
        return {
            view: "toolbar",
            cols: [{
                    view: "icon",
                    icon: "mdi mdi-file-document-outline",
                    click: () => {}
                },
                {
                    view: "icon",
                    icon: "mdi mdi-delete-outline",
                    click: () => {}
                }, {
                    view: "icon",
                    icon: "mdi mdi-arrow-up-bold-box-outline",
                    click: () => {}
                }, {
                    view: "icon",
                    icon: "mdi mdi-arrow-down-bold-box-outline",
                    click: () => {}
                }, {}
            ]
        };
    }
}
/* global webix */
/* global $$ */
