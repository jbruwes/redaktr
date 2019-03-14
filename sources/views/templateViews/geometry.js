import { JetView } from "webix-jet";
export default class GeometryView extends JetView {
    config() {
        return {
            view: "form",
            scroll: true,
            elements: [{
                    rows: [
                        { template: "Layout", type: "section" },
                        {
                            view: "richselect",
                            value: 1,
                            options: [
                                { id: 1, value: "Static", icon: "mdi mdi-monitor-star" },
                                { id: 2, value: "Fixed", icon: "mdi mdi-monitor-lock" },
                                { id: 3, value: "Website Relative", icon: "mdi mdi-monitor-multiple" },
                                { id: 4, value: "Content Relative", icon: "mdi mdi-monitor-dashboard" }
                            ]
                        }, {
                            view: "segmented",
                            value: 1,
                            options: [{ id: 1, value: "Responsive" }, { id: 2, value: "Fluid" }]
                        }
                    ]
                },
                {
                    rows: [
                        { template: "Vertical", type: "section" },
                        {
                            cols: [
                                { view: "text", type: "number", label: "<span class='mdi mdi-dark mdi-24px mdi-pan-up'></span>", labelWidth: 33 },
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
                        },
                        {
                            cols: [
                                { view: "text", type: "number", label: "<span class='mdi mdi-dark mdi-24px mdi-pan-down'></span>", labelWidth: 33 },
                                {
                                    view: "segmented",
                                    width: 70,
                                    value: 1,
                                    options: [{ id: 1, value: "px" }, { id: 2, value: "%" }]
                                }
                            ]
                        }
                    ]
                },
                {
                    rows: [
                        { template: "Horizontal", type: "section" },
                        {
                            cols: [
                                { view: "text", type: "number", label: "<span class='mdi mdi-dark mdi-24px mdi-pan-left'></span>", labelWidth: 33 },
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
                                { view: "text", type: "number", label: "<span class='mdi mdi-dark mdi-24px mdi-pan-right'></span>", labelWidth: 33 },
                                {
                                    view: "segmented",
                                    width: 70,
                                    value: 1,
                                    options: [{ id: 1, value: "px" }, { id: 2, value: "%" }]
                                }
                            ]
                        }
                    ]
                },
                { rows: [{ template: "Rotation", type: "section" }, { view: "text", type: "number", label: "<span class='mdi mdi-dark mdi-24px mdi-screen-rotation'></span>", labelWidth: 33 }] }, {}
            ]
        };
    }
}
