import { JetView } from "webix-jet";
export default class ShadowView extends JetView {
    config() {
        var tpl="<span style='background:#value#; border-radius:4px;'>&nbsp</span> #value#";
        return {
            view: "datatable",
            columns: [
                { id: "x", editor: "text", header: "<span class='mdi mdi-pencil'></span> offset X", css: "rank", fillspace: true},
                { id: "y", editor: "text", header: "<span class='mdi mdi-pencil'></span> offset Y", fillspace: true },
                { id: "blur", editor: "text", header: "<span class='mdi mdi-pencil'></span> blur radius", fillspace: true },
                { id: "spread", editor: "text", header: "<span class='mdi mdi-pencil'></span> spread radius", fillspace: true },
                { id: "inset", editor: "checkbox", header: "<span class='mdi mdi-pencil'></span> inset", fillspace: true, template:"{common.checkbox()}" },
                { id: "color", editor: "color", header: "<span class='mdi mdi-pencil'></span> color", fillspace: true, template:tpl}
            ],
            editable: true,
            data: [
                { x: 1, y: "The Shawshank Redemption", blur: 1994, spread: 678790, inset: true, color: 1 },
                { x: 2, y: "The Godfather", blur: 1972, spread: 511495, inset: false, color: 2 }
            ]
        };
    }
}
/* global webix */
/* global AWS */
/* global $$ */
/* global $ */
