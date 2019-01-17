import "./styles/app.css";
import { JetApp, EmptyRouter, HashRouter } from "webix-jet";

export default class MyApp extends JetApp {
	constructor(config) {
		const defaults = {
			id: APPNAME,
			version: VERSION,
			router: BUILD_AS_MODULE ? EmptyRouter : HashRouter,
			debug: !PRODUCTION,
			start: "/top"
		};

		super({ ...defaults, ...config });
	}
}

if (!BUILD_AS_MODULE) {
	AWS.config.region = 'us-east-1';
	AWS.config.correctClockSkew = true;
	AWS.config.credentials = new AWS.CognitoIdentityCredentials({
		IdentityPoolId: 'us-east-1:92faa262-cf0e-4586-98d5-2f74fa89baec',
		Logins: {}
	});
	webix.ready(() => {
		var app = new MyApp();
		app.attachEvent("app:guard", (url, view, nav) => {
			if (nav.url.length === 1 || (nav.url.length > 1 &&
					(nav.url[0].page !== 'top' ||
						(!(nav.url[1].page === 'signin' || nav.url[1].page === 'about') && !Object.keys(AWS.config.credentials.params.Logins).length)))) {
				nav.redirect = "/top/signin";
			}
		});
		app.render();
	});
}
