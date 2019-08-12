import {
	JetView
} from "webix-jet";
export default class TopView extends JetView {
	config() {
		var ui = {
			rows: [{
					id: "toolbar",
					view: "toolbar",
					height: 56,
					//css: "webix_dark",
					cols: [{
							view: "icon",
							icon: "mdi mdi-menu",
							click: _ => {
								$$("sidebar").toggle();
							}
						},
						{
							view: "label",
							label: "<span class='mdi mdi-36px mdi-glassdoor logoRedaktr'></span> <span class='mdi mdi-dark mdi-24px mdi-alpha-r'></span><span class='mdi mdi-dark mdi-24px mdi-alpha-e'></span><span class='mdi mdi-dark mdi-24px mdi-alpha-d'></span><span class='mdi mdi-dark mdi-24px mdi-alpha-a'></span><span class='mdi mdi-dark mdi-24px mdi-alpha-k'></span><span class='mdi mdi-dark mdi-24px mdi-alpha-t'></span><span class='mdi mdi-dark mdi-24px mdi-alpha-r'></span>"
						}
					]
				},
				{
					cols: [{
							view: "sidebar",
							collapsed: true,
							id: "sidebar",
							//css: "webix_dark",
							data: [],
							click: (id) => {
								if (id === "signout") webix.delay(_ => {
									delete AWS.config.credentials.params.Logins['accounts.google.com'];
									delete AWS.config.credentials.params.Logins['cognito-idp.us-east-1.amazonaws.com/us-east-1_isPFINeJO'];
									this.show('signin');
									this._resetSidebar();
								});
								else this.show(id);
							}
						},
						{
							type: "wide",
							padding: 2,
							css: "app_layout",
							rows: [{
								$subview: true
							}]
						}
					]
				}

			]
		};
		return ui;
	}
	_resetSidebar() {
		$$("sidebar").clearAll();
		if ($$("play")) $$("toolbar").removeView("play");
		$$("sidebar").add({
			id: "signin",
			icon: "mdi mdi-login-variant",
			value: "Sign In"
		});
		$$("sidebar").add({
			id: "about",
			icon: "mdi mdi-information-outline",
			value: "About"
		});
		$$("sidebar").select("signin");
	}
	init() {
		$$("sidebar").getPopup().attachEvent("onBeforeShow", () => {
			return false;
		});
		webix.message("В связи с переходом на новую платформу некоторые сайты недоступны для редактирования. Приносим извинения за временные неудобства.", "error", -1);
		this._resetSidebar();
	}
}
/* global webix */
/* global AWS */
/* global $$ */