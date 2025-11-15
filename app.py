from flask import Flask, render_template, session, redirect, request
from flask_session import Session
from cs50 import SQL

app = Flask(__name__)

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

@app.route("/")
def index():
    if not session.get("enter"):
        return redirect("/landing")
    return render_template("index.html")

