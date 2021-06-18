from DMXcontroller import db


class Scenes(db.Model):
    s_id = db.Column(db.Integer, primary_key=True)
    s_name = db.Column(db.String(50), unique=True, nullable=False)
    s_data = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f'Id: {self.s_id}\nName: {self.s_name}\nDMX-Daten: {self.s_data}'

class Programs(db.Model):
    p_id = db.Column(db.Integer, primary_key=True)
    p_name = db.Column(db.String(50), unique=True, nullable=False)
    p_scenes = db.Column(db.Text, unique=True, nullable=False,)

    def __repr__(self):
        return f'Id: {self.p_id}\nName: {self.p_name}\nDMX-Daten: {self.p_scenes}'
