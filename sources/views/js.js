import { JetView } from "webix-jet";
export default class JsView extends JetView {
    config() {
        return { rows: [{ $subview: "ace" }] };
    }
}
