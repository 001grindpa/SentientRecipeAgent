from flask import Flask, render_template, session, redirect, request, jsonify
from flask_session import Session
from cs50 import SQL

app = Flask(__name__)

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

@app.context_processor
def ready():
    if session.get("cancel"):
        x = "cancel"
        return dict(x = x)
    else:
        x = ""
        return dict(x = x)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        session["cancel"] = request.json["q"]
        print(request.json["q"])
        return jsonify({"msg": "cancel session saved"})
    if not session.get("enter"):
        return redirect("/landing")
    return render_template("index.html", page_id="index")

@app.route("/landing", methods=["GET", "POST"])
def landing():
    if request.method == "POST":
        session["enter"] = request.form.get("name")
        return redirect("/")
    return render_template("landing.html", page_id = "landing")

if __name__ == "__main__":
    app.run(port=5000, debug=True, use_reloader=True, reloader_type="watchdog")