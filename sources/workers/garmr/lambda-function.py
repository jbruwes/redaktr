import json
import os
import urllib.parse
import boto3
from pathlib import Path
s3 = boto3.resource('s3')
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('redaktr')
bucket = s3.Bucket('redaktr')
s3_client = boto3.client('s3')
paginator = s3_client.get_paginator('list_objects_v2')
response_iterator = paginator.paginate(Bucket='redaktr', Delimiter='/')
def plain_tree(tree, id, html):
	tree["id"] = str(tree["id"]) + ".htm"
	try:
		content = s3.Object('redaktr', id + "/" + tree["id"]).get()
	except Exception:
		pass
	else:
		html = html + urllib.parse.unquote(content["Body"].read().decode('utf-8'))
	if 'data' in tree:
		for val in tree['data']:
			html = plain_tree(val, id, html)
	return html
def lambda_handler(event, context):
	for response in response_iterator:
		for object_data in response['Contents']:
			key = object_data['Key']
			if key.endswith('.json'):
				id = Path(key).stem
				html = ''
				content = None
				try:
					content = s3.Object('redaktr', id + "/index.cdn.css").get()
				except Exception:
					pass
				else:
					html = html + urllib.parse.unquote(content["Body"].read().decode('utf-8'))
				content = None
				try:
					content = s3.Object('redaktr', id + "/index.cdn.json").get()
				except Exception:
					pass
				else:
					html = html + urllib.parse.unquote(content["Body"].read().decode('utf-8'))
				content = None
				try:
					content = s3.Object('redaktr', id + "/index.css").get()
				except Exception:
					pass
				else:
					html = html + urllib.parse.unquote(content["Body"].read().decode('utf-8'))
				content = None
				try:
					content = s3.Object('redaktr', id + ".html").get()
				except Exception:
					pass
				else:
					html = html + urllib.parse.unquote(content["Body"].read().decode('utf-8'))
				content = None
				try:
					content = s3.Object('redaktr', id + "/index.js").get()
				except Exception:
					pass
				else:
					html = html + urllib.parse.unquote(content["Body"].read().decode('utf-8'))
				content = None
				try:
					content = s3.Object('redaktr', id + "/index.json").get()
				except Exception:
					pass
				else:
					tree = json.loads(urllib.parse.unquote(content["Body"].read().decode('utf-8')))[0]
					html = plain_tree(tree, id, html)
					html = html + json.dumps(tree)
				for media in bucket.objects.filter(Prefix=id + '/'):
					key = urllib.parse.unquote(os.path.relpath(media.key, id + '/'))
					if key not in ["favicon.ico", "index.json", "index.cdn.json", "index.js", "index.css", "index.cdn.css"] and html.find(key) == -1:
						print(media.key)
						s3.Object('smetnik', media.key).copy_from(CopySource = { 'Bucket': 'redaktr' , 'Key' : media.key})
						try:
							media.delete()
						except Exception:
							pass