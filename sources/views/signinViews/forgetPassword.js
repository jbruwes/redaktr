import {
	JetView
} from "webix-jet";

export default class ForgetPasswordView extends JetView {
	config() {
		return {
			id: "fnewpass",
			width: 300,
			head: 'Change password',
			position: "center",
			view: "window",
			modal: true,
			close: true,
			move: false,
			body: {
				view: "form",
				id: "forgetpassform",
				borderless: true,
				elements: [{
						view: "text",
						placeholder: 'Use a verification code from an email',
						name: "code",
						id: "code"
					}, {
						view: "text",
						type: "password",
						placeholder: 'New password',
						name: "fpass1",
						id: "fpass1"
					},
					{
						view: "text",
						type: "password",
						placeholder: 'Repeat password',
						name: "fpass2",
						id: "fpass2"
					},
					{
						cols: [{
							view: "button",
							label: 'Cancel',
							align: 'left',
							click: _ => {
								//$$('fnewpass').hide();
								this.getRoot().hide();
							}
						}, {}, {
							view: "button",
							value: "Ok",
							align: "right",
							css: "webix_primary",
							id: "fchangepassword",
							click: _ => {
								if ($$('forgetpassform').validate()) {
									this.cognitoUser.confirmPassword($$('code').getValue(), $$('fpass1').getValue(), {
										onSuccess: _ => webix.message({
											text: "Password was successfully changed",
											type: "success"
										}),
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
						if (!data.fpass1) {
							webix.message({
								text: "You need to specify password",
								type: "debug"
							});
							return false;
						}
						if (data.fpass1 != data.fpass2) {
							webix.message({
								text: "Passwords are not the same",
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
		$$("fpass1").setValue("");
		$$("fpass2").setValue("");
		this.getRoot().show();
	}
}