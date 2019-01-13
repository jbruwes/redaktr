import { JetView } from "webix-jet";
export default class SignInView extends JetView {
    config() {
        return {
            css: "signInView",
            rows: [
                { template: "Start page" },
                {},
                {
                    cols: [
                        {},
                        { template: "Start page" },
                        {}
                    ]
                },
                {}
            ]
        };
    }
}
