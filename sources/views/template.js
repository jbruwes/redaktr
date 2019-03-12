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
                                type: "bottom" //,
                                //on: {
                                //    onChange: _ => {
                                //        if ($$("tabbar").getValue() === 'ace') {
                                //            $$("ace").$scope.setValue($$("tinymce").getValue());
                                //        }
                                //    }
                                //}
                            }
                        ]
                    }
                },
                {
                    view: "accordionitem",
                    collapsed: true,
                    header: "<span class='mdi mdi-wrench-outline'></span> Tools",
                    //maxWidth: 250,
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
        //$$("fabric").getCanvas(true).then(canvas => {
        //    this._reload(canvas);
        //});

        this._reload();

    }
    ready() {
        $('[view_id="tinymce"]').css("display", "none"); // хак: потому что у subview не выставляется display:none в tabbar
    }
    _reload(canvas) {
        console.log(canvas);


        //if (this._observer) {
        //    this._observer.disconnect();
        //}
        //this._site.addListenerOnce("load", this._siteLoad, this);
        //if (this._html) {
        //    this._loadSite();
        //}
        //else {
        //}
    }


    _reload() {
        //if (this._observer) {
        //    this._observer.disconnect();
        //}
        //this._site.addListenerOnce("load", this._siteLoad, this);
        //if (this._html) {
        //    this._loadSite();
        //}
        //else {
        this.app.S3.getObject({
            //Bucket: 'head.redaktr.com',
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


            //this._body = $($.parseHTML(body));
            this._body = $('<div/>').html(body);
            console.log(this._body.html());

            //that._checkStructure();
            //that._rightSideWidget.setBody(that.getBody());


            //this._header = $($.parseHTML(head));
            this._header = $('<div/>').html(head);
            console.log(this._header.html());

            /*

                    //var list = that.getBody().find('#body>div[id],#body>div:not([id])>div[id],#body>div:not([id])>div:not([id])>div[id]');
                    var list = that.getBody().find('#body>div:not([id])>div[id],#body>div[data-relative]:not([id])>div:not([id])>div[id]');
                    list.sort(that._depthSort);
                    that._rawData = [];
                    qxWeb(list).forEach(that._addRawData, that);
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


                    that._header = qxWeb.create('<div>' + head + '</div>');
                    that._header.find('meta[charset]').remove();
                    that._header.find('meta[name=viewport]').remove();
                    that._header.find('link[rel=stylesheet][href="//s3.amazonaws.com/cdn.redaktr.com/index.css"]').remove();
                    that._header.find('link[rel=stylesheet][href="//cdn.redaktr.com/index.min.css"]').remove();
                    that._header.find('script[src="//cdn.redaktr.com/jquery.min.js"]').remove();
                    that._header.find('script[src="//s3.amazonaws.com/cdn.redaktr.com/index.js"]').remove();
                    that._header.find('script[src="//cdn.redaktr.com/index.min.js"]').remove();
                    that._header.find('link[rel="shortcut icon"][href*="' + that.getController().getIdentityId() + '"]').remove();
                    that._header.find('base[href*="' + that.getController().getIdentityId() + '"]').remove();
                    that._header.find('meta[property="fb:app_id"][content="606212879479370"]').remove();
                    if (that.getController().getGPlusId()) {
                        that._header.find('link[rel="author"][href*="' + that.getController().getGPlusId() + '"]').remove();
                    }


                    */

            this._genHtml(true);
            console.log(this._html);
            //this._loadSite();

        });
        //}
    }
    _loadSite() {
        /*
                if (this._site) {
                    var siteDocument = this._siteDocument = this._site.getDocument();

                    qxWeb(this._site.getDocument()).find("body>div[data-relative]:not([id])").append('<div class="ui container"></div>');

                    this._rightSideWidget.setSite(this._site);
                    this._rightSideWidget.setSiteDocument(siteDocument);
                    this._site.addListenerOnce("load", this._postSelection, this);
                    siteDocument.open();
                    siteDocument.write(this._html);
                    siteDocument.close();
                }
            */
    }

    _genHtml(identity) {
        var dynamicHeader = this._header.html();
        dynamicHeader = dynamicHeader ? dynamicHeader : '';
        //var author = this.getController().getAuthor();
        this._html = '<!DOCTYPE html><html><head>' +
            '<meta charset="utf-8">' +
            '<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">' +
            '<link rel="stylesheet" href="' + (location.hostname === 'private-jbruwes.c9users.io' ? '//s3.amazonaws.com/cdn.redaktr.com/index.css' : '//cdn.redaktr.com/index.min.css') + '">' +
            '<script src="//cdn.redaktr.com/jquery.min.js"></script>' +
            //(identity ? '<script>var pxAmzMetaIdentity="' + this.getController().getIdentityId() + '",pxAmzMetaName="' + this.getController().getMetadata().name + '";</script>' : '') +
            '<script src="' + (location.hostname === 'private-jbruwes.c9users.io' ? '//s3.amazonaws.com/cdn.redaktr.com/index.js' : '//cdn.redaktr.com/index.min.js') + '"></script>' +
            '<link rel="shortcut icon" href="//favicon.redaktr.com/' + AWS.config.credentials.identityId + '.ico">' +


            //(author ? author : '') +

            //					'<base href="' + (identity ? '//media.redaktr.com/' : '/') + this.getController().getIdentityId() + '/"><!--[if IE]><script>!function(){var e=document.getElementsByTagName("base")[0];e.href=e.href}();</script><![endif]-->' +
            '<base href="' + (identity ? '//media.redaktr.com/' : '/') + AWS.config.credentials.identityId + '/">' +
            dynamicHeader +
            '</head><body>' +
            this._body.find('#body').html() +
            (identity ? '<script>$(document).keydown(function(e){8==e.keyCode&&e.preventDefault()});</script>' : '') +
            '</body></html>';
        this._html = this._html.replace(new RegExp((location.protocol + "//" + location.host + location.pathname).replace(/[^\/]*$/, ''), "g"), "").replace(/>(\s{1,}|\t{1,}|[\n\r]{1,})</gm, "><").replace(/^\s*$[\n\r]{1,}/gm, '');
    }
}
/* global webix */
/* global AWS */
/* global $$ */
/* global $ */
