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
						{ view: "icon", icon: "mdi mdi-bell", badge: 3 },
						{ view: "icon", icon: "mdi mdi-settings" }
					]
				},
				{
					cols: [{
							view: "sidebar",
							collapsed: true,
							id: "menu",
							data: [
								{ id: "signin", icon: "mdi mdi-login-variant", value: "Sign In" },
								{ id: "about", icon: "mdi mdi-help-circle-outline", value: "About" }
							],
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
		$$("menu").select("signin");
	}
}
