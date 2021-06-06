from flask import Flask, render_template, request

app = Flask(__name__)

r = 0
g = 0
b = 0

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/r", methods=["POST", "PUT"])
def red():
    global r
    data = request.form
    r = f"{data.get('r')}"
    return r

@app.route("/g", methods=["POST", "PUT"])
def green():
    global g
    data = request.form
    g = f"{data.get('g')}"
    return g

@app.route("/b", methods=["POST", "PUT"])
def blue():
    global b
    data = request.form
    b = f"{data.get('b')}"
    return b


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)