import json
import boto3

# Define the client to interact with AWS Lambda
client = boto3.client('lambda')

def lambda_handler(event, context):
    try:
        query = "SELECT quiz.quiz_id, qa.question_id, qa.answer_id from quiz \
                    INNER JOIN \
                    (SELECT question.quiz_id, question.question_id, answer.answer_id from question \
                    INNER JOIN answer \
                    ON question.question_id = answer.question_id) as qa \
                    ON quiz.quiz_id = qa.quiz_id"

        inputParams = {
            "query": query,
            "haspayload": True   
        }
        # print("query:", query)

        response = client.invoke(
            FunctionName = 'arn:aws:lambda:ca-central-1:712789485255:function:ExecuteDBQuery',
            InvocationType = 'RequestResponse',
            Payload = json.dumps(inputParams)
        )
        
        ################################################### 
        # Delete Record from Answer Table
        ###################################################
        responseID = json.load(response['Payload'])
        # print("responseQuizData:",responseID['payload'])
        answer_list = []
 
        for row in json.loads(responseID["payload"]):
            answer_list.append(row['answer_id'])
        # print(answer_list)
        answer_value = ",".join(str(e) for e in answer_list)

        query_delete_answer = f"DELETE FROM answer WHERE answer_id IN ({answer_value}) RETURNING *"
        # print("delete_query:",query_delete_answer)
        inputParams = {
            "query": query_delete_answer,
            "haspayload": True   
        }
        # print(inputParams)
        
        response = client.invoke(
            FunctionName = 'arn:aws:lambda:ca-central-1:712789485255:function:ExecuteDBQuery',
            InvocationType = 'RequestResponse',
            Payload = json.dumps(inputParams)
        )
        
        
        ############################################### 
        # Delete Record from Question Table
        ###############################################
        question_list = []
        # print("response:", json.loads(responseID["payload"]))
        for row in json.loads(responseID["payload"]):
            question_list.append(row['question_id'])
        # print(question_list)

        question_value = ",".join(str(e) for e in question_list)
        # print("value:", question_value)
        query_delete_question = f"DELETE FROM question WHERE question_id IN ({question_value}) RETURNING *"
        # print("query:",query_delete_question)
        inputParams = {
            "query": query_delete_question,
            "haspayload": True   
        }
        
        response = client.invoke(
            FunctionName = 'arn:aws:lambda:ca-central-1:712789485255:function:ExecuteDBQuery',
            InvocationType = 'RequestResponse',
            Payload = json.dumps(inputParams)
        )
        ############################################## 
        # Delete quiz
        ###############################################

        query_delete_quiz = f"DELETE FROM quiz WHERE quiz_id = {event['quiz_id']} RETURNING *"

        inputParams = {
            "query": query_delete_quiz,
            "haspayload": False   
        }
        
        response = client.invoke(
            FunctionName = 'arn:aws:lambda:ca-central-1:712789485255:function:ExecuteDBQuery',
            InvocationType = 'RequestResponse',
            Payload = json.dumps(inputParams)
        )
        responseFromChild = json.load(response['Payload'])
        
        responseDict = {
            "quiz_id": event['quiz_id'],
            "question_id_list": list(set(question_list)),
            "answer_id_list":answer_list
        } 
        print(responseDict)
        
        if responseFromChild['statusCode'] > 200:
            raise

        return {
            'statusCode': 200,
            'body': 'Query Executed Successful',
            'payload': responseDict
        }

    except:

        return {
            'statusCode': 400,
            'body': 'An error occurred',
            'payload': {}
        }
