# Deploy an AWS lambda package:
# Step 1: pipenv run pip install --target . aws-psycopg2 (Install a library to a target folder, aws-psycopg2 in this example)
# Step 2: pipenv lock -r > requirements.txt (Create a requirements.txt file based on Pipfile.lock)
# Step 3: pip install -r requirements.txt -t . (Update Pipfile dependencies to requirements.txt and install to current folder [.])
# Step 4: Zip the package up and upload in AWS lambda console
import pytest
import copy
import os

from lambda_function import *
from test_config import *
from test_json import *

def test_PostQuiz():

    #####################################
    # Check database query
    #####################################
    # https://docs.aws.amazon.com/lambda/latest/dg/services-apigateway.html
    os.environ['rds_dbname'] = config["rds_dbname"]
    os.environ['rds_host'] = config["rds_host"]
    os.environ['rds_password'] = config["rds_password"]
    os.environ['rds_port'] = config["rds_port"]
    os.environ['rds_username'] = config["rds_username"]       

    event = postQuizInputJson
    context = ""

    ################################################### 
    # Insert record into quiz table
    ###################################################
    quiz_name = event['quiz_name']
    theme_id = event['theme_id']
    query = f"INSERT INTO quiz (quiz_name, theme_id, quiz_creation, quiz_update) VALUES ('{quiz_name}', {theme_id}, now(), now()) RETURNING *;"    
    
    # Execute the SQL statement    
    child_event = {}
    child_event['query'] = query
    child_event['haspayload'] = False
    response = lambda_handler(child_event, context)    

    # Obtain new IDs from returning result after inserting new records    
    payload = response['payload']
    quiz_id = payload[0]['quiz_id']
    print ("quiz_id: ", quiz_id)

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
    child_event['query'] = query
    child_event['haspayload'] = True
    response = lambda_handler(child_event, context)    

    # Obtain new IDs from returning result after inserting new records
    payload = response['payload']
    question_ids = [x['question_id'] for x in payload]
    print("question_ids: ", question_ids)

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
    child_event['query'] = query
    child_event['haspayload'] = True
    response = lambda_handler(child_event, context)    

    # Obtain new IDs from returning result after inserting new records
    payload = response['payload']
    answer_ids = [x['answer_id'] for x in payload]
    print("answer_ids: ", answer_ids)

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

    print(event)

    assert(response["statusCode"] == 200)
    assert(response["body"] == "Query executed successfully")

