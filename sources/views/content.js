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
					view: "tree",
					select: true,
					data: [{
						id: "root",
						value: "Cars",
						open: true,
						data: [{
								id: "1",
								open: true,
								value: "Toyota",
								data: [
									{ id: "1.1", value: "Avalon" },
									{ id: "1.2", value: "Corolla" },
									{ id: "1.3", value: "Camry" }
								]
							},
							{
								id: "2",
								value: "Skoda",
								open: true,
								data: [
									{ id: "2.1", value: "Octavia" },
									{ id: "2.2", value: "Superb" }
								]
							}
						]
					}]
				}
			}]
		};
	}
}
