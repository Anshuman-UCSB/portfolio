from .. import socketio


@socketio.on("connect", namespace="/api/katex/socket")
def handle_connect(data):
    print("Client connected")


@socketio.on("disconnect", namespace="/api/katex/socket")
def handle_disconnect():
    print("Client disconnected")
