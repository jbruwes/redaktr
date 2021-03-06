import {JetView} from 'webix-jet';
export default class CdnToolbarView extends JetView {
  config() {
    return {
      view: 'toolbar',
      cols: [{
        view: 'icon',
        icon: 'mdi mdi-file-document-outline',
        click: (_) => { $$('cdn').select($$('cdn').add({url: ''})); },
      },
      {
        view: 'icon',
        icon: 'mdi mdi-delete-outline',
        click: (_) => {
          const id = $$('cdn').getSelectedId();
          if (id) {
            let newId = $$('cdn').getPrevId(id);
            if (!newId) newId = $$('cdn').getNextId(id);
            $$('cdn').remove(id);
            if (newId) $$('cdn').select(newId);
          }
        },
      }, {
        view: 'icon',
        icon: 'mdi mdi-arrow-up-bold-box-outline',
        click: (_) => {
          const id = $$('cdn').getSelectedId();
          if (id) $$('cdn').moveUp(id);
        },
      }, {
        view: 'icon',
        icon: 'mdi mdi-arrow-down-bold-box-outline',
        click: (_) => {
          const id = $$('cdn').getSelectedId();
          if (id) $$('cdn').moveDown(id);
        },
      }, {},
      ],
    };
  }
}
/* global $$ */
