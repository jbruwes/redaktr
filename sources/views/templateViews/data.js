import {JetView} from 'webix-jet';
export default class DataView extends JetView {
  config() {
    return {
      id: 'data',
      view: 'datatable',
      select: 'row',
      columns: [
        {id: 'data', editor: 'text', header: 'data-', fillspace: true},
        {id: 'value', editor: 'text', header: 'value', fillspace: true},
      ],
      editable: true,
      on: {'data->onStoreUpdated': (_) => this.getParentView()._redraw(this.getParentView())},
    };
  }
}
