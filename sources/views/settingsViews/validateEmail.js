import {
	JetView
} from "webix-jet";

export default class ValidateEmailView extends JetView {
	config() {
		return {
			width: 300,
			head: 'Validate email',
			position: "center",
			view: "window",
			modal: true,
			close: true,
			move: false,
			body: {
				view: "form",
				id: "validateemailform",
				borderless: true,
				elements: [{
						view: "text",
						placeholder: 'Use a verification code from an email',
						name: "code",
						id: "code"
					},
					{
						cols: [{
							view: "button",
							label: 'Cancel',
							align: 'left',
							click: _ => {
								this.getRoot().hide();
							}
						}, {}, {
							view: "button",
							value: "Ok",
							align: "right",
							css: "webix_primary",
							click: _ => {
								if ($$('validateemailform').validate()) {
									this.cognitoUser.verifyAttribute('email', $$("code").getValue(), {
										onSuccess: _ => {
											webix.message({
												text: "Your email has been verified",
												type: "success"
											});
											$$("email").config.icon = "mdi mdi-shield-check";
											$$("email").refresh();
											$$("verifyButton").disable();
										},
										onFailure: err => webix.message({
											text: err.message,
											type: "error"
										})
									});
									this.getRoot().hide();
								}
							}
						}]
					}
				],
				rules: {
					$obj: data => {
						if (!data.code) {
							webix.message({
								text: "You need to specify verification code",
								type: "debug"
							});
							return false;
						}
						return true;
					}
				},
				elementsConfig: {
					labelPosition: "top",
				}
			}
		};
	}
	showWindow(cognitoUser, that) {
		this.cognitoUser = cognitoUser;
		this.that = that;
		$$("code").setValue("");
		this.getRoot().show();
	}
}