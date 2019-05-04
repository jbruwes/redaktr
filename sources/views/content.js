import { JetView } from "webix-jet";
export default class ContentView extends JetView {
	config() {
		return {
			id: "accordion",
			view: "accordion",
			on: {
				"onAfterCollapse": id => { if (id === 'treeItem') $$("ace").getEditor().resize() }
			},
			cols: [{
				view: "accordionitem",
				header: "<span class='mdi mdi-file-document-outline'></span> Content",
				body: {
					rows: [{
							id: "views",
							animate: false,
							keepViews: true,
							cells: [{ $subview: "tinymce" }, { $subview: "ace", id: "ace" }]
						},
						{
							view: "tabbar",
							id: "tabbar",
							options: [
								{ value: "Visual", id: "tinymce", icon: "mdi mdi-eye-outline" },
								{ value: "Source", id: "ace", icon: "mdi mdi-code-tags" }
							],
							multiview: "true",
							type: "bottom",
							on: {
								onChange: _ => {
									if ($$("tabbar").getValue() === 'ace') {
										$$("ace").$scope.setValue($$("tinymce").getValue());
									}
								}
							}
						}
					]
				}
			}, {
				view: "accordionitem",
				collapsed: true,
				id: "treeItem",
				header: "<span class='mdi mdi-file-tree'></span> Tree",
				body: { rows: [{ $subview: "contentViews.toolbar" }, { $subview: "contentViews.tree" }] }
			}]
		};
	}
	init() {
		//this.S3 = new AWS.S3({ apiVersion: '2006-03-01', correctClockSkew: true });
		//this.lastXHRPostContent = null;
		this.app.S3.getObject({
			Bucket: 'template.redaktr.com',
			Key: AWS.config.credentials.identityId + '.htm'
		}, (err, data) => {
			var head = '';
			if (!err) {
				head = data.Body.toString().match(/<head[^>]*>[\s\S]*<\/head>/gi);
				head = head ? head[0].replace(/^<head[^>]*>/, '').replace(/<\/head>$/, '') : '';
			}
			var content_css = [];
			$('<div>' + head + '</div>').find("link[href][rel='stylesheet']").each((i, val) => { content_css.push($(val).attr("href")) });
			content_css = content_css.join(",");
			if ($$("tinymce")) $$("tinymce").getEditor(true).then(editor => { tinyMCE.activeEditor.dom.loadCSS(content_css) });
		});
	}
	save(e, self) {
		var that = e ? this.that.getParentView() : self;
		if (that.lastXHRPostContent) that.lastXHRPostContent.abort();
		that.lastXHRPostContent = that.app.S3.putObject({
			Bucket: 'content.redaktr.com',
			ContentType: 'text/html',
			Key: AWS.config.credentials.identityId + "/" + $$("tree").getSelectedId() + ".htm",
			Body: $$("tinymce").getValue()
		}, (err, data) => {
			if (err) { if (err.code !== "RequestAbortedError") webix.message({ text: err.message, type: "error" }) }
			else webix.message("Content save complete");
		});
	}
}
/* global tinyMCE */
/* global webix */
/* global AWS */
/* global $$ */
/* global $ */
