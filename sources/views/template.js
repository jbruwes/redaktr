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
                                options: [
                                    { value: "Layout", id: "fabric", icon: "mdi mdi-ungroup" },
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
                        //parentItem: val
                    })
                });
            });
            //console.log($$("layers").data);
            //($$("layers").data.reverse()).each((i, e) => {
  //              //this._canvas.add(e.rect) 
//                console.log(e.rect);
//
  //          });
            $$("layers").select($$("layers").getFirstId());
            //console.log($$("layers").getItem('button'));
            //$$("layers").data= rawData;
            /*
                        
                        var model = that._model = qx.data.marshal.Json.createModel(that._rawData);
                        model.forEach(that._modelSetRect, that);
                        that._list.setModel(model);
                        that._list.getSelection().addListener("change", that._listOnChange, that);
                        model.reverse();
                        model.forEach(that._canvasAddRect, that);
                        model.reverse();
                        that._list.getSelection().push(model.getItem(0));
                        that.zIndex();
                        //that._canvas.on('selection:created', that._canvasObjectSelected);
                        that._canvas.on('selection:updated', that._canvasObjectSelected);
                        that._canvas.on('selection:cleared', that._canvasSelectionCleared);
                        that._canvas.on('object:modified', that._canvasObjectModified);
                        fabric.util.addListener(that._canvas.upperCanvasEl, 'dblclick', that._canvasDblclick);
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
        var fixed = 1;
        if (item.parents('div[data-absolute]:not([id])').parents('#body').length) {
            fixed = 0;
        }
        if (item.parents('div[data-fixed]:not([id])').parents('#body').length) {
            fixed = 1;
        }
        if (item.parents('div[data-static]:not([id])').parents('#body').length || item.parents('div[data-static]:not([id])').parents('div[data-relative]:not([id])').parents('#body').length) {
            fixed = 2;
        }
        if (item.parents('div[data-absolute]:not([id])').parents('div[data-relative]:not([id])').parents('#body').length) {
            fixed = 3;
        }
        return fixed;
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
            '<link rel="stylesheet" href="' + (location.hostname === 'private-jbruwes.c9users.io' ? '//s3.amazonaws.com/cdn.redaktr.com/index.css' : '//cdn.redaktr.com/index.min.css') + '">' +
            '<script src="//cdn.redaktr.com/jquery.min.js"></script>' +
            '<script src="' + (location.hostname === 'private-jbruwes.c9users.io' ? '//s3.amazonaws.com/cdn.redaktr.com/index.js' : '//cdn.redaktr.com/index.min.js') + '"></script>' +
            '<link rel="shortcut icon" href="//favicon.redaktr.com/' + AWS.config.credentials.identityId + '.ico">' +
            '<base href="' + (identity ? '//media.redaktr.com/' : '/') + AWS.config.credentials.identityId + '/">' +
            dynamicHeader +
            '</head><body>' +
            this._body.find('#body').html() +
            (identity ? '<script>$(document).keydown(function(e){8===e.keyCode&&e.preventDefault()});</script>' : '') +
            '</body></html>';
        this._html = this._html.replace(new RegExp((location.protocol + "//" + location.host + location.pathname).replace(/[^\/]*$/, ''), "g"), "").replace(/>(\s{1,}|\t{1,}|[\n\r]{1,})</gm, "><").replace(/^\s*$[\n\r]{1,}/gm, '');
    }
}
/* global location */
/* global AWS */
/* global $$ */
/* global $ */
