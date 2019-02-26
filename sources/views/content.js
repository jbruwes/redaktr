import { JetView } from "webix-jet";
export default class ContentView extends JetView {
	config() {
		return {
			id: "accordion",
			view: "accordion",
			cols: []
		};
	}
	init() {
		this.S3 = new AWS.S3({ apiVersion: '2006-03-01', correctClockSkew: true });
		this.lastXHRPostContent = null;
		this.header = '';
		this.html = '';
		this.S3.getObject({
			Bucket: 'template.redaktr.com',
			Key: AWS.config.credentials.identityId + '.htm'
		}, (err, data) => {
			var head = '';
			if (!err) {
				head = data.Body.toString().match(/<head[^>]*>[\s\S]*<\/head>/gi);
				head = head ? head[0].replace(/^<head[^>]*>/, '').replace(/<\/head>$/, '') : '';
			}
			this.content_css = [];
			$('<div>' + head + '</div>').find("link[href][rel='stylesheet']").each((i, val) => { this.content_css.push($(val).attr("href")) });
			this.content_css = this.content_css.join(",");
			//var content_style = [];
			//$('<div>' + head + '</div>').find("style:not([id])").each((i, val) => { content_style.push(val) });
			//content_style = content_style.join("\n");
			var accordion = $$("accordion");
			if (accordion) accordion.addView({
				view: "accordionitem",
				header: "Content",
				body: {
					rows: [{
							id: "views",
							animate: false,
							keepViews: true,
							cells: [{ $subview: "contentViews.tinymce" }, { $subview: "contentViews.ace" }]
						},
						{
							view: "tabbar",
							id: "tabbar",
							options: [
								{ value: "Visual", id: "tinymce" },
								{ value: "Source", id: "ace" }
							],
							multiview: "true",
							type: "bottom",
							on: {
								onChange: _ => {
									if ($$("tabbar").getValue() === 'ace') {
										this.setAce($$("tinymce").getValue());
									}
								}
							}
						}
					]
				}
			});
		});
	}
	setTinymce(val) {
		var tinymce = $$("tinymce").getEditor();
		tinymce.off("Change");
		tinymce.getWin().scrollTo(0, 0);
		tinymce.setContent(val);
		tinymce.undoManager.clear();
		tinymce.nodeChanged();
		tinymce.on("Change", this.save);
	}
	setAce(text) {
		var aceChange = _ => {
			$$("tinymce").setValue('<!DOCTYPE html><html><head>' + this.header + '</head><body>' + $$("ace").getValue() + '</body></html>');
			this.save(null, this);
		};
		$$("ace").getEditor(true).then((editor) => {
			this.html = text;
			this.header = '';
			if (this.html.match(/<html[^>]*>[\s\S]*<\/html>/gi)) {
				this.header = this.html.match(/<head[^>]*>[\s\S]*<\/head>/gi);
				this.header = this.header ? this.header[0].replace(/^<head>/, '').replace(/<\/head>$/, '') : '';
				this.html = this.html.match(/<body[^>]*>[\s\S]*<\/body>/gi);
				this.html = this.html ? this.html[0].replace(/^<body>/, '').replace(/<\/body>$/, '').trim() : '';
			}
			var session = editor.getSession();
			session.removeAllListeners('change');
			session.setValue(this.html, -1);
			session.on('change', aceChange);
		});
	}
	save(e, that) {
		var self = e ? this.self.getParentView() : that;
		if (self.lastXHRPostContent) self.lastXHRPostContent.abort();
		self.lastXHRPostContent = self.S3.putObject({
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
/* global webix */
/* global AWS */
/* global $$ */
/* global $ */
