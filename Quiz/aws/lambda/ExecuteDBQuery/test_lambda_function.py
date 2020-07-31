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
    event['query'] = "DELETE FROM theme WHERE theme_id=29 RETURNING *"

    event['haspayload'] = False    
    context = ""

    os.environ['rds_dbname'] = config["rds_dbname"]
    os.environ['rds_host'] = config["rds_host"]
    os.environ['rds_password'] = config["rds_password"]
    os.environ['rds_port'] = config["rds_port"]
    os.environ['rds_username'] = config["rds_username"]    

    response = lambda_handler(event, context)

    # print(response["payload"])
    assert(response["statusCode"] == 200)