/* jshint esversion: 9 */
import './styles/app.css';
import 'fomantic-ui-css/components/icon.css';
import {
  JetApp,
  EmptyRouter,
} from 'webix-jet';
export default class MyApp extends JetApp {
  constructor(config) {
    const defaults = {
      id: APPNAME,
      version: VERSION,
      router: EmptyRouter,
      debug: !PRODUCTION,
      start: '/top/signin',
      // start: "/top/signinlocal"
    };
    super({
      ...defaults,
      ...config,
    });
  }
}
if (!BUILD_AS_MODULE) {
  webix.ready((_) => {
    webix.i18n.setLocale('ru-RU');
    webix.ui.fullScreen();
    const app = new MyApp();
    const size = (_) => document.body.offsetWidth > 964 ? 'wide' : 'small';
    app.config.size = size();
    app.render();
  });
  webix.protoUI({
    name: 'edittree',
  }, webix.EditAbility, webix.ui.tree);
  webix.protoUI({
    name: 'editlist',
  }, webix.EditAbility, webix.ui.list);
  webix.protoUI({
    name: 'fabric',
    $init: function() {
      this.getIframe().style.position = 'absolute';
      this._waitCanvas = webix.promise.defer();
      this.$ready.push(this.render);
    },
    render: function() {
      if (this.config.cdn === false) {
        webix.delay(this._initCanvas, this);
        return;
      }
      const cdn = this.config.cdn ?
        this.config.cdn :
        '//cdnjs.cloudflare.com/ajax/libs/fabric.js/4.3.1';
      webix.require([cdn + '/fabric.min.js'])
        .then(webix.bind(this._initCanvas, this))
        .catch(function(e) {
          console.log(e);
        });
    },
    _initCanvas: function() {
      const elm = document.createElement('canvas');
      elm.id = this.config.canvas;
      this._canvas = this.$view.appendChild(elm);
      this._canvas = new fabric.Canvas(this._canvas, {
        renderOnAddRemove: false,
        selection: false,
        preserveObjectStacking: true,
      });
      this._waitCanvas.resolve(this._canvas);
      if (this.config.ready) this.config.ready.call(this, this._canvas);
    },
    $setSize: function(x, y) {
      webix.ui.view.prototype.$setSize.call(this, x, y);
      this._waitCanvas.then((_) => {
        const de = this.getWindow().document.documentElement;
        this._canvas.setWidth(de.clientWidth);
        this._canvas.setHeight(de.clientHeight);
      });
    },
    getCanvas: function(waitCanvas) {
      return waitCanvas ? this._waitCanvas : this._canvas;
    },
  }, webix.ui.iframe);
}
