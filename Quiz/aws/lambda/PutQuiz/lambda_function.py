import json
import boto3

# Define the client to interact with AWS Lambda
client = boto3.client('lambda')

def lambda_handler(event, context):
    try:
        ################################################### 
        # Update record into quiz table
        ###################################################
        quiz_id = event['quiz_id']
        quiz_name = event['quiz_name']
        theme_id = event['theme_id']
        query = f"UPDATE quiz SET quiz_name = '{quiz_name}', theme_id = {theme_id}, quiz_update = now() WHERE quiz_id = {quiz_id} RETURNING *;"

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
        
        
        ################################################## 
        # Update record into Question table
        ################################################## 
        questions = event['questions']

        question_id_list = ','.join(str(question['question_id']) for question in  questions)
        questionSQL = "UPDATE question \
            SET  question_statement = \
            CASE "
        
        for question_obj in questions:
            questionSQL = questionSQL + f"WHEN question_id = {question_obj['question_id']} THEN '{question_obj['question_statement']}' "
        
        questionSQL = questionSQL + "END, \
            question_category = \
            CASE "
        
        for question_obj in questions:
            questionSQL = questionSQL + f"WHEN question_id = {question_obj['question_id']} THEN '{question_obj['question_category']}' "
        
        questionSQL = questionSQL + "END, \
            questiontype_id = \
            CASE "
        
        for question_obj in questions:
            questionSQL = questionSQL + f"WHEN question_id = {question_obj['question_id']} THEN {question_obj['questiontype_id']} "
        

        questionSQL = questionSQL + f"END, \
            question_update = now() \
            WHERE question_id IN ({question_id_list}) RETURNING *;"
    
        # Execute the SQL statement
        inputParams = {
            "query": questionSQL,
            "haspayload": True
        }

        response = client.invoke(
            FunctionName = 'arn:aws:lambda:ca-central-1:712789485255:function:ExecuteDBQuery',
            InvocationType = 'RequestResponse',
            Payload = json.dumps(inputParams)
        )

        responseFromChild = json.load(response['Payload'])        
        
        ################################################### 
        # Update record in Answer table
        ###################################################
        answer_id_list = []
        for question in questions:
            for answer in question['answers']:
                answer_id_list.append(str(answer['answer_id']))
        
        answer_ids = ','.join(answer_id_list)
        answerSQL = "UPDATE answer \
            SET  answer_statement = \
            CASE "
        for question_obj in questions:
            for answer_obj in question_obj['answers']:
                answerSQL = answerSQL + f"WHEN answer_id = {answer_obj['answer_id']} THEN '{answer_obj['answer_statement']}' "
        
        answerSQL = answerSQL + "END, \
            answer_is_correct = \
            CASE "
        
        for question_obj in questions:
            for answer_obj in question_obj['answers']:
                answerSQL = answerSQL + f"WHEN answer_id = {answer_obj['answer_id']} THEN {answer_obj['answer_is_correct']} "
        
        answerSQL = answerSQL + "END, \
            answer_update = now() "
        
        answerSQL = answerSQL + f"WHERE answer_id IN ({answer_ids}) RETURNING *;"

            
        # Execute the SQL statement
        inputParams = {
            "query": answerSQL,
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
            'payload': event
        }

    except:

        return {
            'statusCode': 400,
            'body': 'An error occurred',
            'payload': {}
        }
