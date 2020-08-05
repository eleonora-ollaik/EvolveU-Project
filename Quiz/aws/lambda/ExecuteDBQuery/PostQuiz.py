import json
import boto3

# Define the client to interact with AWS Lambda
client = boto3.client('lambda', region_name='ca-central-1')

def lambda_handler(event, context):

    # "quiz_name": "Name 1", 
    # "theme_id": 1,
    # "questions": [{"quiz_id": 1,
    #                "question_category": "test category",
    #                "questiontype_id": "test type",
    #                "question_statement": "question 1",
    #                "question_correct_entries": 0,
    #                "question_wrong_entries": 0,
    #                "answers": []
    #                },                   
    #               {"quiz_id": 2,
    #                "question_category": "test category",
    #                "questiontype_id": "test type",
    #                "question_statement": "question 1",
    #                "question_correct_entries": 0,
    #                "question_wrong_entries": 2,
    #                 "answers": []
    #                }]
    print("Before Try++++++++++++++++++++++++")
    try:
        # query =f"SELECT * FROM \
        #             (SELECT * \
        #             FROM quiz \
        #             INNER JOIN theme \
        #             ON quiz.theme_id = theme.theme_id WHERE quiz_id = {event['quiz_id']}) as ct1 \
        #         INNER JOIN  \
        #             (SELECT * \
        #             FROM \
        #                 (SELECT * \
        #                 FROM question \
        #                 INNER JOIN answer \
        #                 ON question.question_id = answer.question_id) as ct3 \
        #             INNER JOIN questiontype \
        #             ON ct3.questiontype_id = questiontype.questiontype_id) as ct2 \
        #         ON ct1.quiz_id = ct2.quiz_id;"

        query = "SELECT * FROM quiz"
        print("query: ", query)

        inputParams = {
            "query": query,
            "haspayload": True   
        }

        print("Before Invoke++++++++++++++++++++++++")
        response = client.invoke(
            FunctionName = 'arn:aws:lambda:ca-central-1:712789485255:function:ExecuteDBQuery',
            InvocationType = 'RequestResponse',
            Payload = json.dumps(inputParams)
        )
        print("After Invoke++++++++++++++++++++++++")

        responseFromChild = json.load(response["Payload"])
        if responseFromChild['statusCode'] > 200:
            raise

        print("Before return 200")
        return {
            'statusCode': 200,
            'body': "Query Executed Successfully",
            'payload': json.loads(responseFromChild["payload"])
        }

    except Exception as e:

        print("Before return 400", e)
        return {
            'statusCode': 400,
            'body': json.dumps('An error occurred'),
            'payload': {}
        }