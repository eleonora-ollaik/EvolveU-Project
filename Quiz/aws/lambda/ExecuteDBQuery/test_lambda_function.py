# Deploy an AWS lambda package:
# Step 1: pipenv run pip install --target . aws-psycopg2 (Install a library to a target folder, aws-psycopg2 in this example)
# Step 2: pipenv lock -r > requirements.txt (Create a requirements.txt file based on Pipfile.lock)
# Step 3: pip install -r requirements.txt -t . (Update Pipfile dependencies to requirements.txt and install to current folder [.])
# Step 4: Zip the package up and upload in AWS lambda console
import pytest

from lambda_function import *
from test_config import *

def test_lambda_function():

    #####################################
    # Check database query
    #####################################
    event = {}
    # event['query'] = "INSERT INTO theme (theme_name, theme_creation, theme_update) VALUES ('Test5', now(), now()) RETURNING *"
    # event['query'] = "UPDATE theme SET theme_name = 'History50', theme_update = now() WHERE theme_id = 2 RETURNING *"
    # event['query'] = "SELECT * FROM theme"
    # event['query'] = "DELETE FROM theme WHERE theme_id=29 RETURNING *"
    # event['query'] = "SELECT * FROM quiz INNER JOIN theme ON quiz.theme_id = theme.theme_id"
    # event['query'] = "SELECT * FROM \
    #                     (SELECT * FROM quiz INNER JOIN theme ON quiz.theme_id = theme.theme_id) as ct1 \
    #                         INNER JOIN question on ct1.quiz_id = question.quiz_id"
    event['query'] ="SELECT * FROM \
                        (SELECT * FROM quiz \
                         INNER JOIN theme \
                         ON quiz.theme_id = theme.theme_id) as ct1 \
                    INNER JOIN \
                        (SELECT * FROM \
                            (SELECT * FROM question \
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

    print(response["payload"][0])
    print(response["body"])
    assert(response["statusCode"] == 200)