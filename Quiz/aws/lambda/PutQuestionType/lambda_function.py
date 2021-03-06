import json
import boto3

# Define the client to interact with AWS Lambda
client = boto3.client('lambda')

def lambda_handler(event, context):
    try:
        query = f"UPDATE questiontype SET questiontype_name = '{event['questiontype_name']}', correct_answer_num = {event['correct_answer_num']}, wrong_answer_num = {event['wrong_answer_num']}, questiontype_update = now() WHERE questiontype_id = {event['questiontype_id']} RETURNING *"

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
