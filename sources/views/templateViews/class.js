import { JetView } from "webix-jet";
export default class ClassView extends JetView {
    config() {
        return {
            id:"class",
            view: "datatable",
            select: "row",
            columns: [
                { id: "class", editor: "text", header: "class", fillspace: true }
            ],
            editable: true,
            on: { "data->onStoreUpdated": _ => this.getParentView()._redraw(this.getParentView()) }
        };
    }
}
