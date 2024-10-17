from flask import Blueprint, jsonify

katex_bp = Blueprint("katex", __name__)


@katex_bp.route("/question", methods=["GET"])
def get_question():
    # This is a placeholder. You'll implement the actual logic later.
    return jsonify(
        {
            "question": "What is the derivative of x^2?",
            "options": ["2x", "x^2", "2", "x"],
            "correct_answer": "2x",
        }
    )


@katex_bp.route("/submit_answer", methods=["POST"])
def submit_answer():
    # This is a placeholder. You'll implement the actual logic later.
    return jsonify({"result": "correct"})
