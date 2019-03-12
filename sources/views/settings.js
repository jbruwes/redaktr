import { JetView } from "webix-jet";
export default class SettingsView extends JetView {
    config() {

        return {
            rows: [


                {
                    view: "form",
                    autoheight: false,
                    elements: [{
                            rows: [
                                { template: "Project name", type: "section" },
                                { view: "text", label: "<span class='mdi mdi-dark mdi-24px mdi-account-edit'></span>", labelWidth: 33 }
                            ]
                        },
                        {
                            rows: [
                                { template: "Domain", type: "section", css: "webix_section" },
                                { view: "text", label: "<span class='mdi mdi-dark mdi-24px mdi-web'></span>", labelWidth: 33 }
                            ]
                        },
                        {
                            rows: [
                                { template: "Constant URLs", type: "section", css: "webix_section" },
                                {
                                    rows: [{
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
                                        },
                                        {
                                            id: "hardlinks",
                                            view: "datatable",
                                            select: "row",
                                            columns: [
                                                { id: "hlink", editor: "text", header: "Custom URL", fillspace: true },
                                                { id: "hvalue", editor: "text", header: "Page URL", fillspace: true }
                                            ],
                                            editable: true,
                                            data: [
                                                { hlink: "/CPU", hvalue: "/микропроцессор/новый" },
                                                { hlink: "/news", hvalue: "/main/mews" }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    elementsConfig: { "labelAlign": "right" }
                }
            ]
        };
    }
    init() {
        $$("hardlinks").select($$("hardlinks").getFirstId());
    }
}
