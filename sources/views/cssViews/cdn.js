import $ from 'jquery/dist/jquery.slim';
import {
  JetView,
} from 'webix-jet';
export default class CdnView extends JetView {
  config() {
    return {
      id: 'cdn',
      view: 'datatable',
      select: 'row',
      columns: [{
        id: 'url',
        editor: 'text',
        header: 'CSS path',
        fillspace: true,
      }],
      editable: true,
    };
  }
  init() {
    this.app.S3.getObject({
      Bucket: 'redaktr',
      Key: this.app.identityId + '/index.cdn.css',
    }, (err, data) => {
      if (err) {
        webix.message({
          text: err.message,
          type: 'error',
        });
      } else if ($$('sidebar').getSelectedId() === 'css') {
        $$('cdn').clearAll();
        const url = data.Body.toString() ? data.Body.toString().split('\n') : [];
        for (const x in url) {
          $$('cdn').add({
            url: url[x].replace(/^@import url\(/, '').replace(/\);$/, ''),
          });
        }
        if (url.length) $$('cdn').select($$('cdn').getFirstId());
      }
      if ($$('sidebar').getSelectedId() === 'css') {
        $$('cdn').data.attachEvent('onStoreUpdated', (_) => {
          const url = [];
          $.each($$('cdn').serialize(), (index, value) => url.push('@import url(' + value.url + ');'));
          if (this.app.lastXHRPostCdnCss) this.app.lastXHRPostCdnCss.abort();
          this.app.lastXHRPostCdnCss = this.app.S3.putObject({
            Bucket: 'redaktr',
            Key: this.app.identityId + '/index.cdn.css',
            ContentType: 'text/css',
            Body: url.join('\n'),
          }, (err, data) => {
            if (err) {
              if (err.code !== 'RequestAbortedError') {
                webix.message({
                  text: err.message,
                  type: 'error',
                });
              }
            } else webix.message('CSS cdn list save complete');
          });
        });
      }
    });
  }
}
/* global webix */
/* global AWS */
/* global $$ */
/* global $ */
