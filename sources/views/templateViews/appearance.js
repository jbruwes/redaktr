import { JetView } from "webix-jet";
export default class AppearanceView extends JetView {
    config() {
        return {
            view: "form",
            scroll: true,
            elements: [{
                    rows: [
                        { template: "Padding", type: "section", css: "webix_section" },
                        { view: "text", id: "paddingLeft", type: "number", label: "<span class='mdi mdi-dark mdi-24px mdi-pan-left'></span>", labelWidth: 33 },
                        { view: "text", id: "paddingRight", type: "number", label: "<span class='mdi mdi-dark mdi-24px mdi-pan-right'></span>", labelWidth: 33 },
                        { view: "text", id: "paddingTop", type: "number", label: "<span class='mdi mdi-dark mdi-24px mdi-pan-up'></span>", labelWidth: 33 },
                        { view: "text", id: "paddingBottom", type: "number", label: "<span class='mdi mdi-dark mdi-24px mdi-pan-down'></span>", labelWidth: 33 },
                    ]
                },
                {
                    rows: [
                        { template: "Border", type: "section", css: "webix_section" },
                        {
                            rows: [{
                                    view: "richselect",
                                    value: "none",
                                    id: "borderLeftStyle",
                                    options: [
                                        { "id": "none", "value": "none" },
                                        { "id": "solid", "value": "solid" },
                                        { "id": "dotted", "value": "dotted" },
                                        { "id": "dashed", "value": "dashed" },
                                        { "id": "double", "value": "double" },
                                        { "id": "groove", "value": "groove" },
                                        { "id": "ridge", "value": "ridge" },
                                        { "id": "inset", "value": "inset" },
                                        { "id": "outset", "value": "outset" }
                                    ],
                                    label: "<span class='mdi mdi-dark mdi-24px mdi-border-left-variant'></span>",
                                    labelWidth: 33
                                },
                                { view: "colorpicker", id: "borderLeftColor", value: "#000000", label: "<span class='mdi mdi-dark mdi-24px mdi-palette'></span>", labelWidth: 33 },
                                { view: "text", id: "borderLeftWidth", type: "number", label: "<span class='mdi mdi-dark mdi-24px mdi-pan-horizontal'></span>", labelWidth: 33 }
                            ]
                        },
                        { height: 8 },
                        {
                            rows: [{
                                    view: "richselect",
                                    value: "none",
                                    id: "borderRightStyle",
                                    options: [
                                        { "id": "none", "value": "none" },
                                        { "id": "solid", "value": "solid" },
                                        { "id": "dotted", "value": "dotted" },
                                        { "id": "dashed", "value": "dashed" },
                                        { "id": "double", "value": "double" },
                                        { "id": "groove", "value": "groove" },
                                        { "id": "ridge", "value": "ridge" },
                                        { "id": "inset", "value": "inset" },
                                        { "id": "outset", "value": "outset" }
                                    ],
                                    label: "<span class='mdi mdi-dark mdi-24px mdi-border-right-variant'></span>",
                                    labelWidth: 33
                                },
                                { view: "colorpicker", id: "borderRightColor", value: "#000000", label: "<span class='mdi mdi-dark mdi-24px mdi-palette'></span>", labelWidth: 33 },
                                { view: "text", id: "borderRightWidth", type: "number", label: "<span class='mdi mdi-dark mdi-24px mdi-pan-horizontal'></span>", labelWidth: 33 }
                            ]
                        },
                        { height: 8 },
                        {
                            rows: [{
                                    view: "richselect",
                                    value: "none",
                                    id: "borderTopStyle",
                                    options: [
                                        { "id": "none", "value": "none" },
                                        { "id": "solid", "value": "solid" },
                                        { "id": "dotted", "value": "dotted" },
                                        { "id": "dashed", "value": "dashed" },
                                        { "id": "double", "value": "double" },
                                        { "id": "groove", "value": "groove" },
                                        { "id": "ridge", "value": "ridge" },
                                        { "id": "inset", "value": "inset" },
                                        { "id": "outset", "value": "outset" }
                                    ],
                                    label: "<span class='mdi mdi-dark mdi-24px mdi-border-top-variant'></span>",
                                    labelWidth: 33
                                },
                                { view: "colorpicker", id: "borderTopColor", value: "#000000", label: "<span class='mdi mdi-dark mdi-24px mdi-palette'></span>", labelWidth: 33 },
                                { view: "text", id: "borderTopWidth", type: "number", label: "<span class='mdi mdi-dark mdi-24px mdi-pan-horizontal'></span>", labelWidth: 33 }
                            ]
                        },
                        { height: 8 },
                        {
                            rows: [{
                                    view: "richselect",
                                    value: "none",
                                    id: "borderBottomStyle",
                                    options: [
                                        { "id": "none", "value": "none" },
                                        { "id": "solid", "value": "solid" },
                                        { "id": "dotted", "value": "dotted" },
                                        { "id": "dashed", "value": "dashed" },
                                        { "id": "double", "value": "double" },
                                        { "id": "groove", "value": "groove" },
                                        { "id": "ridge", "value": "ridge" },
                                        { "id": "inset", "value": "inset" },
                                        { "id": "outset", "value": "outset" }
                                    ],
                                    label: "<span class='mdi mdi-dark mdi-24px mdi-border-bottom-variant'></span>",
                                    labelWidth: 33
                                },
                                { view: "colorpicker", id: "borderBottomColor", value: "#000000", label: "<span class='mdi mdi-dark mdi-24px mdi-palette'></span>", labelWidth: 33 },
                                { view: "text", id: "borderBottomWidth", type: "number", label: "<span class='mdi mdi-dark mdi-24px mdi-pan-horizontal'></span>", labelWidth: 33 }
                            ]
                        },
                    ]
                },
                {
                    rows: [
                        { template: "Corner Radius", type: "section", css: "webix_section" },
                        { view: "text", type: "number", label: "<span class='mdi mdi-dark mdi-24px mdi-pan-top-left'></span>", labelWidth: 33 },
                        { view: "text", type: "number", label: "<span class='mdi mdi-dark mdi-24px mdi-pan-top-right'></span>", labelWidth: 33 },
                        { view: "text", type: "number", label: "<span class='mdi mdi-dark mdi-24px mdi-pan-bottom-left'></span>", labelWidth: 33 },
                        { view: "text", type: "number", label: "<span class='mdi mdi-dark mdi-24px mdi-pan-bottom-right'></span>", labelWidth: 33 },
                    ]
                },
                {
                    rows: [
                        { template: "Text", type: "section", css: "webix_section" },
                        { view: "colorpicker", value: "#000000", label: "<span class='mdi mdi-dark mdi-24px mdi-palette'></span>", labelWidth: 33 }
                    ]
                },
                {
                    rows: [
                        { template: "Background", type: "section", css: "webix_section" },
                        {
                            rows: [{
                                    view: "uploader",
                                    value: 'Upload Image',
                                    multiple: false,
                                    autosend: false,
                                    name: "files",
                                    link: "bglist",
                                    accept: "image/png, image/gif, image/jpeg"
                                },
                                {
                                    view: "list",
                                    id: "bglist",
                                    type: "uploader",
                                    autoheight: true,
                                    borderless: true
                                }, {
                                    cols: [
                                        { view: "toggle", label: "repeat X" },
                                        { view: "toggle", label: "repeat Y" },
                                        { view: "toggle", label: "fixed" }
                                    ]
                                }, { view: "colorpicker", value: "#000000", label: "<span class='mdi mdi-dark mdi-24px mdi-palette'></span>", labelWidth: 33 },
                                {
                                    cols: [
                                        { view: "text", type: "number", label: "<span class='mdi mdi-dark mdi-24px mdi-pan-horizontal'></span>", labelWidth: 33 },
                                        {
                                            view: "segmented",
                                            width: 70,
                                            value: 1,
                                            options: [{ id: 1, value: "px" }, { id: 2, value: "%" }]
                                        }
                                    ]
                                },
                                {
                                    cols: [
                                        { view: "text", type: "number", label: "<span class='mdi mdi-dark mdi-24px mdi-pan-vertical'></span>", labelWidth: 33 },
                                        {
                                            view: "segmented",
                                            width: 70,
                                            value: 1,
                                            options: [{ id: 1, value: "px" }, { id: 2, value: "%" }]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    rows: [
                        { template: "Transparensy", type: "section", css: "webix_section" },
                        { view: "slider", value: "0", min: 0, max: 100, label: '<span class="mdi mdi-dark mdi-24px mdi-opacity"></span>', labelWidth: 33, title: webix.template("#value#") }
                    ]
                }, {}

            ]
        };
    }
}
/* global webix */
