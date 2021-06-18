from enum import unique
from flask import Flask
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SECRET_KEY'] = "b\xc0@N\xa6\xa5>\xef\x82\xb3\x0b\xcf\xaa\xbf\xbb\xf8\x02A\xb1\x15~\x87\xc7\xa0\xef"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///dmx.db'
db = SQLAlchemy(app)


from DMXcontroller import routes