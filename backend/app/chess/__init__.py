from flask import Blueprint

chess_bp = Blueprint("chess", __name__)

from . import routes, events
