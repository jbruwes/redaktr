import { JetView } from "webix-jet";
export default class ContentView extends JetView {
	config() {

		var guid = function() {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = Math.random() * 16 | 0,
					v = c == 'x' ? r : r & 0x3 | 0x8;
				return v.toString(16);
			});
		};

		return {
			view: "accordion",
			cols: [{
				header: "Content",
				body: {
					type: "clean",
					rows: [{
							animate: false,
							keepViews: true,
							cells: [{
								id: "Visual",
								view: "tinymce-editor",
								value: '<h2>Text editor</h2> <div><small>From Wikipedia, the free encyclopedia</small></div> <p>A <strong>text editor</strong> is a type of program used for editing plain text files </p>'
							}, {
								id: "Source",
								view: "ace-editor",
								theme: "xcode",
								mode: "html",
								value: '<h2>Text editor</h2> <div><small>From Wikipedia, the free encyclopedia</small></div> <p>A <strong>text editor</strong> is a type of program used for editing plain text files </p>'
							}]
						},
						{ view: "tabbar", options: ["Visual", "Source"], multiview: "true", type: "bottom" }
					]
				}
			}, {
				collapsed: true,
				header: "Tree",
				body: {
					rows: [{
							view: "toolbar",
							cols: [{
									view: "button",
									value: "Add new row",
									click: () => {
										$$("tree").select($$("tree").add({ checked: true, value: "New film" }, null, $$("tree").getSelectedId() || 0));
									}
								},
								{
									view: "button",
									value: "Remove selected row",
									click: () => {
										var sel = $$("tree").getSelectedId(true);
										if (!sel) return;
										for (var i = 0; i < sel.length; i++)
											$$("tree").remove(sel[i]);
									}
								}, {}
							]
						},
						{
							view: "edittree",
							id: "tree",
							select: true,
							activeTitle: true,
							template: "{common.icon()} {common.checkbox()} {common.folder()} #value#",
							checkboxRefresh: true,
							editable: true,
							editor: "text",
							editValue: "value",
							editaction: "dblclick",
							//drag:"order",
							url: "https://api.redaktr.com/index",
							save: {
								url: "https://api.redaktr.com/index",
								updateFromResponse: false
							}
						}
					]
				}
			}]
		};
	}
}
