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

            var session = editor.getSession();
            
            session.setUseWorker(false);

            session.setUseWrapMode(true);
            console.log(session.getUndoManager());
            session.on('change', function() {
                webix.message("ace changed");
            });
        });
    }
}
