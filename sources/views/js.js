import { JetView } from "webix-jet";
export default class JsView extends JetView {
    config() {
        return {
            rows: [{
                    id: "views",
                    animate: false,
                    keepViews: true,
                    cells: [{ $subview: "jsViews.ace"}, {id: "cdn-js",  rows: [{ $subview: "jsViews.cdntoolbar" }, { $subview: "jsViews.cdn" }] }]
                },
                {
                    view: "tabbar",
                    id: "tabbar",
                    options: [
                        { value: "JS", id: "ace-js", icon: "mdi mdi-language-javascript" },
                        { value: "External", id: "cdn-js", icon: "mdi mdi-folder-network-outline" }
                    ],
                    multiview: "true",
                    type: "bottom"
                }
            ]
        };
    }
}
