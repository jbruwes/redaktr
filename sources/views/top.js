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
							click: () => {
								$$("sidebar").toggle();
							}
						},
						{},
						{ view: "icon", icon: "mdi mdi-help-circle-outline" }
					]
				},
				{
					cols: [{
							view: "sidebar",
							collapsed: true,
							id: "sidebar",
							data: [],
							click: (id) => {
								if (id === "signout") {
									delete AWS.config.credentials.params.Logins['accounts.google.com'];
									delete AWS.config.credentials.params.Logins['graph.facebook.com'];
									webix.delay(() => {
										this.resetSidebar();
										this.show('signin');
									});
								}
								else {
									this.show(id);
								}
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
	resetSidebar() {
		$$("sidebar").clearAll();
		$$("sidebar").add({ id: "signin", icon: "mdi mdi-login-variant", value: "Sign In" });
		$$("sidebar").add({ id: "about", icon: "mdi mdi-information-outline", value: "About" });
	}
	init() {
		$$("sidebar").getPopup().attachEvent("onBeforeShow", () => { return false; });
		webix.delay(() => {
			this.app.attachEvent("app:route", (url) => {
				$$("sidebar").select(url[1].page);
			});
			this.resetSidebar();
			this.show('signin');
		});
	}
}
