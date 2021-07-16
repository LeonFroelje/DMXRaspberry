from DMXcontroller import db


class Scenes(db.Model):
    s_id = db.Column(db.Integer, primary_key=True)
    s_name = db.Column(db.String(50), unique=True, nullable=False)
    s_data = db.Column(db.Text, nullable=False)

    def __repr__(self):
            return f'{{"name":"{self.s_name}","dmx":"{self.s_data}"}}'


class Programs(db.Model):
    p_id = db.Column(db.Integer, primary_key=True)
    p_name = db.Column(db.String(50), unique=True, nullable=False)
    p_scenes = db.Column(db.Text, unique=True, nullable=False,)

    def __repr__(self):
        return f'{{"name":"{self.p_name}","scenes":"{self.p_scenes}"}}'



class Program():
    def __init__(self, program):
        self.curr_scene = -1
        self.play = False
        self.program = program
        self.scenes = self.program.p_scenes.split(",")

    def __iter__(self):
        return self

    def __next__(self):
        if self.play:
            self.curr_scene += 1
            try:
                return self.scenes[self.curr_scene]
            except IndexError:
                self.curr_scene = 0
                return self.scenes[self.curr_scene]
        else:
            raise(StopIteration)

    def start_program(self):
        self.play = True

    def stop_program(self):
        self.play = False
