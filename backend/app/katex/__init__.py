from flask import Blueprint

katex_bp = Blueprint("katex", __name__)

from . import routes, events
