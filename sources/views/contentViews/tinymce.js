import { JetView } from "webix-jet";
export default class TinymceView extends JetView {
    config() {

        var head = webix.ajax().sync().get("https://api.redaktr.com/template").responseText.match(/<head[^>]*>[\s\S]*<\/head>/gi);
        head = head ? head[0].replace(/^<head[^>]*>/, '').replace(/<\/head>$/, '') : '';
        var rowData = [];
        $('<div>' + head + '</div>').find("link[href][rel='stylesheet']").each(function(i, val) {
            rowData.push($(val).attr("href").replace(/^.*?:/, "").replace(new RegExp(("//" + location.host + location.pathname).replace(/[^\/]*$/, ''), "g"), ""));
        });
        rowData = rowData.join(",");

        var freeCSS = [];
        $('<div>' + head + '</div>').find("style:not([id])").each(function(i, val) {
            console.log(i, val);
        });

        var save = function() {
            
            /*var s3=new AWS.S3({ apiVersion: '2006-03-01', correctClockSkew: true });
            
            s3.putObject({
								Bucket: 'content.redaktr.com',
								ContentType: 'text/html',
								Key: 'us-east-1:b7764491-78e7-4aed-9032-b5e04e26d221/:2017-02-08T15:48:04.764Z.htm',
								Body: "<p>Let's prove the fun!</p>"
							},function(err, data) {
							    console.log(err);
							    console.log(data);
							});*/
            
            //if (lastXHRPostTree) { lastXHRPostTree.abort(); }
            webix.ajax().post("https://api.redaktr.com/content/" + $$("tree").getSelectedId(), $$("tinymce").getValue(), function(text, xml, xhr) {
                webix.message("Content save complete");
            });

            //webix.message('save');
        };

        return {
            id: "tinymce",
            view: "tinymce-editor",
            config: {
                init_instance_callback: function(editor) {
                    editor.serializer.addNodeFilter('script,style', function(nodes, name) {
                        var i = nodes.length,
                            node, value;
                        while (i--) {
                            node = nodes[i];
                            value = node.firstChild ? node.firstChild.value : '';
                            if (value.length > 0) {
                                node.firstChild.value = value.replace(/(<!--\[CDATA\[|\]\]-->)/g, '\n')
                                    .replace(/^[\r\n]*|[\r\n]*$/g, '')
                                    .replace(/^\s*((<!--)?(\s*\/\/)?\s*<!\[CDATA\[|(<!--\s*)?\/\*\s*<!\[CDATA\[\s*\*\/|(\/\/)?\s*<!--|\/\*\s*<!--\s*\*\/)\s*[\r\n]*/gi, '')
                                    .replace(/\s*(\/\*\s*\]\]>\s*\*\/(-->)?|\s*\/\/\s*\]\]>(-->)?|\/\/\s*(-->)?|\]\]>|\/\*\s*-->\s*\*\/|\s*-->\s*)\s*$/g, '');
                            }
                        }
                    });
                    editor.on('Change', save);
                    editor.on('Undo', save);
                    editor.on('Redo', save);
                },
                theme: "modern",
                plugins: 'print preview fullpage paste searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools contextmenu colorpicker textpattern save'
                    /*[
                    	"advlist autolink link image lists charmap print hr anchor pagebreak",
                    	"searchreplace wordcount visualblocks visualchars insertdatetime media nonbreaking",
                    	"table contextmenu directionality emoticons textcolor paste colorpicker textpattern",
                    	"imagetools tabfocus fullpage toc save template preview fullscreen codesample"
                    ]*/
                    ,
                menubar: "file edit insert view format table",
                toolbar1: " fontselect | fontsizeselect | forecolor backcolor bullist numlist outdent indent rtl zlink",
                content_style: ".mce-content-body{font-size:14px;padding:8px;}",
                content_css: "//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" + "," + rowData + "," +
                    "//fonts.googleapis.com/css?family=Alice|Andika|Anonymous+Pro|Arimo|Arsenal|Bad+Script|Comfortaa|Cormorant|Cormorant+Garamond|Cormorant+Infant|Cormorant+SC|Cormorant+Unicase|Cousine|Cuprum|Didact+Gothic|EB+Garamond|El+Messiri|Exo+2|Fira+Mono|Fira+Sans|Fira+Sans+Condensed|Fira+Sans+Extra+Condensed|Forum|Gabriela|Istok+Web|Jura|Kelly+Slab|Kurale|Ledger|Lobster|Lora|Marck+Script|Marmelad|Merriweather|Neucha|Noto+Sans|Noto+Serif|Old+Standard+TT|Open+Sans|Open+Sans+Condensed:300|Oranienbaum|Oswald|PT+Mono|PT+Sans|PT+Sans+Caption|PT+Sans+Narrow|PT+Serif|PT+Serif+Caption|Pangolin|Pattaya|Philosopher|Play|Playfair+Display|Playfair+Display+SC|Podkova|Poiret+One|Prata|Press+Start+2P|Prosto+One|Roboto|Roboto+Condensed|Roboto+Mono|Roboto+Slab|Rubik|Rubik+Mono+One|Ruslan+Display|Russo+One|Scada|Seymour+One|Source+Sans+Pro|Stalinist+One|Tenor+Sans|Tinos|Ubuntu|Ubuntu+Condensed|Ubuntu+Mono|Underdog|Yanone+Kaffeesatz|Yeseva+One&amp;subset=cyrillic",
                templates: [
                    { title: 'Social Share', description: 'facebook, gplus, twitter, linkedin, skype', content: '<div class="ya-share2" data-services="facebook,gplus,twitter,linkedin,skype" data-counter=""><button class="ui mini icon facebook button">&nbsp;<i class="facebook f icon"></i>&nbsp;</button><button class="ui mini icon google plus button">&nbsp;<i class="google plus g icon"></i>&nbsp;</button><button class="ui mini icon twitter button">&nbsp;<i class="twitter icon"></i>&nbsp;</button><button class="ui mini icon linkedin button">&nbsp;<i class="linkedin in icon"></i>&nbsp;</button><button class="ui mini icon blue button">&nbsp;<i class="skype icon"></i>&nbsp;</button></div>' }
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
                //file_browser_callback: redaktr.TinyMCE._fileBrowserCallback,
                branding: false,
                extended_valid_elements: 'script[*],i[*],span[*]',
                valid_children: "+body[style],+body[link]",
                //force_p_newlines : true,
                //forced_root_block : '',
                //forced_root_block: 'div',
                //fullpage_hide_in_source_view: false,
                //save_enablewhendirty: false,
                //autosave_ask_before_unload: false,
                //visualblocks_default_state: true,
                //image_advtab: true,
                //image_caption: true,
                //image_title: true,
                convert_urls: false,
                allow_script_urls: true,
                //relative_urls: true,
                paste_data_images: true,

                //images_upload_handler: redaktr.TinyMCE._imagesUploadHandler,
                document_base_url: "//www.redaktr.com/" + AWS.config.credentials.identityId + "/",
                imagetools_cors_hosts: ['www.redaktr.com'],
                //save_onsavecallback: params.save_onsavecallback,
                //automatic_uploads: true,
                //images_reuse_filename: true,
                //images_upload_credentials: true,
                //style_formats_autohide: true,
                //statusbar: true,
                //resize: false,
                //language_url: "resource/redaktr/langs/" + context.tr("en") + ".js",
                //browser_spellcheck: true,
                //init_instance_callback: params.init_instance_callback,
                //setup: params.setup,
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
}
