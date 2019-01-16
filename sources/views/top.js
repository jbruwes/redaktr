import { JetView, plugins } from "webix-jet";
export default class TopView extends JetView {
	config() {
		var ui = {
			rows: [{
					view: "toolbar",
					height: 56,
					elements: [{
							view: "icon",
							icon: "mdi mdi-menu",
							click: function() {
								$$("menu").toggle();
							}
						},
						{},
						{
							view: "icon",
							icon: "mdi mdi-logout-variant",
							click: () => {
								delete AWS.config.credentials.params.Logins['accounts.google.com'];
								delete AWS.config.credentials.params.Logins['graph.facebook.com'];
								this.show('signin');
								this.app.refresh();
							}
						}
					]
				},
				{
					cols: [{
							view: "sidebar",
							collapsed: true,
							id: "menu",
							data: [{ id: "signin", icon: "mdi mdi-login-variant", value: "Sign In" }, { id: "about", icon: "mdi mdi-help-circle-outline", value: "About" }],
							click: function(id) {
								this.$scope.show(id);
							}
						},
						{
							type: "space",
							css: "app_layout",
							rows: [
								{ $subview: true }
							]
						}
					]
				}

			]
		};
		return ui;
	}
	init() {
		$$("menu").getPopup().attachEvent("onBeforeShow", function() { return false; });
		this.app.attachEvent("app:route", function(url) {
			$$("menu").select(url[1].page);
		});
		this.app.attachEvent("app:guard", function(url, view, nav) {
			if (!(nav.url[1].page === 'signin' || nav.url[1].page === 'about') && !Object.keys(AWS.config.credentials.params.Logins).length) {
				nav.redirect = "/top/signin";
		}
		});
	}
}
