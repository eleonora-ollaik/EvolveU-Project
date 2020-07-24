from datetime import datetime

from db import db

# db.Model binds the class to SQLAlchemy
class QuestionModel(db.Model):
    __tablename__ = 'questions'

    question_id = db.Column(db.Integer, primary_key=True)
    quiz_id = db.Column(db.Integer, db.ForeignKey('quizes.quiz_id'))
    question_category = db.Column(db.String(100))
    questiontype_id = db.Column(db.Integer, db.ForeignKey('questiontypes.questiontype_id'))
    question_statement = db.Column(db.String(100))
    question_correct_entries = db.Column(db.Integer)
    question_wrong_entries = db.Column(db.Integer)    
    question_creation = db.Column(db.DateTime)
    question_update = db.Column(db.DateTime)

    answers = db.relationship('AnswerModel', lazy='dynamic', cascade="all, delete")
    questiontype = db.relationship("QuestionTypeModel")

    # All class property names must match to column defined above 
    # to save the information to the database
    # Additional unmatched properties will not save in the database columns
    def __init__(self, quiz_id, question_category, questiontype_id, question_statement, question_correct_entries, question_wrong_entries, question_creation=datetime.now(), question_update=datetime.now()):
        self.quiz_id = quiz_id
        self.question_category = question_category
        self.questiontype_id = questiontype_id
        self.question_statement = question_statement
        self.question_correct_entries = question_correct_entries
        self.question_wrong_entries = question_wrong_entries
        self.question_creation = question_creation
        self.question_update = question_update    

    def json(self):
        return {'question_id': self.question_id, 'quiz_id': self.quiz_id, 'question_category': self.question_category, 
                'questiontype_id': self.questiontype_id, 'questiontype_name': self.questiontype.questiontype_name, 
                'question_statement': self.question_statement, 
                'question_correct_entries': self.question_correct_entries, 
                'question_wrong_entries': self.question_wrong_entries,
                'answers': [answer.json() for answer in self.answers.all()], 
                'question_creation': self.question_creation.strftime('%Y-%m-%d %X'), 
                'question_update': self.question_update.strftime('%Y-%m-%d %X')}

    @classmethod
    def find_by_id(cls, question_id):
        return cls.query.filter_by(question_id=question_id).first()        

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
        result = db.session.query(cls.question_id, cls.quiz_id, cls.question_category,
                                  cls.questiontype_id, cls.question_statement,
                                  cls.question_correct_entries, cls.question_wrong_entries,
                                  cls.question_creation, cls.question_update).all()

        return [{"question_id": question.question_id, "quiz_id": question.quiz_id,
                 "question_category": question.question_category, "questiontype_id": question.questiontype_id,
                 "question": question.question_statement, "question_correct_entries": question.question_correct_entries,
                 "question_wrong_entries": question.question_wrong_entries,
                 "question_creation": question.question_creation.strftime('%Y-%m-%d %X'), 
                 "question_update": question.question_update.strftime('%Y-%m-%d %X')} for question in result]
