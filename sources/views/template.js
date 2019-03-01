import { JetView } from "webix-jet";
export default class TemplateView extends JetView {
    config() {
        return {
            id: "templateAccordion",
            view: "accordion",
            cols: [{
                    view: "accordionitem",
                    header: "Template",
                    body: {
                        rows: [{
                                id: "views",
                                animate: false,
                                keepViews: true,
                                cells: [{ id: "fabric", view: "fabric", canvas: "fabric" }, { $subview: "tinymce", id: "tinymce" }, { $subview: "ace", id: "ace" }]
                            },
                            {
                                view: "tabbar",
                                id: "tabbar",
                                options: [
                                    { value: "Layout", id: "fabric" },
                                    { value: "Visual", id: "tinymce" },
                                    { value: "Source", id: "ace" }
                                ],
                                multiview: "true",
                                type: "bottom" //,
                                //on: {
                                //    onChange: _ => {
                                //        if ($$("tabbar").getValue() === 'ace') {
                                //            $$("ace").$scope.setValue($$("tinymce").getValue());
                                //        }
                                //    }
                                //}
                            }
                        ]
                    }
                },
                {
                    view: "accordionitem",
                    collapsed: true,
                    header: "Tools",
                    //maxWidth: 250,
                    body: {
                        id: "accordionRight",
                        view: "accordion",
                        type: "line",
                        rows: [{
                            view: "accordionitem",
                            header: "Layers",
                            body: {
                                rows: [{ $subview: "templateViews.toolbar" }, { $subview: "templateViews.layers" }]
                            }
                        }, {
                            view: "accordionitem",
                            header: "Geometry",
                            collapsed: true,
                            body: { $subview: "templateViews.geometry" }
                        }, {
                            view: "accordionitem",
                            collapsed: true,
                            header: "Appearance",
                            body: { $subview: "templateViews.appearance" }
                        }, {
                            view: "accordionitem",
                            collapsed: true,
                            header: "Shadow"
                        }, {
                            view: "accordionitem",
                            collapsed: true,
                            header: "Data"
                        }, {
                            view: "accordionitem",
                            collapsed: true,
                            header: "Class"
                        }]
                    }
                }
            ]
        };
    }
    ready() {
        $('[view_id="tinymce"]').css("display", "none"); // хак: потому что у subview не выставляется display:none в tabbar
    }
}
/* global webix */
/* global AWS */
/* global $$ */
/* global $ */
