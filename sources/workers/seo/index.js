'use strict';
let aws = require('aws-sdk');
let s3 = new aws.S3();
let documentClient = new aws.DynamoDB.DocumentClient();
let html = require('./html');
exports.handler = (event, context, callback) => {
	const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
	const id = key.match(/^[^\/]+/)[0];
	Promise.all([documentClient.get({
		TableName: "redaktr",
		Key: {
			"id": id
		}
	}).promise(), s3.getObject({
		Bucket: 'redaktr',
		Key: id + '/index.json',
	}).promise(), s3.getObject({
		Bucket: 'redaktr',
		Key: id + '.html'
	}).promise()]).then(value => html.main(value, id, key, s3, callback)).catch(err => {
		console.log('index.js', id);
		console.log('documentClient.get', {
			TableName: "redaktr",
			Key: {
				"id": id
			}
		});
		console.log('s3.getObject', {
			Bucket: 'redaktr',
			Key: id + '/index.json',
		});
		console.log('s3.getObject', {
			Bucket: 'redaktr',
			Key: id + '.html'
		});
		callback(err);
	});
};