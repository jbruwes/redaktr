import { JetView } from "webix-jet";
export default class JsView extends JetView {
    config() {
        return {
            rows: [{
                    id: "views",
                    animate: false,
                    keepViews: true,
                    cells: [{ $subview: "jsViews.docace"}, { $subview: "jsViews.conace"}, {id: "cdn-js",  rows: [{ $subview: "jsViews.cdntoolbar" }, { $subview: "jsViews.cdn" }] }]
                },
                {
                    view: "tabbar",
                    id: "tabbar",
                    options: [
                        { value: "Ready", id: "doc-js", icon: "mdi mdi-file" },
                        { value: "State", id: "con-js", icon: "mdi mdi-file-multiple" },
                        { value: "External", id: "cdn-js", icon: "mdi mdi-folder-network-outline" }
                    ],
                    multiview: "true",
                    type: "bottom"
                }
            ]
        };
    }
}
