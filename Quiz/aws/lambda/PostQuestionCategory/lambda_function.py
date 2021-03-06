import json
import boto3

# Define the client to interact with AWS Lambda
client = boto3.client('lambda')

def lambda_handler(event, context):
    try:
        query = f"INSERT INTO questioncategory (questioncategory_name, questioncategory_creation, questioncategory_update) VALUES ('{event['questioncategory_name']}',  now(), now()) RETURNING *"

        inputParams = {
            "query": query,
            "haspayload": True   
        }

        response = client.invoke(
            FunctionName = 'arn:aws:lambda:ca-central-1:712789485255:function:ExecuteDBQuery',
            InvocationType = 'RequestResponse',
            Payload = json.dumps(inputParams)
        )

        responseFromChild = json.load(response['Payload'])
        if responseFromChild['statusCode'] > 200:
            raise

        return {
            'statusCode': 200,
            'body': 'Query Executed Successful',
            'payload': json.loads(responseFromChild["payload"])        
            }

    except:

        return {
            'statusCode': 400,
            'body': 'An error occurred',
            'payload': {}
        }