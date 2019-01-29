import { JetView } from "webix-jet";
export default class AceView extends JetView {
    config() {
        return {
            id: "ace",
            view: "ace-editor",
            theme: "xcode",
            mode: "html",
            value: '<h2>Text editor</h2> <div><small>From Wikipedia, the free encyclopedia</small></div> <p>A <strong>text editor</strong> is a type of program used for editing plain text files </p>'
        };
    }
}
