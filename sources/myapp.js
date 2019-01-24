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
	webix.attachEvent("onBeforeAjax",
		function(mode, url, data, request, headers, files, promise) {
			var httpRequest = new AWS.HttpRequest(url, "us-east-1");
			//REQUIRED
			//Host & content type headers must be set
			httpRequest.headers.host = "api.redaktr.com"; //Host of the API being called
			httpRequest.headers['Content-Type'] = "application/json";
			//OPTIONAL
			httpRequest.method = mode; //Default is POST
			if (data) { httpRequest.body = data; }
			var v4signer = new AWS.Signers.V4(httpRequest, "execute-api", true);
			v4signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());
			headers["Authorization"] = httpRequest.headers["Authorization"];
			headers["Content-Type"] = httpRequest.headers["Content-Type"];
			headers["X-Amz-Date"] = httpRequest.headers["X-Amz-Date"];
			headers["X-Amz-User-Agent"] = httpRequest.headers["X-Amz-User-Agent"];
			headers["x-amz-security-token"] = httpRequest.headers["x-amz-security-token"];
		}
	);
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

	webix.protoUI({
		name: "edittree"
	}, webix.EditAbility, webix.ui.tree);

}
