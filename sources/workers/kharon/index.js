const aws = require('aws-sdk');
const tree = require('./tree');
const s3 = new aws.S3();
exports.handler = (event, context, callback) => {
  const key = decodeURIComponent(event.Records[0].s3.object.key);
  const id = key.match(/^[^/]+/)[0];
  Promise.all([s3.getObject({
    Bucket: 'redaktr',
    Key: id + '.json',
  }).promise(), s3.getObject({
    Bucket: 'redaktr',
    Key: id + '/index.json',
  }).promise(), s3.getObject({
    Bucket: 'redaktr',
    Key: id + '.html',
  }).promise()]).then((value) => tree.main(
    value,
    id,
    key,
    s3,
    callback))
    .catch((err) => {
      console.log('index.js', id);
      console.log('s3.getObject', {
        Bucket: 'redaktr',
        Key: id + '.json',
      });
      console.log('s3.getObject', {
        Bucket: 'redaktr',
        Key: id + '/index.json',
      });
      console.log('s3.getObject', {
        Bucket: 'redaktr',
        Key: id + '.html',
      });
      callback(err);
    });
};
