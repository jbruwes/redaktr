import { JetView } from "webix-jet";
export default class CdnView extends JetView {
    config() {
        return {
            id:"cdn",
            view: "datatable",
            select: "row",
            columns: [
                { id: "csspath", editor: "text", header: "CSS path", fillspace: true }
            ],
            editable: true
            //,on: { "data->onStoreUpdated": _ => this.getParentView()._redraw(this.getParentView()) }
        };
    }
}
