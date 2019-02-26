import { JetView } from "webix-jet";
export default class AceView extends JetView {
    config() {
        return {
            id: "ace",
            view: "ace-editor",
            theme: "tomorrow",
            mode: "html"
        };
    }
    init() {
        $$("ace").getEditor(true).then(editor => {
            var session = editor.getSession();
            session.setUseWorker(false);
            session.setUseWrapMode(true);
        });
    }
}
/* global $$ */
