import {
	JetView
} from "webix-jet";
export default class TemplateView extends JetView {
	config() {
		return {
			id: "templateAccordion",
			view: "accordion",
			on: {
				"onAfterCollapse": id => {
					if (id === 'tools') {
						$$("data").editCancel();
						$$("shadows").editCancel();
						$$("class").editCancel();
						switch ($$("tabbar").getValue()) {
							case 'ace-template':
								$$("ace-template").getEditor().resize();
								break;
							case 'fabricCnt':
								this._makeSelection(this);
								break;
						}
					}
				}
			},
			cols: [{
					view: "accordionitem",
					id: "templateItem",
					header: "<span class='mdi mdi-postage-stamp'></span>",
					body: {
						rows: [{
								id: "views",
								animate: false,
								keepViews: true,
								cells: [{
										id: "fabricCnt",
										rows: [{
											view: "toolbar",
											cols: [{
												view: "icon",
												icon: "mdi mdi-undo",
												click: _ => {
													//console.log(JSON.stringify(this._undo));
													var pop = this._undo.pop();
													if (pop) {
														var fabricDocument = $($$("fabric").getIframe()).contents();
														this._redo.push([
															this._body.find('#body:first>.pusher').html(),
															fabricDocument.find('body:first>.pusher').html(),
															webix.ajax().stringify($$('fabric').getCanvas()),
															$$('layers').serialize(),
															$$("layers").getSelectedId()
														]);
														this._body.find('#body:first>.pusher').html(pop[0]);
														fabricDocument.find('body:first>.pusher').html(pop[1]);
														$$('fabric').getCanvas().loadFromJSON(pop[2], _ => $$('fabric').getCanvas().requestRenderAll(), (o, rect) => {
															rect.toObject = (function(toObject) {
																return function() {
																	return fabric.util.object.extend(toObject.call(this), {
																		id: this.id
																	});
																};
															})(rect.toObject);
														});
														$$("layers").clearAll();
														$$("layers").parse(pop[3]);
														$$("layers").select(pop[4]);
														this._save2();
													}
												}
											}, {
												view: "icon",
												icon: "mdi mdi-redo",
												click: _ => {
													var pop = this._redo.pop();
													if (pop) {
														var fabricDocument = $($$("fabric").getIframe()).contents();
														this._undo.push([
															this._body.find('#body:first>.pusher').html(),
															fabricDocument.find('body:first>.pusher').html(),
															webix.ajax().stringify($$('fabric').getCanvas()),
															$$('layers').serialize(),
															$$("layers").getSelectedId()
														]);
														this._body.find('#body:first>.pusher').html(pop[0]);
														fabricDocument.find('body:first>.pusher').html(pop[1]);
														$$('fabric').getCanvas().loadFromJSON(pop[2], _ => $$('fabric').getCanvas().requestRenderAll(), (o, rect) => {
															rect.toObject = (function(toObject) {
																return function() {
																	return fabric.util.object.extend(toObject.call(this), {
																		id: this.id
																	});
																};
															})(rect.toObject);
														});
														$$("layers").clearAll();
														$$("layers").parse(pop[3]);
														$$("layers").select(pop[4]);
														this._save2();
													}
												}
											}, {}]
										}, {
											id: "fabric",
											view: "fabric",
											canvas: "fabric",
											cdn: "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/3.1.0"
										}]
									},
									{
										$subview: "tinymce",
										id: "tinymce"
									},
									{
										$subview: "ace",
										id: "ace-template"
									}
								]
							},
							{
								view: "tabbar",
								id: "tabbar",
								options: [{
										value: "Layout",
										id: "fabricCnt",
										icon: "mdi mdi-ungroup"
									},
									{
										value: "Visual",
										id: "tinymce",
										icon: "mdi mdi-eye-outline"
									},
									{
										value: "Source",
										id: "ace-template",
										icon: "mdi mdi-code-tags"
									}
								],
								multiview: "true",
								type: "bottom",
								on: {
									onChange: _ => {
										switch ($$("tabbar").getValue()) {
											case 'ace-template':
												$$("ace-template").$scope.setValue($$("tinymce").getValue());
												break;
											case 'fabricCnt':
												this._makeSelection(this);
												break;
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
							header: "<span class='mdi mdi-layers-outline'></span> Layers",
							body: {
								rows: [{
									$subview: "templateViews.layerstoolbar"
								}, {
									$subview: "templateViews.layers"
								}]
							}
						}, {
							view: "accordionitem",
							header: "<span class='mdi mdi-move-resize'></span> Geometry",
							collapsed: true,
							body: {
								$subview: "templateViews.geometry"
							}
						}, {
							view: "accordionitem",
							collapsed: true,
							header: "<span class='mdi mdi-format-paint'></span> Appearance",
							body: {
								$subview: "templateViews.appearance"
							}
						}, {
							view: "accordionitem",
							collapsed: true,
							header: "<span class='mdi mdi-box-shadow'></span> Shadow",
							body: {
								rows: [{
									$subview: "templateViews.shadowstoolbar"
								}, {
									$subview: "templateViews.shadows"
								}]
							}
						}, {
							view: "accordionitem",
							collapsed: true,
							header: "<span class='mdi mdi-database'></span> Data",
							body: {
								rows: [{
									$subview: "templateViews.datatoolbar"
								}, {
									$subview: "templateViews.data"
								}]
							}
						}, {
							view: "accordionitem",
							collapsed: true,
							header: "<span class='mdi mdi-language-css3'></span> Class",
							body: {
								rows: [{
									$subview: "templateViews.classtoolbar"
								}, {
									$subview: "templateViews.class"
								}]
							}
						}]
					}
				}
			]
		};
	}
	init() {
		this._undo = [];
		this._redo = [];
		$$('fabric').attachEvent("onAfterLoad", _ => {
			$$('fabric').getCanvas().setWidth($$('fabric').getWindow().document.documentElement.clientWidth);
			$$('fabric').getCanvas().setHeight($$('fabric').getWindow().document.documentElement.clientHeight);
			$($$('fabric').getWindow()).scroll(_ => this._makeSelection(this));
			$($$('fabric').getWindow()).resize(_ => this._makeSelection(this));
			var observer = new MutationObserver(_ => this._makeSelection(this));
			observer.observe($$("fabric").getWindow().document.body, {
				'attributes': true,
				'childList': true,
				'characterData': true,
				'subtree': true
			});
			$$("layers").select($$("layers").getFirstId());
		});
		this.app.S3.getObject({
			Bucket: 'template.redaktr.com',
			Key: AWS.config.credentials.identityId + '.htm',
			ResponseContentType: 'text/html',
			ResponseCacheControl: 'no-cache'
		}, (err, data) => {
			if ($$('sidebar').getSelectedId() === 'template') {
				var body = '';
				if (!err) {
					body = data.Body.toString().match(/<body[^>]*>[\s\S]*<\/body>/gi);
					body = body ? body[0].replace(/^<body[^>]*>/, '').replace(/<\/body>$/, '') : '';
				}
				this._body = $('<div/>').append($('<div/>').attr('id', 'body').html(body));
				var pusher = this._body.find('#body:first>.pusher');
				if (!pusher.length) {
					pusher = $("<div/>").addClass('pusher').append(this._body.find('#body:first').html());
					this._body.find('#body:first').empty().append(pusher);
				}
				var list = this._body.find('#body:first>.pusher>div[data-fixed]:not([id])>div[id],#body:first>.pusher>div[data-absolute]:not([id])>div[id],#body:first>.pusher>div[data-static]:not([id])>div[id]').not('div[id=""]');
				pusher = $("<div/>").addClass('pusher');
				list.each((index, element) => pusher.append($(element).parentsUntil(".pusher").clone()));
				var o = pusher.find('#content');
				if (!o.length) {
					o = $('<div id="content"><main></main></div>');
					list.push(o[0]);
					pusher.append(o);
					o.wrap('<div data-static></div>')
				} else o.empty().append('<main></main>');
				this._body.find('#body:first').empty().append(pusher);
				list.sort((val1, val2) => {
					// После переноса сайтов можно восстановить
					//return $(val2).parent().css("z-index") - $(val1).parent().css("z-index")
					return $(val2).parent().get(0).style.zIndex ? $(val2).parent().css("z-index") : $(val2).css("z-index") -
						$(val1).parent().get(0).style.zIndex ? $(val1).parent().css("z-index") : $(val1).css("z-index")
				});
				list.each((i, e) => {
					var icon = 'mdi mdi-monitor-off';
					switch (this._getMode($(e))) {
						case 1:
							icon = 'mdi mdi-monitor-dashboard';
							break;
						case 2:
							icon = 'mdi mdi-monitor-lock';
							break;
						case 3:
							icon = 'mdi mdi-monitor-star';
							break;
					}
					$$("layers").add({
						id: webix.uid().toString(),
						value: $(e).attr("id"),
						markCheckbox: !$(e).attr("hidden"),
						icon: icon
					});
				});
				$$("fabric").getCanvas(true).then(canvas => {
					$.each($$('layers').serialize().reverse(), (index, value) => {
						var rect = new fabric.Rect({
							hasControls: value.markCheckbox,
							hasBorders: value.markCheckbox,
							opacity: 0,
							borderColor: 'rgba(102,153,255,1)',
							cornerColor: 'rgba(102,153,255,1)',
							cornerStyle: 'circle',
							originX: 'center',
							originY: 'center',
							lockScalingFlip: true
						});
						rect.toObject = (function(toObject) {
							return function() {
								return fabric.util.object.extend(toObject.call(this), {
									id: this.id
								});
							};
						})(rect.toObject);
						canvas.add(rect);
						rect.id = value.id;
					});
					canvas.on('selection:updated', options => {
						$$("layers").select(options.target.id);
					});
					canvas.on('selection:cleared', options => {
						canvas.setActiveObject(options.deselected[0])
					});
					canvas.on('object:modified', options => {
						var layer = $$("layers").getItem(options.target.id);
						this._updateDND({
							top: this._top,
							left: this._left,
							angle: this._angle,
							oCoords: this._oCoords
						}, {
							top: options.target.top,
							left: options.target.left,
							angle: options.target.angle,
							oCoords: options.target.oCoords
						});
						this._redraw();
					});
					fabric.util.addListener(document.body, 'keydown', options => {
						var key = options.which || options.keyCode,
							activeObject = canvas.getActiveObject();
						if (options.target === document.body && activeObject) switch (key) {
							case 38:
								activeObject.top -= 1;
								if (options.shiftKey)
									if (options.altKey) activeObject.height -= 2;
									else activeObject.height += 2;
								activeObject.setCoords();
								canvas.requestRenderAll();
								canvas.trigger('object:modified', {
									target: activeObject
								});
								break;
							case 40:
								activeObject.top += 1;
								if (options.shiftKey)
									if (options.altKey) activeObject.height -= 2;
									else activeObject.height += 2;
								activeObject.setCoords();
								canvas.requestRenderAll();
								canvas.trigger('object:modified', {
									target: activeObject
								});
								break;
							case 37:
								activeObject.left -= 1;
								if (options.shiftKey)
									if (options.altKey) activeObject.width -= 2;
									else activeObject.width += 2;
								activeObject.setCoords();
								canvas.requestRenderAll();
								canvas.trigger('object:modified', {
									target: activeObject
								});
								break;
							case 39:
								activeObject.left += 1;
								if (options.shiftKey)
									if (options.altKey) activeObject.width -= 2;
									else activeObject.width += 2;
								activeObject.setCoords();
								canvas.requestRenderAll();
								canvas.trigger('object:modified', {
									target: activeObject
								});
								break;
						}
					});
				});
				this._genHtml(true);
				this._loadSite();
			}
		});
	}
	ready() {
		$('[view_id="tinymce"]').css("display", "none"); // хак: потому что у subview не выставляется display:none в tabbar
		$('[view_id="fabric"]').css("position", "absolute");
		$($$("fabric").getIframe()).css('position', 'absolute');
	}
	_getMode(item) {
		if (item.parent('div[data-absolute]:not([id])').parent('.pusher').length) return 1;
		if (item.parent('div[data-fixed]:not([id])').parent('.pusher').length) return 2;
		return 3;
	}
	_loadSite() {
		var document = $$("fabric").getWindow().document;
		document.open();
		document.write(this._html);
		document.close();
	}
	_genHtml(identity) {
		this._html =
			'<!DOCTYPE html><html><head>' +
			'<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">' +
			'<link rel="shortcut icon" href="//base.redaktr.com/' + AWS.config.credentials.identityId + '.ico">' +
			'<base href="' + (identity ? '//base.redaktr.com/' : '/') + AWS.config.credentials.identityId + '/">' +
			(window.location.hostname === 'redaktr-jbruwes.codeanyapp.com' ?
				"<script>document.write('<link rel=\"stylesheet\" href=\"//cdn.redaktr.com/redaktr.cdn.css'+(window.location.hostname===\"www.redaktr.com\"||window.location.hostname===\"redaktr-jbruwes.codeanyapp.com\"?\"?\"+window.btoa(Math.random()):window.location.search.charAt(0)+window.btoa(unescape(encodeURIComponent(window.location.search))))+'\">');</script>" :
				'<link rel="stylesheet" href="//cdn.redaktr.com/redaktr.cdn.min.css">'
			) +
			'<script>' +
			"document.write('<link rel=\"stylesheet\" href=\"//base.redaktr.com/" + AWS.config.credentials.identityId + ".cdn.css'+(window.location.hostname===\"www.redaktr.com\"||window.location.hostname===\"redaktr-jbruwes.codeanyapp.com\"?\"?\"+window.btoa(Math.random()):window.location.search.charAt(0)+window.btoa(unescape(encodeURIComponent(window.location.search))))+'\">');" +
			'</script>' +
			(window.location.hostname === 'redaktr-jbruwes.codeanyapp.com' ?
				"<script>document.write('<link rel=\"stylesheet\" href=\"//cdn.redaktr.com/redaktr.css'+(window.location.hostname===\"www.redaktr.com\"||window.location.hostname===\"redaktr-jbruwes.codeanyapp.com\"?\"?\"+window.btoa(Math.random()):window.location.search.charAt(0)+window.btoa(unescape(encodeURIComponent(window.location.search))))+'\">');</script>" :
				'<link rel="stylesheet" href="//cdn.redaktr.com/redaktr.min.css">'
			) +
			'<script>' +
			"document.write('<link rel=\"stylesheet\" href=\"//base.redaktr.com/" + AWS.config.credentials.identityId + ".css'+(window.location.hostname===\"www.redaktr.com\"||window.location.hostname===\"redaktr-jbruwes.codeanyapp.com\"?\"?\"+window.btoa(Math.random()):window.location.search.charAt(0)+window.btoa(unescape(encodeURIComponent(window.location.search))))+'\">');" +
			'</script>' +
			'<script src="//cdn.redaktr.com/require.min.js" defer></script>' +
			(window.location.hostname === 'redaktr-jbruwes.codeanyapp.com' ?
				"<script>document.write('<script src=\"//cdn.redaktr.com/redaktr.js'+(window.location.hostname===\"www.redaktr.com\"||window.location.hostname===\"redaktr-jbruwes.codeanyapp.com\"?\"?\"+window.btoa(Math.random()):window.location.search.charAt(0)+window.btoa(unescape(encodeURIComponent(window.location.search))))+'\" defer><\\/script>');</script>" :
				'<script src="//cdn.redaktr.com/redaktr.min.js" defer></script>'
			) +
			'</head><body>' +
			'<div class="ui sidebar very wide vertical accordion menu"></div>' +
			'<div class="ui main menu fixed" hidden><div class="ui container"><a class="launch icon item"><i class="content icon"></i></a></div></div>' +
			'<div class="pusher">' + this._body.find('#body:first>.pusher').html() + '</div>' +
			'</body></html>';
		this._html = this._html.replace(new RegExp((window.location.protocol + "//" + window.location.host + window.location.pathname).replace(/[^\/]*$/, ''), "g"), "").replace(/>(\s{1,}|\t{1,}|[\n\r]{1,})</gm, "><").replace(/^\s*$[\n\r]{1,}/gm, '');
	}
	_zIndex(body, prefix, that) {
		var i = $$('layers').count();
		$.each($$('layers').serialize(), (index, value) => {
			body.find("#" + value.value).parent().css("z-index", i);
			i -= 1;
		});
		body.find(prefix + 'body:first>.pusher').append(body.find(
			prefix + 'body:first>.pusher>div[data-fixed]:not([id]),' +
			prefix + 'body:first>.pusher>div[data-absolute]:not([id]),' +
			prefix + 'body:first>.pusher>div[data-static]:not([id])'
		).sort((a, b) => {
			return $(b).css('z-index') - $(a).css('z-index');
		}));
		/*
		var i = $$('layers').count();
		$.each($$('layers').serialize(), (index, value) => {
			body.find("#" + value.value).css("z-index", i);
			i -= 1;
		});
		body.find(
			prefix + 'body:first>.pusher>div[data-fixed]:not([id])>div[id],' +
			prefix + 'body:first>.pusher>div[data-absolute]:not([id])>div[id],' +
			prefix + 'body:first>.pusher>div[data-static]:not([id])>div[id]'
		).each(function() {
			$(this).parent().removeAttr("style");
		});
		body.find(prefix + 'body:first>.pusher>div[data-fixed]:not([id])>div[id]').each(function() {
			$(this).parent().css("z-index", $(this).css("z-index"));
		});
		body.find(prefix + 'body:first>.pusher').append(body.find(
			prefix + 'body:first>.pusher>div[data-fixed]:not([id]),' +
			prefix + 'body:first>.pusher>div[data-absolute]:not([id]),' +
			prefix + 'body:first>.pusher>div[data-static]:not([id])'
		).sort((a, b) => {
			return $(b).children('div[id]').css('z-index') - $(a).children('div[id]').css('z-index');
		}));
		*/
	}
	_redraw(that, layers) {
		that = that ? that : this;
		if (!that._lockRedraw && that._body) {
			var fabricDocument = $($$("fabric").getIframe()).contents(),
				item = $$("layers").getSelectedItem();
			if (item) {
				if (!layers) {
					that._redo = [];
					that._undo.push([
						that._body.find('#body:first>.pusher').html(),
						fabricDocument.find('body:first>.pusher').html(),
						webix.ajax().stringify($$('fabric').getCanvas()),
						$$("layers").serialize(),
						$$("layers").getSelectedId()
					]);
				}
				that._saveStage(that._body.find("#" + item.value), '#body:first>.pusher', that._body);
				that._zIndex(that._body, '#', that);
				that._saveStage(fabricDocument.find("#" + item.value), 'body:first>.pusher', fabricDocument);
				that._zIndex(fabricDocument, '', that);
				that._genHtml(false);
				that._save2(that);
			}
		}
	}
	_save(e, self) {
		var that = e ? this.that.getParentView() : self,
			fabricDocument = $($$("fabric").getIframe()).contents(),
			item = $$("layers").getSelectedItem();
		if (item) {
			/*that._redo = [];
			that._undo.push([
			  that._body.find('#body:first>.pusher').html(),
			  fabricDocument.find('body:first>.pusher').html(),
			  webix.ajax().stringify($$('fabric').getCanvas()),
			  $$('layers').serialize(),
			  $$("layers").getSelectedId()
			]);*/
			that._body.find("#" + item.value).html($$("tinymce").getValue());
			fabricDocument.find("#" + item.value).html($$("tinymce").getValue());
			that._genHtml(false);
			that._save2(that);
		}
	}
	_save2(that) {
		that = that ? that : this;
		if (that.app.lastXHRPostTempl) that.app.lastXHRPostTempl.abort();
		that.app.lastXHRPostTempl = that.app.S3.putObject({
			Bucket: 'template.redaktr.com',
			Key: AWS.config.credentials.identityId + '.htm',
			ContentType: 'text/html',
			Body: that._html
		}, (err, data) => {
			if (err) {
				if (err.code !== "RequestAbortedError") webix.message({
					text: err.message,
					type: "error"
				})
			} else webix.message("Template save complete");
		});
	}
	_saveStage(item, body, object) {
		item.attr('style', '');
		var fixed = $$('mode').getValue(),
			dock = $$('dock').getValue() - 1;
		object.find(body).append(item);
		if (dock) {
			switch (fixed) {
				case 1:
					item.wrap('<div data-absolute>');
					break;
				case 2:
					item.wrap('<div data-fixed>');
					break;
				case 3:
					item.wrap('<div data-static>');
					break;
			}
		} else {
			switch (fixed) {
				case 1:
					item.wrap('<div data-absolute class="ui container">');
					break;
				case 2:
					item.wrap('<div data-fixed class="ui container">');
					break;
				case 3:
					item.wrap('<div data-static class="ui container">');
					break;
			}
		}
		object.find(body + '>div:not([id]):empty').remove();
		var marginLeft = $$('marginLeft').getValue(),
			width = $$('width').getValue(),
			marginRight = $$('marginRight').getValue();
		if (marginLeft !== '') item.css("margin-left", marginLeft + $$('pmarginLeft').getValue());
		if (marginRight !== '') item.css("margin-right", marginRight + $$('pmarginRight').getValue());
		if (width !== '') item.css("min-width", width + $$('pwidth').getValue());
		if (!(marginLeft !== '' && marginRight !== '')) item.css("align-self", "center").css('-ms-flex-item-align','center');
		//item.css(((marginLeft !== '' && marginRight !== '') ? 'min-width' : 'width'), ((width !== '') ? (width + $$('pwidth').getValue()) : 'auto'));
		//item.css('min-width', ((width !== '') ? (width + $$('pwidth').getValue()) : 'auto'));
		//item.css('width', marginLeft !== '' && marginRight !== '' ? '100%' : 'auto');
		var //bunit = $$('pmarginBottom').getValue(),
			//tunit = $$('pmarginTop').getValue(),
			//hunit = $$('pheight').getValue(),
			marginTop = $$('marginTop').getValue(),
			height = $$('height').getValue(),
			marginBottom = $$('marginBottom').getValue();
		if (marginTop !== '') item.css("margin-top", marginTop + $$('pmarginTop').getValue());
		if (marginBottom !== '') item.css("margin-bottom", marginBottom + $$('pmarginBottom').getValue());
		if (height !== '') item.css("min-height", height + $$('pheight').getValue());
		//if (marginTop !== '') item.css("margin-top", marginTop + ((fixed === 2 && tunit === '%') ? "vh" : tunit));
		//if (marginBottom !== '') item.css("margin-bottom", marginBottom + ((fixed === 2 && bunit === '%') ? "vh" : bunit));
		//item.css(((marginTop !== '' && marginBottom !== '') ? 'min-height' : 'height'), ((height !== '') ? (height + ((fixed === 2 && hunit === '%') ? "vh" : hunit)) : 'auto'));
		//item.css('min-height', ((height !== '') ? (height + ((fixed === 2 && hunit === '%') ? "vh" : hunit)) : 'auto'));
		//item.css('min-height', ((height !== '') ? (height + $$('pheight').getValue()) : 'auto'));
		//item.css('height', marginTop !== '' && marginBottom !== '' ? '100%' : 'auto');
		//if (marginTop !== '' && marginBottom !== '' && fixed === 3) item.css("flex", "1 1 auto");
		if (marginTop !== '' && marginBottom !== '') item.css("flex", "1 1 auto");
		var angle = $$('angle').getValue();
		if (angle) item.css("transform", 'rotate(' + angle + 'deg)');
		var paddingLeft = $$('paddingLeft').getValue();
		if (paddingLeft !== '') item.css("padding-left", paddingLeft + 'px');
		var paddingRight = $$('paddingRight').getValue();
		if (paddingRight !== '') item.css("padding-right", paddingRight + 'px');
		var paddingTop = $$('paddingTop').getValue();
		if (paddingTop !== '') item.css("padding-top", paddingTop + 'px');
		var paddingBottom = $$('paddingBottom').getValue();
		if (paddingBottom !== '') item.css("padding-bottom", paddingBottom + 'px');
		var borderLeftWidth = $$('borderLeftWidth').getValue();
		if (borderLeftWidth !== '') item.css("border-left-width", borderLeftWidth + 'px');
		var borderRightWidth = $$('borderRightWidth').getValue();
		if (borderRightWidth !== '') item.css("border-right-width", borderRightWidth + 'px');
		var borderTopWidth = $$('borderTopWidth').getValue();
		if (borderTopWidth !== '') item.css("border-top-width", borderTopWidth + 'px');
		var borderBottomWidth = $$('borderBottomWidth').getValue();
		if (borderBottomWidth !== '') item.css("border-bottom-width", borderBottomWidth + 'px');
		item.css("border-left-style", $$('borderLeftStyle').getValue());
		item.css("border-right-style", $$('borderRightStyle').getValue());
		item.css("border-top-style", $$('borderTopStyle').getValue());
		item.css("border-bottom-style", $$('borderBottomStyle').getValue());
		var borderLeftColor = $$('borderLeftColor').getValue();
		if (borderLeftColor !== '') item.css("border-left-color", borderLeftColor);
		var borderRightColor = $$('borderRightColor').getValue();
		if (borderRightColor !== '') item.css("border-right-color", borderRightColor);
		var borderTopColor = $$('borderTopColor').getValue();
		if (borderTopColor !== '') item.css("border-top-color", borderTopColor);
		var borderBottomColor = $$('borderBottomColor').getValue();
		if (borderBottomColor !== '') item.css("border-bottom-color", borderBottomColor);
		var borderTopLeftRadius = $$('borderTopLeftRadius').getValue();
		if (borderTopLeftRadius !== '') item.css("border-top-left-radius", borderTopLeftRadius + 'px');
		var borderTopRightRadius = $$('borderTopRightRadius').getValue();
		if (borderTopRightRadius !== '') item.css("border-top-right-radius", borderTopRightRadius + 'px');
		var borderBottomLeftRadius = $$('borderBottomLeftRadius').getValue();
		if (borderBottomLeftRadius !== '') item.css("border-bottom-left-radius", borderBottomLeftRadius + 'px');
		var borderBottomRightRadius = $$('borderBottomRightRadius').getValue();
		if (borderBottomRightRadius !== '') item.css("border-bottom-right-radius", borderBottomRightRadius + 'px');
		var textColor = $$('textColor').getValue();
		if (textColor !== '') item.css("color", textColor);
		item.css("opacity", (100 - $$('transparency').getValue()) / 100);
		var backgroundColor = $$('backgroundColor').getValue();
		if (backgroundColor !== '') item.css("background-color", backgroundColor);
		var backgroundPositionH = $$('backgroundPositionH').getValue(),
			pbackgroundPositionH = $$('pbackgroundPositionH').getValue(),
			backgroundPositionV = $$('backgroundPositionV').getValue(),
			pbackgroundPositionV = $$('pbackgroundPositionV').getValue();
		if (backgroundPositionH !== '' || backgroundPositionV !== '') item.css("background-position", Number(backgroundPositionH) + pbackgroundPositionH + " " + Number(backgroundPositionV) + pbackgroundPositionV);
		var repeat = null,
			repeatX = $$('repeatX').getValue(),
			repeatY = $$('repeatY').getValue();
		if (repeatX === repeatY) repeat = (repeatX && repeatY) ? 'repeat' : 'no-repeat';
		else repeat = repeatX ? 'repeat-x' : 'repeat-y';
		item.css("background-repeat", repeat);
		item.css("background-attachment", $$('fixed').getValue() ? 'fixed' : 'scroll');
		var shadows = [];
		$.each($$('shadows').serialize(), (index, value) => shadows.push((value.inset ? 'inset ' : '') + Number(value.x) + 'px ' + Number(value.y) + 'px ' + Number(value.blur) + 'px ' + Number(value.spread) + 'px ' + value.color));
		item.css("box-shadow", shadows.join());
		var classes = [];
		$.each($$('class').serialize(), (index, value) => classes.push(value.class));
		item.removeClass().addClass(classes.join(" "));
		$.each(item.data(), i => item.removeAttr("data-" + i.replace(/[A-Z]/g, '-$&').toLowerCase()));
		$.each($$('data').serialize(), (index, value) => {
			if (value.data) item.data(value.data.toLowerCase().replace(/-([a-z])/g, function(g) {
				return g[1].toUpperCase()
			}), value.value).attr("data-" + value.data.toLowerCase(), value.value);
		});
		var backgroundImage = $$('bglist').getItem($$('bglist').getFirstId());
		if (backgroundImage && backgroundImage.file.sname) item.css("background-image", 'url(' + backgroundImage.file.sname + ')');
	}
	_updateDND(oldRect, newRect) {
		this._lockRedraw = true;
		var deltaAngle = oldRect.angle - newRect.angle;
		if (deltaAngle !== 0) {
			deltaAngle = Math.round($$('angle').getValue() - deltaAngle);
			if (deltaAngle > 180) {
				deltaAngle = deltaAngle - 360;
			}
			$$('angle').setValue(deltaAngle);
		} else {
			var oldOrigin = new fabric.Point(oldRect.left, oldRect.top),
				newOrigin = new fabric.Point(newRect.left, newRect.top),
				angle = -fabric.util.degreesToRadians(newRect.angle),
				oldTr = fabric.util.rotatePoint(oldRect.oCoords.tr, oldOrigin, angle),
				newTr = fabric.util.rotatePoint(newRect.oCoords.tr, newOrigin, angle),
				oldBr = fabric.util.rotatePoint(oldRect.oCoords.br, oldOrigin, angle),
				newBr = fabric.util.rotatePoint(newRect.oCoords.br, newOrigin, angle),
				oldTl = fabric.util.rotatePoint(oldRect.oCoords.tl, oldOrigin, angle),
				newTl = fabric.util.rotatePoint(newRect.oCoords.tl, newOrigin, angle),
				delta = {
					top: newTr.y - oldTr.y,
					bottom: newBr.y - oldBr.y,
					left: newTl.x - oldTl.x,
					right: newTr.x - oldTr.x
				},
				fabricDocument = $($$("fabric").getIframe()).contents(),
				dX = 100 / fabricDocument[0].body.scrollWidth,
				dY = 100 / fabricDocument[0].body.scrollHeight;
			var marginTop = $$('marginTop').getValue(),
				pmarginTop = $$('pmarginTop').getValue();
			if (marginTop !== '') $$('marginTop').setValue(Math.round(Number(marginTop) + (pmarginTop === '%' ? dY : 1) * delta.top));
			var marginBottom = $$('marginBottom').getValue(),
				pmarginBottom = $$('pmarginBottom').getValue();
			if (marginBottom !== '') $$('marginBottom').setValue(Math.round(Number(marginBottom) - (pmarginBottom === '%' ? dY : 1) * delta.bottom));
			var height = $$('height').getValue(),
				pheight = $$('pheight').getValue();
			if ((marginTop === '' || marginBottom === '') && height !== '') $$('height').setValue(Math.round(Number(height) - (pheight === '%' ? dY : 1) * (delta.top - delta.bottom)));
			var marginLeft = $$('marginLeft').getValue(),
				pmarginLeft = $$('pmarginLeft').getValue();
			if (marginLeft !== '') $$('marginLeft').setValue(Math.round(Number(marginLeft) + (pmarginLeft === '%' ? dX : 1) * delta.left));
			var marginRight = $$('marginRight').getValue(),
				pmarginRight = $$('pmarginRight').getValue();
			if (marginRight !== '') $$('marginRight').setValue(Math.round(Number(marginRight) - (pmarginRight === '%' ? dX : 1) * delta.right));
			var width = $$('width').getValue(),
				pwidth = $$('pwidth').getValue();
			if ((marginLeft === '' || marginRight === '') && width !== '') $$('width').setValue(Math.round(Number(width) - (pwidth === '%' ? dX : 1) * (delta.left - delta.right)));
		}
		this._lockRedraw = false;
	}
	_makeSelection(that, resetDimension = false) {
		that = that ? that : this;

		function swap(elem, options, callback, args) {
			var ret, name,
				old = {};
			for (name in options) {
				old[name] = elem.style[name];
				elem.style[name] = options[name];
			}
			ret = callback.call(elem, args);
			for (name in options) {
				elem.style[name] = old[name];
			}
			return ret;
		}

		function doLayers(those) {
			var layer = null,
				map = null,
				selObj = null,
				style = null,
				fabricDocument = $($$("fabric").getIframe()).contents(),
				selectedId = $$('layers').getSelectedId();
			$$('fabric').getCanvas().forEachObject(rect => {
				layer = $$("layers").getItem(rect.id);
				selObj = fabricDocument.find("#" + layer.value);
				if (selObj.length) {
					if (selObj.attr("hidden")) rect.set({
						hasBorders: false,
						hasControls: false,
						selectable: false,
						evented: false
					});
					else {
						map = selObj[0].getBoundingClientRect();
						style = selObj.attr("style") || "";
						rect.set({
							left: Math.round((map.right + map.left) / 2),
							top: Math.round((map.bottom + map.top) / 2),
							width: selObj.outerWidth(),
							height: selObj.outerHeight(),
							scaleX: 1,
							scaleY: 1,
							angle: +(style.match(/rotate\(-?\d+deg\)/g) || ['0'])[0].replace('rotate(', '').replace('deg)', ''),
							hasBorders: true,
							hasControls: true,
							selectable: true,
							evented: true
						});
						rect.bringToFront();
						layer.left = rect.left;
						layer.top = rect.top;
						layer.angle = rect.angle;
					}
				} else rect.set({
					left: 0,
					top: 0,
					width: 0,
					height: 0,
					scaleX: 1,
					scaleY: 1,
					angle: 0
				});
				rect.setCoords();
				if (rect.id && rect.id === selectedId) {
					$$('fabric').getCanvas().bringToFront(rect);
					$$('fabric').getCanvas().setActiveObject(rect);
					those._oCoords = rect.oCoords;
					those._top = rect.top;
					those._left = rect.left;
					those._angle = rect.angle;
				}
			});
			$$('fabric').getCanvas().requestRenderAll();
		}
		if (($$('tools').config.collapsed && $$("tabbar").getValue() === 'fabricCnt') || (!$$('tools').config.collapsed && resetDimension)) {
			var isHidden = $($$("fabric").getIframe()).parent(':hidden'),
				selectedItem = $$('layers').getSelectedItem(),
				item = that._body.find("#" + selectedItem.value);
			$$("templateItem").define("header", "<span class='mdi mdi-postage-stamp'></span> " + selectedItem.value);
			$$("templateItem").refresh();
			if (isHidden.length) swap(isHidden[isHidden.length - 1], {
				position: "absolute",
				visibility: "hidden",
				display: "block"
			}, doLayers, that);
			else doLayers(that);
			if (item.length) {
				that._lockRedraw = true;
				if (selectedItem.value === 'content') {
					//$$('tinymce').$scope.setValue('');
					$$("tinymce").getEditor(true).then(_ => $$('tinymce').$scope.setValue(''));

					$$('tinymce').disable();
					$$("ace-template").$scope.setValue('');
					$$('ace-template').disable();
				} else {
					//$$('tinymce').$scope.setValue(item.html());
					$$("tinymce").getEditor(true).then(_ => $$('tinymce').$scope.setValue(item.html()));
					$$('tinymce').enable();
					$$("ace-template").$scope.setValue(item.html());
					$$('ace-template').enable();
				}
				$$('mode').setValue(that._getMode(item));
				$$('dock').setValue((!item.parent('div.container:not([id])').length) + 1);
				$$('angle').setValue(((item.attr('style') || "").match(/rotate\(-?\d+deg\)/g) || [''])[0].replace('rotate(', '').replace('deg)', ''));
				$$('paddingLeft').setValue(parseInt(item[0].style.paddingLeft));
				$$('paddingRight').setValue(parseInt(item[0].style.paddingRight));
				$$('paddingTop').setValue(parseInt(item[0].style.paddingTop));
				$$('paddingBottom').setValue(parseInt(item[0].style.paddingBottom));
				$$('borderLeftWidth').setValue(parseInt(item[0].style.borderLeftWidth));
				$$('borderRightWidth').setValue(parseInt(item[0].style.borderRightWidth));
				$$('borderTopWidth').setValue(parseInt(item[0].style.borderTopWidth));
				$$('borderBottomWidth').setValue(parseInt(item[0].style.borderBottomWidth));
				$$('borderLeftStyle').setValue(item[0].style.borderLeftStyle ? item[0].style.borderLeftStyle : 'none');
				$$('borderRightStyle').setValue(item[0].style.borderRightStyle ? item[0].style.borderRightStyle : 'none');
				$$('borderTopStyle').setValue(item[0].style.borderTopStyle ? item[0].style.borderTopStyle : 'none');
				$$('borderBottomStyle').setValue(item[0].style.borderBottomStyle ? item[0].style.borderBottomStyle : 'none');
				$$('borderLeftColor').setValue(item[0].style.borderLeftColor ? webix.color.rgbToHex(item[0].style.borderLeftColor) : '#000000');
				$$('borderRightColor').setValue(item[0].style.borderRightColor ? webix.color.rgbToHex(item[0].style.borderRightColor) : '#000000');
				$$('borderTopColor').setValue(item[0].style.borderTopColor ? webix.color.rgbToHex(item[0].style.borderTopColor) : '#000000');
				$$('borderBottomColor').setValue(item[0].style.borderBottomColor ? webix.color.rgbToHex(item[0].style.borderBottomColor) : '#000000');
				var marginTop = item[0].style.marginTop,
					parseMarginTop = parseInt(marginTop);
				$$('marginTop').setValue(parseMarginTop);
				if (parseMarginTop) $$('pmarginTop').setValue((marginTop.match(/\D+$/)[0] === 'px') ? 'px' : '%');
				else if (resetDimension) $$('pmarginTop').setValue('px');
				//var height = item[0].style.height ? item[0].style.height : item[0].style.minHeight,
				var height = item[0].style.minHeight ? item[0].style.minHeight : item[0].style.height,
					parseHeight = parseInt(height);
				$$('height').setValue(parseHeight);
				if (parseHeight) $$('pheight').setValue((height.match(/\D+$/)[0] === 'px') ? 'px' : '%');
				else if (resetDimension) $$('pheight').setValue('px');
				var marginBottom = item[0].style.marginBottom,
					parseMarginBottom = parseInt(marginBottom);
				$$('marginBottom').setValue(parseMarginBottom);
				if (parseMarginBottom) $$('pmarginBottom').setValue((marginBottom.match(/\D+$/)[0] === 'px') ? 'px' : '%');
				else if (resetDimension) $$('pmarginBottom').setValue('px');
				var marginLeft = item[0].style.marginLeft,
					parseMarginLeft = parseInt(marginLeft);
				$$('marginLeft').setValue(parseMarginLeft);
				if (parseMarginLeft) $$('pmarginLeft').setValue((marginLeft.match(/\D+$/)[0] === 'px') ? 'px' : '%');
				else if (resetDimension) $$('pmarginLeft').setValue('px');
				//var width = item[0].style.width ? item[0].style.width : item[0].style.minWidth,
				var width = item[0].style.minWidth ? item[0].style.minWidth : item[0].style.width,
					parseWidth = parseInt(width);
				$$('width').setValue(parseWidth);
				if (parseWidth) $$('pwidth').setValue((width.match(/\D+$/)[0] === 'px') ? 'px' : '%');
				else if (resetDimension) $$('pwidth').setValue('px');
				var marginRight = item[0].style.marginRight,
					parseMarginRight = parseInt(marginRight);
				$$('marginRight').setValue(parseMarginRight);
				if (parseMarginRight) $$('pmarginRight').setValue((marginRight.match(/\D+$/)[0] === 'px') ? 'px' : '%');
				else if (resetDimension) $$('pmarginRight').setValue('px');
				$$('borderTopLeftRadius').setValue(parseInt(item[0].style.borderTopLeftRadius));
				$$('borderTopRightRadius').setValue(parseInt(item[0].style.borderTopRightRadius));
				$$('borderBottomLeftRadius').setValue(parseInt(item[0].style.borderBottomLeftRadius));
				$$('borderBottomRightRadius').setValue(parseInt(item[0].style.borderBottomRightRadius));
				$$('textColor').setValue(item[0].style.color ? webix.color.rgbToHex(item[0].style.color) : '#000000');
				var backgroundImage = item[0].style.backgroundImage;
				backgroundImage = backgroundImage ? backgroundImage : '';
				backgroundImage = (backgroundImage !== '' && backgroundImage !== 'none') ? backgroundImage.replace('url(', '').replace(')', '').replace(/"/g, '').replace(new RegExp((window.location.protocol + "//" + window.location.host + window.location.pathname).replace(/[^\/]*$/, ''), "g"), "") : '';
				$$("uploader").files.data.clearAll();
				if (backgroundImage) $$("uploader").addFile({
					name: backgroundImage.split("/").pop(),
					sname: backgroundImage
				}, 0);
				var backgroundPosition = item[0].style.backgroundPosition;
				backgroundPosition = backgroundPosition ? backgroundPosition : 'px px';
				backgroundPosition = backgroundPosition.split(" ");
				$$('backgroundPositionH').setValue(parseInt(backgroundPosition[0]));
				$$('pbackgroundPositionH').setValue(backgroundPosition[0].match(/\D+$/)[0]);
				$$('backgroundPositionV').setValue(parseInt(backgroundPosition[1]));
				$$('pbackgroundPositionV').setValue(backgroundPosition[1].match(/\D+$/)[0]);
				var backgroundRepeat = item[0].style.backgroundRepeat;
				$$('repeatX').setValue((!backgroundRepeat || backgroundRepeat === 'repeat' || backgroundRepeat === 'repeat-x') ? true : false);
				$$('repeatY').setValue((!backgroundRepeat || backgroundRepeat === 'repeat' || backgroundRepeat === 'repeat-y') ? true : false);
				var backgroundFixed = item[0].style.backgroundAttachment;
				$$('fixed').setValue((!backgroundFixed || backgroundFixed !== 'fixed') ? false : true);
				$$('backgroundColor').setValue(item[0].style.backgroundColor ? webix.color.rgbToHex(item[0].style.backgroundColor) : '');
				var transparency = item[0].style.opacity;
				$$('transparency').setValue(transparency === '' ? 0 : Math.round(100 - transparency * 100));
				$$('shadows').clearAll();
				var boxShadow = item[0].style.boxShadow;
				boxShadow = boxShadow === 'none' ? null : boxShadow;
				if (boxShadow) {
					boxShadow = boxShadow.split(/,(?![^\(]*\))/);
					$.each(boxShadow, (index, element) => {
						var cur = element.trim().split(/ (?![^\(]*\))/g);
						var boxShadowGeom = cur.filter(val => {
							return val.match(/^-?\d+/)
						});
						var boxShadowParams = cur.filter(val => {
							return !val.match(/^-?\d+/)
						});
						var inset = null;
						var color = null;
						if (boxShadowParams[0]) {
							switch (boxShadowParams[0]) {
								case 'inset':
									inset = true;
									break;
								default:
									color = boxShadowParams[0];
									break;
							}
						}
						if (boxShadowParams[1]) {
							switch (boxShadowParams[1]) {
								case 'inset':
									inset = true;
									break;
								default:
									color = boxShadowParams[1];
									break;
							}
						}
						$$('shadows').add({
							x: boxShadowGeom[0] ? parseFloat(boxShadowGeom[0]) : 0,
							y: boxShadowGeom[1] ? parseFloat(boxShadowGeom[1]) : 0,
							blur: boxShadowGeom[2] ? parseFloat(boxShadowGeom[2]) : 0,
							spread: boxShadowGeom[3] ? parseFloat(boxShadowGeom[3]) : 0,
							inset: inset ? inset : false,
							color: color ? '#' + webix.color.rgbToHex(color) : '#ffffff'
						});
					});
					$$("shadows").select($$("shadows").getFirstId());
				}
				$$("data").clearAll();
				var data = item.data();
				for (var x in data)
					if (data.hasOwnProperty(x)) $$("data").add({
						data: x.replace(/[A-Z]/g, '-$&').toLowerCase(),
						value: data[x]
					});
				if (data.length) $$("data").select($$("data").getFirstId());
				$$("class").clearAll();
				var classRow = item.attr("class");
				classRow = classRow ? classRow.split(/\s+/) : [];
				for (var y in classRow) $$("class").add({
					class: classRow[y]
				});
				if (classRow.length) $$("class").select($$("class").getFirstId());
				that._lockRedraw = false;
			}
		}
	}
}
/* global MutationObserver */
/* global fabric */
/* global webix */
/* global AWS */
/* global $$ */
/* global $ */