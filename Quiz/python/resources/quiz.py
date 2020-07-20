from datetime import datetime
from flask_restful import Resource, reqparse
# from flask_jwt import jwt_required

from models.quiz import QuizModel

# Inheritance of Resource class
class Quiz(Resource):
    parser = reqparse.RequestParser()
    # Only arguments added to the parser will retain
    # additional arguments will be removed when parse_args() is called
    # if the request does not contain any added arguments, help message
    # will be returned to the browser instead
    parser.add_argument('quiz_name',
        type=str,
        required=True,
        help="Every quiz needs a name."
    )    
    parser.add_argument('quiz_theme',
        type=str,
        required=True,
        help="Every quiz needs a theme."
    )
        
    def get(self, quiz_id):
        quiz = QuizModel.find_by_id(quiz_id)
        if quiz:
            return quiz.json()
        return {'message': 'Quiz not found'}, 404

    def post(self):        
        # parse_args() return only arguments added by add_argument as Namespace
        # Any missing added argument will stop and return help message to the browser
        data = Quiz.parser.parse_args()

        # data namespace is rolled into one argument (**data)
        quiz = QuizModel(**data)

        try:
            quiz.save_to_db()
        except:
            return {"message": "An error occurred inserting the item."}, 500

        return quiz.json(), 201

    def put(self, quiz_id):
        data = Quiz.parser.parse_args()

        quiz = QuizModel.find_by_id(quiz_id)
        
        if quiz is None:    # Create a new quiz if it does not exist in the database
            quiz = QuizModel(**data)
        else:               # Update the quiz if it exists in the database
            quiz.quiz_name = data['quiz_name']
            quiz.quiz_theme = data['quiz_theme']
            quiz.quiz_update = datetime.now()

        quiz.save_to_db()

        return quiz.json()      

    # Delete a quiz will delete all child items
    def delete(self, quiz_id):
        quiz = QuizModel.find_by_id(quiz_id)
        if quiz:
            quiz.delete_from_db()
            return {'message': 'Quiz deleted'}

        return {'message': 'Quiz not found'}        

class QuizList(Resource):
    # use query.with_entities(DataModel.col1, DataModel.col2) for a specific columns
    def get(self):        
        return {'quizes': QuizModel.query_all()}
    
    # Delete all quizs will not delete child items
    def delete(self):
        QuizModel.delete_all()        
        return {'message': 'All quizes deleted'}