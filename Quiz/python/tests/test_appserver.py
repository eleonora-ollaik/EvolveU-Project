import pytest

from flask import json
from datetime import datetime

import appserver
from db import db

# Only initialize and create tables in test module once
def setup_module(module):
    appserver.app.config['TESTING'] = True
    appserver.app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'

    db.init_app(appserver.app)
    @appserver.app.before_first_request
    def create_tables():
        db.create_all()

@pytest.fixture
def client():

    client = appserver.app.test_client()

    yield client

def test_quiz(client):

    # No data for the test quiz
    rv = client.get('/quiz/1')

    # Expect Not Found request
    assert(rv.status_code == 404)
    assert(b'Quiz not found' in rv.data)

    rv = client.post('/quiz', data=dict(
            quiz_name="testName1 name"
            ))
    # Expect bad request due to client error
    assert(rv.status_code == 400)
    assert(b'Every quiz needs a theme.' in rv.data)

    rv = client.post('/quiz', data=dict(
            quiz_name="testName1",
            quiz_theme="testTheme1 theme"
            ))
    # Expect created success status
    assert(rv.status_code == 201)
    assert(b'quiz_id' in rv.data)
    assert(b'quiz_name' in rv.data)
    assert(b'quiz_theme' in rv.data)
    assert(b'quiz_creation' in rv.data)
    ts = datetime.now().strftime('%Y-%m-%d')
    assert(bytes(ts, 'utf-8') in rv.data)
    assert(b'quiz_update' in rv.data)
    assert(bytes(ts, 'utf-8') in rv.data)    

    rv = client.put('/quiz/999', data=dict(
            quiz_name="testName2 name2",
            quiz_theme="testTheme2 theme2"
            ))
    # Expect success status response
    assert(rv.status_code == 200)

    rv = client.put('/quiz/1', data=dict(
            quiz_name="testName3",
            quiz_theme="testName3 theme3",
            ))
    # Expect success status response
    assert(rv.status_code == 200)
    assert(b'"quiz_name": "testName3"' in rv.data)
    assert(b'"quiz_theme": "testName3 theme3"' in rv.data)

    rv = client.delete('/quiz/1', data=dict(
            quiz_name="testName2 name2",
            quiz_theme="testTheme2 theme2"
            ))
    # Expect success status response
    assert(rv.status_code == 200)
    assert(b'Quiz deleted' in rv.data)

    rv = client.delete('/quiz/1')
    # Expect success status response
    assert(rv.status_code == 200)
    assert(b'Quiz not found' in rv.data)

    # Deleted a put id (999) case
    rv = client.delete('/quiz/2')
    # Expect success status response
    assert(rv.status_code == 200)
    assert(b'Quiz deleted' in rv.data)

def test_quizes(client):

    #####################################
    # Check empty quiz case
    #####################################
    rv = client.get('/quizes')
    assert(rv.status_code == 200)
    assert(b'[]' in rv.data)

    #####################################
    # Check a list of quizs case
    #####################################
    # Create test data
    rv = client.post('/quiz', data=dict(
        quiz_name="testName1 name1",
        quiz_theme="testTheme1 theme1"
        ))
    rv = client.post('/quiz', data=dict(
        quiz_name="testName2 name2",
        quiz_theme="testTheme2 theme2"
        ))

    rv = client.get('/quizes')
    assert(rv.status_code == 200)
    assert(b'"quiz_name": "testName1 name1"' in rv.data)
    assert(b'"quiz_theme": "testTheme1 theme1"' in rv.data)
    assert(b'"quiz_name": "testName2 name2"' in rv.data)
    assert(b'"quiz_theme": "testTheme2 theme2"' in rv.data)