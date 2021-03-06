import {
  JetView,
} from 'webix-jet';
export default class AceView extends JetView {
  config() {
    return {
      view: 'ace-editor',
      theme: 'tomorrow',
      mode: 'html',
      cdn: '//cdnjs.cloudflare.com/ajax/libs/ace/1.4.12',
    };
  }
  init(ace) {
    ace.getEditor(true).then((editor) => {
      const session = editor.getSession();
      this.timeoutId = [];
      session.that = this;
      // session.setUseWorker(false);
      session.on('changeAnnotation', function() {
        const annotations = session.getAnnotations() || [];
        const len = annotations.length;
        let i = len;
        while (i--) { if (/doctype first\. Expected/.test(annotations[i].text)) annotations.splice(i, 1); }
        if (len > annotations.length) session.setAnnotations(annotations);
      });
      session.setUseWrapMode(true);
    });
  }
  _aceChange(e, session) {
    session.that.timeoutId.push(webix.delay(function() {
      this.timeoutId.pop();
      if (!this.timeoutId.length) {
        $$('tinymce').setValue(this.getRoot().getEditor().getValue());
        this.getParentView()._save(null, this.getParentView());
      }
    }, session.that, [], 1000));
  }
  setValue(html) {
    this.getRoot().getEditor(true).then((editor) => {
      const session = editor.getSession();
      session.off('change', this._aceChange, this);
      session.setValue(html, -1);
      session.on('change', this._aceChange, this);
      editor.resize();
    });
  }
}
/* global $$ */
