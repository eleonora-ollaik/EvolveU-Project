from datetime import datetime
from flask_restful import Resource, reqparse

from models.question import QuestionModel

# Inheritance of Resource class
class Question(Resource):
    parser = reqparse.RequestParser()
    # Only arguments added to the parser will retain
    # additional arguments will be removed when parse_args() is called
    # if the request does not contain any added arguments, help message
    # will be returned to the browser instead
    parser.add_argument('quiz_id',
        type=int,
        required=True,
        help="Every question needs an id."
    )    
    parser.add_argument('question_category',
        type=str,
        required=True,
        help="Every question needs a category."
    )
    parser.add_argument('question_type',
        type=str,
        required=True,
        help="Every question needs a type."
    )
    parser.add_argument('question_statement',
        type=str,
        required=True,
        help="Every question needs a statement."
    )
    parser.add_argument('question_correct_entries',
        type=int,
        required=False,
        help="Every question needs a number of correct entries."
    )
    parser.add_argument('question_wrong_entries',
        type=int,
        required=False,
        help="Every question needs a number of wrong entries.."
    )       
        
    def get(self, question_id):
        question = QuestionModel.find_by_id(question_id)
        if question:
            return question.json()
        return {'message': 'Question not found'}, 404

    def post(self):        
        # parse_args() return only arguments added by add_argument as Namespace
        # Any missing added argument will stop and return help message to the browser
        data = Question.parser.parse_args()

        # data namespace is rolled into one argument (**data)
        question = QuestionModel(**data)

        try:
            question.save_to_db()
        except:
            return {"message": "An error occurred inserting the item."}, 500

        return question.json(), 201

    def put(self, question_id):
        data = Question.parser.parse_args()

        question = QuestionModel.find_by_id(question_id)
        
        if question is None:    # Create a new question if it does not exist in the database
            question = QuestionModel(**data)
        else:               # Update the question if it exists in the database
            question.quiz_id = data['quiz_id']
            question.question_category = data['question_category']
            question.question_type = data['question_type']
            question.question_statement = data['question_statement']
            question.question_correct_entries = data['question_correct_entries']
            question.question_wrong_entries = data['question_wrong_entries']
            question.question_update = datetime.now()

        question.save_to_db()

        return question.json()      

    # Delete a question will delete all child items
    def delete(self, question_id):
        question = QuestionModel.find_by_id(question_id)
        if question:
            question.delete_from_db()
            return {'message': 'Question deleted'}

        return {'message': 'Question not found'}        

class QuestionList(Resource):
    # use query.with_entities(DataModel.col1, DataModel.col2) for a specific columns
    def get(self):        
        return {'questiones': QuestionModel.query_all()}
    
    # Delete all questions will not delete child items
    def delete(self):
        QuestionModel.delete_all()        
        return {'message': 'All questiones deleted'}