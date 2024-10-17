from flask import Blueprint, jsonify, request
from collections import defaultdict
from flask_socketio import emit
from backend.app import socketio  # Import socketio from app.py

katex_bp = Blueprint("katex", __name__)

# ... (rest of your existing code)

# SOCKET STUFF BELOW


@socketio.on("connect")
def handle_connect():
    print("Client connected")


@socketio.on("disconnect")
def handle_disconnect():
    print("Client disconnected")


# ... (rest of your existing code)
