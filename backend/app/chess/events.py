from .. import socketio


@socketio.on("connect", namespace="/api/chess/socket")
def handle_connect(data):
    print("Client connected")

@socketio.on("fen", namespace="/api/chess/socket")
def handle_fen(data):
    print("FEN:", data)
    socketio.emit("fen", data, namespace="/api/chess/socket")


@socketio.on("disconnect", namespace="/api/chess/socket")
def handle_disconnect():
    print("Client disconnected")
