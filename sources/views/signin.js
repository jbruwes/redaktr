import { JetView } from "webix-jet";
export default class SignInView extends JetView {
    config() {
        return {
            css: "signInView",
            cols: [{ gravity: 0.38 }, {
                css: "signInViewRight",
                rows: [{ gravity: 2 }, {
                    css: "signInViewField",
                    padding: 30,
                    cols: [{
                        id: "a1",
                        rows: [{
                            responsive: "a1",
                            cols: [{ minWidth: 200, view: "button", label: "Sign In with Facebook", type: "iconButton", icon: "mdi mdi-facebook" },
                                { minWidth: 200, view: "button", label: "Sign In with Google", type: "iconButton", icon: "mdi mdi-google" }
                            ]
                        }]
                    }, { gravity: 0.38 }]
                }, {}]
            }]
        };
    }
}
