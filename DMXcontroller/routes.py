import re
import subprocess
from flask import render_template, request, jsonify, flash
import json
from flask.helpers import url_for
import os
from werkzeug.utils import redirect
import time
import threading
from DMXcontroller.models import Scenes, Programs, Universe, Fixture
from DMXcontroller import app, db
from DMXcontroller.player import ProgramPlayer


player = ProgramPlayer(scenetime=1, fadetime=0, fadefactor=0)

lampen_liste = ['L1', 'L2', 'L3']
leisten_liste = ['L4', 'L5']

program_scenes = []
curr_scene = ""
#TODO: Move Universe data to json file/database
leiste_1 = Fixture("Leiste 1", 1, "Leisten")
schwarzlicht = Fixture("Schwarzlicht", 25, "Schwarzlicht")
leiste_2 = Fixture("Leiste 2", 28, "Leisten")
scheinwerfer_1 = Fixture("Scheinwerfer 1", 52, "Scheinwerfer")
scheinwerfer_2 = Fixture("Scheinwerfer 2", 58, "Scheinwerfer")
scheinwerfer_3 = Fixture("Scheinwerfer 3", 64, "Scheinwerfer")

universe = Universe("2", [leiste_1, schwarzlicht, leiste_2, scheinwerfer_1, scheinwerfer_2, scheinwerfer_3])


def parse_json(dic, segments):
    data = ''
    for i in range(1, segments + 1, 1):
        data += str(dic[f'r{i}']) + ',' + str(dic[f'g{i}']) + ',' + str(dic[f'b{i}']) + ','
    return data


@app.route("/")
@app.route("/Abspielmodus")
def abspielmodus():
    return render_template("abspielmodus.html",
     scripts=[url_for('static', filename="abspielmodus.js")],
     styles=[url_for("static", filename="index.css"), url_for("static", filename="abspielmodus.css")],
     programs=Programs.query.all())


@app.route("/Abspielmodus/player/<player_page>")
def get_player_page(player_page):
    if(player_page == "program_table"):
        return render_template("program_table.html", programs=Programs.query.all())
    elif(player_page == "MIDI_buttons"):
        return render_template(f"{player_page}.html", scenen = Scenes.query.all()[:30])
    return render_template(f"{player_page}.html")


@app.route("/Programmiermodus/new")
def Programmiermodus_new():
    global program_scenes
    global universe
    scenes = Scenes.query.all()
    return render_template("programmiermodus_new.html", scripts=[url_for('static', filename='main.js'), url_for('static', filename='p_new.js')],
     styles=[url_for('static', filename='index.css')], scenes=scenes, universe=universe)


@app.route("/Programmiermodus/edit")
def Programmiermodus_edit():
    programs = Programs.query.all()
    return render_template("programmiermodus_edit.html", 
    scripts=[url_for('static', filename="programmier_edit.js")],
    styles=[url_for("static", filename="index.css")],
    programs=programs, scenes=Scenes.query.all())


@app.route("/Programmiermodus/edit/<string:p_name>")
def load_program_to_edit(p_name):
    if(p_name):
        program = Programs.query.filter_by(p_name=p_name).first()
        return str(program)


@app.route("/load/scene/<s_name>")
def load_scene_to_edit(s_name):
    scene = Scenes.query.filter_by(s_name=s_name).first()
    subprocess.run(['ola_streaming_client', '-u 2', '-d ' + scene.s_data])
    global curr_scene
    curr_scene = scene.s_name
    return str(scene)


@app.route("/form/fixture")
def form_fixture():
    return render_template("fixture_form.html")


@app.route('/add/scene')
@app.route('/add/scene/<p_name>')
def add_curr_scene(p_name=None):
    global curr_scene
    global program_scenes
    if not p_name:
        if not curr_scene == '':
            program_scenes.append(curr_scene)
            return 'Szene dem Programm hinzugefuegt'
        else:
            return 'Erst szene auswaehlen'
    else:
        program = Programs.query.filter_by(p_name=p_name).first()
        program.p_scenes += f',{curr_scene}'
        db.session.commit()
        return "Szene dem Programm hinzugefuegt"


@app.route("/remove/<s_name>")
def remove_scene(s_name):
    global program_scenes
    program_scenes.remove(s_name)
    return ("Szene entfernt", 204)


@app.route("/Scheinwerfer")
@app.route('/Scheinwerfer/<p_name>', methods=['GET'])
def Scheinwerfer(p_name=None):
    global program_scenes
    if p_name:
        program = Programs.query.filter_by(p_name=p_name).first()
        return render_template('Scheinwerfer.html', title='Scheinwerfer', scripts=[url_for('static', filename='Scheinwerfer.js')],
        styles=[url_for('static', filename='Scheinwerfer.css')], program=program.p_name , scenes=program.p_scenes.split(","))
    
    elif p_name == "":
        reason = "Die gewünschte URL wurde nicht gefunden. Du musst zunächst ein Programm auswählen, bevor du es bearbeiten kannst"
        return render_template("404.html", reason=reason)

    else:
        return render_template('Scheinwerfer.html', title='Scheinwerfer', scripts=[url_for('static', filename='Scheinwerfer.js')],
        styles=[url_for('static', filename='Scheinwerfer.css')], scenes=program_scenes)


