import json
import boto3

# Define the client to interact with AWS Lambda
client = boto3.client('lambda')

def lambda_handler(event, context):
    try:
        ################################################### 
        # Insert record into quiz table
        ###################################################
        quiz_name = event['quiz_name']
        theme_id = event['theme_id']
        query = f"INSERT INTO quiz (quiz_name, theme_id, quiz_creation, quiz_update) VALUES ('{quiz_name}', {theme_id}, now(), now()) RETURNING *;"  

        # Execute the SQL statement
        inputParams = {
            "query": query,
            "haspayload": False
        }

        response = client.invoke(
            FunctionName = 'arn:aws:lambda:ca-central-1:712789485255:function:ExecuteDBQuery',
            InvocationType = 'RequestResponse',
            Payload = json.dumps(inputParams)
        )

        responseFromChild = json.load(response['Payload'])
        
        # Obtain new IDs from returning result after inserting new records    
        payload = json.loads(responseFromChild["payload"])
        
        quiz_id = payload[0]['quiz_id']        
        
        
        ################################################### 
        # Insert record into Question table
        ################################################### 
        questions = event['questions']
        questionSQL = "INSERT INTO question (quiz_id, question_category, \
    				   questiontype_id, question_statement, \
    				   question_correct_entries, question_wrong_entries, \
    				   question_creation, question_update) "
        questionValues = "VALUES"
    
        for q in questions:
            questionValues = f"{questionValues} ({quiz_id}, '{q['question_category']}', \
                               {q['questiontype_id']}, '{q['question_statement']}', \
                               {q['question_correct_entries']}, {q['question_wrong_entries']}, \
                               now(), now()),"
    
        # Remove the last character and append SQL returning keyword for creating answers with returned question id
        questionValues = questionValues[:-1] + " RETURNING *;"    
        query = questionSQL + questionValues
    
        # Execute the SQL statement
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
        
        # Obtain new IDs from returning result after inserting new records
        payload = json.loads(responseFromChild["payload"])
        question_ids = [x['question_id'] for x in payload]
        
        ################################################### 
        # Insert record into Answer table
        ###################################################
        answerSQL = "INSERT INTO answer (question_id, \
    				 answer_is_correct, answer_statement, \
    				 answer_creation, answer_update) "
        answersValues = "VALUES"
        i = 0
        for q in questions:
            answers = q['answers']
            for a in answers:
                answersValues = f"{answersValues} ({question_ids[i]}, \
                                  {a['answer_is_correct']}, '{a['answer_statement']}', \
                                  now(), now()),"
            i = i+1
            
        # Remove the last character and append SQL returning keyword
        answersValues = answersValues[:-1] + " RETURNING *;"    
        query = answerSQL + answersValues
    
        # Execute the SQL statement
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
    
        # Obtain new IDs from returning result after inserting new records
        payload = json.loads(responseFromChild["payload"])
        answer_ids = [x['answer_id'] for x in payload]
    
        # Update json with newly created ids
        event['quiz_id'] = quiz_id
        i=0
        j=0
        for q in questions:
            event['questions'][i]['question_id'] = question_ids[i]        
            k=0
            for a in answers:
                event['questions'][i]['answers'][k]['answer_id'] = answer_ids[j]
                j=j+1
                k=k+1
            i=i+1
        
        if responseFromChild['statusCode'] > 200:
            raise

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST'
            },            
            'body': 'Query Executed Successful',
            'payload': event
        }

    except:

        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST'
            },            
            'body': 'An error occurred',
            'payload': {}
        }
