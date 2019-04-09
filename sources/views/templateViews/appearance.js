import { JetView } from "webix-jet";
export default class AppearanceView extends JetView {
    config() {
        return {
            view: "form",
            scroll: true,
            elements: [{
                    rows: [
                        { template: "Padding", type: "section", css: "webix_section" },
                        {
                            view: "text",
                            id: "paddingLeft",
                            type: "number",
                            label: "<span class='mdi mdi-dark mdi-24px mdi-pan-left'></span>",
                            labelWidth: 33,
                            on: { onChange: _ => this.getParentView()._redraw(this.getParentView()) }
                        },
                        {
                            view: "text",
                            id: "paddingRight",
                            type: "number",
                            label: "<span class='mdi mdi-dark mdi-24px mdi-pan-right'></span>",
                            labelWidth: 33,
                            on: { onChange: _ => this.getParentView()._redraw(this.getParentView()) }
                        },
                        {
                            view: "text",
                            id: "paddingTop",
                            type: "number",
                            label: "<span class='mdi mdi-dark mdi-24px mdi-pan-up'></span>",
                            labelWidth: 33,
                            on: { onChange: _ => this.getParentView()._redraw(this.getParentView()) }
                        },
                        {
                            view: "text",
                            id: "paddingBottom",
                            type: "number",
                            label: "<span class='mdi mdi-dark mdi-24px mdi-pan-down'></span>",
                            labelWidth: 33,
                            on: { onChange: _ => this.getParentView()._redraw(this.getParentView()) }
                        },
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
                                    labelWidth: 33,
                                    on: { onChange: _ => this.getParentView()._redraw(this.getParentView()) }
                                },
                                {
                                    view: "colorpicker",
                                    id: "borderLeftColor",
                                    value: "#000000",
                                    label: "<span class='mdi mdi-dark mdi-24px mdi-palette'></span>",
                                    labelWidth: 33,
                                    editable: true,
                                    on: { onChange: _ => this.getParentView()._redraw(this.getParentView()) }
                                },
                                {
                                    view: "text",
                                    id: "borderLeftWidth",
                                    type: "number",
                                    label: "<span class='mdi mdi-dark mdi-24px mdi-pan-horizontal'></span>",
                                    labelWidth: 33,
                                    on: { onChange: _ => this.getParentView()._redraw(this.getParentView()) }
                                }
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
                                    labelWidth: 33,
                                    on: { onChange: _ => this.getParentView()._redraw(this.getParentView()) }
                                },
                                {
                                    view: "colorpicker",
                                    id: "borderRightColor",
                                    value: "#000000",
                                    label: "<span class='mdi mdi-dark mdi-24px mdi-palette'></span>",
                                    labelWidth: 33,
                                    editable: true,
                                    on: { onChange: _ => this.getParentView()._redraw(this.getParentView()) }
                                },
                                {
                                    view: "text",
                                    id: "borderRightWidth",
                                    type: "number",
                                    label: "<span class='mdi mdi-dark mdi-24px mdi-pan-horizontal'></span>",
                                    labelWidth: 33,
                                    on: { onChange: _ => this.getParentView()._redraw(this.getParentView()) }
                                }
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
                                    labelWidth: 33,
                                    on: { onChange: _ => this.getParentView()._redraw(this.getParentView()) }
                                },
                                {
                                    view: "colorpicker",
                                    id: "borderTopColor",
                                    value: "#000000",
                                    label: "<span class='mdi mdi-dark mdi-24px mdi-palette'></span>",
                                    labelWidth: 33,
                                    editable: true,
                                    on: { onChange: _ => this.getParentView()._redraw(this.getParentView()) }
                                },
                                {
                                    view: "text",
                                    id: "borderTopWidth",
                                    type: "number",
                                    label: "<span class='mdi mdi-dark mdi-24px mdi-pan-horizontal'></span>",
                                    labelWidth: 33,
                                    on: { onChange: _ => this.getParentView()._redraw(this.getParentView()) }
                                }
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
                                    labelWidth: 33,
                                    on: { onChange: _ => this.getParentView()._redraw(this.getParentView()) }
                                },
                                {
                                    view: "colorpicker",
                                    id: "borderBottomColor",
                                    value: "#000000",
                                    label: "<span class='mdi mdi-dark mdi-24px mdi-palette'></span>",
                                    labelWidth: 33,
                                    editable: true,
                                    on: { onChange: _ => this.getParentView()._redraw(this.getParentView()) }
                                },
                                {
                                    view: "text",
                                    id: "borderBottomWidth",
                                    type: "number",
                                    label: "<span class='mdi mdi-dark mdi-24px mdi-pan-horizontal'></span>",
                                    labelWidth: 33,
                                    on: { onChange: _ => this.getParentView()._redraw(this.getParentView()) }
                                }
                            ]
                        },
                    ]
                },
                {
                    rows: [
                        { template: "Corner Radius", type: "section", css: "webix_section" },
                        {
                            view: "text",
                            id: "borderTopLeftRadius",
                            type: "number",
                            label: "<span class='mdi mdi-dark mdi-24px mdi-pan-top-left'></span>",
                            labelWidth: 33,
                            on: { onChange: _ => this.getParentView()._redraw(this.getParentView()) }
                        },
                        {
                            view: "text",
                            id: "borderTopRightRadius",
                            type: "number",
                            label: "<span class='mdi mdi-dark mdi-24px mdi-pan-top-right'></span>",
                            labelWidth: 33,
                            on: { onChange: _ => this.getParentView()._redraw(this.getParentView()) }
                        },
                        {
                            view: "text",
                            id: "borderBottomLeftRadius",
                            type: "number",
                            label: "<span class='mdi mdi-dark mdi-24px mdi-pan-bottom-left'></span>",
                            labelWidth: 33,
                            on: { onChange: _ => this.getParentView()._redraw(this.getParentView()) }
                        },
                        {
                            view: "text",
                            id: "borderBottomRightRadius",
                            type: "number",
                            label: "<span class='mdi mdi-dark mdi-24px mdi-pan-bottom-right'></span>",
                            labelWidth: 33,
                            on: { onChange: _ => this.getParentView()._redraw(this.getParentView()) }
                        },
                    ]
                },
                {
                    rows: [
                        { template: "Text", type: "section", css: "webix_section" },
                        {
                            view: "colorpicker",
                            id: "textColor",
                            value: "#000000",
                            label: "<span class='mdi mdi-dark mdi-24px mdi-palette'></span>",
                            labelWidth: 33,
                            editable: true,
                            on: { onChange: _ => this.getParentView()._redraw(this.getParentView()) }
                        }
                    ]
                },
                {
                    rows: [
                        { template: "Background", type: "section", css: "webix_section" },
                        {
                            rows: [{
                                    view: "uploader",
                                    id: "uploader",
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
                                    cols: [{
                                            view: "toggle",
                                            id: "repeatX",
                                            label: "repeatX",
                                            on: { onChange: _ => this.getParentView()._redraw(this.getParentView()) }
                                        },
                                        {
                                            view: "toggle",
                                            id: "repeatY",
                                            label: "repeatY",
                                            on: { onChange: _ => this.getParentView()._redraw(this.getParentView()) }
                                        },
                                        {
                                            view: "toggle",
                                            id: "fixed",
                                            label: "fixed",
                                            on: { onChange: _ => this.getParentView()._redraw(this.getParentView()) }
                                        }
                                    ]
                                }, {
                                    view: "colorpicker",
                                    id: "backgroundColor",
                                    value: "#000000",
                                    label: "<span class='mdi mdi-dark mdi-24px mdi-palette'></span>",
                                    labelWidth: 33,
                                    editable: true,
                                    on: { onChange: _ => this.getParentView()._redraw(this.getParentView()) }
                                },
                                {
                                    cols: [{
                                            view: "text",
                                            id: "backgroundPositionH",
                                            type: "number",
                                            label: "<span class='mdi mdi-dark mdi-24px mdi-pan-horizontal'></span>",
                                            labelWidth: 33,
                                            on: { onChange: _ => this.getParentView()._redraw(this.getParentView()) }
                                        },
                                        {
                                            view: "segmented",
                                            id: "pbackgroundPositionH",
                                            width: 70,
                                            value: "px",
                                            options: [{ id: "px", value: "px" }, { id: "%", value: "%" }],
                                            on: { onChange: _ => this.getParentView()._redraw(this.getParentView()) }
                                        }
                                    ]
                                },
                                {
                                    cols: [{
                                            view: "text",
                                            id: "backgroundPositionV",
                                            type: "number",
                                            label: "<span class='mdi mdi-dark mdi-24px mdi-pan-vertical'></span>",
                                            labelWidth: 33,
                                            on: { onChange: _ => this.getParentView()._redraw(this.getParentView()) }
                                        },
                                        {
                                            view: "segmented",
                                            id: "pbackgroundPositionV",
                                            width: 70,
                                            value: "px",
                                            options: [{ id: "px", value: "px" }, { id: "%", value: "%" }],
                                            on: { onChange: _ => this.getParentView()._redraw(this.getParentView()) }
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
                        {
                            view: "slider",
                            id: "transparency",
                            value: "0",
                            min: 0,
                            max: 100,
                            label: '<span class="mdi mdi-dark mdi-24px mdi-opacity"></span>',
                            labelWidth: 33,
                            title: webix.template("#value#"),
                            on: { onChange: _ => this.getParentView()._redraw(this.getParentView()) }
                        }
                    ]
                }, {}

            ]
        };
    }
}
/* global webix */
