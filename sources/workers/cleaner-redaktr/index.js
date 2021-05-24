/* jshint esversion: 9 */
const aws = require('aws-sdk');
const s3 = new aws.S3();
exports.handler = async(event, context) => {
  async function * listAllKeys(opts) {
    do {
      const data = await s3.listObjectsV2(opts).promise();
      opts.ContinuationToken = data.NextContinuationToken;
      yield data;
    } while (opts.ContinuationToken);
  }
  try {
    const redaktr = [];
    for await (const data of listAllKeys({
      Bucket: 'redaktr',
      Delimiter: '/',
    })) {
      await Promise.all(data.Contents.filter((item) => {
        return item.Key.split('.').pop() === 'json';
      }).map(async(element) => {
        redaktr.push(element.Key.split('.').shift());
      }));
    }
    for await (const data of listAllKeys({
      Bucket: 'redaktr',
    })) {
      await Promise.all(data.Contents.map(async(element) => {
        if (redaktr.indexOf(element.Key.split('.')[0]) === -1 && redaktr.indexOf(element.Key.split('/')[0]) === -1) {
          console.log(element.Key);
          const copy = await s3.copyObject({
            Bucket: 'smetnik',
            CopySource: '/redaktr/' + encodeURIComponent(element.Key),
            Key: element.Key,
          }).promise();
          await s3.deleteObject({
            Bucket: 'redaktr',
            Key: element.Key,
          }).promise(copy);
        }
      }));
    }
  } catch (err) {
    console.log(err);
    throw new Error('documentClient.scan');
  }
};
