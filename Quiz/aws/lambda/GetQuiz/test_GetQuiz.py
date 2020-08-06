# Deploy an AWS lambda package:
# Step 1: pipenv run pip install --target . aws-psycopg2 (Install a library to a target folder, aws-psycopg2 in this example)
# Step 2: pipenv lock -r > requirements.txt (Create a requirements.txt file based on Pipfile.lock)
# Step 3: pip install -r requirements.txt -t . (Update Pipfile dependencies to requirements.txt and install to current folder [.])
# Step 4: Zip the package up and upload in AWS lambda console
import pytest
import copy

from lambda_function import *
from test_config import *

def test_GetQuiz():

    #####################################
    # Check database query
    #####################################
    # https://docs.aws.amazon.com/lambda/latest/dg/services-apigateway.html
    event = {}

    event['query'] ="SELECT * FROM \
                        (SELECT * \
                        FROM quiz \
                        INNER JOIN theme \
                        ON quiz.theme_id = theme.theme_id  WHERE quiz_id = 1) as ct1 \
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

    event['haspayload'] = True
    context = ""

    os.environ['rds_dbname'] = config["rds_dbname"]
    os.environ['rds_host'] = config["rds_host"]
    os.environ['rds_password'] = config["rds_password"]
    os.environ['rds_port'] = config["rds_port"]
    os.environ['rds_username'] = config["rds_username"]    

    response = lambda_handler(event, context)

    payload = repack_payload(response["payload"])

    assert(response["statusCode"] == 200)
    assert(response["body"] == "Query executed successfully")
    assert('quiz_id' in payload[0])
    assert('quiz_name' in payload[0])
    assert('theme_id' in payload[0])
    assert('theme_name' in payload[0])
    assert('questions' in payload[0])
    assert('question_id' in payload[0]['questions'][0])
    assert('question_category' in payload[0]['questions'][0])
    assert('question_statement' in payload[0]['questions'][0])
    assert('question_correct_entries' in payload[0]['questions'][0])
    assert('question_wrong_entries' in payload[0]['questions'][0])
    assert('questiontype_id' in payload[0]['questions'][0])
    assert('questiontype_name' in payload[0]['questions'][0])
    assert('correct_answer_num' in payload[0]['questions'][0])
    assert('wrong_answer_num' in payload[0]['questions'][0])
    assert('answers' in payload[0]['questions'][0])
    assert('answer_id' in payload[0]['questions'][0]['answers'][0])
    assert('answer_is_correct' in payload[0]['questions'][0]['answers'][0])
    assert('answer_statement' in payload[0]['questions'][0]['answers'][0])

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