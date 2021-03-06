import {
  JetView,
} from 'webix-jet';
export default class AceView extends JetView {
  config() {
    return {
      view: 'ace-editor',
      id: 'ace-css',
      theme: 'tomorrow',
      mode: 'css',
      cdn: '//cdnjs.cloudflare.com/ajax/libs/ace/1.4.12',
    };
  }
  init(ace) {
    const cb = (text) => {
      if ($$('sidebar').getSelectedId() === 'css') {
        $$('ace-css').getEditor(true).then((editor) => {
          const session = editor.getSession();
          this.timeoutId = [];
          session.that = this;
          session.setUseWrapMode(true);
          session.setValue(text, -1);
          session.on('change', this._aceChange, this);
          editor.resize();
        });
      }
    };
    this.app.S3.getObject({
      Bucket: 'redaktr',
      Key: this.app.identityId + '/index.css',
    }, (err, data) => {
      if (err) cb('');
      else cb(data.Body.toString());
    });
  }
  _aceChange(e, session) {
    session.that.timeoutId.push(webix.delay(function() {
      this.timeoutId.pop();
      if (!this.timeoutId.length) {
        if (this.app.lastXHRPostAce) this.app.lastXHRPostAce.abort();
        this.app.lastXHRPostAce = this.app.S3.putObject({
          Bucket: 'redaktr',
          ContentType: 'text/css',
          Key: this.app.identityId + '/index.css',
          Body: $$('ace-css').getEditor().getValue(),
        }, (err, data) => {
          if (err) {
            if (err.code !== 'RequestAbortedError') {
              webix.message({
                text: err.message,
                type: 'error',
              });
            }
          } else webix.message('CSS save complete');
        });
      }
    }, session.that, [], 1000));
  }
}
/* global webix */
/* global AWS */
/* global $$ */
