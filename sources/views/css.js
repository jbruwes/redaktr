import { JetView } from "webix-jet";
export default class CssView extends JetView {
    config() {
        return {rows:[{ $subview: "ace" }]};
    }
}
