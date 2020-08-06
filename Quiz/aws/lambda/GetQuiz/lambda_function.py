import json
import boto3

# Define the client to interact with AWS Lambda
client = boto3.client('lambda')

def lambda_handler(event, context):
    try:
        query =f"SELECT * FROM \
                    (SELECT * \
                    FROM quiz \
                    INNER JOIN theme \
                    ON quiz.theme_id = theme.theme_id WHERE quiz_id = {event['quiz_id']}) as ct1 \
                INNER JOIN  \
                    (SELECT * \
                    FROM \
                        (SELECT * \
                        FROM question \
                        INNER JOIN answer \
                        ON question.question_id = answer.question_id) as ct3 \
                    INNER JOIN questiontype \
                    ON ct3.questiontype_id = questiontype.questiontype_id) as ct2 \
                ON ct1.quiz_id = ct2.quiz_id;"

        inputParams = {
            "query": query,
            "haspayload": True   
        }


        response = client.invoke(
            FunctionName = 'arn:aws:lambda:ca-central-1:712789485255:function:ExecuteDBQuery',
            InvocationType = 'RequestResponse',
            Payload = json.dumps(inputParams)
        )

        responseFromChild = json.load(response["Payload"])
        if responseFromChild['statusCode'] > 200:
            raise

        # Repackage the result into Json format accepted by front end
        payload = repack_payload(json.loads(responseFromChild["payload"]))

        return {
            'statusCode': 200,
            'body': "Query Executed Successfully",
            'payload': payload
        }

    except:

        return {
            'statusCode': 400,
            'body': 'An error occurred',
            'payload': {}
        }

def repack_payload(payload):
            # Initialize all temporary json list elements
        jsonResult = []
        QList = []
        Alist = []
    
        # Negative ID value ensure the initial ID value is different than any production value is used
        prevQuizID = -1
        prevQuestionID = -1
        prevAnsID = -1
        
        # Loop through all rows in quiz payload result
        for row in payload:
            quizDict={}
            curQuizID = row["quiz_id"]        
            if curQuizID != prevQuizID:
                quizDict = {"quiz_id": row["quiz_id"], "quiz_name": row["quiz_name"], 
                            "theme_id": row["theme_id"], "theme_name": row["theme_name"]}            
                jsonResult.append(quizDict)
                QList = []
    
            QuestionDict={}
            curQuestionID = row["question_id"]
            if curQuestionID != prevQuestionID:
                QuestionDict = {"question_id": row["question_id"], "question_category": row["question_category"], 
                                "question_statement": row["question_statement"],
                                "question_correct_entries": row["question_correct_entries"], 
                                "question_wrong_entries": row["question_wrong_entries"],                            
                                "questiontype_id": row["questiontype_id"], "questiontype_name": row["questiontype_name"],
                                "correct_answer_num": row["correct_answer_num"], "wrong_answer_num": row["wrong_answer_num"]}
                # QuestionDict = {"question_id": row["question_id"]}                                    
                QList.append(QuestionDict)
                Alist = []
    
            AnsDict={}
            curAnsID = row["answer_id"]        
            if curAnsID != prevAnsID:
                AnsDict = {"answer_id": row["answer_id"], 
                            "answer_is_correct": row["answer_is_correct"], 
                            "answer_statement": row["answer_statement"]}
                # AnsDict = {"answer_id": row["answer_id"]}            
                Alist.append(AnsDict)        
            prevAnsID = curAnsID
    
            QuestionDict["answers"] = Alist
            prevQuestionID = curQuestionID            
                
            quizDict["questions"] = QList        
            prevQuizID = curQuizID
        
        return jsonResult