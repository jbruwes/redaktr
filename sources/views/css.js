import { JetView } from "webix-jet";
export default class CssView extends JetView {
    config() {
        return {
            rows: [{
                    id: "views",
                    animate: false,
                    keepViews: true,
                    cells: [{ $subview: "cssViews.ace"}, {id: "cdn-css",  rows: [{ $subview: "cssViews.cdntoolbar" }, { $subview: "cssViews.cdn" }] }]
                },
                {
                    view: "tabbar",
                    id: "tabbar",
                    options: [
                        { value: "CSS", id: "ace-css", icon: "mdi mdi-language-css3" },
                        { value: "External", id: "cdn-css", icon: "mdi mdi-folder-network-outline" }
                    ],
                    multiview: "true",
                    type: "bottom"
                }
            ]
        };
    }
}
