from flask import Blueprint, jsonify, request
from collections import defaultdict
import hashlib
from . import katex_bp
from .. import socketio
from time import time
import sympy as sp
from sympy.parsing.latex import parse_latex

HASHED_ADMIN_NAME = "1b1ea2d690e07178af73f5687180739590e4ea72b7184101b3a19ad8b8406ffa"


def isAdmin(name):
    return hashlib.sha256(name.encode()).hexdigest() == HASHED_ADMIN_NAME


class GameState:
    def __init__(self):
        self.questions = [
            "c = a^2 + b_1",
            "x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a}",
            "f(x) = x^2",
        ]
        self.reset()

    def reset(self):
        self.leaderboard = defaultdict(int)
        self.active = False
        self.current_question = -1
        self.next_question()
        self.end_screen = False

    def get_question(self):
        return self.questions[self.current_question]

    def update_current_question(self, num=None):
        if num is not None:
            self.current_question = num
        else:
            self.current_question += 1
        if self.current_question >= len(self.questions):
            return
        self.last_question_time = time()
        self.current_question_sympy = parse_latex(self.questions[self.current_question])

    def isCorrect(self, answer):
        answer = answer.strip()
        print(f"Checking answer: '{answer}'")
        try:
            expr = parse_latex(answer)
            print("Comparing", expr, self.current_question_sympy)
            try:
                return self.current_question_sympy.equals(expr)
            except TypeError as te:
                print("TypeError when comparing:", te)
                return False
        except Exception as e:
            print("Error parsing or comparing:", e)
            return False

    def update_correct(self, name):
        self.leaderboard[name] += int(
            1000 / (1 + 0.05 * (time() - self.last_question_time))
        )
        self.emit_update("update_leaderboard")

    def start_game(self):
        print("Game started by admin")
        self.active = True
        self.last_question_time = time()
        for name in self.leaderboard:
            self.leaderboard[name] = 0
        self.end_screen = False
        self.update_current_question(0)
        self.emit_update("start_game")

    def next_question(self):
        self.update_current_question()
        if self.current_question >= len(self.questions):
            self.end_game()
        else:
            if self.active:
                self.emit_update("next_question")

    def end_game(self):
        print("Game ended by admin")
        self.active = False
        self.end_screen = True
        self.emit_update("end_game")

    def register(self, name):
        if self.active:
            return "Game is already active"
        if name in self.leaderboard and not self.end_screen:
            return "Name already registered"
        if self.end_screen:
            self.leaderboard.clear()
            self.end_screen = False
        self.leaderboard[name] = 0
        self.emit_update("update_leaderboard")

    def emit_update(self, message):
        print("Emitting update:", message)
        socketio.emit(message, namespace="/api/katex/socket")


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


@katex_bp.route("/question", methods=["GET"])
def get_question():
    return jsonify({"question": gamestate.get_question()})


@katex_bp.route("/submit_answer", methods=["POST"])
def submit_answer():
    data = request.json
    name = data.get("name")
    answer = data.get("answer")
    print("submit answer:", name, answer)
    if gamestate.isCorrect(answer):
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


# ADMIN ROUTES


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


@katex_bp.route("/next_question", methods=["POST"])
def next_question():
    data = request.json
    name = data.get("name")
    if isAdmin(name):
        gamestate.next_question()
        return jsonify({"message": "Next question", "error": False})
    return (
        jsonify({"message": "You are not authorized for this", "error": True}),
        401,
    )
