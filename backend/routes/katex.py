from flask import Blueprint, jsonify, request
from collections import defaultdict
import hashlib

katex_bp = Blueprint("katex", __name__)

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
    return jsonify({"result": "correct"})
