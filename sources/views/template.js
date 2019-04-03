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
        $$('fabric').attachEvent("onAfterLoad", _ => {
            $$('fabric').getCanvas().setWidth($$('fabric').getWindow().document.documentElement.clientWidth);
            $$('fabric').getCanvas().setHeight($$('fabric').getWindow().document.documentElement.clientHeight);
            $($$('fabric').getWindow()).scroll(_ => this._makeSelection(this));
            var observer = new MutationObserver(_ => this._makeSelection(this));
            observer.observe($$("fabric").getWindow().document.body, { 'attributes': true, 'childList': true, 'characterData': true, 'subtree': true });
            $$("layers").select($$("layers").getFirstId());
        });
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
                    case 1:
                        icon = 'mdi mdi-monitor-multiple';
                        break;
                    case 2:
                        icon = 'mdi mdi-monitor-lock';
                        break;
                    case 3:
                        icon = 'mdi mdi-monitor-star';
                        break;
                    case 4:
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
            $$("fabric").getCanvas(true).then(canvas => {
                $(list.toArray().reverse()).each((i, e) => { canvas.add($$("layers").getItem($(e).attr("id")).rect) });
                canvas.on('selection:updated', options => { $$("layers").select(options.target.id) });
                canvas.on('selection:cleared', options => { canvas.setActiveObject(options.deselected[0]) });
                canvas.on('object:modified', options => {
                    var layer = $$("layers").getItem(options.target.id);
                    this._updateDND({ top: layer.top, left: layer.left, angle: layer.angle, oCoords: layer.oCoords }, { top: options.target.top, left: options.target.left, angle: options.target.angle, oCoords: options.target.oCoords });
                    //this._redraw();
                });
            });

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
        if (item.parents('div[data-absolute]:not([id])').parents('div[data-relative]:not([id])').parents('#body').length) return 4;
        if (item.parents('div[data-absolute]:not([id])').parents('#body').length) return 1;
        if (item.parents('div[data-fixed]:not([id])').parents('#body').length) return 2;
        //if (item.parents('div[data-static]:not([id])').parents('#body').length || item.parents('div[data-static]:not([id])').parents('div[data-relative]:not([id])').parents('#body').length) return 3;
        return 3;
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
    _updateDND(oldRect, newRect) {
        var deltaAngle = oldRect.angle - newRect.angle;
        if (deltaAngle !== 0) {
            deltaAngle = Math.round($$('angle').getValue() - deltaAngle);
            if (deltaAngle > 180) {
                deltaAngle = deltaAngle - 360;
            }
            $$('angle').setValue(deltaAngle);
            console.log(deltaAngle);
        }
        /*else {
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
                document = this.getSite().getDocument(),
                dX = 100 / document.body.scrollWidth,
                dY = 100 / document.body.scrollHeight;
            if (this._pageGeometry.getTopC()) {
                switch (this._pageGeometry.getTopGUnit()) {
                    case 'px':
                        this._pageGeometry.setTopG(Math.round(this._pageGeometry.getTopGValue() + delta.top) + 'px');
                        break;
                    case '%':
                    case 'vh':
                        this._pageGeometry.setTopG(Math.round(this._pageGeometry.getTopGValue() + dY * delta.top) + '%');
                        break;
                }
            }
            if (this._pageGeometry.getBottomC()) {
                switch (this._pageGeometry.getBottomGUnit()) {
                    case 'px':
                        this._pageGeometry.setBottomG(Math.round(this._pageGeometry.getBottomGValue() - delta.bottom) + 'px');
                        break;
                    case '%':
                    case 'vh':
                        this._pageGeometry.setBottomG(Math.round(this._pageGeometry.getBottomGValue() - dY * delta.bottom) + '%');
                        break;
                }
            }
            if (!(this._pageGeometry.getTopC() && this._pageGeometry.getBottomC()) && this._pageGeometry.getHeightC()) {
                switch (this._pageGeometry.getHeightGUnit()) {
                    case 'px':
                        this._pageGeometry.setHeightG(Math.round(this._pageGeometry.getHeightGValue() - (delta.top - delta.bottom)) + 'px');
                        break;
                    case '%':
                    case 'vh':
                        this._pageGeometry.setHeightG(Math.round(this._pageGeometry.getHeightGValue() - dY * (delta.top - delta.bottom)) + '%');
                        break;
                }
            }
            if (this._pageGeometry.getLeftC()) {
                switch (this._pageGeometry.getLeftGUnit()) {
                    case 'px':
                        this._pageGeometry.setLeftG(Math.round(this._pageGeometry.getLeftGValue() + delta.left) + 'px');
                        break;
                    case '%':
                    case 'vh':
                        this._pageGeometry.setLeftG(Math.round(this._pageGeometry.getLeftGValue() + dX * delta.left) + '%');
                        break;
                }
            }
            if (this._pageGeometry.getRightC()) {
                switch (this._pageGeometry.getRightGUnit()) {
                    case 'px':
                        this._pageGeometry.setRightG(Math.round(this._pageGeometry.getRightGValue() - delta.right) + 'px');
                        break;
                    case '%':
                    case 'vh':
                        this._pageGeometry.setRightG(Math.round(this._pageGeometry.getRightGValue() - dX * delta.right) + '%');
                        break;
                }
            }
            if (!(this._pageGeometry.getLeftC() && this._pageGeometry.getRightC()) && this._pageGeometry.getWidthC()) {
                switch (this._pageGeometry.getWidthGUnit()) {
                    case 'px':
                        this._pageGeometry.setWidthG(Math.round(this._pageGeometry.getWidthGValue() - (delta.left - delta.right)) + 'px');
                        break;
                    case '%':
                    case 'vh':
                        this._pageGeometry.setWidthG(Math.round(this._pageGeometry.getWidthGValue() - dX * (delta.left - delta.right)) + '%');
                        break;
                }
            }
        }*/
    }
    _makeSelection(that) {
        console.log('_makeSelection');
        that = that ? that : this;
        var id = $$("layers").getFirstId(),
            //fabricWindow = $($$("fabric").getWindow()),
            layer = null,
            map = null,
            rect = null,
            selObj = null,
            style = null,
            isHidden = $($$("fabric").getIframe()).parents(':hidden'),
            fabricDocument = $($$("fabric").getIframe()).contents();

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
                layer = $$("layers").getItem(id);
                rect = layer.rect;
                layer.left = 0;
                layer.top = 0;
                layer.angle = 0;
                selObj = fabricDocument.find("#" + id);
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
                        map = selObj[0].getBoundingClientRect();
                        style = selObj.attr("style");
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
                        layer.left = rect.left;
                        layer.top = rect.top;
                        layer.angle = rect.angle;
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
                layer.oCoords = rect.oCoords;
                id = $$("layers").getNextId(id);
            } while (id);
            $$('fabric').getCanvas().setActiveObject($$('layers').getSelectedItem().rect);
            $$('fabric').getCanvas().requestRenderAll();
        }
        if (isHidden.length) swap(isHidden[isHidden.length - 1], { position: "absolute", visibility: "hidden", display: "block" }, doLayers);
        else doLayers();
        var item = that._body.find("#" + $$('layers').getSelectedId());
        if (item.length) {
            $$('mode').setValue(that._getMode(item));
            $$('dock').setValue((!item.parents('div.container:not([id])').length) + 1);
            $$('angle').setValue((item.attr('style').match(/rotate\(-?\d+deg\)/g) || [''])[0].replace('rotate(', '').replace('deg)', ''));
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
            var marginTop = item[0].style.marginTop;
            $$('marginTop').setValue(parseInt(marginTop));
            $$('pmarginTop').setValue(((marginTop && parseInt(marginTop)) ? marginTop : 'px').match(/\D+$/)[0]);
            var height = item[0].style.height ? item[0].style.height : item[0].style.minHeight;
            $$('height').setValue(parseInt(height));
            $$('pheight').setValue(((height && parseInt(height)) ? height : 'px').match(/\D+$/)[0]);
            var marginBottom = item[0].style.marginBottom;
            $$('marginBottom').setValue(parseInt(marginBottom));
            $$('pmarginBottom').setValue(((marginBottom && parseInt(marginBottom)) ? marginBottom : 'px').match(/\D+$/)[0]);
            var marginLeft = item[0].style.marginLeft;
            $$('marginLeft').setValue(parseInt(marginLeft));
            $$('pmarginLeft').setValue(((marginLeft && parseInt(marginLeft)) ? marginLeft : 'px').match(/\D+$/)[0]);
            var width = item[0].style.width ? item[0].style.width : item[0].style.minWidth;
            $$('width').setValue(parseInt(width));
            $$('pwidth').setValue(((width && parseInt(width)) ? width : 'px').match(/\D+$/)[0]);
            var marginRight = item[0].style.marginRight;
            $$('marginRight').setValue(parseInt(marginRight));
            $$('pmarginRight').setValue(((marginRight && parseInt(marginRight)) ? marginRight : 'px').match(/\D+$/)[0]);
            $$('borderTopLeftRadius').setValue(parseInt(item[0].style.borderTopLeftRadius));
            $$('borderTopRightRadius').setValue(parseInt(item[0].style.borderTopRightRadius));
            $$('borderBottomLeftRadius').setValue(parseInt(item[0].style.borderBottomLeftRadius));
            $$('borderBottomRightRadius').setValue(parseInt(item[0].style.borderBottomRightRadius));
            $$('textColor').setValue(item[0].style.color ? webix.color.rgbToHex(item[0].style.color) : '#000000');
            var backgroundImage = item[0].style.backgroundImage;
            backgroundImage = backgroundImage ? backgroundImage : '';
            backgroundImage = (backgroundImage !== '' && backgroundImage !== 'none') ? backgroundImage.replace('url(', '').replace(')', '').replace(/"/g, '').replace(new RegExp((window.location.protocol + "//" + window.location.host + window.location.pathname).replace(/[^\/]*$/, ''), "g"), "") : '';
            $$("uploader").files.data.clearAll();
            if (backgroundImage) $$("uploader").addFile(backgroundImage, 0);
            var backgroundPosition = item[0].style.backgroundPosition;
            backgroundPosition = backgroundPosition ? backgroundPosition : 'px px';
            backgroundPosition = backgroundPosition.split(" ");
            $$('backgroundPositionH').setValue(parseInt(backgroundPosition[0]));
            $$('pbackgroundPositionH').setValue(backgroundPosition[0].match(/\D+$/)[0]);
            $$('backgroundPositionV').setValue(parseInt(backgroundPosition[1]));
            $$('pbackgroundPositionV').setValue(backgroundPosition[1].match(/\D+$/)[0]);
            var backgroundRepeat = item[0].style.backgroundRepeat;
            $$('repeatX').setValue((!backgroundRepeat || /\brepeat(?![\w-])/.test(backgroundRepeat) || backgroundRepeat === 'repeat-x') ? true : false);
            $$('repeatY').setValue((!backgroundRepeat || /\brepeat(?![\w-])/.test(backgroundRepeat) || backgroundRepeat === 'repeat-y') ? true : false);
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
                    var boxShadowGeom = cur.filter(val => { return val.match(/^-?\d+/) });
                    var boxShadowParams = cur.filter(val => { return !val.match(/^-?\d+/) });
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
                if (data.hasOwnProperty(x)) $$("data").add({ data: x.replace(/[A-Z]/g, '-$&').toLowerCase(), value: data[x] });
            if (data.length) $$("data").select($$("data").getFirstId());
            $$("class").clearAll();
            var classRow = item.attr("class");
            classRow = classRow ? classRow.split(/\s+/) : classRow;
            for (var x in classRow)
                $$("class").add({ class: classRow[x] });
            if (classRow.length) $$("class").select($$("class").getFirstId());
        }
    }
}
/* global MutationObserver */
/* global fabric */
/* global webix */
/* global AWS */
/* global $$ */
/* global $ */
