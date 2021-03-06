from datetime import datetime

from db import db

# db.Model binds the class to SQLAlchemy
class QuestionTypeModel(db.Model):
    __tablename__ = 'questiontypes'

    questiontype_id = db.Column(db.Integer, primary_key=True)
    # question_id = db.Column(db.Integer, db.ForeignKey('quizes.quiz_id'))
    questiontype_name = db.Column(db.String)
    correct_answer_num = db.Column(db.String)
    wrong_answer_num = db.Column(db.String)
    input_type = db.Column(db.String)
    questiontype_creation = db.Column(db.DateTime)
    questiontype_update = db.Column(db.DateTime)

    # All class property names must match to column defined above 
    # to save the information to the database
    # Additional unmatched properties will not save in the database columns
    def __init__(self, questiontype_name, correct_answer_num, wrong_answer_num, input_type, questiontype_creation=datetime.now(), questiontype_update=datetime.now()):
        # self.quiz_id = quiz_id
        self.questiontype_name = questiontype_name
        self.correct_answer_num = correct_answer_num
        self.wrong_answer_num = wrong_answer_num
        self.questiontype_creation = questiontype_creation
        self.questiontype_update = questiontype_update
        self.input_type = input_type

    def json(self):
        return {'questiontype_id': self.questiontype_id, 'questiontype_name': self.questiontype_name,                
                'correct_answer_num': self.correct_answer_num, 'wrong_answer_num': self.wrong_answer_num,                
                'input_type': self.input_type, 
                'questiontype_creation': self.questiontype_creation.strftime('%Y-%m-%d %X'), 
                'questiontype_update': self.questiontype_update.strftime('%Y-%m-%d %X')}

    @classmethod
    def find_by_id(cls, questiontype_id):
        return cls.query.filter_by(questiontype_id=questiontype_id).first()        

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def delete_all(cls):
        db.session.query(cls).delete()
        db.session.commit()        

    @classmethod
    def query_all(cls):
        result = db.session.query(cls.questiontype_id, cls.questiontype_name,
                                  cls.correct_answer_num, cls.wrong_answer_num,
                                  cls.input_type,
                                  cls.questiontype_creation, cls.questiontype_update).all()

        return [{"questiontype_id": questiontype.questiontype_id, "questiontype_name": questiontype.questiontype_name,
                 "correct_answer_num": questiontype.correct_answer_num, "wrong_answer_num": questiontype.wrong_answer_num,
                 "input_type": questiontype.input_type,
                 "questiontype_creation": questiontype.questiontype_creation.strftime('%Y-%m-%d %X'), 
                 "questiontype_update": questiontype.questiontype_update.strftime('%Y-%m-%d %X')} for questiontype in result]
