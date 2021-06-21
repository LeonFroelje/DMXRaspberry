import subprocess
from flask import render_template, request, jsonify, flash
import json
from flask.helpers import url_for
import os
from werkzeug.utils import redirect
import time
from DMXcontroller.models import Scenes, Programs
from DMXcontroller import app, db


lampen_liste = ['L1', 'L2', 'L3']
leisten_liste = ['L4', 'L5']

program_scenes = ['Kek1', 'Kek2', 'Kek3', 'Kek4', 'Kek5', 'Kek6', 'Kek7', 'Kek8']
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


@app.route('/Programmiermodus')
def Programmiermodus():
    return render_template("programmiermodus.html", scripts=[url_for('static', filename='main.js')],
     styles=[url_for('static', filename='navbar.css')])


@app.route('/Scheinwerfer', methods=['GET'])
def Scheinwerfer():
    return render_template('Scheinwerfer.html', title='Scheinwerfer', scripts=[url_for('static', filename='Scheinwerfer.js')],
     styles=[url_for('static', filename='navbar.css')])


@app.route('/Leisten')
def Leisten():
    return render_template('Leisten.html',styles=[url_for('static', filename='navbar.css')], scripts=[url_for('static', filename='leisten.js')])


@app.route('/Schwarzlicht')
def Schwarzlicht():
    return render_template('Schwarzlicht.html', styles=[url_for('static', filename='navbar.css')], scripts=[url_for('static', filename='schwarzlich.js')])


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
        program = Programs(p_name=data['p_name'], p_scenes=''.join(program_scenes))
        db.session.add(program)
        db.session.commit()
        return redirect(url_for('Programmiermodus'))
    else:
        return redirect(url_for('Programmiermodus'))

@app.route("/shutdown", methods=["POST"])
def shutdown():
    os.system('sudo shutdown -h now')
    return ''


@app.route('/Penis')
def penis():
    global program_scenes
    loop_through_program(program_scenes)
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
