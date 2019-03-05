import { JetView } from "webix-jet";
export default class ClassToolbarView extends JetView {
    config() {
        return {
            view: "toolbar",
            cols: [{
                view: "icon",
                icon: "mdi mdi-file-document-outline",
                click: () => {}
            }, {
                view: "icon",
                icon: "mdi mdi-delete-outline",
                click: () => {}
            }, {}]
        };
    }
}
/* global webix */
/* global $$ */
