from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO

socketio = SocketIO()


def create_app(debug=False):
    """Create an application."""
    app = Flask(__name__)
    CORS(app)

    app.debug = debug

    from .katex import katex_bp
    from .chess import chess_bp

    app.register_blueprint(katex_bp, url_prefix="/api/katex")
    app.register_blueprint(chess_bp, url_prefix="/api/chess")

    @app.route("/api/heartbeat")
    def heartbeat():
        return "OK"

    socketio.init_app(app, cors_allowed_origins="*")
    return app
