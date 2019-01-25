import { JetView } from "webix-jet";
export default class ContentView extends JetView {
	config() {
		var lastXHRGet = null;
		var lastXHRTreePost = null;
		webix.attachEvent("onBeforeAjax", function(mode, url, params, xhr) {
			console.log(url);
			if (mode === 'POST' && url === 'https://api.redaktr.com/tree') {
				lastXHRTreePost = xhr;
			}
			if (mode === 'GET') {
				lastXHRGet = xhr;
			}
		});
		var onChangeFnc = function(id) {
			webix.delay(() => {
				if (lastXHRTreePost) { lastXHRTreePost.abort(); }
				webix.ajax().post("https://api.redaktr.com/tree", webix.ajax().stringify($$("tree").data.serialize()), function(text, xml, xhr) {
					webix.message("Tree save complete");
				});
			});
		};
		var onSelectFnc = function(id) {
			if (lastXHRGet) { lastXHRGet.abort(); }
			webix.ajax().get("https://api.redaktr.com/content/" + id, null, function(text, xml, xhr) {
				$$("tinymce").setValue(text);
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
								id: "tinymce",
								view: "tinymce-editor",
								config: {
									theme: "modern",
									menubar: "edit insert view format table tools",
									content_style: ".mce-content-body{font-size:14px;padding:8px;}",
									content_css: "//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css," +
						"//fonts.googleapis.com/css?family=Alice|Andika|Anonymous+Pro|Arimo|Arsenal|Bad+Script|Comfortaa|Cormorant|Cormorant+Garamond|Cormorant+Infant|Cormorant+SC|Cormorant+Unicase|Cousine|Cuprum|Didact+Gothic|EB+Garamond|El+Messiri|Exo+2|Fira+Mono|Fira+Sans|Fira+Sans+Condensed|Fira+Sans+Extra+Condensed|Forum|Gabriela|Istok+Web|Jura|Kelly+Slab|Kurale|Ledger|Lobster|Lora|Marck+Script|Marmelad|Merriweather|Neucha|Noto+Sans|Noto+Serif|Old+Standard+TT|Open+Sans|Open+Sans+Condensed:300|Oranienbaum|Oswald|PT+Mono|PT+Sans|PT+Sans+Caption|PT+Sans+Narrow|PT+Serif|PT+Serif+Caption|Pangolin|Pattaya|Philosopher|Play|Playfair+Display|Playfair+Display+SC|Podkova|Poiret+One|Prata|Press+Start+2P|Prosto+One|Roboto|Roboto+Condensed|Roboto+Mono|Roboto+Slab|Rubik|Rubik+Mono+One|Ruslan+Display|Russo+One|Scada|Seymour+One|Source+Sans+Pro|Stalinist+One|Tenor+Sans|Tinos|Ubuntu|Ubuntu+Condensed|Ubuntu+Mono|Underdog|Yanone+Kaffeesatz|Yeseva+One&amp;subset=cyrillic"
								}
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
									view: "icon",
									icon: "mdi mdi-file-document-outline",
									click: () => {
										var item = $$("tree").add({ checked: true, value: "" }, $$("tree").getBranchIndex($$("tree").getSelectedId()) + 1, $$("tree").getParentId($$("tree").getSelectedId()) || 0);
										$$("tree").select(item);
										$$("tree").edit(item);
									}
								},
								{
									view: "icon",
									icon: "mdi mdi-pencil",
									click: () => { $$("tree").edit($$("tree").getSelectedId()) }
								}, {
									view: "icon",
									icon: "mdi mdi-delete-outline",
									click: function() {
										var sel = $$("tree").getSelectedId();
										var sel2 = $$("tree").getNextSiblingId(sel) || $$("tree").getPrevSiblingId(sel) || $$("tree").getParentId(sel);
										if (sel2) {
											webix.confirm("Are you sure?", function(result) {
												if (result) {
													$$("tree").remove(sel);
													$$("tree").select(sel2);
												}
											});
										}
									}
								}, {
									view: "icon",
									icon: "mdi mdi-arrow-up-bold-box-outline",
									click: () => {
										var sel = $$("tree").getSelectedId(),
											par = $$("tree").getParentId(sel);
										if ($$("tree").getPrevSiblingId(sel)) {
											$$("tree").move(sel, $$("tree").getBranchIndex(sel) - 1, null, { parent: par });
										}
									}
								}, {
									view: "icon",
									icon: "mdi mdi-arrow-down-bold-box-outline",
									click: () => {
										var sel = $$("tree").getSelectedId(),
											par = $$("tree").getParentId(sel);
										if ($$("tree").getNextSiblingId(sel)) {
											$$("tree").move(sel, $$("tree").getBranchIndex(sel) + 1, null, { parent: par });
										}
									}
								}, {
									view: "icon",
									icon: "mdi mdi-arrow-left-bold-box-outline",
									click: () => {
										var sel = $$("tree").getSelectedId(),
											par = $$("tree").getParentId(sel);
										if (par) {
											var parpar = $$("tree").getParentId(par);
											$$("tree").move(sel, $$("tree").getBranchIndex(par) + 1, null, { parent: parpar });
										}
									}
								}, {
									view: "icon",
									icon: "mdi mdi-arrow-right-bold-box-outline",
									click: () => {
										var sel = $$("tree").getSelectedId(),
											sib = $$("tree").getPrevSiblingId(sel);
										if (sib) {
											$$("tree").move(sel, -1, null, { parent: sib });
											$$("tree").open(sib);
										}
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
							editor: "popup",
							editValue: "value",
							editaction: "dblclick",
							//drag:"order",
							url: "https://api.redaktr.com/tree",
							on: {
								"data->onAfterAdd": onChangeFnc,
								"data->onAfterDelete": onChangeFnc,
								"data->onDataUpdate": onChangeFnc,
								"data->onDataMove": onChangeFnc,
								"onItemCheck": onChangeFnc,
								"onAfterLoad": () => { $$("tree").select($$("tree").getFirstId()) },
								"onAfterSelect": onSelectFnc
							}
						}
					]
				}
			}]
		};
	}
}
