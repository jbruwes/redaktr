
const aws = require('aws-sdk');
const s3 = new aws.S3();
const documentClient = new aws.DynamoDB.DocumentClient();
const tree = require('./tree');
exports.handler = (event, context, callback) => {
  const key = decodeURIComponent(event.Records[0].s3.object.key);
  const id = key.substr(0, key.lastIndexOf('.')) || key;
  Promise.all([documentClient.get({
    TableName: 'redaktr',
    Key: {
      id: id,
    },
  }).promise(), s3.getObject({
    Bucket: 'redaktr',
    Key: id + '/index.json',
  }).promise(), s3.getObject({
    Bucket: 'redaktr',
    Key: id + '.html',
  }).promise()]).then((value) => tree.main(value, id, key, s3, callback)).catch((err) => {
    console.log('index.js', id);
    console.log('documentClient.get', {
      TableName: 'redaktr',
      Key: {
        id: id,
      },
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
