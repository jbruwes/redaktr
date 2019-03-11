import "./styles/app.css";
import { JetApp, EmptyRouter } from "webix-jet";
export default class MyApp extends JetApp {
	constructor(config) {
		const defaults = {
			id: APPNAME,
			version: VERSION,
			router: EmptyRouter,
			debug: !PRODUCTION,
			start: "/top/signin"
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
	/*
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
	*/
	webix.ready(() => {
		webix.ui.fullScreen();
		var app = new MyApp();
		app.S3 = new AWS.S3({ apiVersion: '2006-03-01', correctClockSkew: true });
		app.render();
	});

	webix.protoUI({
		name: "edittree"
	}, webix.EditAbility, webix.ui.tree);

	webix.protoUI({
		name: "tinymce-editor",
		defaults: {
			config: { theme: "modern", statusbar: false },
			barHeight: 72,
			value: ""
		},
		$init: function(config) {
			this.$view.className += " webix_selectable";

			this._waitEditor = webix.promise.defer();
			//this.$ready.push(this.render);
			this.$ready.push(this._require_tinymce_once);
		},
		render: function() {
			this._set_inner_size();
		},
		_require_tinymce_once: function() {

			//set id for future usage
			this._mce_id = "webix_mce_" + this.config.id;
			this.$view.innerHTML = "<textarea id='" + this._mce_id + "' style='visibility:hidden'></textarea>";

			if (this.config.cdn === false) {
				this._init_tinymce_once();
				return;
			}

			var cdn = this.config.cdn ? this.config.cdn : "//cloud.tinymce.com/5";

			//path to tinymce codebase
			window.tinyMCEPreInit = {
				query: "",
				base: cdn,
				suffix: ".min"
			};

			webix.require([
					cdn + "/tinymce.min.js?apiKey=r2lw5k8fd0gyrwrhztc4ie6zdmanh9ovn6c38xwh8ujjimpw"
				])
				.then(webix.bind(this._init_tinymce_once, this))
				.catch(function(e) {
					console.log(e);
				});

		},
		_init_tinymce_once: function() {

			if (!tinymce.dom.Event.domLoaded) {
				//woraround event logic in tinymce
				tinymce.dom.Event.domLoaded = true;
				webix.html.addStyle(".mce-tinymce.mce-container{ border-width:0px !important}");
			}

			var config = this.config.config;

			config.mode = "exact";
			config.height = 300;
			config.elements = [this._mce_id];
			config.id = this._mce_id;

			var customsetup = config.setup;
			config.setup = webix.bind(function(editor) {
				if (customsetup) customsetup(editor);
				this._mce_editor_setup(editor);
			}, this);

			tinyMCE.init(config);


			this._init_tinymce_once = function() {};
		},
		_mce_editor_setup: function(editor) {
			editor.on("init", webix.bind(this._mce_editor_ready, this));
		},
		_mce_editor_ready: function(editor) {
			this._3rd_editor = tinyMCE.get(this._mce_id);
			this._set_inner_size();
			this._waitEditor.resolve(this._3rd_editor);

			this.setValue(this.config.value);
			if (this._focus_await)
				this.focus();
		},
		_set_inner_size: function() {
			if (!this._3rd_editor || !this.$width) return;
			//this._3rd_editor.theme.resizeTo(this.$width-2, this.$height - this.config.barHeight);
		},
		$setSize: function(x, y) {
			if (webix.ui.view.prototype.$setSize.call(this, x, y)) {
				if (!this._3rd_editor)
					this._require_tinymce_once();
				this._set_inner_size();
			}
		},
		setValue: function(value) {
			this.config.value = value;
			if (this._3rd_editor)
				this._3rd_editor.setContent(value);
		},
		getValue: function() {
			return this._3rd_editor ? this._3rd_editor.getContent() : this.config.value;
		},
		focus: function() {
			this._focus_await = true;
			if (this._3rd_editor)
				this._3rd_editor.focus();
		},
		getEditor: function(waitEditor) {
			return waitEditor ? this._waitEditor : this._3rd_editor;
		}
	}, webix.ui.view);

	webix.protoUI({
		name: "fabric",
		$init: function() {
			this._waitCanvas = webix.promise.defer();
			this.$ready.push(this.render);
		},
		render: function() {

			if (this.config.cdn == false) {
				webix.delay(this._initCanvas, this);
				return;
			}

			var cdn = this.config.cdn ? this.config.cdn : "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/2.6.0";
			webix.require([
					cdn + "/fabric.min.js"
				])
				.then(webix.bind(this._initCanvas, this))
				.catch(function(e) {
					console.log(e);
				});
		},
		_initCanvas: function() {
			var elm = document.createElement("canvas");
			elm.id = this.config.canvas;
			this._canvas = this.$view.appendChild(elm);
			this._canvas = new fabric.Canvas(this._canvas, {
				renderOnAddRemove: false,
				selection: false,
				preserveObjectStacking: true
			});
			this._waitCanvas.resolve(this._canvas);

			if (this.config.ready)
				this.config.ready.call(this, this._canvas);
		},
		$setSize: function(x, y) {
			if (webix.ui.view.prototype.$setSize.call(this, x, y)) {
				this._waitCanvas.then(function(canvas) {
					canvas.setWidth(x);
					canvas.setHeight(y);
				});
			}
		},
		getCanvas: function(waitCanvas) {
			return waitCanvas ? this._waitCanvas : this._canvas;
		}
	}, webix.ui.iframe);

}
/* global tinyMCE */
/* global webix */
/* global fabric */
/* global AWS */
