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
                    header: "<span class='mdi mdi-wrench-outline'></span> Tools",
                    //maxWidth: 250,
                    body: {
                        id: "accordionRight",
                        view: "accordion",
                        type: "line",
                        rows: [{
                            view: "accordionitem",
                            header: "Layers",
                            body: {
                                rows: [{ $subview: "templateViews.layerstoolbar" }, { $subview: "templateViews.layers" }]
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
                            header: "Shadow",
                            body: { rows: [{ $subview: "templateViews.shadowstoolbar" }, { $subview: "templateViews.shadows" }] }
                        }, {
                            view: "accordionitem",
                            collapsed: true,
                            header: "Data",
                            body: { rows: [{ $subview: "templateViews.datatoolbar" }, { $subview: "templateViews.data" }] }
                        }, {
                            view: "accordionitem",
                            collapsed: true,
                            header: "Class",
                            body: { rows: [{ $subview: "templateViews.classtoolbar" }, { $subview: "templateViews.class" }] }
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
