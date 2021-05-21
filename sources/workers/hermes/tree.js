const html = require('./html');
const deleteFolder = require('./deleteFolder');
const hardLink = require('./hardLink');
module.exports = {
  main: (value, id, key, s3, callback) => {
    const tree = JSON.parse(value[1].Body.toString());
    const item = JSON.parse(value[0].Body.toString());
    var f_sitemap = (p_tree, pPath) => {
      p_tree.forEach((val) => {
        val.path = decodeURI((pPath + '/' + val.value).trim().replace(/^\//, '')).replace(/ /g, '_');
        html.main(value, id, id + '/' + val.id + '.htm', s3, callback, val);
        if (item.domain) hardLink.main(val.url, item.name, item.domain, val.path, s3, callback);
        if (val.data) f_sitemap(val.data, pPath + '/' + val.value);
      });
    };
    deleteFolder.main(item.name, tree, s3, f_sitemap);
  },
};
