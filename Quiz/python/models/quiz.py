from datetime import datetime

from db import db

# db.Model binds the class to SQLAlchemy
class QuizModel(db.Model):
    __tablename__ = 'quizes'

    quiz_id = db.Column(db.Integer, primary_key=True)
    quiz_name = db.Column(db.String(100))
    theme_id = db.Column(db.Integer, db.ForeignKey('themes.theme_id'))
    quiz_creation = db.Column(db.DateTime)
    quiz_update = db.Column(db.DateTime)

    questions = db.relationship('QuestionModel', lazy='dynamic', cascade="all, delete")
    theme = db.relationship("ThemeModel")

    # All class property names must match to column defined above 
    # to save the information to the database
    # Additional unmatched properties will not save in the database columns
    def __init__(self, quiz_name, theme_id, quiz_creation=datetime.now(), quiz_update=datetime.now()):
        self.quiz_name = quiz_name
        self.theme_id = theme_id
        self.quiz_creation = quiz_creation
        self.quiz_update = quiz_update    

    def json(self):
        return {'quiz_id': self.quiz_id, 'quiz_name': self.quiz_name, 
                'theme_id': self.theme_id, 'theme_name': self.theme.theme_name,
                'questions': [question.json() for question in self.questions.all()], 
                'quiz_creation': self.quiz_creation.strftime('%Y-%m-%d %X'), 
                'quiz_update': self.quiz_update.strftime('%Y-%m-%d %X')}

    @classmethod
    def find_by_id(cls, quiz_id):
        return cls.query.filter_by(quiz_id=quiz_id).first()        

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
        result = db.session.query(cls.quiz_id, cls.quiz_name, cls.theme_id, 
                                  cls.quiz_creation, cls.quiz_update).all()

        return [{"quiz_id": quiz.quiz_id, "quiz_name": quiz.quiz_name,
                 "theme_id": quiz.theme_id,
                 "quiz_creation": quiz.quiz_creation.strftime('%Y-%m-%d %X'), 
                 "quiz_update": quiz.quiz_update.strftime('%Y-%m-%d %X')} for quiz in result]
