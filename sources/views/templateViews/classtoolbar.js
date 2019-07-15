import {
	JetView
} from "webix-jet";
export default class ClassToolbarView extends JetView {
	config() {
		return {
			view: "toolbar",
			cols: [{
				view: "icon",
				icon: "mdi mdi-file-document-outline",
				click: _ => {
					$$("class").select($$('class').add({
						class: ''
					}))
				}
			}, {
				view: "icon",
				icon: "mdi mdi-delete-outline",
				click: _ => {
					var id = $$("class").getSelectedId();
					if (id) {
						$$("class").editCancel();
						var newId = $$("class").getPrevId(id);
						if (!newId) newId = $$("class").getNextId(id);
						$$("class").remove(id);
						if (newId) $$("class").select(newId);
					}
				}
			}, {}]
		};
	}
}
/* global $$ */