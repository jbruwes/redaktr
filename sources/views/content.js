import {
	JetView
} from "webix-jet";
export default class ContentView extends JetView {
	config() {
		return {
			id: "accordion",
			view: "accordion",
			on: {
				"onAfterCollapse": id => {
					if (id === 'treeItem') $$("ace-content").getEditor().resize()
				}
			},
			cols: [{
					view: "accordionitem",
					id: "contentItem",
					header: "<span class='mdi mdi-file-document-outline'></span>",
					body: {
						rows: [{
								id: "views",
								animate: false,
								keepViews: true,
								cells: [{
									$subview: "tinymce"
								}, {
									$subview: "ace",
									id: "ace-content"
								}]
							},
							{
								view: "tabbar",
								id: "tabbar",
								options: [{
										value: "Visual",
										id: "tinymce",
										icon: "mdi mdi-eye-outline"
									},
									{
										value: "Source",
										id: "ace-content",
										icon: "mdi mdi-code-tags"
									}
								],
								multiview: "true",
								type: "bottom",
								on: {
									onChange: _ => {
										if ($$("tabbar").getValue() === 'ace-content') {
											$$("ace-content").$scope.setValue($$("tinymce").getValue());
										}
									}
								}
							}
						]
					}
				},
				{
					view: "accordionitem",
					collapsed: true,
					id: "tools",
					header: "<span class='mdi mdi-wrench-outline'></span> Tools",
					body: {
						id: "accordionRight",
						view: "accordion",
						type: "line",
						rows: [{
							view: "accordionitem",
							header: "<span class='mdi mdi-file-tree'></span> Tree",
							body: {
								rows: [{
									$subview: "contentViews.toolbar"
								}, {
									$subview: "contentViews.tree"
								}]
							}
						}, {
							view: "accordionitem",
							header: "<span class='mdi mdi-card-bulleted-settings-outline'></span> Properties",
							collapsed: true,
							body: {
								$subview: "contentViews.properties"
							}
						}]
					}
				}
			]
		};
	}
	_save(e, self) {
		var that = e ? this.that.getParentView() : self;
		if (that.app.lastXHRPostContent) that.app.lastXHRPostContent.abort();
		that.app.lastXHRPostContent = that.app.S3.putObject({
			Bucket: 'redaktr',
			ContentType: 'text/html',
			Key: AWS.config.credentials.identityId + "/" + $$("tree").getSelectedId() + ".htm",
			Body: $$("tinymce").getValue()
		}, (err, data) => {
			if (err) {
				if (err.code !== "RequestAbortedError") webix.message({
					text: err.message,
					type: "error"
				})
			} else webix.message("Content save complete");
		});
	}
}
/* global webix */
/* global AWS */
/* global $$ */