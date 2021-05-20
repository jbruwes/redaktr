/*jshint esversion: 9 */
const aws = require('aws-sdk'),
	s3 = new aws.S3(),
	documentClient = new aws.DynamoDB.DocumentClient();
exports.handler = async (event, context) => {
	async function* listAllKeys(opts) {
		do {
			const data = await s3.listObjectsV2(opts).promise();
			opts.ContinuationToken = data.NextContinuationToken;
			yield data;
		} while (opts.ContinuationToken)
	}
	try {
		let redaktr = await documentClient.scan({
			TableName: "redaktr",
			ProjectionExpression: "#name",
			ExpressionAttributeNames: {
				"#name": "name"
			}
		}).promise();
		redaktr = redaktr.Items.map(obj => {
			return obj.name
		});
		for await (const data of listAllKeys({
			Bucket: 'redaktr.com'
		})) {
			await Promise.all(data.Contents.map(async element => {
				const elementKey = element.Key.split('/');
				if (redaktr.indexOf(element.Key.split('.')[0]) === -1 && elementKey.length > 1 && redaktr.indexOf(elementKey[0]) === -1) {
					console.log(element.Key);
					const copy = await s3.copyObject({
						Bucket: "smetnik",
						CopySource: "/redaktr.com/" + encodeURIComponent(element.Key),
						Key: element.Key
					}).promise();
					await s3.deleteObject({
						Bucket: "redaktr.com",
						Key: element.Key
					}).promise(copy);
				}
			}));
		}
	} catch (err) {
		console.log(err);
		throw new Error('documentClient.scan');
	}
};