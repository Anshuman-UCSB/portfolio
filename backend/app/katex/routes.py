from flask import Blueprint, jsonify, request
from collections import defaultdict
import hashlib
from . import katex_bp
from .. import socketio
from time import time


HASHED_ADMIN_NAME = "1b1ea2d690e07178af73f5687180739590e4ea72b7184101b3a19ad8b8406ffa"


def isAdmin(name):
    return hashlib.sha256(name.encode()).hexdigest() == HASHED_ADMIN_NAME


class GameState:
    def __init__(self):
        self.reset()
        self.questions = [
            "c = a^2 + b_1",
            "x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a}",
            "f(x) = x^2",
        ]

    def reset(self):
        self.leaderboard = defaultdict(int)
        self.active = False
        self.current_question = 0
        self.last_question_time = time()

    def get_question(self):
        return self.questions[self.current_question]

    def update_correct(self, name):
        self.leaderboard[name] += 1
        self.emit_update()

    def start_game(self):
        print("Game started by admin")
        self.active = True
        self.emit_update()

    def end_game(self):
        print("Game ended by admin")
        self.active = False
        self.emit_update()

    def register(self, name):
        if self.active:
            return "Game is already active"
        if name in self.leaderboard:
            return "Name already registered"
        self.leaderboard[name] = 0
        self.emit_update()

    def emit_update(self):
        socketio.emit("update_leaderboard", namespace="/api/katex/socket")


gamestate = GameState()


@katex_bp.route("/register", methods=["POST"])
def register():
    data = request.json
    name = data.get("name")

    if name:
        name = name.strip()
        if isAdmin(name):
            return jsonify(
                {"message": "Welcome admin!", "error": False, "isAdmin": True}
            )
        else:
            result = gamestate.register(name)
            if result is not None:
                return jsonify({"message": result, "error": True}), 400
            return jsonify(
                {"message": f"Registered {name}", "error": False, "isAdmin": False}
            )
    else:
        return jsonify({"message": "Name is required", "error": True}), 400


@katex_bp.route("/start_game", methods=["POST"])
def start_game():
    data = request.json
    name = data.get("name")
    if gamestate.active:
        return jsonify({"message": "Game is already active", "error": True}), 400
    if isAdmin(name):
        gamestate.start_game()
        return jsonify({"message": "Game started", "error": False})
    else:
        return (
            jsonify(
                {"message": "You are not authorized to start the game", "error": True}
            ),
            401,
        )


@katex_bp.route("/end_game", methods=["POST"])
def end_game():
    data = request.json
    name = data.get("name")
    if isAdmin(name):
        gamestate.end_game()
        return jsonify({"message": "Game ended", "error": False})


@katex_bp.route("/question", methods=["GET"])
def get_question():
    return jsonify(
        {
            "question": "What is the derivative of x^2?",
            "options": ["2x", "x^2", "2", "x"],
            "correct_answer": "2x",
        }
    )


@katex_bp.route("/submit_answer", methods=["POST"])
def submit_answer():
    data = request.json
    name = data.get("name")
    answer = data.get("answer")
    print("submit answer:", name, answer)
    if answer == "2x":
        gamestate.update_correct(name)
        return jsonify({"result": "correct"})
    else:
        return jsonify({"result": "incorrect"})


@katex_bp.route("/leaderboard", methods=["GET"])
def get_leaderboard():
    return jsonify(gamestate.leaderboard)


@katex_bp.route("/", methods=["GET"])
def index():
    return "Ping pong!"
