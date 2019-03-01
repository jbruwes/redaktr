import { JetView } from "webix-jet";
export default class LayersView extends JetView {
    config() {

        var film_set = [
            { id: 1, title: "The Shawshank Redemption", year: 1994, rank: 1, markCheckbox: 1, icon: "desktop-mac" },
            { id: 2, title: "The Godfather", year: 1972, rank: 2, markCheckbox: 0, icon: "desktop-mac" },
            { id: 3, title: "The Godfather: Part II", year: 1974, rank: 3, icon: "desktop-mac" },
            { id: 4, title: "The Good, the Bad and the Ugly", year: 1966, rank: 4, markCheckbox: 1, icon: "desktop-mac" },
            { id: 5, title: "My Fair Lady", year: 1964, rank: 5, markCheckbox: 1, icon: "desktop-mac" },
            { id: 6, title: "12 Angry Men", year: 1957, rank: 6, markCheckbox: 0, icon: "desktop-mac" }
        ];


        return {
            view: "list",
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
            data: film_set
        };
    }
}
/* global webix */
/* global $$ */
