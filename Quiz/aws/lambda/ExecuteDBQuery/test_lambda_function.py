# Deploy an AWS lambda package:
# Step 1: pipenv run pip install --target . aws-psycopg2 (Install a library to a target folder, aws-psycopg2 in this example)
# Step 2: pipenv lock -r > requirements.txt (Create a requirements.txt file based on Pipfile.lock)
# Step 3: pip install -r requirements.txt -t . (Update Pipfile dependencies to requirements.txt and install to current folder [.])
# Step 4: Zip the package up and upload in AWS lambda console
import pytest
import copy

from lambda_function import *
from test_config import *

def test_lambda_function():

    #####################################
    # Check database query
    #####################################
    # https://docs.aws.amazon.com/lambda/latest/dg/services-apigateway.html
    event = {}
    # event['query'] = "INSERT INTO theme (theme_name, theme_creation, theme_update) VALUES ('Test5', now(), now()) RETURNING *"
    # event['query'] = "UPDATE theme SET theme_name = 'History50', theme_update = now() WHERE theme_id = 2 RETURNING *"
    # event['query'] = "SELECT * FROM theme"
    # event['query'] = "DELETE FROM theme WHERE theme_id=29 RETURNING *"
    event['query'] = "SELECT * FROM quiz INNER JOIN theme ON quiz.theme_id = theme.theme_id"

    event['haspayload'] = True
    context = ""

    os.environ['rds_dbname'] = config["rds_dbname"]
    os.environ['rds_host'] = config["rds_host"]
    os.environ['rds_password'] = config["rds_password"]
    os.environ['rds_port'] = config["rds_port"]
    os.environ['rds_username'] = config["rds_username"]    

    # Testing successful case
    response = lambda_handler(event, context)

    assert(response["statusCode"] == 200)
    assert(response["body"] == "Query executed successfully")
    assert('quiz_id' in response["payload"][0])
    assert('quiz_name' in response["payload"][0])
    assert('theme_id' in response["payload"][0])
    assert('theme_name' in response["payload"][0])

    # Testing failed case
    event['query'] = ""
    event['haspayload'] = True
    context = ""

    response = lambda_handler(event, context)
    assert(response["statusCode"] == 400)
    assert(response["body"] == "An error occurred")    