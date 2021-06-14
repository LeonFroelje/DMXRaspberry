import subprocess
from flask import Flask, render_template, request, jsonify
import json
from flask.helpers import url_for
import multiprocessing
from werkzeug.utils import redirect

app = Flask(__name__)



@app.route("/home")
@app.route("/")
def index():
    return render_template("index.html", scripts=['../static/main.js'])


@app.route('/Scheinwerfer', methods=['GET'])
def Scheinwerfer():
    return render_template('Scheinwerfer.html', title='Scheinwerfer', scripts=['../static/index.js'])

@app.route("/rgbwds", methods=["POST", "PUT"])
def rbgwds():
    data = request.get_json()
    dic = json.loads(data)
    subprocess.run(['ola_streaming_client', '-u 2', f"-d {dic['r']},{dic['g']},{dic['b']},{dic['ww']},{dic['d']},{dic['s']}"])
    return jsonify(dic)


@app.route("/save", methods=["POST"])
def save():
    data = request.form
    with open(r"C:\Users\User\Documents\kek.txt", "w+") as f:
        f.write(str(data))
    return redirect(url_for("Scheinwerfer"))

@app.route("/shutdown", methods=["GET"])
def shutdown():
    subprocess.run(['shutdown', '-h now'])
    return ''

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)