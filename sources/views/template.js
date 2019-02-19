import { JetView } from "webix-jet";

export default class TemplateView extends JetView {

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
            id: "templateAccordion",
            view: "accordion",
            cols: [{
                view: "accordionitem",
                header: "Content",
                body: {
                    rows: [{
                            id: "views",
                            animate: false,
                            keepViews: true,
                            cells: [{
                                    id: "fabric",
                                    view: "fabric",
                                    canvas: "fabric"
                                },
                                {
                                    id: "ace",
                                    view: "ace-editor",
                                    theme: "tomorrow",
                                    mode: "html"
                                }
                            ]
                        },
                        {
                            view: "tabbar",
                            id: "tabbar",
                            options: [
                                { value: "Visual", id: "fabric" },
                                { value: "Source", id: "ace" }
                            ],
                            multiview: "true",
                            type: "bottom"
                        }
                    ]
                }
            }, {
                view: "accordionitem",
                collapsed: true,
                header: "Layers",
                body: {
                    id: "accordionRight",
                    view: "accordion",
                    type: "line",
                    rows: [{
                        view: "accordionitem",
                        body: {
                            rows: [{ $subview: "contentViews.toolbar" }, {
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
                                data: film_set,

                            }]
                        }
                    }, {
                        view: "accordionitem",
                        header: "Geometry",
                        body: {
                            view: "form",
                            scroll: true,
                            elements: [

                                {
                                    rows: [
                                        { template: "Layout", type: "section" },
                                        //{ view: "switch", value: 1, label: "Responsive", onLabel: "On", offLabel: "Off", labelWidth: 100 },
                                        {
                                            view: "richselect",
                                            value: 1,
                                            options: [
                                                { id: 1, value: "Static", icon: "mdi mdi-monitor-cellphone-star" },
                                                { id: 2, value: "Fixed", icon: "mdi mdi-monitor" },
                                                { id: 3, value: "Website Relative", icon: "mdi mdi-monitor-multiple" },
                                                { id: 4, value: "Content Relative", icon: "mdi mdi-monitor-dashboard" }
                                            ]
                                        }, {
                                            view: "segmented",
                                            value: 1,
                                            options: [
                                                { id: 1, value: "Responsive" },
                                                { id: 2, value: "Fluid" }
                                            ]
                                        }
                                    ]
                                },

                                {
                                    rows: [
                                        { template: "Vertical", type: "section" },
                                        {
                                            view: "fieldset",
                                            label: "top",
                                            body: {
                                                cols: [
                                                    { view: "switch", value: 1, width: 60 },
                                                    { view: "text", type: "number" },
                                                    {
                                                        view: "segmented",
                                                        width: 70,
                                                        value: 1,
                                                        options: [
                                                            { id: 1, value: "px" },
                                                            { id: 2, value: "%" },
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            view: "fieldset",
                                            label: "height",
                                            body: {
                                                cols: [
                                                    { view: "switch", value: 1, width: 60 },
                                                    { view: "text", type: "number" },
                                                    {
                                                        view: "segmented",
                                                        width: 70,
                                                        value: 1,
                                                        options: [
                                                            { id: 1, value: "px" },
                                                            { id: 2, value: "%" },
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            view: "fieldset",
                                            label: "bottom",
                                            body: {
                                                cols: [
                                                    { view: "switch", value: 1, width: 60 },
                                                    { view: "text", type: "number" },
                                                    {
                                                        view: "segmented",
                                                        width: 70,
                                                        value: 1,
                                                        options: [
                                                            { id: 1, value: "px" },
                                                            { id: 2, value: "%" },
                                                        ]
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                },
                                {
                                    rows: [
                                        { template: "Horizontal", type: "section" },
                                        {
                                            view: "fieldset",
                                            label: "left",
                                            body: {
                                                cols: [
                                                    { view: "switch", value: 1, width: 60 },
                                                    { view: "text", type: "number" },
                                                    {
                                                        view: "segmented",
                                                        width: 70,
                                                        value: 1,
                                                        options: [
                                                            { id: 1, value: "px" },
                                                            { id: 2, value: "%" },
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            view: "fieldset",
                                            label: "width",
                                            body: {
                                                cols: [
                                                    { view: "switch", value: 1, width: 60 },
                                                    { view: "text", type: "number" },
                                                    {
                                                        view: "segmented",
                                                        width: 70,
                                                        value: 1,
                                                        options: [
                                                            { id: 1, value: "px" },
                                                            { id: 2, value: "%" },
                                                        ]
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            view: "fieldset",
                                            label: "right",
                                            body: {
                                                cols: [
                                                    { view: "switch", value: 1, width: 60 },
                                                    { view: "text", type: "number" },
                                                    {
                                                        view: "segmented",
                                                        width: 70,
                                                        value: 1,
                                                        options: [
                                                            { id: 1, value: "px" },
                                                            { id: 2, value: "%" },
                                                        ]
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                },
                                {
                                    rows: [
                                        { template: "Rotation", type: "section" },
                                        {
                                            view: "fieldset",
                                            label: "angle, °",
                                            body: { view: "text", type: "number" }
                                        },
                                    ]
                                }
                            ]
                        }
                    }, {
                        view: "accordionitem",
                        collapsed: true,
                        header: "Appearance"
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
            }]
        };
    }

    init() {}
}
/* global webix */
/* global AWS */
/* global $$ */
/* global $ */
