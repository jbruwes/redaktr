import { JetView } from "webix-jet";
export default class CdnView extends JetView {
    config() {
        return {
            id: "cdn",
            view: "datatable",
            select: "row",
            columns: [
                { id: "url", editor: "text", header: "CSS path", fillspace: true }
            ],
            editable: true
            /*,
                        on: {
                            "data->onStoreUpdated": _ => {
                                if (!this._lockurl) {
                                    var url = [];
                                    $.each($$('cdn').serialize(), (index, value) => url.push('@import url(' + value.url + ');'));
                                    if (this._lastXHRPost) this._lastXHRPost.abort();
                                    this._lastXHRPost = this.app.S3.putObject({
                                        Bucket: 'base.redaktr.com',
                                        Key: AWS.config.credentials.identityId + '.cdn.css',
                                        ContentType: 'text/css',
                                        Body: url.join('\n')
                                    }, (err, data) => {
                                        if (err) { if (err.code !== "RequestAbortedError") webix.message({ text: err.message, type: "error" }) }
                                        else webix.message("CSS cdn list save complete");
                                    });
                                }
                            }
                        }*/
        };
    }
    init() {
        webix.ajax("https://base.redaktr.com/" + AWS.config.credentials.identityId + ".cdn.css", (text, data, XmlHttpRequest) => {
            if ($$('sidebar').getSelectedId() === 'css') {
                $$("cdn").clearAll();
                var url = text ? text.split("\n") : [];
                for (var x in url) $$("cdn").add({ url: url[x].replace(/^@import url\(/, '').replace(/\);$/, '') });
                if (url.length) $$("cdn").select($$("cdn").getFirstId());
                $$("cdn").data.attachEvent("onStoreUpdated", _ => {
                    var url = [];
                    $.each($$('cdn').serialize(), (index, value) => url.push('@import url(' + value.url + ');'));
                    if (this._lastXHRPost) this._lastXHRPost.abort();
                    this._lastXHRPost = this.app.S3.putObject({
                        Bucket: 'base.redaktr.com',
                        Key: AWS.config.credentials.identityId + '.cdn.css',
                        ContentType: 'text/css',
                        Body: url.join('\n')
                    }, (err, data) => {
                        if (err) { if (err.code !== "RequestAbortedError") webix.message({ text: err.message, type: "error" }) }
                        else webix.message("CSS cdn list save complete");
                    });
                });
            }
        });
    }
}
/* global webix */
/* global AWS */
/* global $$ */
/* global $ */
