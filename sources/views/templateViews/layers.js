import { JetView } from "webix-jet";
export default class LayersView extends JetView {
    config() {
        return {
            view: "editlist",
            id: "layers",
            select: "row",
            editable: true,
            editaction: "dblclick",
            editor: "text",
            editValue: "title",
            type: {
                markCheckbox: function(obj) {
                    return "<span class='check mdi mdi-18px mdi-checkbox-" + (obj.markCheckbox ? "marked-" : "blank-") + "outline'></span>";
                }
            },
            onClick: {
                "check": function(e, id) {
                    var item = this.getItem(id);
                    item.markCheckbox = item.markCheckbox ? 0 : 1;
                    this.updateItem(id, item);
                }
            },
            template: "<span class='mdi mdi-18px mdi-#icon#'></span> #title#{common.markCheckbox()}",
            on: { onSelectChange: _ => this.getParentView()._makeSelection(this.getParentView()) }
        };
    }
}
