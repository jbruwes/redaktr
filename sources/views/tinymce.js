import {
  JetView
} from "webix-jet";
export default class TinymceView extends JetView {
  config() {
    const 
    items='<div class="ui items mceNonEditable" #{data}><div class="item">#{content}</div></div>',
    grid='<div class="ui #{count} column centered stackable doubling stretched padded grid" #{data}><div class="column #{align} aligned" data-aos="#{aos}">#{content}</div></div>',
    //cards='<div class="ui #{count} centered stackable doubling cards mceNonEditable" #{data}>#{content}</div>',
    segments='<div class="ui vertical padded segments mceNonEditable" #{data}>#{content}</div>',
    
    innerHeader = '<i class="hvr-icon icon"><!-- --></i><span class="ui"><span class="sub header"><!-- --></span></span>',
    header = '<div class="content"><a class="ui header hvr-icon-wobble-vertical">' + innerHeader + '</a></div>',
          h1 = '<div class="content"><h1 class="ui header hvr-icon-wobble-vertical">' + innerHeader + '</h1></div>',
          dimmedImage = '<div class="ui image"><div class="ui inverted dimmer"><a class="ui circular inverted secondary icon button"><i class="icon"><!-- --></i></a></div><img class="ui image"></div>',
      singleData = 'data-auto="" data-path="" data-date="true"',
      multiData = 'data-length="" data-deep="false" data-random="false"',
      sliderData = 'data-pager="true" data-controls="true"';
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
        toolbar: 'undo redo | rlink | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen preview print | insertfile image media template link unlink anchor codesample | ltr rtl',
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
            description: 'data-scrollable data-animation data-close-on-click data-direction data-hover-delay data-open-on-click data-orientation data-popup-collision',
            content: '<div class="mceNonEditable" data-id="rmenu" data-scrollable="true" data-animation="true" data-close-on-click="true" data-direction="default" data-hover-delay="100" data-open-on-click="false" data-orientation="horizontal" data-popup-collision="true"></div>'
          },
          {
            title: 'card deck',
            description: 'data-length data-pager data-controls data-auto data-path data-deep data-random data-date',
            //content: '<div class="ui three column stretched padded grid mceNonEditable" data-id="deck" ' + [singleData, multiData, sliderData].join(' ') + '><div class="ui column" data-aos="flip-left"><div class="ui fluid raised link card"><div class="ui image"><div class="ui inverted dimmer"><a class="ui circular inverted secondary icon button"><i class="icon"><!-- --></i></a></div><img class="ui image"></div>' + header + '</div></div></div>'
            content: grid
            .replace('#{count}', 'three')
            .replace('#{aos}', 'flip-left')
            .replace('#{align}', 'left')
            .replace('#{data}', ['data-id="deck"', singleData, multiData, sliderData].join(' '))
            .replace('#{content}', '<div class="ui fluid raised link card">' + dimmedImage + header + '</div>')
          },
          {
            title: 'carousel',
            description: 'data-length data-pager data-controls data-auto data-path data-deep data-random data-date',
            content: '<div class="ui vertical segments mceNonEditable" data-id="carousel" ' + [singleData, multiData, sliderData].join(' ') + '><div class="ui basic fitted segment" style="height:100vh;background-size:cover;background-position:center;"><div class="ui active very light dimmer">' + header + '</div></div></div>'
          },
          {
            title: 'particles',
            description: 'data-particles data-auto data-path data-date',
            content: '<div id="' + webix.uid() + '" class="ui tertiary inverted basic vertical fitted segment mceNonEditable" data-id="particles" ' + singleData + ' data-particles="default" style="height:100vh;background-size:cover;background-position:center;"><div class="ui active very light center dimmer">' + header + '</div></div>'
          },
          {
            title: 'header list',
            description: 'data-length data-auto data-path data-deep data-random data-date',
            content: '<div class="ui items mceNonEditable" data-id="list" ' + [singleData, multiData].join(' ') + '><div class="item"><div class="ui small image" data-aos="fade-left"><div class="ui inverted dimmer"><a class="ui circular inverted secondary icon button"><i class="icon "><!-- --></i></a></div><img class="ui image" loading="lazy"></div>' + header + '</div></div>'
          },
          {
            title: 'header',
            description: 'data-auto data-path data-date',
            content: '<div class="ui basic fitted segment mceNonEditable" data-id="header" ' + singleData + '>' + h1 + '</div>'
          },
          {
            title: 'icon header grid',
            description: 'data-length data-auto data-path data-deep data-random',
            content: '<div class="ui six column centered stackable doubling stretched padded grid" data-id="headergrid" ' + [singleData, multiData].join(' ') + '><div class="column center aligned">' + header + '</div></div>'
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
            title: "Animation",
            items: [{
                title: "Fade",
                items: [{
                  title: 'fade',
                  selector: '*',
                  classes: 'aos-init aos-animate',
                  attributes: {
                    'data-aos': 'fade'
                  }
                }, {
                  title: 'fade-up',
                  selector: '*',
                  classes: 'aos-init aos-animate',
                  attributes: {
                    'data-aos': 'fade-up'
                  }
                }, {
                  title: 'fade-down',
                  selector: '*',
                  classes: 'aos-init aos-animate',
                  attributes: {
                    'data-aos': 'fade-down'
                  }
                }, {
                  title: 'fade-left',
                  selector: '*',
                  classes: 'aos-init aos-animate',
                  attributes: {
                    'data-aos': 'fade-left'
                  }
                }, {
                  title: 'fade-right',
                  selector: '*',
                  classes: 'aos-init aos-animate',
                  attributes: {
                    'data-aos': 'fade-right'
                  }
                }, {
                  title: 'fade-up-right',
                  selector: '*',
                  classes: 'aos-init aos-animate',
                  attributes: {
                    'data-aos': 'fade-up-right'
                  }
                }, {
                  title: 'fade-up-left',
                  selector: '*',
                  classes: 'aos-init aos-animate',
                  attributes: {
                    'data-aos': 'fade-up-left'
                  }
                }, {
                  title: 'fade-down-right',
                  selector: '*',
                  classes: 'aos-init aos-animate',
                  attributes: {
                    'data-aos': 'fade-down-right'
                  }
                }, {
                  title: 'fade-down-left',
                  selector: '*',
                  classes: 'aos-init aos-animate',
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
                  classes: 'aos-init aos-animate',
                  attributes: {
                    'data-aos': 'flip-up'
                  }
                }, {
                  title: 'flip-down',
                  selector: '*',
                  classes: 'aos-init aos-animate',
                  attributes: {
                    'data-aos': 'flip-down'
                  }
                }, {
                  title: 'flip-left',
                  selector: '*',
                  classes: 'aos-init aos-animate',
                  attributes: {
                    'data-aos': 'flip-left'
                  }
                }, {
                  title: 'flip-right',
                  selector: '*',
                  classes: 'aos-init aos-animate',
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
                  classes: 'aos-init aos-animate',
                  attributes: {
                    'data-aos': 'slide-up'
                  }
                }, {
                  title: 'slide-down',
                  selector: '*',
                  classes: 'aos-init aos-animate',
                  attributes: {
                    'data-aos': 'slide-down'
                  }
                }, {
                  title: 'slide-left',
                  selector: '*',
                  classes: 'aos-init aos-animate',
                  attributes: {
                    'data-aos': 'slide-left'
                  }
                }, {
                  title: 'slide-right',
                  selector: '*',
                  classes: 'aos-init aos-animate',
                  attributes: {
                    'data-aos': 'slide-right'
                  }
                }]
              }, {
                title: "Zoom",
                items: [{
                  title: 'zoom-in',
                  selector: '*',
                  classes: 'aos-init aos-animate',
                  attributes: {
                    'data-aos': 'zoom-in'
                  }
                }, {
                  title: 'zoom-in-up',
                  selector: '*',
                  classes: 'aos-init aos-animate',
                  attributes: {
                    'data-aos': 'zoom-in-up'
                  }
                }, {
                  title: 'zoom-in-down',
                  selector: '*',
                  classes: 'aos-init aos-animate',
                  attributes: {
                    'data-aos': 'zoom-in-down'
                  }
                }, {
                  title: 'zoom-in-left',
                  selector: '*',
                  classes: 'aos-init aos-animate',
                  attributes: {
                    'data-aos': 'zoom-in-left'
                  }
                }, {
                  title: 'zoom-in-right',
                  selector: '*',
                  classes: 'aos-init aos-animate',
                  attributes: {
                    'data-aos': 'zoom-in-right'
                  }
                }, {
                  title: 'zoom-out',
                  selector: '*',
                  classes: 'aos-init aos-animate',
                  attributes: {
                    'data-aos': 'zoom-out'
                  }
                }, {
                  title: 'zoom-out-up',
                  selector: '*',
                  classes: 'aos-init aos-animate',
                  attributes: {
                    'data-aos': 'zoom-out-up'
                  }
                }, {
                  title: 'zoom-out-down',
                  selector: '*',
                  classes: 'aos-init aos-animate',
                  attributes: {
                    'data-aos': 'zoom-out-down'
                  }
                }, {
                  title: 'zoom-out-left',
                  selector: '*',
                  classes: 'aos-init aos-animate',
                  attributes: {
                    'data-aos': 'zoom-out-left'
                  }
                }, {
                  title: 'zoom-out-right',
                  selector: '*',
                  classes: 'aos-init aos-animate',
                  attributes: {
                    'data-aos': 'zoom-out-right'
                  }
                }]
              }
            ]
          },
          {
            title: "Hover",
            items: [{
              title: "2D Transitions",
              items: [{
                title: 'Grow',
                selector: '*',
                classes: 'hvr-grow'
              }, {
                title: 'Shrink',
                selector: '*',
                classes: 'hvr-shrink'
              }, {
                title: 'Pulse',
                selector: '*',
                classes: 'hvr-pulse'
              }, {
                title: 'Pulse Grow',
                selector: '*',
                classes: 'hvr-pulse-grow'
              }, {
                title: 'Pulse Shrink',
                selector: '*',
                classes: 'hvr-pulse-shrink'
              }, {
                title: 'Push',
                selector: '*',
                classes: 'hvr-push'
              }, {
                title: 'Pop',
                selector: '*',
                classes: 'hvr-pop'
              }, {
                title: 'Bounce In',
                selector: '*',
                classes: 'hvr-bounce-in'
              }, {
                title: 'Bounce Out',
                selector: '*',
                classes: 'hvr-bounce-out'
              }, {
                title: 'Rotate',
                selector: '*',
                classes: 'hvr-rotate'
              }, {
                title: 'Grow Rotate',
                selector: '*',
                classes: 'hvr-grow-rotate'
              }, {
                title: 'Float',
                selector: '*',
                classes: 'hvr-float'
              }, {
                title: 'Sink',
                selector: '*',
                classes: 'hvr-sink'
              }, {
                title: 'Bob',
                selector: '*',
                classes: 'hvr-bob'
              }, {
                title: 'Hang',
                selector: '*',
                classes: 'hvr-hang'
              }, {
                title: 'Skew',
                selector: '*',
                classes: 'hvr-skew'
              }, {
                title: 'Skew Forward',
                selector: '*',
                classes: 'hvr-skew-forward'
              }, {
                title: 'Skew Backward',
                selector: '*',
                classes: 'hvr-skew-backward'
              }, {
                title: 'Wobble Vertical',
                selector: '*',
                classes: 'hvr-wobble-vertical'
              }, {
                title: 'Wobble Horizontal',
                selector: '*',
                classes: 'hvr-wobble-horizontal'
              }, {
                title: 'Wobble To Bottom Right',
                selector: '*',
                classes: 'hvr-wobble-to-bottom-right'
              }, {
                title: 'Wobble To Top Right',
                selector: '*',
                classes: 'hvr-wobble-to-top-right'
              }, {
                title: 'Wobble Top',
                selector: '*',
                classes: 'hvr-wobble-top'
              }, {
                title: 'Wobble Bottom',
                selector: '*',
                classes: 'hvr-wobble-bottom'
              }, {
                title: 'Wobble Skew',
                selector: '*',
                classes: 'hvr-wobble-skew'
              }, {
                title: 'Buzz',
                selector: '*',
                classes: 'hvr-buzz'
              }, {
                title: 'Buzz Out',
                selector: '*',
                classes: 'hvr-buzz-out'
              }, {
                title: 'Forward',
                selector: '*',
                classes: 'hvr-forward'
              }, {
                title: 'Backward',
                selector: '*',
                classes: 'hvr-backward'
              }]
            }, {
              title: "Background Transitions",
              items: [{
                title: 'Fade',
                selector: '*',
                classes: 'hvr-fade'
              }, {
                title: 'Back Pulse',
                selector: '*',
                classes: 'hvr-back-pulse'
              }, {
                title: 'Sweep To Right',
                selector: '*',
                classes: 'hvr-sweep-to-right'
              }, {
                title: 'Sweep To Left',
                selector: '*',
                classes: 'hvr-sweep-to-left'
              }, {
                title: 'Sweep To Bottom',
                selector: '*',
                classes: 'hvr-sweep-to-bottom'
              }, {
                title: 'Sweep To Top',
                selector: '*',
                classes: 'hvr-sweep-to-top'
              }, {
                title: 'Bounce To Right',
                selector: '*',
                classes: 'hvr-bounce-to-right'
              }, {
                title: 'Bounce To Left',
                selector: '*',
                classes: 'hvr-bounce-to-left'
              }, {
                title: 'Bounce To Bottom',
                selector: '*',
                classes: 'hvr-bounce-to-bottom'
              }, {
                title: 'Bounce To Top',
                selector: '*',
                classes: 'hvr-bounce-to-top'
              }, {
                title: 'Radial Out',
                selector: '*',
                classes: 'hvr-radial-out'
              }, {
                title: 'Radial In',
                selector: '*',
                classes: 'hvr-radial-in'
              }, {
                title: 'Rectangle In',
                selector: '*',
                classes: 'hvr-rectangle-in'
              }, {
                title: 'Rectangle Out',
                selector: '*',
                classes: 'hvr-rectangle-out'
              }, {
                title: 'Shutter In Horizontal',
                selector: '*',
                classes: 'hvr-shutter-in-horizontal'
              }, {
                title: 'Shutter Out Horizontal',
                selector: '*',
                classes: 'hvr-shutter-out-horizontal'
              }, {
                title: 'Shutter In Vertical',
                selector: '*',
                classes: 'hvr-shutter-in-vertical'
              }, {
                title: 'Shutter Out Vertical',
                selector: '*',
                classes: 'hvr-shutter-out-vertical'
              }]
            }, {
              title: "Border Transitions",
              items: [{
                title: 'Border Fade',
                selector: '*',
                classes: 'hvr-border-fade'
              }, {
                title: 'Hollow',
                selector: '*',
                classes: 'hvr-hollow'
              }, {
                title: 'Trim',
                selector: '*',
                classes: 'hvr-trim'
              }, {
                title: 'Ripple Out',
                selector: '*',
                classes: 'hvr-ripple-out'
              }, {
                title: 'Ripple In',
                selector: '*',
                classes: 'hvr-ripple-in'
              }, {
                title: 'Outline Out',
                selector: '*',
                classes: 'hvr-outline-out'
              }, {
                title: 'Outline In',
                selector: '*',
                classes: 'hvr-outline-in'
              }, {
                title: 'Round Corners',
                selector: '*',
                classes: 'hvr-round-corners'
              }, {
                title: 'Underline From Left',
                selector: '*',
                classes: 'hvr-underline-from-left'
              }, {
                title: 'Underline From Center',
                selector: '*',
                classes: 'hvr-underline-from-center'
              }, {
                title: 'Underline From Right',
                selector: '*',
                classes: 'hvr-underline-from-right'
              }, {
                title: 'Overline From Left',
                selector: '*',
                classes: 'hvr-overline-from-left'
              }, {
                title: 'Overline From Center',
                selector: '*',
                classes: 'hvr-overline-from-center'
              }, {
                title: 'Overline From Right',
                selector: '*',
                classes: 'hvr-overline-from-right'
              }, {
                title: 'Reveal',
                selector: '*',
                classes: 'hvr-reveal'
              }, {
                title: 'Underline Reveal',
                selector: '*',
                classes: 'hvr-underline-reveal'
              }, {
                title: 'Overline Reveal',
                selector: '*',
                classes: 'hvr-overline-reveal'
              }]
            }, {
              title: "Shadow/Glow Transitions",
              items: [{
                title: 'Glow',
                selector: '*',
                classes: 'hvr-glow'
              }, {
                title: 'Shadow',
                selector: '*',
                classes: 'hvr-shadow'
              }, {
                title: 'Grow Shadow',
                selector: '*',
                classes: 'hvr-grow-shadow'
              }, {
                title: 'Box Shadow Outset',
                selector: '*',
                classes: 'hvr-box-shadow-outset'
              }, {
                title: 'Box Shadow Inset',
                selector: '*',
                classes: 'hvr-box-shadow-inset'
              }, {
                title: 'Float Shadow',
                selector: '*',
                classes: 'hvr-float-shadow'
              }, {
                title: 'Shadow Radial',
                selector: '*',
                classes: 'hvr-shadow-radial'
              }]
            }, {
              title: "Speech Bubbles",
              items: [{
                title: 'Bubble Top',
                selector: '*',
                classes: 'hvr-bubble-top'
              }, {
                title: 'Bubble Right',
                selector: '*',
                classes: 'hvr-bubble-right'
              }, {
                title: 'Bubble Bottom',
                selector: '*',
                classes: 'hvr-bubble-bottom'
              }, {
                title: 'Bubble Left',
                selector: '*',
                classes: 'hvr-bubble-left'
              }, {
                title: 'Bubble Float Top',
                selector: '*',
                classes: 'hvr-bubble-float-top'
              }, {
                title: 'Bubble Float Right',
                selector: '*',
                classes: 'hvr-bubble-float-right'
              }, {
                title: 'Bubble Float Bottom',
                selector: '*',
                classes: 'hvr-bubble-float-bottom'
              }, {
                title: 'Bubble Float Left',
                selector: '*',
                classes: 'hvr-bubble-float-left'
              }]
            }, {
              title: "Icons",
              items: [{
                title: 'Icon Back',
                selector: '*',
                classes: 'hvr-icon-back'
              }, {
                title: 'Icon Forward',
                selector: '*',
                classes: 'hvr-icon-forward'
              }, {
                title: 'Icon Down',
                selector: '*',
                classes: 'hvr-icon-down'
              }, {
                title: 'Icon Up',
                selector: '*',
                classes: 'hvr-icon-up'
              }, {
                title: 'Icon Spin',
                selector: '*',
                classes: 'hvr-icon-spin'
              }, {
                title: 'Icon Drop',
                selector: '*',
                classes: 'hvr-icon-drop'
              }, {
                title: 'Icon Fade',
                selector: '*',
                classes: 'hvr-icon-fade'
              }, {
                title: 'Icon Float Away',
                selector: '*',
                classes: 'hvr-icon-float-away'
              }, {
                title: 'Icon Sink Away',
                selector: '*',
                classes: 'hvr-icon-sink-away'
              }, {
                title: 'Icon Grow',
                selector: '*',
                classes: 'hvr-icon-grow'
              }, {
                title: 'Icon Shrink',
                selector: '*',
                classes: 'hvr-icon-shrink'
              }, {
                title: 'Icon Pulse',
                selector: '*',
                classes: 'hvr-icon-pulse'
              }, {
                title: 'Icon Pulse Grow',
                selector: '*',
                classes: 'hvr-icon-pulse-grow'
              }, {
                title: 'Icon Pulse Shrink',
                selector: '*',
                classes: 'hvr-icon-pulse-shrink'
              }, {
                title: 'Icon Push',
                selector: '*',
                classes: 'hvr-icon-push'
              }, {
                title: 'Icon Pop',
                selector: '*',
                classes: 'hvr-icon-pop'
              }, {
                title: 'Icon Bounce',
                selector: '*',
                classes: 'hvr-icon-bounce'
              }, {
                title: 'Icon Rotate',
                selector: '*',
                classes: 'hvr-icon-rotate'
              }, {
                title: 'Icon Grow Rotate',
                selector: '*',
                classes: 'hvr-icon-grow-rotate'
              }, {
                title: 'Icon Float',
                selector: '*',
                classes: 'hvr-icon-float'
              }, {
                title: 'Icon Sink',
                selector: '*',
                classes: 'hvr-icon-sink'
              }, {
                title: 'Icon Bob',
                selector: '*',
                classes: 'hvr-icon-bob'
              }, {
                title: 'Icon Hang',
                selector: '*',
                classes: 'hvr-icon-hang'
              }, {
                title: 'Icon Wobble Horizontal',
                selector: '*',
                classes: 'hvr-icon-wobble-horizontal'
              }, {
                title: 'Icon Wobble Vertical',
                selector: '*',
                classes: 'hvr-icon-wobble-vertical'
              }, {
                title: 'Icon Buzz',
                selector: '*',
                classes: 'hvr-icon-buzz'
              }, {
                title: 'Icon Buzz Out',
                selector: '*',
                classes: 'hvr-icon-buzz-out'
              }]
            }, {
              title: "Curls",
              items: [{
                title: 'Curl Top Left',
                selector: '*',
                classes: 'hvr-curl-top-left'
              }, {
                title: 'Curl Top Right',
                selector: '*',
                classes: 'hvr-curl-top-right'
              }, {
                title: 'Curl Bottom Right',
                selector: '*',
                classes: 'hvr-curl-bottom-right'
              }, {
                title: 'Curl Bottom Left',
                selector: '*',
                classes: 'hvr-curl-bottom-left'
              }]
            }]

          }
        ],
        //preview_styles: "font-family font-size font-weight font-style text-decoration text-transform color background-color border border-radius outline text-shadow",
        //preview_styles: "font-family font-size font-weight font-style text-decoration text-transform text-shadow",
        setup: editor => {
          editor.that = this;
          editor.on('init', function() {
            var aos = editor.dom.create('script', {
              id: editor.dom.uniqueId(),
              type: 'text/javascript',
              src: '//unpkg.com/aos/dist/aos.js'
            });
            aos.addEventListener('load', _ => editor.contentWindow.AOS.init());
            editor.getDoc().getElementsByTagName('head')[0].appendChild(aos);
            /*var tilt = editor.dom.create('script', {
              id: editor.dom.uniqueId(),
              type: 'text/javascript',
              src: '//unpkg.com/vanilla-tilt/dist/vanilla-tilt.min.js'
            });
            editor.getDoc().getElementsByTagName('head')[0].appendChild(tilt);*/
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
              //if (item.visible) {
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
              //}
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

        visualblocks_default_state: true,

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


        extended_valid_elements: 'script[*],i[*],span[*],img[*]',
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
      var save = _ => {
        tinymce.contentWindow.AOS.refreshHard();
        this.getParentView()._save(null, this.getParentView());
      }

      tinymce.on("Change", save);
      tinymce.on("SetContent", save);

      //tinymce.on("Change", this.getParentView()._save);
      //tinymce.on("SetContent", this.getParentView()._save);
    });
  }
}
/* global tinymce */
/* global webix */
/* global AWS */
/* global $$ */