import { JetView } from "webix-jet";
export default class PropertiesView extends JetView {
    config() {
        return {
            view: "form",
            id: "propForm",
            scroll: true,
            elements: [{
                rows: [{ template: "Hard Link", type: "section", css: "webix_section" }, {
                    view: "text",
                    id: "link",
                    name: "link",
                    label: "<span class='mdi mdi-dark mdi-24px mdi-link-variant'></span>",
                    invalidMessage: "Prohibited symbols are used",
                    labelWidth: 33,
                    on: {
                        onChange: value => {
                            var id, item;
                            if ($$('propForm').validate()) {
                                id = $$("tree").getSelectedId();
                                item = $$("tree").getItem(id);
                                item.link = value;
                                $$("tree").updateItem(id, item);
                            }
                        }
                    }
                }, { template: "Date", type: "section", css: "webix_section" }, {
                    view: "datepicker",
                    id: "date",
                    label: "<span class='mdi mdi-dark mdi-24px mdi-calendar'></span>",
                    labelWidth: 33,
                    on: {
                        onChange: value => {
                            var id = $$("tree").getSelectedId(),
                                item = $$("tree").getItem(id);
                            item.date = value;
                            $$("tree").updateItem(id, item);
                        }
                    }
                }, { template: "Description", type: "section", css: "webix_section" }, {
                    view: "textarea",
                    id: "descr",
                    label: "<span class='mdi mdi-dark mdi-24px mdi-card-text-outline'></span>",
                    labelWidth: 33,
                    on: {
                        onChange: value => {
                            var id = $$("tree").getSelectedId(),
                                item = $$("tree").getItem(id);
                            item.description = value;
                            $$("tree").updateItem(id, item);
                        }
                    }
                }, {
                    view: "uploader",
                    id: "uploader",
                    value: 'Upload Image',
                    multiple: false,
                    autosend: false,
                    name: "files",
                    link: "bglist",
                    accept: "image/png, image/gif, image/jpeg",
                    on: {
                        "onAfterFileAdd": file => {
                            this.app.S3.headObject({
                                Bucket: 'base.redaktr.com',
                                Key: AWS.config.credentials.identityId + '/' + file.name
                            }, (err, data) => {
                                file.file.sname = (err ? '' : webix.uid() + '/') + file.name;
                                this.app.S3.putObject({
                                    Bucket: 'base.redaktr.com',
                                    Key: AWS.config.credentials.identityId + '/' + file.file.sname,
                                    ContentType: file.file.type,
                                    Body: file.file
                                }, (err, data) => {
                                    if (err) webix.message({ text: err.message, type: "error" });
                                    //else this.getParentView()._redraw(this.getParentView())
                                });
                            });
                        }
                    }
                }, { template: "Image", type: "section", css: "webix_section" }, {
                    view: "list",
                    id: "bglist",
                    type: "uploader",
                    template: "{common.removeIcon()}{common.percent()}{common.fileName()}",
                    autoheight: true,
                    borderless: true,
                    on: { /*"data->onStoreUpdated": _ => this.getParentView()._redraw(this.getParentView())*/ }
                }]
            }, {}],
            rules: {
                link: value => {
                    return !value || !/[;,//?:@&=+$_]/.test(value);
                }
            },

        };
    }
}
/* global webix */
/* global AWS */
/* global $$ */
