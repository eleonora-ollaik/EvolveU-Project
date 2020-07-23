from datetime import datetime
from flask_restful import Resource, reqparse

from models.answer import AnswerModel

# Inheritance of Resource class
class Answer(Resource):
    parser = reqparse.RequestParser()
    # Only arguments added to the parser will retain
    # additional arguments will be removed when parse_args() is called
    # if the request does not contain any added arguments, help message
    # will be returned to the browser instead
    parser.add_argument('question_id',
        type=int,
        required=True,
        help="Every answer needs a question id."
    )    
    parser.add_argument('answer_is_correct',
        type=bool,
        required=True,
        help="Every answer needs a category."
    )
    parser.add_argument('answer_statement',
        type=str,
        required=True,
        help="Every answer needs a type."
    )    
        
    def get(self, answer_id):
        answer = AnswerModel.find_by_id(answer_id)
        if answer:
            return answer.json()
        return {'message': 'Answer not found'}, 404

    def post(self):        
        # parse_args() return only arguments added by add_argument as Namespace
        # Any missing added argument will stop and return help message to the browser
        data = Answer.parser.parse_args()

        # data namespace is rolled into one argument (**data)
        answer = AnswerModel(**data)

        try:
            answer.save_to_db()
        except:
            return {"message": "An error occurred inserting the item."}, 500

        return answer.json(), 201

    def put(self, answer_id):
        data = Answer.parser.parse_args()

        answer = AnswerModel.find_by_id(answer_id)
        
        if answer is None:    # Create a new answer if it does not exist in the database
            answer = AnswerModel(**data)
        else:               # Update the answer if it exists in the database
            answer.question_id = data['question_id']
            answer.answer_is_correct = data['answer_is_correct']
            answer.answer_statement = data['answer_statement']
            answer.answer_update = datetime.now()

        answer.save_to_db()

        return answer.json()      

    # Delete a answer will delete all child items
    def delete(self, answer_id):
        answer = AnswerModel.find_by_id(answer_id)
        if answer:
            answer.delete_from_db()
            return {'message': 'Answer deleted'}

        return {'message': 'Answer not found'}        

class AnswerList(Resource):
    # use query.with_entities(DataModel.col1, DataModel.col2) for a specific columns
    def get(self):        
        return {'answeres': AnswerModel.query_all()}
    
    # Delete all answers will not delete child items
    def delete(self):
        AnswerModel.delete_all()        
        return {'message': 'All answeres deleted'}