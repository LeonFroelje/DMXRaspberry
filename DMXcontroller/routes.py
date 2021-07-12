import subprocess
from flask import render_template, request, jsonify, flash
import json
from flask.helpers import url_for
import os
from werkzeug.utils import redirect
import time
import threading
from DMXcontroller.models import Scenes, Programs
from DMXcontroller import app, db
from DMXcontroller.player import ProgramPlayer


player = ProgramPlayer()

lampen_liste = ['L1', 'L2', 'L3']
leisten_liste = ['L4', 'L5']

program_scenes = []
curr_scene = ""


lampen_dict = {
    'scheinwerfer' : {
        'L1' : '0,0,0,0,0,0,',
        'L2' : '0,0,0,0,0,0,',
        'L3' : '0,0,0,0,0,0,'
        },
    'leisten' : {
        'L4' : ''.join(['0,' for i in range(24)]),
        'L5' : ''.join(['0,' for i in range(24)])
        },
    'schwarzlicht' : {
        'L6' : '0,0,0,'
        }
    }

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
     styles=[url_for("static", filename="index.css")],
     programs=Programs.query.all())


@app.route("/Programmiermodus/new")
def Programmiermodus_new():
    global program_scenes
    scenes = Scenes.query.all()
    return render_template("programmiermodus_new.html", scripts=[url_for('static', filename='main.js'), url_for('static', filename='p_new.js')],
     styles=[url_for('static', filename='index.css')], scenes=scenes)


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
    for licht in lampen_dict['schwarzlicht']:
        lampen_dict['schwarzlicht'][licht] = f"{dic['dim']},{dic['strobe']},{dic['dur']}"
    dmx_data = ''
    for gruppe in lampen_dict:
        for lampe in lampen_dict[gruppe]:
            dmx_data += lampen_dict[gruppe][lampe]
    subprocess.run(['ola_streaming_client', '-u 2', '-d ' + dmx_data])
    return jsonify(dic)

@app.route('/Leisten_rgb', methods=['POST', 'PUT'])
def Leisten_rgb():
    global lampen_dict
    global leisten_liste
    data = request.get_json()
    dic = json.loads(data)
    print(dic['data'])
    dmx_data = ''
    for leiste in leisten_liste:
        if leiste in dic['leisten']:
            lampen_dict['leisten'][leiste] = dic["data"]
    print(lampen_dict)
    for gruppe in lampen_dict:
        for lampe in lampen_dict[gruppe]:
            dmx_data += lampen_dict[gruppe][lampe]
    print(dmx_data)
    subprocess.run(['ola_streaming_client', '-u 2', '-d ' + dmx_data])
    return jsonify(dic)


@app.route("/rgbwds", methods=["POST", "PUT"])
def rbgwds():
    global lampen_liste
    global lampen_dict
    data = request.get_json()
    dic = json.loads(data)
    dmx_data = ''
    for lampe in lampen_liste:
        if lampe in dic['lampen']:
            lampen_dict['scheinwerfer'][lampe] = f"{dic['r']},{dic['g']},{dic['b']},{dic['ww']},{dic['d']},{dic['s']},"
    for gruppe in lampen_dict:
        for lampe in lampen_dict[gruppe]:
            dmx_data += lampen_dict[gruppe][lampe]
    subprocess.run(['ola_streaming_client', '-u 2', '-d ' + dmx_data])
    return jsonify(dic)


@app.route("/savescene", methods=["POST"])
def savescene():
    data = request.form
    if 'scenename' in data:
        name = data['scenename']
        dmx_data = ''
        global program_scenes
        global lampen_dict
        for gruppe in lampen_dict:
            for lampe in lampen_dict[gruppe]:
                dmx_data += lampen_dict[gruppe][lampe]
        szene = Scenes(s_name=name, s_data=dmx_data)
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
    dmx_data = ''
    for gruppe in lampen_dict:
        for lampe in lampen_dict[gruppe]:
            dmx_data += lampen_dict[gruppe][lampe]
    
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
        return redirect(url_for('Programmiermodus'))
    else:
        return redirect(url_for('Programmiermodus'))

@app.route("/shutdown", methods=["POST"])
def shutdown():
    os.system('sudo shutdown -h now')
    return ''


@app.route('/Play/<p_name>')
def play_program(p_name):
    global player
    if threading.active_count() <= 3:
        program = Programs.query.filter_by(p_name=p_name).first()
        player.program = program.p_scenes.split(",")
        player.play = True
        thread = threading.Thread(target=player.play_program)
        thread.start()
        return "Programm gestartet"
    else:
        return 'Andere Programme erst stoppen'


@app.route('/change/scenetime', methods=['PUT'])
def change():
    global player
    data = request.get_json()
    dic = json.loads(data)
    player.timer = 0.001 * 1.044**(int(dic['scenetime']))
    return f'Timer changed to {player.timer}' 


@app.route('/stop')
def stop_program():
    global player
    player.play = False
    return 'Programm gestoppt'

@app.route('/Penis')
def penis():
    global program_scenes
    test = Programs.query.filter_by(p_name='Test').first()
    szenen = test.p_scenes.split('T')
    szenen = szenen[1:]
    for i,scene in enumerate(szenen):
        szenen[i] = 'T' + scene
    loop_through_program(szenen)
    return redirect(url_for('Programmiermodus'))

def loop_through_program(program):
    i = 0
    while i < 50:
        for scene in program:
            sc = Scenes.query.filter_by(s_name=scene).first()
            subprocess.run(['ola_streaming_client', '-u 2', '-d ' + sc.s_data])
            time.sleep(0.05)
        i += 1


