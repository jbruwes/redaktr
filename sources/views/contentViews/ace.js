import { JetView } from "webix-jet";
export default class AceView extends JetView {
    config() {
        return {
            id: "ace",
            view: "ace-editor",
            theme: "tomorrow",
            mode: "html",
            value: ''
        };
    }
    init() {
        $$("ace").getEditor(true).then(function(editor) {
            editor.getSession().setUseWrapMode(true);
            editor.getSession().on('change', function(e) {
                //webix.message("ace change");
            });
        });
    }
}
