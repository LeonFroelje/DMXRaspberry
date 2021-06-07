from flask import Flask, render_template, request, jsonify
import json
from flask.helpers import url_for

from werkzeug.utils import redirect

app = Flask(__name__)

r = 0
g = 0
b = 0
@app.route("/home")
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/r", methods=["POST", "PUT"])
def red():
    global r
    data = request.get_json()
    dic = json.loads(data)
    return jsonify(dic)

@app.route("/g", methods=["POST", "PUT"])
def green():
    global g
    data = request.get_json()
    dic = json.loads(data)
    return jsonify(dic)

@app.route("/b", methods=["POST", "PUT"])
def blue():
    global b
    data = request.get_json()
    dic = json.loads(data)
    return jsonify(dic)

@app.route("/save", methods=["POST"])
def save():
    data = request.form
    with open(r"C:\Users\User\Documents\kek.txt", "w+") as f:
        f.write(str(data))
    return redirect(url_for("index"))

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)