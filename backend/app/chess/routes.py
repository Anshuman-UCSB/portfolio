from flask import Blueprint
from . import chess_bp


@chess_bp.route("/", methods=["GET"])
def register():
    return "Hello World!"