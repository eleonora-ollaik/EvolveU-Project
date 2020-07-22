from datetime import datetime

from db import db

# db.Model binds the class to SQLAlchemy
class AnswerModel(db.Model):
    __tablename__ = 'answers'

    answer_id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.question_id'))
    answer_is_correct = db.Column(db.Boolean)
    answer_statement = db.Column(db.String(100))
    answer_creation = db.Column(db.DateTime)
    answer_update = db.Column(db.DateTime)

    # All class property names must match to column defined above 
    # to save the information to the database
    # Additional unmatched properties will not save in the database columns
    def __init__(self, question_id, answer_is_correct, answer_statement, answer_creation=datetime.now(), answer_update=datetime.now()):
        self.question_id = question_id
        self.answer_is_correct = answer_is_correct
        self.answer_statement = answer_statement
        self.answer_creation = answer_creation
        self.answer_update = answer_update    

    def json(self):
        return {'answer_id': self.answer_id, 'question_id': self.question_id,  
                'answer_is_correct': self.answer_is_correct, 'answer_statement': self.answer_statement,
                'answer_creation': self.answer_creation.strftime('%Y-%m-%d %X'), 
                'answer_update': self.answer_update.strftime('%Y-%m-%d %X')}

    @classmethod
    def find_by_id(cls, answer_id):
        return cls.query.filter_by(answer_id=answer_id).first()        

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
        result = db.session.query(cls.answer_id, cls.question_id,
                                  cls.answer_is_correct, cls.answer_statement,
                                  cls.answer_creation, cls.answer_update).all()

        return [{"answer_id": answer.answer_id, "question_id": answer.question_id,
                 "answer_is_correct": answer.answer_is_correct, "answer_statement": answer.answer_statement,
                 "answer_creation": answer.answer_creation.strftime('%Y-%m-%d %X'), 
                 "answer_update": answer.answer_update.strftime('%Y-%m-%d %X')} for answer in result]
