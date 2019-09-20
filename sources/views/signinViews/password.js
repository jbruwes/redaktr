import {
	JetView
} from "webix-jet";

export default class PasswordView extends JetView {
	config() {
		return {
			view: "popup",
			id: "newpass",
			width: 300,
			head: 'A new password is required!',
			position: "center",
			body: {
				view: "form",
				id: "newpassform",
				borderless: true,
				elements: [{
						view: "text",
						type: "password",
						label: 'Password',
						name: "pass1",
						id: "pass1"
					},
					{
						view: "text",
						type: "password",
						label: 'Repeat password',
						name: "pass2",
						id: "pass2"
					},
					{
						view: "button",
						value: "Change password",
						id: "changepassword",
						click: _ => {
							if ($$('newpassform').validate()) {
								this.cognitoUser.completeNewPasswordChallenge($$('pass1').getValue(), this.attributesData, this.that);
								$$('pass1').setValue('');
								$$('pass2').setValue('');
								this.getRoot().hide();
							}
						}
					}
				],
				rules: {
					$obj: data => {
						if (!data.pass1) {
							webix.message("You need to specify password");
							return false;
						}
						if (data.pass1 != data.pass2) {
							webix.message("Passwords are not the same");
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
	showWindow(cognitoUser, attributesData, that) {
		this.cognitoUser = cognitoUser;
		this.attributesData = attributesData;
		this.that = that;
		this.getRoot().show();
	}
}