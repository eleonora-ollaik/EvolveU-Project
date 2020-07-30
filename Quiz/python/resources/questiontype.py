from datetime import datetime
from flask_restful import Resource, reqparse

from models.questiontype import QuestionTypeModel

# Inheritance of Resource class
class QuestionType(Resource):
    parser = reqparse.RequestParser()
    # Only arguments added to the parser will retain
    # additional arguments will be removed when parse_args() is called
    # if the request does not contain any added arguments, help message
    # will be returned to the browser instead
    parser.add_argument('questiontype_name',
        type=str,
        required=True,
        help="Every question type needs a type."
    )
    parser.add_argument('correct_answer_num',
        type=int,
        required=True,
        help="Every question type needs a number of correct answers."
    ) 
    parser.add_argument('wrong_answer_num',
        type=int,
        required=True,
        help="Every question type needs a number of wrong answers."
    )
    parser.add_argument('input_type',
        type=str,
        required=True,
        help="Every question type needs an input type."
    )                  
        
    def get(self, questiontype_id):
        questiontype = QuestionTypeModel.find_by_id(questiontype_id)       
        if questiontype:
            return questiontype.json()
        return {'message': 'QuestionType not found'}, 404

    def post(self):        
        # parse_args() return only arguments added by add_argument as Namespace
        # Any missing added argument will stop and return help message to the browser
        data = QuestionType.parser.parse_args()

        # data namespace is rolled into one argument (**data)
        questiontype = QuestionTypeModel(**data)

        try:
            questiontype.save_to_db()
        except:
            return {"message": "An error occurred inserting the item."}, 500

        return questiontype.json(), 201

    def put(self, questiontype_id):
        data = QuestionType.parser.parse_args()

        questiontype = QuestionTypeModel.find_by_id(questiontype_id)
        
        if questiontype is None:    # Create a new questiontype if it does not exist in the database
            questiontype = QuestionTypeModel(**data)
        else:               # Update the questiontype if it exists in the database
            questiontype.questiontype_name = data['questiontype_name']
            questiontype.questiontype_update = datetime.now()

        questiontype.save_to_db()

        return questiontype.json()      

    # Delete a questiontype will delete all child items
    def delete(self, questiontype_id):
        questiontype = QuestionTypeModel.find_by_id(questiontype_id)
        if questiontype:
            questiontype.delete_from_db()
            return {'message': 'QuestionType deleted'}

        return {'message': 'QuestionType not found'}        

class QuestionTypeList(Resource):
    # use query.with_entities(DataModel.col1, DataModel.col2) for a specific columns
    def get(self):        
        return {'question types': QuestionTypeModel.query_all()}
    
    # Delete all questiontypes will not delete child items
    def delete(self):
        QuestionTypeModel.delete_all()        
        return {'message': 'All question types deleted'}