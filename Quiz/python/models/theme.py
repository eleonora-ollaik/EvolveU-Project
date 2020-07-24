from datetime import datetime

from db import db

# db.Model binds the class to SQLAlchemy
class ThemeModel(db.Model):
    __tablename__ = 'themes'

    theme_id = db.Column(db.Integer, primary_key=True)
    # quiz_id = db.Column(db.Integer, db.ForeignKey('quizes.quiz_id'))
    theme_name = db.Column(db.String)
    theme_creation = db.Column(db.DateTime)
    theme_update = db.Column(db.DateTime)

    # All class property names must match to column defined above 
    # to save the information to the database
    # Additional unmatched properties will not save in the database columns
    def __init__(self, theme_name, theme_creation=datetime.now(), theme_update=datetime.now()):
        self.theme_name = theme_name
        self.theme_creation = theme_creation
        self.theme_update = theme_update    

    def json(self):
        return {'theme_id': self.theme_id,
                'theme_name': self.theme_name,
                'theme_creation': self.theme_creation.strftime('%Y-%m-%d %X'), 
                'theme_update': self.theme_update.strftime('%Y-%m-%d %X')}

    @classmethod
    def find_by_id(cls, theme_id):
        return cls.query.filter_by(theme_id=theme_id).first()        

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
        result = db.session.query(cls.theme_id,
                                  cls.theme_name,
                                  cls.theme_creation, cls.theme_update).all()

        return [{"theme_id": theme.theme_id,
                 "theme_name": theme.theme_name,
                 "theme_creation": theme.theme_creation.strftime('%Y-%m-%d %X'), 
                 "theme_update": theme.theme_update.strftime('%Y-%m-%d %X')} for theme in result]