@app.route('/Leisten/<p_name>')
@app.route('/Leisten')
def Leisten(p_name=None):
    global program_scenes
    if p_name:
        program = Programs.query.filter_by(p_name=p_name).first()
        return render_template('Leisten.html', title='Leisten', scripts=[url_for('static', filename='leisten.js',)],
        styles=[url_for('static', filename='Leisten.css')], program=program.p_name, scenes=program.p_scenes.split(','))
    else:
        return render_template('Leisten.html',styles=[url_for('static', filename='Leisten.css')],
        scripts=[url_for('static', filename='leisten.js')],
        scenes=program_scenes)


@app.route('/Schwarzlicht/<p_name>')
@app.route('/Schwarzlicht')
def Schwarzlicht(p_name=None):
    global program_scenes
    if p_name:
        program = Programs.query.filter_by(p_name=p_name).first()
        return render_template('Schwarzlicht.html', title='Schwarzlicht', scripts=[url_for('static', filename='schwarzlicht.js')],
        styles=[url_for('static', filename='Schwarzlicht.css')], program=program.p_name, scenes=program.p_scenes.split(','))
    else:
        return render_template('Schwarzlicht.html', styles=[url_for('static', filename='Schwarzlicht.css')],
        scripts=[url_for('static', filename='schwarzlicht.js')],
        scenes=program_scenes)


@app.route('/Schwarzlichtdmx', methods=['PUT'])
def Schwarzlichtdmx():
    global lampen_dict
    data = request.get_json()
    dic = json.loads(data)
    for fixture in dic['fixtures'].split(','):
        universe.change_frame(fixture, dic['channels'])
    player.send_data('2', str(universe))
    print(str(universe))
    return jsonify(dic)

@app.route('/Leistendmx', methods=['POST', 'PUT'])
def Leistendmx():
    global universe
    data = request.get_json()
    dic = json.loads(data)
    for fixture in dic['fixtures'].split(','):
        universe.change_frame(fixture, dic['channels'])
    player.send_data("2", str(universe))
    return jsonify(dic)


@app.route("/Scheinwerferdmx", methods=["POST", "PUT"])
def Scheinwerferdmx():
    global universe
    data = request.get_json()
    dic = json.loads(data)
    for fixture in dic["fixtures"].split(","):
        universe.change_frame(fixture, dic["channels"])
    player.send_data("2", str(universe))
    return ("", 204)



@app.route("/savescene", methods=["POST"])
def savescene():
    data = request.form
    if 'scenename' in data:
        name = data['scenename']
        szene = Scenes(s_name=name, s_data=str(universe))
        db.session.add(szene)
        db.session.commit()
        program_scenes.append(name)
        return ('', 204)
    else:
        return ('Szenenname fehlt', 404)


@app.route('/update/scene', methods=['POST'])
def update_scene():
    global curr_scene
    scene = Scenes.query.filter_by(s_name=curr_scene).first()
    dmx_data = str(universe)
    scene.s_data = dmx_data
    db.session.commit()
    return ('', 204)


@app.route('/saveprogram', methods=['POST'])
def saveprogram():
    global program_scenes
    data = request.form
    if 'p_name' in data:
        program = Programs(p_name=data['p_name'], p_scenes=','.join(program_scenes))
        db.session.add(program)
        db.session.commit()
        program_scenes = []
        return ("Programm gespeichert", 204)
    else:
        return ("Erst Programmnamen angeben", 400)

@app.route("/shutdown", methods=["POST"])
def shutdown():
    os.system('sudo shutdown -h now')
    return ''

@app.route('/Play/<p_name>')
def play_program(p_name):
    global player
    program = Programs.query.filter_by(p_name=p_name).first()
    player.load_program(program)
    player.start_program()
    return "Programm gestartet"



@app.route('/change/scenetime', methods=['PUT'])
def change_scenetime():
    global player
    data = request.get_json()
    dic = json.loads(data)
    player.scenetime = 0.001 * 1.044**(int(dic['scenetime']))
    return f'Timer changed to {player.scenetime}' 


@app.route('/change/fadetime', methods=['PUT'])
def change_fadetime():
    global player
    data = request.get_json()
    dic = json.loads(data)
    fadetime = player.calc_fadetime(dic["fadetime"])
    return str(fadetime)



@app.route('/stop')
def stop_program():
    global player
    player.stop_program()
    return ''


@app.route("/Penis")
def Penis():
    return render_template("test.html")