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
                //console.log(self.$scope);
                //var app = self.$scope.app;
                //app.refresh();
                console.log('Signin');
                $$("menu").remove($$("menu").getSelectedId());
                $$("menu").add({ id: "content", icon: "mdi mdi-help-circle-outline", value: "Content" }, 0);
                self.app.show("/top/content");
                //self.app.refresh();
            }
        };
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
                                    click: function() {
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
                                                }).then((googleUser) => {
                                                    //var profile = googleUser.getBasicProfile();
                                                    //var username = profile.getName();
                                                    //var userimage = profile.getImageUrl();
                                                    //var useremail = profile.getEmail();
                                                    delete AWS.config.credentials.params.Logins['graph.facebook.com'];
                                                    AWS.config.credentials.params.Logins['accounts.google.com'] = googleUser.getAuthResponse().id_token;
                                                    AWS.config.credentials.clearCachedId();
                                                    AWS.config.credentials.expired = false;
                                                    AWS.config.credentials.get(signIn);
                                                });
                                            });
                                        });
                                    }
                                }
                            ]
                        }]
                    }, { gravity: 0.38 }]
                }, {}]
            }]
        };
    }
}
