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


@app.route("/home")
@app.route("/")
def index():
    return render_template("index.html", scripts=['../static/main.js'])


@app.route("/Abspielmodus")
def abspielmodus():
    return render_template("abspielmodus.html",
     scripts=[url_for('static', filename="abspielmodus.js")],
     styles=[url_for("static", filename="abspielmodus.css")],
     programs=Programs.query.all())

@app.route('/Programmiermodus')
def Programmiermodus():
    return render_template("programmiermodus.html", scripts=[url_for('static', filename='main.js')],
     styles=[url_for('static', filename='navbar.css')])

@app.route("/Programmiermodus/new")
def Programmiermodus_new():
    global program_scenes
    return render_template("programmiermodus_new.html", scripts=[url_for('static', filename='main.js')],
     styles=[url_for('static', filename='navbar.css')])


@app.route("/Programmiermodus/edit")
def Programmiermodus_edit():
    return render_template("programmiermodus_edit.html")


@app.route('/Scheinwerfer', methods=['GET'])
def Scheinwerfer():
    return render_template('Scheinwerfer.html', title='Scheinwerfer', scripts=[url_for('static', filename='Scheinwerfer.js')],
     styles=[url_for('static', filename='navbar.css')], scenes=program_scenes)


@app.route('/Leisten')
def Leisten():
    return render_template('Leisten.html',styles=[url_for('static', filename='navbar.css')],
     scripts=[url_for('static', filename='leisten.js')],
     scenes=program_scenes)


@app.route('/Schwarzlicht')
def Schwarzlicht():
    return render_template('Schwarzlicht.html', styles=[url_for('static', filename='navbar.css')],
     scripts=[url_for('static', filename='schwarzlich.js')],
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
    dmx_data = ''
    for leiste in leisten_liste:
        if leiste in dic['leisten']:
            lampen_dict['leisten'][leiste] = parse_json(dic, 8)
    for gruppe in lampen_dict:
        for lampe in lampen_dict[gruppe]:
            dmx_data += lampen_dict[gruppe][lampe]
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
        return redirect(url_for("Scheinwerfer"))
    else:
        return redirect(url_for("Scheinwerfer"))


@app.route('/saveprogram', methods=['POST'])
def saveprogram():
    global program_scenes
    data = request.form
    if 'p_name' in data:
        program = Programs(p_name=data['p_name'], p_scenes=','.join(program_scenes + ' '))
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
    program = Programs.query.filter_by(p_name=p_name).first()
    player.program = program.p_scenes.split(",")
    player.play = True
    print(program, "\n", player.program)
    thread = threading.Thread(target=player.play_program)
    thread.daemon = True
    thread.start()
    return "Programm gestartet"



@app.route('/Penis')
def penis():
    global program_scenes
    test = Programs.query.filter_by(p_name='Test').first()
    szenen = test.p_scenes.split('T')
    szenen = szenen[1:]
    for i,scene in enumerate(szenen):
        szenen[i] = 'T' + scene
    print(szenen)
    loop_through_program(szenen)
    return redirect(url_for('Programmiermodus'))

def loop_through_program(program):
    i = 0
    while i < 50:
        for scene in program:
            print(program, scene)
            sc = Scenes.query.filter_by(s_name=scene).first()
            subprocess.run(['ola_streaming_client', '-u 2', '-d ' + sc.s_data])
            time.sleep(0.1)
        i += 1


