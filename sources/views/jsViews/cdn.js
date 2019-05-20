import { JetView } from "webix-jet";
export default class CdnView extends JetView {
    config() {
        return {
            id: "cdn",
            view: "datatable",
            select: "row",
            columns: [
                { id: "csspath", editor: "text", header: "JS path", fillspace: true }
            ],
            editable: true,
            on: {
                "data->onStoreUpdated": _ => {
                    if (!this._lockCSSPath) {
                        var csspath = [];
                        $.each($$('cdn').serialize(), (index, value) => csspath.push('@import url(' + value.csspath + ');'));
                        if (this._lastXHRPost) this._lastXHRPost.abort();
                        this._lastXHRPost = this.app.S3.putObject({
                            Bucket: 'base.redaktr.com',
                            Key: AWS.config.credentials.identityId + '.cdn.css',
                            ContentType: 'text/css',
                            Body: csspath.join('\n')
                        }, (err, data) => {
                            if (err) { if (err.code !== "RequestAbortedError") webix.message({ text: err.message, type: "error" }) }
                            else webix.message("CSS cdn list save complete");
                        });
                    }
                }
            }
        };
    }
    init() {
        webix.ajax("https://base.redaktr.com/" + AWS.config.credentials.identityId + ".cdn.css", (text, data, XmlHttpRequest) => {
            if ($$('sidebar').getSelectedId() === 'css') {
                this._lockCSSPath = true;
                $$("cdn").clearAll();
                var csspath = text ? text.split("\n") : [];
                for (var x in csspath) $$("cdn").add({ csspath: csspath[x].replace(/^@import url\(/, '').replace(/\);$/, '') });
                if (csspath.length) $$("cdn").select($$("cdn").getFirstId());
                this._lockCSSPath = false;
            }
        });
    }
}
/* global webix */
/* global AWS */
/* global $$ */
/* global $ */
