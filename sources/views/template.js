import { JetView } from "webix-jet";
export default class TemplateView extends JetView {
    config() {
        return {
            id: "templateAccordion",
            view: "accordion",
            cols: [{
                    view: "accordionitem",
                    header: "<span class='mdi mdi-postage-stamp'></span> Template",
                    body: {
                        rows: [{
                                id: "views",
                                animate: false,
                                keepViews: true,
                                cells: [{ id: "fabric", view: "fabric", canvas: "fabric" }, { $subview: "tinymce", id: "tinymce" }, { $subview: "ace", id: "ace" }]
                            },
                            {
                                view: "tabbar",
                                id: "tabbar",
                                options: [{ value: "Layout", id: "fabric", icon: "mdi mdi-ungroup" },
                                    { value: "Visual", id: "tinymce", icon: "mdi mdi-eye-outline" },
                                    { value: "Source", id: "ace", icon: "mdi mdi-code-tags" }
                                ],
                                multiview: "true",
                                type: "bottom"
                            }
                        ]
                    }
                },
                {
                    view: "accordionitem",
                    collapsed: true,
                    header: "<span class='mdi mdi-wrench-outline'></span> Tools",
                    body: {
                        id: "accordionRight",
                        view: "accordion",
                        type: "line",
                        rows: [{
                            view: "accordionitem",
                            header: "<span class='mdi mdi-layers-outline'></span> Layers",
                            body: {
                                rows: [{ $subview: "templateViews.layerstoolbar" }, { $subview: "templateViews.layers" }]
                            }
                        }, {
                            view: "accordionitem",
                            header: "<span class='mdi mdi-move-resize'></span> Geometry",
                            collapsed: true,
                            body: { $subview: "templateViews.geometry" }
                        }, {
                            view: "accordionitem",
                            collapsed: true,
                            header: "<span class='mdi mdi-format-paint'></span> Appearance",
                            body: { $subview: "templateViews.appearance" }
                        }, {
                            view: "accordionitem",
                            collapsed: true,
                            header: "<span class='mdi mdi-box-shadow'></span> Shadow",
                            body: { rows: [{ $subview: "templateViews.shadowstoolbar" }, { $subview: "templateViews.shadows" }] }
                        }, {
                            view: "accordionitem",
                            collapsed: true,
                            header: "<span class='mdi mdi-database'></span> Data",
                            body: { rows: [{ $subview: "templateViews.datatoolbar" }, { $subview: "templateViews.data" }] }
                        }, {
                            view: "accordionitem",
                            collapsed: true,
                            header: "<span class='mdi mdi-language-css3'></span> Class",
                            body: { rows: [{ $subview: "templateViews.classtoolbar" }, { $subview: "templateViews.class" }] }
                        }]
                    }
                }
            ]
        };
    }
    init() {
        $$('fabric').attachEvent("onAfterLoad", _ => $$("layers").select($$("layers").getFirstId()));
        $$('fabric').attachEvent("onViewResize", function(){console.log('resize')});
        this.app.S3.getObject({
            Bucket: 'template.redaktr.com',
            Key: AWS.config.credentials.identityId + '.htm',
            ResponseContentType: 'text/html',
            ResponseCacheControl: 'no-cache'
        }, (err, data) => {
            var body = '';
            var head = '';
            if (!err) {
                head = data.Body.toString().match(/<head[^>]*>[\s\S]*<\/head>/gi);
                head = head ? head[0].replace(/^<head[^>]*>/, '').replace(/<\/head>$/, '') : '';
                body = data.Body.toString().match(/<body[^>]*>[\s\S]*<\/body>/gi);
                body = body ? body[0].replace(/^<body[^>]*>/, '').replace(/<\/body>$/, '') : '';
            }
            this._body = $('<div/>').append($('<div/>').attr('id', 'body').html(body));
            var list = this._body.find('#body>div:not([id])>div[id],#body>div[data-relative]:not([id])>div:not([id])>div[id]');
            list.sort((val1, val2) => { return $(val2).css("z-index") - $(val1).css("z-index") });
            list.each((i, e) => {
                var icon = 'mdi mdi-monitor-off',
                    id = $(e).attr("id"),
                    visible = !$(e).attr("hidden");
                switch (this._getMode($(e))) {
                    case 0:
                        icon = 'mdi mdi-monitor-multiple';
                        break;
                    case 1:
                        icon = 'mdi mdi-monitor-lock';
                        break;
                    case 2:
                        icon = 'mdi mdi-monitor-star';
                        break;
                    case 3:
                        icon = 'mdi mdi-monitor-dashboard';
                        break;
                }
                $$("layers").add({
                    id: id,
                    title: id,
                    markCheckbox: visible,
                    icon: icon,
                    rect: new fabric.Rect({
                        hasControls: visible,
                        hasBorders: visible,
                        opacity: 0,
                        borderColor: 'rgba(102,153,255,1)',
                        cornerColor: 'rgba(102,153,255,1)',
                        cornerStyle: 'circle',
                        originX: 'center',
                        originY: 'center',
                        lockScalingFlip: true,
                        id: id
                    })
                });
            });
            $$("fabric").getCanvas(true).then(canvas => { $(list.toArray().reverse()).each((i, e) => { canvas.add($$("layers").getItem($(e).attr("id")).rect) }) });
            //$$("layers").select($$("layers").getFirstId());
            /*
                        that._list.getSelection().addListener("change", that._listOnChange, that);
                        that.zIndex();
                        that._canvas.on('selection:updated', that._canvasObjectSelected);
                        that._canvas.on('selection:cleared', that._canvasSelectionCleared);
                        that._canvas.on('object:modified', that._canvasObjectModified);
            */

            this._header = $('<div/>').html(head);
            this._header.find('meta[charset]').remove();
            this._header.find('meta[name="viewport"]').remove();
            this._header.find('link[rel="stylesheet"][href="//s3.amazonaws.com/cdn.redaktr.com/index.css"]').remove();
            this._header.find('link[rel="stylesheet"][href="//cdn.redaktr.com/index.min.css"]').remove();
            this._header.find('script[src="//cdn.redaktr.com/jquery.min.js"]').remove();
            this._header.find('script[src="//s3.amazonaws.com/cdn.redaktr.com/index.js"]').remove();
            this._header.find('script[src="//cdn.redaktr.com/index.min.js"]').remove();
            this._header.find('link[rel="shortcut icon"][href*="' + AWS.config.credentials.identityId + '"]').remove();
            this._header.find('base[href*="' + AWS.config.credentials.identityId + '"]').remove();
            this._genHtml(true);
            this._loadSite();
        });
    }
    ready() {
        $('[view_id="tinymce"]').css("display", "none"); // хак: потому что у subview не выставляется display:none в tabbar
    }
    _getMode(item) {
        if (item.parents('div[data-absolute]:not([id])').parents('#body').length) return 0;
        if (item.parents('div[data-fixed]:not([id])').parents('#body').length) return 1;
        if (item.parents('div[data-static]:not([id])').parents('#body').length || item.parents('div[data-static]:not([id])').parents('div[data-relative]:not([id])').parents('#body').length) return 2;
        if (item.parents('div[data-absolute]:not([id])').parents('div[data-relative]:not([id])').parents('#body').length) return 3;
        return 1;
    }
    _loadSite() {
        var document = $$("fabric").getWindow().document;
        document.open();
        document.write(this._html);
        document.close();
    }
    _genHtml(identity) {
        var dynamicHeader = this._header.html();
        dynamicHeader = dynamicHeader ? dynamicHeader : '';
        this._html =
            '<!DOCTYPE html><html><head>' +
            '<meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">' +
            '<link rel="stylesheet" href="' + (window.location.hostname === 'private-jbruwes.c9users.io' ? '//s3.amazonaws.com/cdn.redaktr.com/index.css' : '//cdn.redaktr.com/index.min.css') + '">' +
            '<script src="//cdn.redaktr.com/jquery.min.js"></script>' +
            '<script src="' + (window.location.hostname === 'private-jbruwes.c9users.io' ? '//s3.amazonaws.com/cdn.redaktr.com/index.js' : '//cdn.redaktr.com/index.min.js') + '"></script>' +
            '<link rel="shortcut icon" href="//favicon.redaktr.com/' + AWS.config.credentials.identityId + '.ico">' +
            '<base href="' + (identity ? '//media.redaktr.com/' : '/') + AWS.config.credentials.identityId + '/">' +
            dynamicHeader +
            '</head><body>' +
            this._body.find('#body').html() +
            (identity ? '<script>$(document).keydown(function(e){8===e.keyCode&&e.preventDefault()});</script>' : '') +
            '</body></html>';
        this._html = this._html.replace(new RegExp((window.location.protocol + "//" + window.location.host + window.location.pathname).replace(/[^\/]*$/, ''), "g"), "").replace(/>(\s{1,}|\t{1,}|[\n\r]{1,})</gm, "><").replace(/^\s*$[\n\r]{1,}/gm, '');
    }
    _makeSelection() {
        var id = $$("layers").getFirstId(),
            //fabricWindow = $$("fabric").getWindow(),
            fabricWindow = $($$("fabric").getWindow()),
            map = null,
            rect = null,
            selObj = null,
            style = null,
            //boundingClientRect = null,
            outerWidth = null,
            outerHeight = null,
            isHidden = $($$("fabric").getIframe()).parents(':hidden');

        function swap(elem, options, callback, args) {
            var ret, name,
                old = {};
            for (name in options) {
                old[name] = elem.style[name];
                elem.style[name] = options[name];
            }
            ret = callback.apply(elem, args || []);
            for (name in options) {
                elem.style[name] = old[name];
            }
            return ret;
        }

        function doLayers() {
            do {
                rect = $$("layers").getItem(id).rect;
                selObj = $($$("fabric").getWindow().document).find("#" + id);
                if (selObj.length) {
                    if (selObj.attr("hidden")) {
                        rect.set({
                            hasBorders: false,
                            hasControls: false,
                            selectable: false,
                            evented: false
                        });
                    }
                    else {
                        map = selObj.offset();
                        style = selObj.attr("style");
                        outerHeight = selObj.outerHeight();
                        outerWidth = selObj.outerWidth();
                        rect.set({
                            left: Math.round(map.left - fabricWindow.scrollLeft() + outerWidth / 2),
                            top: Math.round(map.top - fabricWindow.scrollTop() + outerHeight / 2),
                            width: outerWidth,
                            height: outerHeight,
                            scaleX: 1,
                            scaleY: 1,
                            angle: +(style.match(/rotate\(-?\d+deg\)/g) || ['0'])[0].replace('rotate(', '').replace('deg)', ''),
                            hasBorders: true,
                            hasControls: true,
                            selectable: true,
                            evented: true
                        });
                    }
                }
                else {
                    rect.set({
                        left: 0,
                        top: 0,
                        width: 0,
                        height: 0,
                        scaleX: 1,
                        scaleY: 1,
                        angle: 0
                    });
                }
                rect.setCoords();
                id = $$("layers").getNextId(id);
            } while (id);
            $$('fabric').getCanvas().setActiveObject($$('layers').getSelectedItem().rect);
            $$('fabric').getCanvas().requestRenderAll();
        }
        if (isHidden.length) swap(isHidden[isHidden.length - 1], { position: "absolute", visibility: "hidden", display: "block" }, doLayers);
        else doLayers();
    }
}
/* global fabric */
/* global AWS */
/* global $$ */
/* global $ */
