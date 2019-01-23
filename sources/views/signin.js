import $script from "scriptjs";
import { JetView } from "webix-jet";
export default class SignInView extends JetView {
    config() {
        var self = this;
        var signIn = function(err) {
            if (err) {
                webix.message({ text: err, type: "error" });
            }
            else {
                $$("sidebar").clearAll();
                //$$("sidebar").remove($$("sidebar").getSelectedId());
                $$("sidebar").add({ id: "content", icon: "mdi mdi-file-tree", value: "Content" }, 0);
                $$("sidebar").add({ id: "signout", icon: "mdi mdi-logout-variant", value: "Sign Out" });
                self.app.show("/top/content");
            }
        };
        return {
            css: "signInView",
            cols: [{ gravity: 0.38 }, {
                css: "signInViewRight",
                rows: [
                    { paddingX: 10, cols: [{}, { view: "label", label: '<div class="redaktr-circle-logo-container"><div class="redaktr-circle-logo"><span class="mdi mdi-48px mdi-glassdoor largeLogoRedaktr"></span></div></div>', height: 152, width: 152 }] },
                   {gravity: 2},
                    { view: "template", template: "<h1 class='redaktrHeader'>RΞDΔKTR<div>website creator</div></h1>", minHeight: 150 , type: "clean"},
                    {
                        css: "signInViewField",
                        padding: 30,
                        cols: [{
                            id: "a1",
                            rows: [{
                                responsive: "a1",
                                cols: [{
                                        minWidth: 200,
                                        view: "button",
                                        label: "Sign In with Facebook",
                                        type: "iconButton",
                                        icon: "mdi mdi-facebook",
                                        click: () => {
                                            $script('//connect.facebook.net/en_US/sdk.js', () => {
                                                FB.init({
                                                    appId: '606212879479370',
                                                    cookie: true,
                                                    xfbml: true,
                                                    version: 'v3.2'
                                                });
                                                FB.login((response) => {
                                                    if (response.status === 'connected') {
                                                        /*FB.api(
                                                            '/me', {
                                                                fields: 'name, email, picture'
                                                            },
                                                            function(response) {
                                                                var username = response.name;
                                                                var userimage = response.picture.data.url;
                                                                var useremail = response.email;
                                                            });*/
                                                        delete AWS.config.credentials.params.Logins['accounts.google.com'];
                                                        AWS.config.credentials.params.Logins['graph.facebook.com'] = response.authResponse.accessToken;
                                                        AWS.config.credentials.clearCachedId();
                                                        AWS.config.credentials.expired = false;
                                                        AWS.config.credentials.get(signIn);

                                                    }
                                                }, {
                                                    scope: 'email'
                                                });
                                            });
                                        }
                                    },
                                    {
                                        minWidth: 200,
                                        view: "button",
                                        label: "Sign In with Google",
                                        type: "iconButton",
                                        icon: "mdi mdi-google",
                                        click: () => {
                                            //var self = this;
                                            $script('//apis.google.com/js/platform.js', () => {
                                                window.gapi.load('auth2', () => {
                                                    var auth2 = window.gapi.auth2.init({
                                                        client_id: '1098421926055-ss56dm06c6fuupnjdrjj7er0l7b705on.apps.' +
                                                            'googleusercontent.com' //,
                                                        //cookiepolicy: 'single_host_origin'
                                                    });
                                                    auth2.signIn({
                                                        prompt: 'select_account'
                                                    }).then((value) => {
                                                        //var profile = value.getBasicProfile();
                                                        //var username = profile.getName();
                                                        //var userimage = profile.getImageUrl();
                                                        //var useremail = profile.getEmail();
                                                        delete AWS.config.credentials.params.Logins['graph.facebook.com'];
                                                        AWS.config.credentials.params.Logins['accounts.google.com'] = value.getAuthResponse().id_token;
                                                        AWS.config.credentials.clearCachedId();
                                                        AWS.config.credentials.expired = false;
                                                        AWS.config.credentials.get(signIn);
                                                    }, (reason) => {
                                                        webix.message({ text: reason.error, type: "error" });
                                                    });
                                                });
                                            });
                                        }
                                    }
                                ]
                            }]
                        }, { gravity: 0.38 }]
                    }, {}, {
                        padding: 2,
                        cols: [{}, {
                            view: "button",
                            type: "icon",
                            width: 300,
                            label: "𝔚𝔬𝔩𝔨𝔢𝔫 𝔚𝔢𝔯𝔨𝔰𝔱𝔞𝔱𝔱 𝔚𝔢𝔟𝔞𝔤𝔢𝔫𝔱𝔲𝔯",
                            icon: "mdi mdi-dark mdi-cursor-default-click-outline",
                            click: () => {
                                window.open("https://w--w--w.com", "_blank");
                            }
                        }]
                    }
                ]
            }]
        };
    }
}
