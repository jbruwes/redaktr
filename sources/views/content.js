import { JetView } from "webix-jet";
export default class ContentView extends JetView {
	config() {
		return {
			view: "accordion",
			cols: [{
				header: "Content",
				body: {
					type: "clean",
					rows: [{
							animate: false,
							keepViews: true,
							cells: [{ $subview: "contentViews.tinymce" }, { $subview: "contentViews.ace" }]
						},
						{ view: "tabbar", options: [{ value: "Visual", id: "tinymce" }, { value: "Source", id: "ace" }], multiview: "true", type: "bottom" }
					]
				}
			}, {
				collapsed: true,
				header: "Tree",
				body: {
					rows: [{ $subview: "contentViews.toolbar" }, { $subview: "contentViews.tree" }]
				}
			}]
		};
	}
}
