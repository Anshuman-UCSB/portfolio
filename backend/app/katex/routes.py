from flask import Blueprint, jsonify, request
from collections import defaultdict
import hashlib
from . import katex_bp


HASHED_ADMIN_NAME = "1b1ea2d690e07178af73f5687180739590e4ea72b7184101b3a19ad8b8406ffa"


def isAdmin(name):
    return hashlib.sha256(name.encode()).hexdigest() == HASHED_ADMIN_NAME


class Leaderboard:
    def __init__(self):
        self.reset()

    def reset(self):
        self.leaderboard = defaultdict(int)
        self.active = False

    def start_game(self):
        self.active = True

    def register(self, name):
        if self.active:
            return "Game is already active"
        if name in self.leaderboard:
            return "Name already registered"
        self.leaderboard[name] = 0


leaderboard = Leaderboard()


@katex_bp.route("/register", methods=["POST"])
def register():
    data = request.json
    name = data.get("name")

    if name:
        name = name.strip()
        if isAdmin(name):
            return jsonify({"message": f"Registered admin {name}", "error": False})
        else:
            result = leaderboard.register(name)
            if result is not None:
                return jsonify({"message": result, "error": True}), 400
            return jsonify({"message": f"Registered {name}", "error": False})
    else:
        return jsonify({"message": "Name is required", "error": True}), 400


@katex_bp.route("/start_game", methods=["POST"])
def start_game():
    data = request.json
    name = data.get("name")
    if leaderboard.active:
        return jsonify({"message": "Game is already active", "error": True}), 400
    if isAdmin(name):
        leaderboard.start_game()
        return jsonify({"message": "Game started", "error": False})
    else:
        return (
            jsonify(
                {"message": "You are not authorized to start the game", "error": True}
            ),
            401,
        )


@katex_bp.route("/question", methods=["GET"])
def get_question():
    return jsonify(
        {
            "question": "What is the derivative of x^2?",
            "options": ["2x", "x^2", "2", "x"],
            "correct_answer": "2x",
        }
    )


@katex_bp.route("/leaderboard", methods=["GET"])
def get_leaderboard():
    return jsonify(leaderboard.leaderboard)


@katex_bp.route("/submit_answer", methods=["POST"])
def submit_answer():
    return jsonify({"result": "correct"})


@katex_bp.route("/", methods=["GET"])
def index():
    return "Ping pong!"
