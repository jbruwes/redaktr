module.exports = {
  main: (value, id, key, s3, callback, pNode) => {
    const fileId = key.match(/([^\/]+)(?=\.\w+$)/)[0];
    const tree = JSON.parse(value[1].Body.toString())[0];
    const item = JSON.parse(value[0].Body.toString());
    var findNode = (id, currentNode, pPath) => {
      let i, result;
      if (id == currentNode.id) {
        currentNode.path = decodeURI((pPath + '/' + currentNode.value).trim().replace(/^\//, '')).replace(/ /g, '_');
        return currentNode;
      } else {
        if (currentNode.data) {
          for (i = 0; i < currentNode.data.length; i += 1) {
            result = findNode(id, currentNode.data[i], pPath + '/' + currentNode.value);
            if (result) return result;
          }
        }
        return;
      }
    };
    const node = pNode || findNode(fileId, tree, '');
    if (node) {
      let path = node.path;
      path = path.split('/');
      path.shift();
      path.unshift(item.name);
      path = path.join('/');
      s3.getObject({
        Bucket: 'redaktr',
        Key: key,
      }, (err, data) => {
        if (err) {
          console.log('html.js', item);
          console.log('s3.getObject', {
            Bucket: 'redaktr',
            Key: key,
          });
          callback(err);
        } else {
          let html = value[2].Body.toString();
          let mhtml = '<!DOCTYPE html>' +
            '<html>' +
            '<head>' +
            '</head>' +
            '<body>' +
            '<div class="ui sidebar very wide vertical accordion menu"></div>' +
            '<div class="ui main menu fixed" hidden><a class="launch icon item"><i class="content icon"></i></a><div class="header item"></div></div>' +
            '<div class="pusher"><div data-static="" class="ui fluid container">' +
            '<div id="content" style="margin: 0; flex: 1 1 auto;"><main></main></div>' +
            '</div></div>' +
            '</body>' +
            '</html>';
          let body = data.Body.toString().match(/<body[^>]*>[\s\S]*<\/body>/gi);
          body = body ? body[0].replace(/^<body[^>]*>/, '').replace(/<\/body>$/, '') : data.Body.toString();
          html = html.split(/\s*(<head>)\s*/);
          mhtml = mhtml.split(/\s*(<head>)\s*/);
          let buf = '<meta property="og:type" content="website"><meta property="twitter:card" content="summary_large_image">';
          html[1] = html[1] + buf;
          mhtml[1] = mhtml[1] + buf;
          buf = node.title ? node.title : node.value;
          buf = buf.replace(/"/g, '&quot;');
          buf = '<title>' + buf + '</title>' +
            '<meta name="title" content="' + buf + '">' +
            '<meta property="og:title" content="' + buf + '">' +
            '<meta property="twitter:title" content="' + buf + '">';
          html[1] = html[1] + buf;
          mhtml[1] = mhtml[1] + buf;
          if (node.description) {
            buf = node.description;
            buf = buf.replace(/"/g, '&quot;');
            buf = '<meta name="description" content="' + buf + '">' +
              '<meta property="og:description" content="' + buf + '">' +
              '<meta property="twitter:description" content="' + buf + '">';
            html[1] = html[1] + buf;
            mhtml[1] = mhtml[1] + buf;
          }
          if (node.url) buf = node.url.trim().replace(/^\/+|\/+$/g, '').replace(/ /g, '_');
          else {
            buf = node.path;
            buf = buf.split('/');
            buf.shift();
            buf = buf.join('/');
          }
          buf = encodeURI(buf);
          buf = 'https://' + (item.domain ? item.domain : 'redaktr.com/' + item.name) + '/' + (buf ? buf + '/' : '');
          buf = '<link rel="canonical" href="' + buf + '"/>' +
            '<meta property="og:url" content="' + buf + '">' +
            '<meta property="twitter:url" content="' + buf + '">';
          html[1] = html[1] + buf;
          mhtml[1] = mhtml[1] + buf;
          if (node.image) {
            buf = node.image;
            buf = encodeURI(buf);
            buf = 'https://' + (item.domain ? item.domain : 'redaktr.com') + '/' + item.id + '/' + buf;
            buf = '<meta property="og:image" content="' + buf + '">' +
              '<meta property="twitter:image" content="' + buf + '">';
            html[1] = html[1] + buf;
            mhtml[1] = mhtml[1] + buf;
          }
          if (item.metrika) {
            buf = '<script>(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(' + item.metrika + ',"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true});</script>';
            html[1] = html[1] + buf;
            mhtml[1] = mhtml[1] + buf;
          }
          if (item.analytics) {
            buf = '<script async src="https://www.googletagmanager.com/gtag/js?id=' + item.analytics + '"></script>';
            html[1] = html[1] + buf;
            mhtml[1] = mhtml[1] + buf;
            buf = "<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','" + item.analytics + "');</script>";
            html[1] = html[1] + buf;
            mhtml[1] = mhtml[1] + buf;
          }
          if (item.tagmanager) {
            buf = "<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','" + item.tagmanager + "');</script>";
            html[1] = html[1] + buf;
            mhtml[1] = mhtml[1] + buf;
          }
          mhtml[1] = mhtml[1] + html[2].split(/\s*(<\/head>)\s*/)[0];
          html = html.join('').replace(/>(\s{1,}|\t{1,}|[\n\r]{1,})</gm, '><').replace(/^\s*$[\n\r]{1,}/gm, '');
          mhtml = mhtml.join('').replace(/>(\s{1,}|\t{1,}|[\n\r]{1,})</gm, '><').replace(/^\s*$[\n\r]{1,}/gm, '');
          if (item.tagmanager) {
            html = html.split(/\s*(<body>)\s*/);
            mhtml = mhtml.split(/\s*(<body>)\s*/);
            buf = '<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=' + item.tagmanager + '" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>';
            html[1] = html[1] + buf;
            mhtml[1] = mhtml[1] + buf;
            html = html.join('').replace(/>(\s{1,}|\t{1,}|[\n\r]{1,})</gm, '><').replace(/^\s*$[\n\r]{1,}/gm, '');
            mhtml = mhtml.join('').replace(/>(\s{1,}|\t{1,}|[\n\r]{1,})</gm, '><').replace(/^\s*$[\n\r]{1,}/gm, '');
          }
          html = html.split(/(<div class=\"header item\"><\/div>)/);
          mhtml = mhtml.split(/(<div class=\"header item\"><\/div>)/);
          buf = node.title ? node.title : node.value;
          buf = buf.replace(/"/g, '&quot;');
          html[1] = '<div class="header item">' + buf + '</div>';
          mhtml[1] = '<div class="header item">' + buf + '</div>';
          html = html.join('').replace(/>(\s{1,}|\t{1,}|[\n\r]{1,})</gm, '><').replace(/^\s*$[\n\r]{1,}/gm, '');
          mhtml = mhtml.join('').replace(/>(\s{1,}|\t{1,}|[\n\r]{1,})</gm, '><').replace(/^\s*$[\n\r]{1,}/gm, '');
          html = html.split(/(<[^>]+id=\"content\".*>)(<main><\/main>)(<[^>]+>)/);
          mhtml = mhtml.split(/(<[^>]+id=\"content\".*>)(<main><\/main>)(<[^>]+>)/);
          if (html.length === 1) html = html[0].split(/(<[^>]+id=\"content\".*>)(<div><\/div>)(<[^>]+>)/);
          if (mhtml.length === 1) mhtml = mhtml[0].split(/(<[^>]+id=\"content\".*>)(<div><\/div>)(<[^>]+>)/);
          html[2] = '<main>' + body /* + buf*/ + '</main>';
          mhtml[2] = '<main>' + body /* + buf*/ + '</main>';
          html = html.join('').replace(/>(\s{1,}|\t{1,}|[\n\r]{1,})</gm, '><').replace(/^\s*$[\n\r]{1,}/gm, '');
          mhtml = mhtml.join('').replace(/>(\s{1,}|\t{1,}|[\n\r]{1,})</gm, '><').replace(/^\s*$[\n\r]{1,}/gm, '');
          s3.putObject({
            Bucket: 'redaktr.com',
            Key: path + '/index.html',
            ContentType: 'text/html',
            Body: html,
          }, (err, data) => {
            if (err) {
              console.log('html.js', item);
              console.log('s3.putObject', {
                Bucket: 'redaktr.com',
                Key: path + '/index.html',
                ContentType: 'text/html',
                Body: html,
              });
              callback(err);
            } else callback();
          });
          s3.putObject({
            Bucket: 'm.redaktr.com',
            Key: path + '/index.html',
            ContentType: 'text/html',
            Body: mhtml,
          }, (err, data) => {
            if (err) {
              console.log('html.js', item);
              console.log('s3.putObject', {
                Bucket: 'm.redaktr.com',
                Key: path + '/index.html',
                ContentType: 'text/html',
                Body: mhtml,
              });
              callback(err);
            } else callback();
          });
        }
      });
    }
  },
};
