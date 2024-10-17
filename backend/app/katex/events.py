from .. import socketio

# SOCKET STUFF BELOW


@socketio.on("connect")
def handle_connect(data):
    print("Client connected")


@socketio.on("disconnect")
def handle_disconnect(data):
    print("Client disconnected")
