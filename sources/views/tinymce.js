import { JetView } from "webix-jet";
export default class TinymceView extends JetView {
    config() {
        return {
            id: "tinymce",
            view: "tinymce-editor",
            config: {
                init_instance_callback: (editor) => {
                    //editor.serializer.addNodeFilter('script,style', (nodes, name) => {
                    //	var i = nodes.length,
                    //		node, value;
                    //	while (i--) {
                    //		node = nodes[i];
                    //		value = node.firstChild ? node.firstChild.value : '';
                    //		if (value.length > 0) {
                    //			node.firstChild.value = value.replace(/(<!--\[CDATA\[|\]\]-->)/g, '\n')
                    //				.replace(/^[\r\n]*|[\r\n]*$/g, '')
                    //				.replace(/^\s*((<!--)?(\s*\/\/)?\s*<!\[CDATA\[|(<!--\s*)?\/\*\s*<!\[CDATA\[\s*\*\/|(\/\/)?\s*<!--|\/\*\s*<!--\s*\*\/)\s*[\r\n]*/gi, '')
                    //				.replace(/\s*(\/\*\s*\]\]>\s*\*\/(-->)?|\s*\/\/\s*\]\]>(-->)?|\/\/\s*(-->)?|\]\]>|\/\*\s*-->\s*\*\/|\s*-->\s*)\s*$/g, '');
                    //		}
                    //	}
                    //});
                },
                plugins: 'print preview fullpage paste searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern save importcss quickbars spellchecker tabfocus',
                //toolbar: 'fullpage | bold italic strikethrough forecolor backcolor | rlink | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
                toolbar: "fullpage |undo redo | bold italic | forecolor backcolor | template rlink | alignleft aligncenter alignright alignjustify | bullist numlist | link image",
                content_style: ".mce-content-body{padding:8px;}",
                content_css: '//cdn.redaktr.com/redaktr.min.css,' +
                    "//base.redaktr.com/" + AWS.config.credentials.identityId + ".cdn.css," +
                    "//base.redaktr.com/" + AWS.config.credentials.identityId + ".css",
                templates: [
/*                    { title: 'Social Share1', description: 'facebook, gplus, twitter, linkedin, skype', content: '<div class="ya-share2" data-services="facebook,gplus,twitter,linkedin,skype" data-counter=""><button class="ui mini icon facebook button">&nbsp;<i class="facebook f icon"></i>&nbsp;</button><button class="ui mini icon google plus button">&nbsp;<i class="google plus g icon"></i>&nbsp;</button><button class="ui mini icon twitter button">&nbsp;<i class="twitter icon"></i>&nbsp;</button><button class="ui mini icon linkedin button">&nbsp;<i class="linkedin in icon"></i>&nbsp;</button><button class="ui mini icon blue button">&nbsp;<i class="skype icon"></i>&nbsp;</button></div>' },
                    { title: 'Social Share2', description: 'facebook,<br>gplus, twitter, linkedin, skype, facebook, gplus, twitter, linkedin, skype facebook, gplus, twitter, linkedin, skype facebook, gplus, twitter, linkedin, skype facebook, gplus, twitter, linkedin, skype facebook, gplus, twitter, linkedin, skype facebook, gplus, twitter, linkedin, skype facebook, gplus, twitter, linkedin, skype', content: '<div class="ya-share2" data-services="facebook,gplus,twitter,linkedin,skype" data-counter=""><button class="ui mini icon facebook button">&nbsp;<i class="facebook f icon"></i>&nbsp;</button><button class="ui mini icon google plus button">&nbsp;<i class="google plus g icon"></i>&nbsp;</button><button class="ui mini icon twitter button">&nbsp;<i class="twitter icon"></i>&nbsp;</button><button class="ui mini icon linkedin button">&nbsp;<i class="linkedin in icon"></i>&nbsp;</button><button class="ui mini icon blue button">&nbsp;<i class="skype icon"></i>&nbsp;</button></div>' },
                    { title: 'Social Share3', description: 'facebook, gplus, twitter, linkedin, skype', content: '<div class="ya-share2" data-services="facebook,gplus,twitter,linkedin,skype" data-counter=""><button class="ui mini icon facebook button">&nbsp;<i class="facebook f icon"></i>&nbsp;</button><button class="ui mini icon google plus button">&nbsp;<i class="google plus g icon"></i>&nbsp;</button><button class="ui mini icon twitter button">&nbsp;<i class="twitter icon"></i>&nbsp;</button><button class="ui mini icon linkedin button">&nbsp;<i class="linkedin in icon"></i>&nbsp;</button><button class="ui mini icon blue button">&nbsp;<i class="skype icon"></i>&nbsp;</button></div>' },
                    { title: 'Social Share4', description: 'facebook, gplus, twitter, linkedin, skype facebook, gplus, twitter, linkedin, skype facebook, gplus, twitter, linkedin, skype facebook, gplus, twitter, linkedin, skype facebook, gplus, twitter, linkedin, skype facebook, gplus, twitter, linkedin, skype facebook, gplus, twitter, linkedin, skype facebook, gplus, twitter, linkedin, skype', content: '<div class="ya-share2" data-services="facebook,gplus,twitter,linkedin,skype" data-counter=""><button class="ui mini icon facebook button">&nbsp;<i class="facebook f icon"></i>&nbsp;</button><button class="ui mini icon google plus button">&nbsp;<i class="google plus g icon"></i>&nbsp;</button><button class="ui mini icon twitter button">&nbsp;<i class="twitter icon"></i>&nbsp;</button><button class="ui mini icon linkedin button">&nbsp;<i class="linkedin in icon"></i>&nbsp;</button><button class="ui mini icon blue button">&nbsp;<i class="skype icon"></i>&nbsp;</button></div>' }*/
                    { title: 'menu', description: 'https://demos.telerik.com/kendo-ui/menu/index', content: '<div data-id="rmenu" data-scrollable="true" data-animation="true" data-close-on-click="true" data-direction="default" data-hover-delay="100" data-open-on-click="false" data-orientation="horizontal" data-popup-collision="true">menu</div>' },
                ],
                font_formats: "Alice='Alice', serif;" +
                    "Andale Mono='andale mono', times;" +
                    "Andika='Andika', sans-serif;" +
                    "Anonymous Pro='Anonymous Pro', monospace;" +
                    "Arial Black='arial black', avant garde;" +
                    "Arial='arial', helvetica, sans-serif;" +
                    "Arimo='Arimo', sans-serif;" +
                    "Arsenal='Arsenal', sans-serif;" +
                    "Bad Script='Bad Script', cursive;" +
                    "Book Antiqua='book antiqua', palatino;" +
                    "Comfortaa='Comfortaa', cursive;" +
                    "Comic Sans MS='comic sans ms', sans-serif;" +
                    "Cormorant Garamond='Cormorant Garamond', serif;" +
                    "Cormorant Infant='Cormorant Infant', serif;" +
                    "Cormorant SC='Cormorant SC', serif;" +
                    "Cormorant Unicase='Cormorant Unicase', serif;" +
                    "Cormorant='Cormorant', serif;" +
                    "Courier New='courier new', courier;" +
                    "Cousine='Cousine', monospace;" +
                    "Cuprum='Cuprum', sans-serif;" +
                    "Didact Gothic='Didact Gothic', sans-serif;" +
                    "EB Garamond='EB Garamond', serif;" +
                    "El Messiri='El Messiri', sans-serif;" +
                    "Exo 2='Exo 2', sans-serif;" +
                    "Fira Mono='Fira Mono', monospace;" +
                    "Fira Sans Condensed='Fira Sans Condensed', sans-serif;" +
                    "Fira Sans Extra Condensed='Fira Sans Extra Condensed', sans-serif;" +
                    "Fira Sans='Fira Sans', sans-serif;" +
                    "Forum='Forum', cursive;" +
                    "Gabriela='Gabriela', serif;" +
                    "Georgia='georgia', palatino;" +
                    "Helvetica='helvetica';" +
                    "Helvetica Neue='Helvetica Neue', Helvetica, Arial, sans-serif;" +
                    "Impact='impact', chicago;" +
                    "Istok Web='Istok Web', sans-serif;" +
                    "Jura='Jura', sans-serif;" +
                    "Kelly Slab='Kelly Slab', cursive;" +
                    "Kurale='Kurale', serif;" +
                    "Ledger='Ledger', serif;" +
                    "Lobster='Lobster', cursive;" +
                    "Lora='Lora', serif;" +
                    "Marck Script='Marck Script', cursive;" +
                    "Marmelad='Marmelad', sans-serif;" +
                    "Merriweather='Merriweather', serif;" +
                    "Neucha='Neucha', cursive;" +
                    "Noto Sans='Noto Sans', sans-serif;" +
                    "Noto Serif='Noto Serif', serif;" +
                    "Old Standard TT='Old Standard TT', serif;" +
                    "Open Sans Condensed='Open Sans Condensed', sans-serif;" +
                    "Open Sans='Open Sans', sans-serif;" +
                    "Oranienbaum='Oranienbaum', serif;" +
                    "Oswald='Oswald', sans-serif;" +
                    "Pangolin='Pangolin', cursive;" +
                    "Pattaya='Pattaya', sans-serif;" +
                    "Philosopher='Philosopher', sans-serif;" +
                    "Play='Play', sans-serif;" +
                    "Playfair Display SC='Playfair Display SC', serif;" +
                    "Playfair Display='Playfair Display', serif;" +
                    "Podkova='Podkova', serif;" +
                    "Poiret One='Poiret One', cursive;" +
                    "Prata='Prata', serif;" +
                    "Press Start 2P='Press Start 2P', cursive;" +
                    "Prosto One='Prosto One', cursive;" +
                    "PT Mono='PT Mono', monospace;" +
                    "PT Sans Caption='PT Sans Caption', sans-serif;" +
                    "PT Sans Narrow='PT Sans Narrow', sans-serif;" +
                    "PT Sans='PT Sans', sans-serif;" +
                    "PT Serif Caption='PT Serif Caption', serif;" +
                    "PT Serif='PT Serif', serif;" +
                    "Roboto Condensed='Roboto Condensed', sans-serif;" +
                    "Roboto Mono='Roboto Mono', monospace;" +
                    "Roboto Slab='Roboto Slab', serif;" +
                    "Roboto='Roboto', sans-serif;" +
                    "Rubik Mono One='Rubik Mono One', sans-serif;" +
                    "Rubik='Rubik', sans-serif;" +
                    "Ruslan Display='Ruslan Display', cursive;" +
                    "Russo One='Russo One', sans-serif;" +
                    "Scada='Scada', sans-serif;" +
                    "Seymour One='Seymour One', sans-serif;" +
                    "Source Sans Pro='Source Sans Pro', sans-serif;" +
                    "Stalinist One='Stalinist One', cursive;" +
                    "Symbol='symbol';" +
                    "Tahoma='tahoma', arial, helvetica, sans-serif;" +
                    "Tenor Sans='Tenor Sans', sans-serif;" +
                    "Terminal='terminal', monaco;" +
                    "Times New Roman='times new roman', times;" +
                    "Tinos='Tinos', serif;" +
                    "Trebuchet MS='trebuchet ms', geneva;" +
                    "Ubuntu Condensed='Ubuntu Condensed', sans-serif;" +
                    "Ubuntu Mono='Ubuntu Mono', monospace;" +
                    "Ubuntu='Ubuntu', sans-serif;" +
                    "Underdog='Underdog', cursive;" +
                    "Verdana='verdana', geneva;" +
                    "Webdings='webdings';" +
                    "Wingdings='wingdings', zapf dingbats;" +
                    "Yanone Kaffeesatz='Yanone Kaffeesatz', sans-serif;" +
                    "Yeseva One='Yeseva One', cursive;",
                setup: editor => {
                    editor.that = this;
                    var getSubmenuItems = (id, path) => {
                        var items = [];
                        var item;
                        var child;
                        var children = null;
                        var value = null;
                        var newPath = null;
                        do {
                            item = $$("tree").getItem(id);
                            if (item.visible) {
                                child = $$("tree").getFirstChildId(id);
                                value = item.value.replace(/[\""]/g, '\\"');
                                newPath = path + encodeURI(value.replace(/ /g, "_")) + '/';
                                children = child ? getSubmenuItems(child, newPath) : null;
                                item = '{"type":"menuitem","text":"' + value + '",onAction:function(){""===tinyMCE.activeEditor.selection.getContent()?tinyMCE.execCommand("mceInsertContent",!1,"<a href=\\"' + newPath + '\\">' + value + '</a>"):tinyMCE.execCommand("mceInsertLink",!1,"' + newPath + '")},"icon":';
                                if (children) {
                                    item = item + '"chevron-right",';
                                    item = item + '"getSubmenuItems":function(){return ' + children + '}';
                                }
                                else {
                                    item = item + '"link"';
                                }
                                item = item + '}';
                                items.push(item);
                            }
                            id = $$("tree").getNextSiblingId(id);
                        } while (id);
                        items = items.join();
                        return '[' + items + ']';
                    };
                    if (!$$('sidebar').getSelectedItem() || $$('sidebar').getSelectedItem().id === 'content') editor.ui.registry.addMenuButton('rlink', {
                        icon: 'link',
                        tooltip: 'Insert/edit link',
                        //fetch: callback => callback(eval(getSubmenuItems($$("tree").getFirstChildId($$("tree").getFirstId()), '/')))
                        fetch: callback => {
                            var item = $$("tree").getFirstId(),
                                firstChild = null;
                            if (item) {
                                firstChild = $$("tree").getFirstChildId(item);
                                if (firstChild) callback(eval(getSubmenuItems(firstChild, '/')));
                            }
                        }
                    });
                },
                file_picker_types: "image media file",
                file_picker_callback: (cb, value, meta) => {
                    var input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*,video/*');
                    input.onchange = _ => {
                        //var file = this.files[0];
                        var file = input.files[0];
                        var reader = new FileReader();
                        reader.onload = _ => {
                            var id = 'blobid' + webix.uid();
                            var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                            var base64 = reader.result.split(',')[1];
                            var blobInfo = blobCache.create(id, file, base64);
                            blobCache.add(blobInfo);
                            this.app.S3.headObject({
                                Bucket: 'base.redaktr.com',
                                Key: AWS.config.credentials.identityId + '/' + file.name
                            }, (err, data) => {
                                var filePath = (err ? '' : webix.uid() + '/') + file.name;
                                this.app.S3.putObject({
                                    Bucket: 'base.redaktr.com',
                                    Key: AWS.config.credentials.identityId + '/' + filePath,
                                    ContentType: file.type,
                                    Body: blobInfo.blob()
                                }, (err, data) => {
                                    if (err) webix.message({ text: err.message, type: "error" });
                                    else cb(filePath, { title: file.name });
                                });
                            });
                        };
                        reader.readAsDataURL(file);
                    };
                    input.click();
                },
                quickbars_insert_toolbar: false,
                extended_valid_elements: 'script[*],i[*],span[*]',
                valid_children: "+body[style],+body[link]",
                branding: false,
                convert_urls: false,
                image_advtab: true,
                image_caption: true,
                image_title: true,
                allow_script_urls: true,
                style_formats_autohide: true,
                paste_data_images: true,
                importcss_append: true,
                images_reuse_filename: true,
                images_upload_handler: (blobInfo, success, failure) => {
                    this.app.S3.headObject({
                        Bucket: 'base.redaktr.com',
                        Key: AWS.config.credentials.identityId + '/' + blobInfo.filename()
                    }, (err, data) => {
                        var filePath = (err ? '' : webix.uid() + '/') + blobInfo.filename();
                        this.app.S3.putObject({
                            Bucket: 'base.redaktr.com',
                            Key: AWS.config.credentials.identityId + '/' + filePath,
                            ContentType: blobInfo.blob().type,
                            Body: blobInfo.blob()
                        }, (err, data) => {
                            if (err) failure(err.message);
                            else success(filePath);
                        });
                    });
                },
                document_base_url: "//base.redaktr.com/" + AWS.config.credentials.identityId + "/",
                statusbar: false,
                resize: false,
                spellchecker_languages: "Russian=ru,Ukrainian=uk,English=en",
                spellchecker_language: "ru", // default language
                spellchecker_rpc_url: "//speller.yandex.net/services/tinyspell",
                link_class_list: [{
                    title: 'None',
                    value: ''
                }, {
                    title: 'Default Button',
                    value: 'ui icon button'
                }, {
                    title: 'Primary Button',
                    value: 'ui icon primary button'
                }, {
                    title: 'Secondary Button',
                    value: 'ui icon secondary button'
                }, {
                    title: 'Positive Button',
                    value: 'ui icon positive button'
                }, {
                    title: 'Negative Button',
                    value: 'ui icon negative button'
                }, {
                    title: 'Default Basic Button',
                    value: 'ui icon basic button'
                }, {
                    title: 'Primary Basic Button',
                    value: 'ui icon basic primary button'
                }, {
                    title: 'Secondary Basic Button',
                    value: 'ui icon basic secondary button'
                }, {
                    title: 'Positive Basic Button',
                    value: 'ui icon basic positive button'
                }, {
                    title: 'Negative Basic Button',
                    value: 'ui icon basic negative button'
                }],
                image_class_list: [{
                    title: 'None',
                    value: ''
                }, {
                    title: 'Bordered',
                    value: 'ui bordered image'
                }, {
                    title: 'Circular',
                    value: 'ui circular image'
                }, {
                    title: 'Rounded',
                    value: 'ui rounded image'
                }],
                table_class_list: [{
                    title: 'None',
                    value: ''
                }, {
                    title: 'Default',
                    value: 'ui celled striped selectable table'
                }, {
                    title: 'Red',
                    value: 'ui celled striped selectable red table'
                }, {
                    title: 'Orange',
                    value: 'ui celled striped selectable orange table'
                }, {
                    title: 'Yellow',
                    value: 'ui celled striped selectable yellow table'
                }, {
                    title: 'Olive',
                    value: 'ui celled striped selectable olive table'
                }, {
                    title: 'Green',
                    value: 'ui celled striped selectable green table'
                }, {
                    title: 'Teal',
                    value: 'ui celled striped selectable teal table'
                }, {
                    title: 'Blue',
                    value: 'ui celled striped selectable blue table'
                }, {
                    title: 'Violet',
                    value: 'ui celled striped selectable violet table'
                }, {
                    title: 'Purple',
                    value: 'ui celled striped selectable purple table'
                }, {
                    title: 'Pink',
                    value: 'ui celled striped selectable pink table'
                }, {
                    title: 'Grey',
                    value: 'ui celled striped selectable grey table'
                }, {
                    title: 'Black',
                    value: 'ui celled striped selectable black table'
                }],
                table_cell_class_list: [{
                    title: 'None',
                    value: ''
                }, {
                    title: 'Positive',
                    value: 'positive'
                }, {
                    title: 'Negative',
                    value: 'negative'
                }, {
                    title: 'Error',
                    value: 'error'
                }, {
                    title: 'Warning',
                    value: 'warning'
                }, {
                    title: 'Active',
                    value: 'active'
                }, {
                    title: 'Disabled',
                    value: 'disabled'
                }],
                table_row_class_list: [{
                    title: 'None',
                    value: ''
                }, {
                    title: 'Positive',
                    value: 'positive'
                }, {
                    title: 'Negative',
                    value: 'negative'
                }, {
                    title: 'Error',
                    value: 'error'
                }, {
                    title: 'Warning',
                    value: 'warning'
                }, {
                    title: 'Active',
                    value: 'active'
                }, {
                    title: 'Disabled',
                    value: 'disabled'
                }]
            }
        };
    }
    setValue(val) {
        var tinymce = $$("tinymce").getEditor();
        tinymce.off("SetContent");
        tinymce.off("Change");
        tinymce.getWin().scrollTo(0, 0);
        tinymce.setContent(val);
        tinymce.undoManager.clear();
        tinymce.nodeChanged();
        tinymce.on("Change", this.getParentView()._save);
	   tinymce.on("SetContent", this.getParentView()._save);
    }
}
/* global tinymce */
/* global webix */
/* global AWS */
/* global $$ */
