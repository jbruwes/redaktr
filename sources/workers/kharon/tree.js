const html = require('./html');
const deleteFolder = require('./deleteFolder');
const hardLink = require('./hardLink');
const sitemap = require('./sitemap');
module.exports = {
  main: (value, id, key, s3, callback) => {
    const tree = JSON.parse(value[1].Body.toString());
    const item = JSON.parse(value[0].Body.toString());
    const map = [];
    const mmap = [];
    var f_sitemap = (p_tree, pPath) => {
      p_tree.forEach((val) => {
        val.path = decodeURI((pPath + '/' + val.value).trim().replace(/^\//, '')).replace(/ /g, '_');
        html.main(value, id, id + '/' + val.id + '.htm', s3, callback, val);
        if (item.domain) hardLink.main(val.url, item.name, item.domain, val.path, s3, callback);
        sitemap.main(val.url, item.domain, val.path, map, mmap, val.lastmod, val.changefreq, val.priority);
        if (val.data) f_sitemap(val.data, pPath + '/' + val.value);
      });
    };
    const f_sitemap2 = (_) => {
      s3.deleteObject({
        Bucket: 'redaktr.com',
        Key: item.name + '/robots.txt',
      }, (err, data) => {
        if (err) {
          console.log('tree.js', item);
          console.log('s3.deleteObject', {
            Bucket: 'redaktr.com',
            Key: item.name + '/robots.txt',
          });
          callback(err);
        } else if (item.domain) {
          s3.putObject({
            Bucket: 'redaktr.com',
            Key: item.name + '/robots.txt',
            ContentType: 'text/plain',
            Body: 'User-agent: *\nDisallow:\nSitemap: https://' + item.domain + '/sitemap.xml',
          }, (err, data) => {
            if (err) {
              console.log('tree.js', item);
              console.log('s3.putObject', {
                Bucket: 'redaktr.com',
                Key: item.name + '/robots.txt',
                ContentType: 'text/plain',
                Body: 'User-agent: *\nDisallow:\nSitemap: https://' + item.domain + '/sitemap.xml',
              });
              callback(err);
            } else callback();
          });
        }
      });
      s3.deleteObject({
        Bucket: 'redaktr.com',
        Key: item.name + '/sitemap.xml',
      }, (err, data) => {
        if (err) {
          console.log('tree.js', item);
          console.log('s3.deleteObject', {
            Bucket: 'redaktr.com',
            Key: item.name + '/sitemap.xml',
          });
          callback(err);
        } else if (map.length) {
          s3.putObject({
            Bucket: 'redaktr.com',
            Key: item.name + '/sitemap.xml',
            ContentType: 'application/xml',
            Body: '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + map.join('') + '</urlset>',
          }, (err, data) => {
            if (err) {
              console.log('tree.js', item);
              console.log('s3.putObject', {
                Bucket: 'redaktr.com',
                Key: item.name + '/sitemap.xml',
                ContentType: 'application/xml',
                Body: '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + map.join('') + '</urlset>',
              });
              callback(err);
            } else callback();
          });
        }
      });
      s3.deleteObject({
        Bucket: 'm.redaktr.com',
        Key: item.name + '/robots.txt',
      }, (err, data) => {
        if (err) {
          console.log('tree.js', item);
          console.log('s3.deleteObject', {
            Bucket: 'm.redaktr.com',
            Key: item.name + '/robots.txt',
          });
          callback(err);
        } else if (item.domain) {
          s3.putObject({
            Bucket: 'm.redaktr.com',
            Key: item.name + '/robots.txt',
            ContentType: 'text/plain',
            Body: 'User-agent: *\nDisallow:\nSitemap: https://m.' + item.domain + '/sitemap.xml\nSitemap: https://' + item.domain + '/sitemap.xml',
          }, (err, data) => {
            if (err) {
              console.log('tree.js', item);
              console.log('s3.putObject', {
                Bucket: 'm.redaktr.com',
                Key: item.name + '/robots.txt',
                ContentType: 'text/plain',
                Body: 'User-agent: *\nDisallow:\nSitemap: https://m.' + item.domain + '/sitemap.xml\nSitemap: https://' + item.domain + '/sitemap.xml',
              });
              callback(err);
            } else callback();
          });
        }
      });
      s3.deleteObject({
        Bucket: 'm.redaktr.com',
        Key: item.name + '/sitemap.xml',
      }, (err, data) => {
        if (err) {
          console.log('tree.js', item);
          console.log('s3.deleteObject', {
            Bucket: 'm.redaktr.com',
            Key: item.name + '/sitemap.xml',
          });
          callback(err);
        } else if (map.length) {
          s3.putObject({
            Bucket: 'm.redaktr.com',
            Key: item.name + '/sitemap.xml',
            ContentType: 'application/xml',
            Body: '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + mmap.join('') + '</urlset>',
          }, (err, data) => {
            if (err) {
              console.log('tree.js', item);
              console.log('s3.putObject', {
                Bucket: 'm.redaktr.com',
                Key: item.name + '/sitemap.xml',
                ContentType: 'application/xml',
                Body: '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + mmap.join('') + '</urlset>',
              });
              callback(err);
            } else callback();
          });
        }
      });
    };
    deleteFolder.main(item.name, tree, s3, f_sitemap, f_sitemap2);
  },
};
