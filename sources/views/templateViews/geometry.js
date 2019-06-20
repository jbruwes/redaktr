import {
  JetView
} from "webix-jet";
export default class GeometryView extends JetView {
  config() {
    return {
      view: "form",
      scroll: true,
      elements: [{
          rows: [{
              template: "Layout",
              type: "section",
              css: "webix_section"
            },
            {
              view: "richselect",
              value: 1,
              id: "mode",
              options: [{
                  id: 3,
                  value: "Static",
                  icon: "mdi mdi-monitor-star"
                },
                {
                  id: 2,
                  value: "Fixed",
                  icon: "mdi mdi-monitor-lock"
                },
                {
                  id: 1,
                  value: "Absolute",
                  icon: "mdi mdi-monitor-dashboard"
                }
              ],
              on: {
                onChange: id => {
                  var item = $$("layers").getSelectedItem();
                  item.icon = $$("mode").getList().getItem(id).icon;
                  $$("layers").updateItem($$("layers").getSelectedId(), item);
                  this.getParentView()._redraw(this.getParentView());
                }
              }
            }, {
              view: "segmented",
              id: "dock",
              value: 1,
              options: [{
                id: 1,
                value: "Responsive"
              }, {
                id: 2,
                value: "Fluid"
              }],
              on: {
                onChange: _ => this.getParentView()._redraw(this.getParentView())
              }
            }
          ]
        },
        {
          rows: [{
              template: "Vertical",
              type: "section",
              css: "webix_section"
            },
            {
              cols: [{
                  view: "text",
                  id: "marginTop",
                  type: "number",
                  label: "<span class='mdi mdi-dark mdi-24px mdi-pan-up'></span>",
                  labelWidth: 33,
                  on: {
                    onChange: _ => this.getParentView()._redraw(this.getParentView())
                  }
                },
                {
                  view: "segmented",
                  id: "pmarginTop",
                  width: 70,
                  value: "px",
                  options: [{
                    id: "px",
                    value: "px"
                  }, {
                    id: "%",
                    value: "%"
                  }],
                  on: {
                    onChange: _ => this.getParentView()._redraw(this.getParentView())
                  }
                }
              ]
            },
            {
              cols: [{
                  view: "text",
                  id: "height",
                  type: "number",
                  label: "<span class='mdi mdi-dark mdi-24px mdi-pan-vertical'></span>",
                  labelWidth: 33,
                  on: {
                    onChange: _ => this.getParentView()._redraw(this.getParentView())
                  }
                },
                {
                  view: "segmented",
                  id: "pheight",
                  width: 70,
                  value: "px",
                  options: [{
                    id: "px",
                    value: "px"
                  }, {
                    id: "%",
                    value: "%"
                  }],
                  on: {
                    onChange: _ => this.getParentView()._redraw(this.getParentView())
                  }
                }
              ]
            },
            {
              cols: [{
                  view: "text",
                  id: "marginBottom",
                  type: "number",
                  label: "<span class='mdi mdi-dark mdi-24px mdi-pan-down'></span>",
                  labelWidth: 33,
                  on: {
                    onChange: _ => this.getParentView()._redraw(this.getParentView())
                  }
                },
                {
                  view: "segmented",
                  id: "pmarginBottom",
                  width: 70,
                  value: "px",
                  options: [{
                    id: "px",
                    value: "px"
                  }, {
                    id: "%",
                    value: "%"
                  }],
                  on: {
                    onChange: _ => this.getParentView()._redraw(this.getParentView())
                  }
                }
              ]
            }
          ]
        },
        {
          rows: [{
              template: "Horizontal",
              type: "section",
              css: "webix_section"
            },
            {
              cols: [{
                  view: "text",
                  id: "marginLeft",
                  type: "number",
                  label: "<span class='mdi mdi-dark mdi-24px mdi-pan-left'></span>",
                  labelWidth: 33,
                  on: {
                    onChange: _ => this.getParentView()._redraw(this.getParentView())
                  }
                },
                {
                  view: "segmented",
                  id: "pmarginLeft",
                  width: 70,
                  value: "px",
                  options: [{
                    id: "px",
                    value: "px"
                  }, {
                    id: "%",
                    value: "%"
                  }],
                  on: {
                    onChange: _ => this.getParentView()._redraw(this.getParentView())
                  }
                }
              ]
            },
            {
              cols: [{
                  view: "text",
                  id: "width",
                  type: "number",
                  label: "<span class='mdi mdi-dark mdi-24px mdi-pan-horizontal'></span>",
                  labelWidth: 33,
                  on: {
                    onChange: _ => this.getParentView()._redraw(this.getParentView())
                  }
                },
                {
                  view: "segmented",
                  id: "pwidth",
                  width: 70,
                  value: "px",
                  options: [{
                    id: "px",
                    value: "px"
                  }, {
                    id: "%",
                    value: "%"
                  }],
                  on: {
                    onChange: _ => this.getParentView()._redraw(this.getParentView())
                  }
                }
              ]
            },
            {
              cols: [{
                  view: "text",
                  id: "marginRight",
                  type: "number",
                  label: "<span class='mdi mdi-dark mdi-24px mdi-pan-right'></span>",
                  labelWidth: 33,
                  on: {
                    onChange: _ => this.getParentView()._redraw(this.getParentView())
                  }
                },
                {
                  view: "segmented",
                  id: "pmarginRight",
                  width: 70,
                  value: "px",
                  options: [{
                    id: "px",
                    value: "px"
                  }, {
                    id: "%",
                    value: "%"
                  }],
                  on: {
                    onChange: _ => this.getParentView()._redraw(this.getParentView())
                  }
                }
              ]
            }
          ]
        },
        {
          rows: [{
            template: "Rotation",
            type: "section",
            css: "webix_section"
          }, {
            view: "text",
            id: "angle",
            type: "number",
            label: "<span class='mdi mdi-dark mdi-24px mdi-screen-rotation'></span>",
            labelWidth: 33,
            on: {
              onChange: _ => this.getParentView()._redraw(this.getParentView())
            }
          }]
        }, {}
      ]
    };
  }
}