from datetime import datetime
from flask_restful import Resource, reqparse

from models.theme import ThemeModel

# Inheritance of Resource class
class Theme(Resource):
    parser = reqparse.RequestParser()
    # Only arguments added to the parser will retain
    # additional arguments will be removed when parse_args() is called
    # if the request does not contain any added arguments, help message
    # will be returned to the browser instead
    parser.add_argument('theme_name',
        type=str,
        required=True,
        help="Every theme needs a type."
    )    
        
    def get(self, theme_id):
        theme = ThemeModel.find_by_id(theme_id)       
        if theme:
            return theme.json()
        return {'message': 'Theme not found'}, 404

    def post(self):        
        # parse_args() return only arguments added by add_argument as Namespace
        # Any missing added argument will stop and return help message to the browser
        data = Theme.parser.parse_args()

        # data namespace is rolled into one argument (**data)
        theme = ThemeModel(**data)

        try:
            theme.save_to_db()
        except:
            return {"message": "An error occurred inserting the item."}, 500

        return theme.json(), 201

    def put(self, theme_id):
        data = Theme.parser.parse_args()

        theme = ThemeModel.find_by_id(theme_id)
        
        if theme is None:    # Create a new theme if it does not exist in the database
            theme = ThemeModel(**data)
        else:               # Update the theme if it exists in the database
            theme.theme_name = data['theme_name']
            theme.theme_update = datetime.now()

        theme.save_to_db()

        return theme.json()      

    # Delete a theme will delete all child items
    def delete(self, theme_id):
        theme = ThemeModel.find_by_id(theme_id)
        if theme:
            theme.delete_from_db()
            return {'message': 'Theme deleted'}

        return {'message': 'Theme not found'}        

class ThemeList(Resource):
    # use query.with_entities(DataModel.col1, DataModel.col2) for a specific columns
    def get(self):        
        return {'themes': ThemeModel.query_all()}
    
    # Delete all themes will not delete child items
    def delete(self):
        ThemeModel.delete_all()        
        return {'message': 'All themes deleted'}