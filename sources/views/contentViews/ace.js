import { JetView } from "webix-jet";
export default class AceView extends JetView {
    config() {
        return {
            id: "ace",
            view: "ace-editor",
            theme: "tomorrow",
            mode: "html",
            cdn: "https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.3"
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
