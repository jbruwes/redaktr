import { JetView } from "webix-jet";
export default class JsView extends JetView {
    config() {
        return {
            rows: [{
                    id: "views",
                    animate: false,
                    keepViews: true,
                    cells: [{ $subview: "ace", id: "onsite" }, { $subview: "ace", id: "onpage" }]
                },
                {
                    view: "tabbar",
                    id: "tabbar",
                    options: [
                        { value: "On WebSite Load", id: "onsite", icon: "mdi mdi-file-multiple" },
                        { value: "On WebPage Load", id: "onpage", icon: "mdi mdi-file" }
                    ],
                    multiview: "true",
                    type: "bottom"
                }
            ]
        };
    }
}
