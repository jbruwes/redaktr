import {
  JetView
} from "webix-jet";
export default class TinymceView extends JetView {
  config() {
    return {
      id: "tinymce",
      view: "tinymce5-editor",
      //cdn: "//cdn.tiny.cloud/1/r2lw5k8fd0gyrwrhztc4ie6zdmanh9ovn6c38xwh8ujjimpw/tinymce/5",
      apiKey: "r2lw5k8fd0gyrwrhztc4ie6zdmanh9ovn6c38xwh8ujjimpw",
      config: {
        mobile: {
          theme: "silver",
          menubar: false
        },
        //plugins: 'print preview paste searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists imagetools textpattern save importcss quickbars spellchecker tabfocus',
        plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable charmap quickbars emoticons spellchecker',
        menubar: 'file edit view insert format tools table',
        //toolbar: 'fullpage | bold italic strikethrough forecolor backcolor | rlink | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
        //toolbar: "undo redo | bold italic | forecolor backcolor | template rlink | alignleft aligncenter alignright alignjustify | bullist numlist | link image",
        toolbar: 'undo redo | rlink | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen preview print | insertfile image media template link anchor codesample | ltr rtl',
        toolbar_sticky: true,
        imagetools_cors_hosts: ['redaktr.com'],
        content_style: ".mce-content-body{padding:8px;}",
        content_css: '//cdn.redaktr.com/redaktr.cdn.min.css?' + webix.uid() + "," +
          "//" + location.hostname.replace(/\w+./, '') + "/" + this.app.identityId + ".cdn.css?" + webix.uid() + "," +
          '//cdn.redaktr.com/redaktr.min.css?' + webix.uid() + "," +
          "//" + location.hostname.replace(/\w+./, '') + "/" + this.app.identityId + ".css?" + webix.uid(),
        templates: [
          /*                    { title: 'Social Share1', description: 'facebook, gplus, twitter, linkedin, skype', content: '<div class="ya-share2" data-services="facebook,gplus,twitter,linkedin,skype" data-counter=""><button class="ui mini icon facebook button">&nbsp;<i class="facebook f icon"></i>&nbsp;</button><button class="ui mini icon google plus button">&nbsp;<i class="google plus g icon"></i>&nbsp;</button><button class="ui mini icon twitter button">&nbsp;<i class="twitter icon"></i>&nbsp;</button><button class="ui mini icon linkedin button">&nbsp;<i class="linkedin in icon"></i>&nbsp;</button><button class="ui mini icon blue button">&nbsp;<i class="skype icon"></i>&nbsp;</button></div>' },
                              { title: 'Social Share2', description: 'facebook,<br>gplus, twitter, linkedin, skype, facebook, gplus, twitter, linkedin, skype facebook, gplus, twitter, linkedin, skype facebook, gplus, twitter, linkedin, skype facebook, gplus, twitter, linkedin, skype facebook, gplus, twitter, linkedin, skype facebook, gplus, twitter, linkedin, skype facebook, gplus, twitter, linkedin, skype', content: '<div class="ya-share2" data-services="facebook,gplus,twitter,linkedin,skype" data-counter=""><button class="ui mini icon facebook button">&nbsp;<i class="facebook f icon"></i>&nbsp;</button><button class="ui mini icon google plus button">&nbsp;<i class="google plus g icon"></i>&nbsp;</button><button class="ui mini icon twitter button">&nbsp;<i class="twitter icon"></i>&nbsp;</button><button class="ui mini icon linkedin button">&nbsp;<i class="linkedin in icon"></i>&nbsp;</button><button class="ui mini icon blue button">&nbsp;<i class="skype icon"></i>&nbsp;</button></div>' },
                              { title: 'Social Share3', description: 'facebook, gplus, twitter, linkedin, skype', content: '<div class="ya-share2" data-services="facebook,gplus,twitter,linkedin,skype" data-counter=""><button class="ui mini icon facebook button">&nbsp;<i class="facebook f icon"></i>&nbsp;</button><button class="ui mini icon google plus button">&nbsp;<i class="google plus g icon"></i>&nbsp;</button><button class="ui mini icon twitter button">&nbsp;<i class="twitter icon"></i>&nbsp;</button><button class="ui mini icon linkedin button">&nbsp;<i class="linkedin in icon"></i>&nbsp;</button><button class="ui mini icon blue button">&nbsp;<i class="skype icon"></i>&nbsp;</button></div>' },
                              { title: 'Social Share4', description: 'facebook, gplus, twitter, linkedin, skype facebook, gplus, twitter, linkedin, skype facebook, gplus, twitter, linkedin, skype facebook, gplus, twitter, linkedin, skype facebook, gplus, twitter, linkedin, skype facebook, gplus, twitter, linkedin, skype facebook, gplus, twitter, linkedin, skype facebook, gplus, twitter, linkedin, skype', content: '<div class="ya-share2" data-services="facebook,gplus,twitter,linkedin,skype" data-counter=""><button class="ui mini icon facebook button">&nbsp;<i class="facebook f icon"></i>&nbsp;</button><button class="ui mini icon google plus button">&nbsp;<i class="google plus g icon"></i>&nbsp;</button><button class="ui mini icon twitter button">&nbsp;<i class="twitter icon"></i>&nbsp;</button><button class="ui mini icon linkedin button">&nbsp;<i class="linkedin in icon"></i>&nbsp;</button><button class="ui mini icon blue button">&nbsp;<i class="skype icon"></i>&nbsp;</button></div>' }*/
          {
            title: 'menu',
            description: 'https://demos.telerik.com/kendo-ui/menu/index',
            content: '<div data-id="rmenu" data-scrollable="true" data-animation="true" data-close-on-click="true" data-direction="default" data-hover-delay="100" data-open-on-click="false" data-orientation="horizontal" data-popup-collision="true"></div>'
          },
          {
            title: 'gallery',
            description: 'A gallery template',
            content: '<div class="ui three doubling stackable cards mceNonEditable" style="margin: 0;" data-light-slider=""><div style="padding: 50px; display: flex; margin: auto;"><div class="ui centered raised card" data-tilt=""><div class="ui placeholder"><div class="rectangular image"><div class="ui inverted dimmer"><button class="circular ui disabled inverted secondary icon button"><i class="icon secondary plus"><!-- --></i></button></div></div></div><div class="content"><div class="ui placeholder"><div class="header"><div class="very short line">&nbsp;</div><div class="medium line">&nbsp;</div></div><div class="paragraph"><div class="short line">&nbsp;</div></div></div></div><div class="extra content"><button class="ui disabled primary icon button"><i class="icon check"><!-- --></i></button> <button class="ui disabled secondary icon button"><i class="icon times"><!-- --></i></button></div></div></div><div style="padding: 50px; display: flex; margin: auto;"><div class="ui centered raised card" data-tilt=""><div class="ui placeholder"><div class="rectangular image"><div class="ui inverted dimmer"><button class="circular ui disabled inverted secondary icon button"><i class="icon secondary plus"><!-- --></i></button></div></div></div><div class="content"><div class="ui placeholder"><div class="header"><div class="very short line">&nbsp;</div><div class="medium line">&nbsp;</div></div><div class="paragraph"><div class="short line">&nbsp;</div></div></div></div><div class="extra content"><button class="ui disabled primary icon button"><i class="icon check"><!-- --></i></button> <button class="ui disabled secondary icon button"><i class="icon times"><!-- --></i></button></div></div></div><div style="padding: 50px; display: flex; margin: auto;"><div class="ui centered raised card" data-tilt=""><div class="ui placeholder"><div class="rectangular image"><div class="ui inverted dimmer"><button class="circular ui disabled inverted secondary icon button"><i class="icon secondary plus"><!-- --></i></button></div></div></div><div class="content"><div class="ui placeholder"><div class="header"><div class="very short line">&nbsp;</div><div class="medium line">&nbsp;</div></div><div class="paragraph"><div class="short line">&nbsp;</div></div></div></div><div class="extra content"><button class="ui disabled primary icon button"><i class="icon check"><!-- --></i></button> <button class="ui disabled secondary icon button"><i class="icon times"><!-- --></i></button></div></div></div><div style="padding: 50px; display: flex; margin: auto;" hidden=""><div class="ui centered raised card" data-tilt=""><div class="ui placeholder"><div class="rectangular image"><div class="ui inverted dimmer"><button class="circular ui disabled inverted secondary icon button"><i class="icon secondary plus"><!-- --></i></button></div></div></div><div class="content"><div class="ui placeholder"><div class="header"><div class="very short line">&nbsp;</div><div class="medium line">&nbsp;</div></div><div class="paragraph"><div class="short line">&nbsp;</div></div></div></div><div class="extra content"><button class="ui disabled primary icon button"><i class="icon check"><!-- --></i></button> <button class="ui disabled secondary icon button"><i class="icon times"><!-- --></i></button></div></div></div><div style="padding: 50px; display: flex; margin: auto;" hidden=""><div class="ui centered raised card" data-tilt=""><div class="ui placeholder"><div class="rectangular image"><div class="ui inverted dimmer"><button class="circular ui disabled inverted secondary icon button"><i class="icon secondary plus"><!-- --></i></button></div></div></div><div class="content"><div class="ui placeholder"><div class="header"><div class="very short line">&nbsp;</div><div class="medium line">&nbsp;</div></div><div class="paragraph"><div class="short line">&nbsp;</div></div></div></div><div class="extra content"><button class="ui disabled primary icon button"><i class="icon check"><!-- --></i></button> <button class="ui disabled secondary icon button"><i class="icon times"><!-- --></i></button></div></div></div><div style="padding: 50px; display: flex; margin: auto;" hidden=""><div class="ui centered raised card" data-tilt=""><div class="ui placeholder"><div class="rectangular image"><div class="ui inverted dimmer"><button class="circular ui disabled inverted secondary icon button"><i class="icon secondary plus"><!-- --></i></button></div></div></div><div class="content"><div class="ui placeholder"><div class="header"><div class="very short line">&nbsp;</div><div class="medium line">&nbsp;</div></div><div class="paragraph"><div class="short line">&nbsp;</div></div></div></div><div class="extra content"><button class="ui disabled primary icon button"><i class="icon check"><!-- --></i></button> <button class="ui disabled secondary icon button"><i class="icon times"><!-- --></i></button></div></div></div></div>'
          },
          {
            title: 'carousel',
            description: 'A carousel template',
            content: '<div class="mceNonEditable" data-carousel="" data-pager="false"><div class="ui basic vertical segment" style="height:100vh;background-image:url();background-size:cover;"><div class="ui active very light dimmer"><div class="content"><h2>First slide</h2></div></div></div><div class="ui basic vertical segment" style="height:100vh;background-image:url();background-size:cover;" hidden><div class="ui active very light dimmer"><div class="content"><h2>Second slide</h2></div></div></div><div class="ui basic vertical segment" style="height:100vh;background-image:url();background-size:cover;" hidden><div class="ui active very light dimmer"><div class="content"><h2>Third slide</h2></div></div></div></div>'
          },
          {
            title: 'particles',
            description: 'A particles template',
            content: '<div id="' + webix.uid() + '" class="ui tertiary inverted basic vertical segment mceNonEditable" style="height:100vh;background-image:url();background-size:cover;" data-particles="default"><div class="ui active very light center dimmer"><div class="content"><h2>Header</h2>particles example</div></div></div>'
          }
        ],
        font_formats: 'Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats' +
          "Alegreya='Alegreya', serif;" + // google
          "Alegreya Sans='Alegreya Sans', sans-serif;" + // google
          "Alegreya Sans SC='Alegreya Sans SC', sans-serif;" + // google
          "Alegreya SC='Alegreya SC', serif;" + // google
          "Alice='Alice', serif;" + // google
          "Amatic SC='Amatic SC', cursive;" + // google
          "Andika='Andika', sans-serif;" + // google
          "Anonymous Pro='Anonymous Pro', monospace;" + // google
          "Arimo='Arimo', sans-serif;" + // google
          "Arsenal='Arsenal', sans-serif;" + // google
          "Bad Script='Bad Script', cursive;" + // google
          "Caveat='Caveat', cursive;" + // google
          "Comfortaa='Comfortaa', cursive;" + // google
          "Cormorant Garamond='Cormorant Garamond', serif;" + // google
          "Cormorant Infant='Cormorant Infant', serif;" + // google
          "Cormorant SC='Cormorant SC', serif;" + // google
          "Cormorant Unicase='Cormorant Unicase', serif;" + // google
          "Cormorant='Cormorant', serif;" + // google
          "Cousine='Cousine', monospace;" + // google
          "Cuprum='Cuprum', sans-serif;" + // google
          "Didact Gothic='Didact Gothic', sans-serif;" + // google
          "EB Garamond='EB Garamond', serif;" + // google
          "El Messiri='El Messiri', sans-serif;" + // google
          "Exo 2='Exo 2', sans-serif;" + // google
          "Fira Code='Fira Code', monospace;" + // google
          "Fira Mono='Fira Mono', monospace;" + // google
          "Fira Sans Condensed='Fira Sans Condensed', sans-serif;" + // google
          "Fira Sans Extra Condensed='Fira Sans Extra Condensed', sans-serif;" + // google
          "Fira Sans='Fira Sans', sans-serif;" + // google
          "Forum='Forum', cursive;" + // google
          "Gabriela='Gabriela', serif;" + // google
          "IBM Plex Mono='IBM Plex Mono', monospace;" + // google
          "IBM Plex Sans='IBM Plex Sans', sans-serif;" + // google
          "IBM Plex Serif='IBM Plex Serif', serif;" + // google
          "Istok Web='Istok Web', sans-serif;" + // google
          "Jura='Jura', sans-serif;" + // google
          "Kelly Slab='Kelly Slab', cursive;" + // google
          "Kosugi='Kosugi', sans-serif;" + // google
          "Kosugi Maru='Kosugi Maru', sans-serif;" + // google
          "Kurale='Kurale', serif;" + // google
          "Ledger='Ledger', serif;" + // google
          "Literata='Literata', serif;" + // google
          "Lobster='Lobster', cursive;" + // google
          "Lora='Lora', serif;" + // google
          "M PLUS 1p='M PLUS 1p', sans-serif;" + // google
          "M PLUS Rounded 1c='M PLUS Rounded 1c', sans-serif;" + // google
          "Marck Script='Marck Script', cursive;" + // google
          "Marmelad='Marmelad', sans-serif;" + // google
          "Merriweather='Merriweather', serif;" + // google
          "Montserrat='Montserrat', sans-serif;" + // google
          "Montserrat Alternates='Montserrat Alternates', sans-serif;" + // google
          "Neucha='Neucha', cursive;" + // google
          "Noto Sans='Noto Sans', sans-serif;" + // google
          "Noto Sans SC='Noto Sans SC', sans-serif;" + // google
          "Noto Serif='Noto Serif', serif;" + // google
          "Noto Serif SC='Noto Serif SC', serif;" + // google
          "Noto Serif TC='Noto Serif TC', serif;" + // google
          "Old Standard TT='Old Standard TT', serif;" + // google
          "Open Sans Condensed='Open Sans Condensed', sans-serif;" + // google
          "Open Sans='Open Sans', sans-serif;" + // google
          "Oranienbaum='Oranienbaum', serif;" + // google
          "Oswald='Oswald', sans-serif;" + // google
          "Pacifico='Pacifico', cursive;" + // google
          "Pangolin='Pangolin', cursive;" + // google
          "Pattaya='Pattaya', sans-serif;" + // google
          "Philosopher='Philosopher', sans-serif;" + // google
          "Play='Play', sans-serif;" + // google
          "Playfair Display SC='Playfair Display SC', serif;" + // google
          "Playfair Display='Playfair Display', serif;" + // google
          "Podkova='Podkova', serif;" + // google
          "Poiret One='Poiret One', cursive;" + // google
          "Prata='Prata', serif;" + // google
          "Press Start 2P='Press Start 2P', cursive;" + // google
          "Prosto One='Prosto One', cursive;" + // google
          "PT Mono='PT Mono', monospace;" + // google
          "PT Sans Caption='PT Sans Caption', sans-serif;" + // google
          "PT Sans Narrow='PT Sans Narrow', sans-serif;" + // google
          "PT Sans='PT Sans', sans-serif;" + // google
          "PT Serif Caption='PT Serif Caption', serif;" + // google
          "PT Serif='PT Serif', serif;" + // google
          "Roboto Condensed='Roboto Condensed', sans-serif;" + // google
          "Roboto Mono='Roboto Mono', monospace;" + // google
          "Roboto Slab='Roboto Slab', serif;" + // google
          "Roboto='Roboto', sans-serif;" + // google
          "Rubik Mono One='Rubik Mono One', sans-serif;" + // google
          "Rubik='Rubik', sans-serif;" + // google
          "Ruslan Display='Ruslan Display', cursive;" + // google
          "Russo One='Russo One', sans-serif;" + // google
          "Sawarabi Gothic='Sawarabi Gothic', sans-serif;" + // google
          "Scada='Scada', sans-serif;" + // google
          "Seymour One='Seymour One', sans-serif;" + // google
          "Source Code Pro='Source Code Pro', monospace;" + // google
          "Source Sans Pro='Source Sans Pro', sans-serif;" + // google
          "Spectral='Spectral', serif;" + // google
          "Spectral SC='Spectral SC', serif;" + // google
          "Stalinist One='Stalinist One', cursive;" + // google
          "Tenor Sans='Tenor Sans', sans-serif;" + // google
          "Tinos='Tinos', serif;" + // google
          "Ubuntu Condensed='Ubuntu Condensed', sans-serif;" + // google
          "Ubuntu Mono='Ubuntu Mono', monospace;" + // google
          "Ubuntu='Ubuntu', sans-serif;" + // google
          "Underdog='Underdog', cursive;" + // google
          "Vollkorn='Vollkorn', serif;" + // google
          "Vollkorn SC='Vollkorn SC', serif;" + // google
          "Yanone Kaffeesatz='Yanone Kaffeesatz', sans-serif;" + // google
          "Yeseva One='Yeseva One', cursive;", // google
        style_formats: [{
          title: "AOS",
          items: [{
              title: "Fade",
              items: [{
                title: 'fade',
                selector: '*',
                attributes: {
                  'data-aos': 'fade'
                }
              }, {
                title: 'fade-up',
                selector: '*',
                attributes: {
                  'data-aos': 'fade-up'
                }
              }, {
                title: 'fade-down',
                selector: '*',
                attributes: {
                  'data-aos': 'fade-down'
                }
              }, {
                title: 'fade-left',
                selector: '*',
                attributes: {
                  'data-aos': 'fade-left'
                }
              }, {
                title: 'fade-right',
                selector: '*',
                attributes: {
                  'data-aos': 'fade-right'
                }
              }, {
                title: 'fade-up-right',
                selector: '*',
                attributes: {
                  'data-aos': 'fade-up-right'
                }
              }, {
                title: 'fade-up-left',
                selector: '*',
                attributes: {
                  'data-aos': 'fade-up-left'
                }
              }, {
                title: 'fade-down-right',
                selector: '*',
                attributes: {
                  'data-aos': 'fade-down-right'
                }
              }, {
                title: 'fade-down-left',
                selector: '*',
                attributes: {
                  'data-aos': 'fade-down-left'
                }
              }]
            },
            {
              title: "Flip",
              items: [{
                title: 'flip-up',
                selector: '*',
                attributes: {
                  'data-aos': 'flip-up'
                }
              }, {
                title: 'flip-down',
                selector: '*',
                attributes: {
                  'data-aos': 'flip-down'
                }
              }, {
                title: 'flip-left',
                selector: '*',
                attributes: {
                  'data-aos': 'flip-left'
                }
              }, {
                title: 'flip-right',
                selector: '*',
                attributes: {
                  'data-aos': 'flip-right'
                }
              }]
            },
            {
              title: "Slide",
              items: [{
                title: 'slide-up',
                selector: '*',
                attributes: {
                  'data-aos': 'slide-up'
                }
              }, {
                title: 'slide-down',
                selector: '*',
                attributes: {
                  'data-aos': 'slide-down'
                }
              }, {
                title: 'slide-left',
                selector: '*',
                attributes: {
                  'data-aos': 'slide-left'
                }
              }, {
                title: 'slide-right',
                selector: '*',
                attributes: {
                  'data-aos': 'slide-right'
                }
              }]
            }, {
              title: "Zoom",
              items: [{
                title: 'zoom-in',
                selector: '*',
                attributes: {
                  'data-aos': 'zoom-in'
                }
              }, {
                title: 'zoom-in-up',
                selector: '*',
                attributes: {
                  'data-aos': 'zoom-in-up'
                }
              }, {
                title: 'zoom-in-down',
                selector: '*',
                attributes: {
                  'data-aos': 'zoom-in-down'
                }
              }, {
                title: 'zoom-in-left',
                selector: '*',
                attributes: {
                  'data-aos': 'zoom-in-left'
                }
              }, {
                title: 'zoom-in-right',
                selector: '*',
                attributes: {
                  'data-aos': 'zoom-in-right'
                }
              }, {
                title: 'zoom-out',
                selector: '*',
                attributes: {
                  'data-aos': 'zoom-out'
                }
              }, {
                title: 'zoom-out-up',
                selector: '*',
                attributes: {
                  'data-aos': 'zoom-out-up'
                }
              }, {
                title: 'zoom-out-down',
                selector: '*',
                attributes: {
                  'data-aos': 'zoom-out-down'
                }
              }, {
                title: 'zoom-out-left',
                selector: '*',
                attributes: {
                  'data-aos': 'zoom-out-left'
                }
              }, {
                title: 'zoom-out-right',
                selector: '*',
                attributes: {
                  'data-aos': 'zoom-out-right'
                }
              }]
            }
          ]
        }],
        //preview_styles: "font-family font-size font-weight font-style text-decoration text-transform color background-color border border-radius outline text-shadow",
        //preview_styles: "font-family font-size font-weight font-style text-decoration text-transform text-shadow",
        setup: editor => {
          editor.that = this;
          editor.on('init', function() {
            var scriptId = editor.dom.uniqueId();
            var scriptElm = editor.dom.create('script', {
              id: scriptId,
              type: 'text/javascript',
              src: '//cdn.jsdelivr.net/npm/aos/dist/aos.js'
            });
            editor.getDoc().getElementsByTagName('head')[0].appendChild(scriptElm);
            scriptElm.addEventListener('load', () => {
              editor.contentWindow.AOS.init();
            })
          });
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
                //newPath = path + encodeURI(value.replace(/ /g, "_")) + '/';
                newPath = path + value.replace(/ /g, "_") + '/';
                children = child ? getSubmenuItems(child, newPath) : null;
                item = '{"type":"menuitem","text":"' + value + '",onAction:function(){""===tinyMCE.activeEditor.selection.getContent()?tinyMCE.execCommand("mceInsertContent",!1,"<a href=\\"' + newPath + '\\">' + value + '</a>"):tinyMCE.execCommand("mceInsertLink",!1,"' + newPath + '")},"icon":';
                if (children) {
                  item = item + '"chevron-right",';
                  item = item + '"getSubmenuItems":function(){return ' + children + '}';
                } else {
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
              //this.app.S3.headObject({
              //	Bucket: 'redaktr',
              //	Key: this.app.identityId + '/' + decodeURI(file.name)
              //}, (err, data) => {
              //var filePath = (err ? '' : webix.uid() + '/') + decodeURI(file.name);
              var filePath = webix.uid() + '/' + decodeURI(file.name);
              this.app.S3.putObject({
                Bucket: 'redaktr',
                Key: this.app.identityId + '/' + filePath,
                ContentType: file.type,
                Body: blobInfo.blob()
              }, (err, data) => {
                if (err) webix.message({
                  text: err.message,
                  type: "error"
                });
                else cb(filePath, {
                  title: decodeURI(file.name)
                });
              });
              //});
            };
            reader.readAsDataURL(file);
          };
          input.click();
        },

        allow_conditional_comments: true,
        allow_html_in_named_anchor: true,
        element_format: 'html',


        quickbars_insert_toolbar: false,
        //quickbars_selection_toolbar: false,
        quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
        noneditable_noneditable_class: "mceNonEditable",
        toolbar_mode: 'sliding',
        contextmenu: "link image imagetools table",

        autosave_ask_before_unload: true,
        autosave_interval: "30s",
        autosave_prefix: "{path}{query}-{id}-",
        autosave_restore_when_empty: false,
        autosave_retention: "2m",


        extended_valid_elements: 'script[*],i[*],span[*]',
        valid_children: "+body[style],+body[link],+h1[div],+h2[div],+h3[div],+h4[div],+h5[div],+h6[div]",
        toolbar_drawer: 'floating',
        branding: false,
        convert_urls: false,
        image_advtab: true,
        image_caption: true,
        image_title: true,
        allow_script_urls: true,
        style_formats_autohide: true,
        style_formats_merge: true,
        paste_data_images: true,
        importcss_append: true,
        images_reuse_filename: true,
        images_upload_handler: (blobInfo, success, failure) => {
          //this.app.S3.headObject({
          //	Bucket: 'redaktr',
          //	Key: this.app.identityId + '/' + decodeURI(blobInfo.filename())
          //}, (err, data) => {
          //var filePath = (err ? '' : webix.uid() + '/') + decodeURI(blobInfo.filename());
          var filePath = webix.uid() + '/' + decodeURI(blobInfo.filename());
          this.app.S3.putObject({
            Bucket: 'redaktr',
            Key: this.app.identityId + '/' + filePath,
            ContentType: blobInfo.blob().type,
            Body: blobInfo.blob()
          }, (err, data) => {
            if (err) failure(err.message);
            else success(filePath);
          });
          //});
        },
        document_base_url: "//" + location.hostname.replace(/(?:(?=www)|\w+.)/, '') + "/" + this.app.identityId + "/",
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
    $$("tinymce").getEditor(true).then(tinymce => {
      tinymce.off("SetContent");
      tinymce.off("Change");
      tinymce.getWin().scrollTo(0, 0);
      tinymce.setContent(val);
      tinymce.undoManager.clear();
      tinymce.nodeChanged();
      tinymce.on("Change", this.getParentView()._save);
      tinymce.on("SetContent", this.getParentView()._save);
    });
  }
}
/* global tinymce */
/* global webix */
/* global AWS */
/* global $$ */