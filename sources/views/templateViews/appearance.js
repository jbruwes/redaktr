import { JetView } from "webix-jet";
export default class AppearanceView extends JetView {
    config() {
        return {
            view: "form",
            scroll: true,
            elements: [{
                    rows: [
                        { template: "Padding", type: "section" },
                        { view: "text", type: "number", label: "<span class='mdi mdi-dark mdi-24px mdi-pan-left'></span>", labelWidth: 33 },
                        { view: "text", type: "number", label: "<span class='mdi mdi-dark mdi-24px mdi-pan-right'></span>", labelWidth: 33 },
                        { view: "text", type: "number", label: "<span class='mdi mdi-dark mdi-24px mdi-pan-up'></span>", labelWidth: 33 },
                        { view: "text", type: "number", label: "<span class='mdi mdi-dark mdi-24px mdi-pan-down'></span>", labelWidth: 33 },
                    ]
                },
                {
                    rows: [
                        { template: "Border", type: "section" },
                        {
                            rows: [{
                                    view: "richselect",
                                    value: 1,
                                    options: [
                                        { "id": 1, "value": "none" },
                                        { "id": 2, "value": "solid" },
                                        { "id": 3, "value": "dotted" },
                                        { "id": 4, "value": "dashed" },
                                        { "id": 5, "value": "double" },
                                        { "id": 6, "value": "groove" },
                                        { "id": 7, "value": "ridge" },
                                        { "id": 8, "value": "inset" },
                                        { "id": 9, "value": "outset" }
                                    ],
                                    label: "<span class='mdi mdi-dark mdi-24px mdi-border-left-variant'></span>",
                                    labelWidth: 33
                                },
                                { view: "colorpicker", value: "#000000", label: "<span class='mdi mdi-dark mdi-24px mdi-palette'></span>", labelWidth: 33 },
                                { view: "text", type: "number", label: "<span class='mdi mdi-dark mdi-24px mdi-pan-horizontal'></span>", labelWidth: 33 }
                            ]
                        },
                        { height: 8 },
                        {
                            rows: [{
                                    view: "richselect",
                                    value: 1,
                                    options: [
                                        { "id": 1, "value": "none" },
                                        { "id": 2, "value": "solid" },
                                        { "id": 3, "value": "dotted" },
                                        { "id": 4, "value": "dashed" },
                                        { "id": 5, "value": "double" },
                                        { "id": 6, "value": "groove" },
                                        { "id": 7, "value": "ridge" },
                                        { "id": 8, "value": "inset" },
                                        { "id": 9, "value": "outset" }
                                    ],
                                    label: "<span class='mdi mdi-dark mdi-24px mdi-border-right-variant'></span>",
                                    labelWidth: 33
                                },
                                { view: "colorpicker", value: "#000000", label: "<span class='mdi mdi-dark mdi-24px mdi-palette'></span>", labelWidth: 33 },
                                { view: "text", type: "number", label: "<span class='mdi mdi-dark mdi-24px mdi-pan-horizontal'></span>", labelWidth: 33 }
                            ]
                        },
                        { height: 8 },
                        {
                            rows: [{
                                    view: "richselect",
                                    value: 1,
                                    options: [
                                        { "id": 1, "value": "none" },
                                        { "id": 2, "value": "solid" },
                                        { "id": 3, "value": "dotted" },
                                        { "id": 4, "value": "dashed" },
                                        { "id": 5, "value": "double" },
                                        { "id": 6, "value": "groove" },
                                        { "id": 7, "value": "ridge" },
                                        { "id": 8, "value": "inset" },
                                        { "id": 9, "value": "outset" }
                                    ],
                                    label: "<span class='mdi mdi-dark mdi-24px mdi-border-top-variant'></span>",
                                    labelWidth: 33
                                },
                                { view: "colorpicker", value: "#000000", label: "<span class='mdi mdi-dark mdi-24px mdi-palette'></span>", labelWidth: 33 },
                                { view: "text", type: "number", label: "<span class='mdi mdi-dark mdi-24px mdi-pan-horizontal'></span>", labelWidth: 33 }
                            ]
                        },
                        { height: 8 },
                        {
                            rows: [{
                                    view: "richselect",
                                    value: 1,
                                    options: [
                                        { "id": 1, "value": "none" },
                                        { "id": 2, "value": "solid" },
                                        { "id": 3, "value": "dotted" },
                                        { "id": 4, "value": "dashed" },
                                        { "id": 5, "value": "double" },
                                        { "id": 6, "value": "groove" },
                                        { "id": 7, "value": "ridge" },
                                        { "id": 8, "value": "inset" },
                                        { "id": 9, "value": "outset" }
                                    ],
                                    label: "<span class='mdi mdi-dark mdi-24px mdi-border-bottom-variant'></span>",
                                    labelWidth: 33
                                },
                                { view: "colorpicker", value: "#000000", label: "<span class='mdi mdi-dark mdi-24px mdi-palette'></span>", labelWidth: 33 },
                                { view: "text", type: "number", label: "<span class='mdi mdi-dark mdi-24px mdi-pan-horizontal'></span>", labelWidth: 33 }
                            ]
                        },
                    ]
                },
                {
                    rows: [
                        { template: "Corner Radius", type: "section" },
                        { view: "text", type: "number", label: "<span class='mdi mdi-dark mdi-24px mdi-pan-top-left'></span>", labelWidth: 33 },
                        { view: "text", type: "number", label: "<span class='mdi mdi-dark mdi-24px mdi-pan-top-right'></span>", labelWidth: 33 },
                        { view: "text", type: "number", label: "<span class='mdi mdi-dark mdi-24px mdi-pan-bottom-left'></span>", labelWidth: 33 },
                        { view: "text", type: "number", label: "<span class='mdi mdi-dark mdi-24px mdi-pan-bottom-right'></span>", labelWidth: 33 },
                    ]
                },
                {
                    rows: [
                        { template: "Text", type: "section" },
                        { view: "colorpicker", value: "#000000", label: "<span class='mdi mdi-dark mdi-24px mdi-palette'></span>", labelWidth: 33 }
                    ]
                },
                {
                    rows: [
                        { template: "Background", type: "section" },
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
                        { template: "Transparensy", type: "section" },
                        { view: "slider", value: "0", min: 0, max: 100, label: '<span class="mdi mdi-dark mdi-24px mdi-opacity"></span>', labelWidth: 33, title: webix.template("#value#") }
                    ]
                }, {}

            ]
        };
    }
}
/* global webix */
