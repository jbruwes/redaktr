import json
import os
import urllib.parse
import boto3
s3 = boto3.resource('s3')
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('redaktr')
bucket = s3.Bucket('redaktr')
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
	response = table.scan(ProjectionExpression='id')
	for item in response['Items']:
		html = ''
		content = None
		try:
			content = s3.Object('redaktr', item['id'] + "/index.cdn.css").get()
		except Exception:
			pass
		else:
			html = html + urllib.parse.unquote(content["Body"].read().decode('utf-8'))
		content = None
		try:
			content = s3.Object('redaktr', item['id'] + "/index.cdn.json").get()
		except Exception:
			pass
		else:
			html = html + urllib.parse.unquote(content["Body"].read().decode('utf-8'))
		content = None
		try:
			content = s3.Object('redaktr', item['id'] + "/index.css").get()
		except Exception:
			pass
		else:
			html = html + urllib.parse.unquote(content["Body"].read().decode('utf-8'))
		content = None
		try:
			content = s3.Object('redaktr', item['id'] + ".html").get()
		except Exception:
			pass
		else:
			html = html + urllib.parse.unquote(content["Body"].read().decode('utf-8'))
		content = None
		try:
			content = s3.Object('redaktr', item['id'] + "/index.js").get()
		except Exception:
			pass
		else:
			html = html + urllib.parse.unquote(content["Body"].read().decode('utf-8'))
		content = None
		try:
			content = s3.Object('redaktr', item['id'] + "/index.json").get()
		except Exception:
			pass
		else:
			tree = json.loads(urllib.parse.unquote(content["Body"].read().decode('utf-8')))[0]
			html = plain_tree(tree, item['id'], html)
			html = html + json.dumps(tree)
		for media in bucket.objects.filter(Prefix=item['id'] + '/'):
			key = urllib.parse.unquote(os.path.relpath(media.key, item['id'] + '/'))
			if key not in ["favicon.ico", "index.json", "index.cdn.json", "index.js", "index.css", "index.cdn.css"] and html.find(key) == -1:
				print(media.key)
				s3.Object('smetnik', media.key).copy_from(CopySource = { 'Bucket': 'redaktr' , 'Key' : media.key})
				try:
					media.delete()
				except Exception:
					pass