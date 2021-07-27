import json
from os import path
from posixpath import dirname
from flask.helpers import url_for
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


class Universe:
    def __init__(self, name, fixtures = []):
        self.name = name
        self.fixtures = fixtures
    
    def add_fixture(self, fixture):
        self.fixtures.append(fixture)
        self.fixtures.sort(key=self.by_address())

    def __str__(self) -> str:
        return ",".join([str(fixture) for fixture in self.fixtures])

    def change_frame(self, fixture, data):
        self.fixtures[self.fixtures.index(fixture)].set_frame(data)

    @staticmethod
    def by_address(elem):
        return elem.start_address

    
class Fixture:
    def __init__(self, name, address, fixture_class) -> None:
        self.name = name
        self.start_address = address
        self.fixture_class = fixture_class
        self.channels = {}

        with open(path.join(path.dirname(__file__), "static", "fixture_templates", f"{self.fixture_class}.json")) as f:
            self.json = json.load(f)
            self.dmx_modes = self.json["dmx_modes"]
            self.curr_mode = self.json["dmx_modes"][self.json["default_mode"]]
            self.channels = self.json[f"channels_{self.curr_mode}"]

    def set_frame(self, data):
        self.channels = data

    def __str__(self) -> str:
        return ",".join([value for value in self.channels.values()])
