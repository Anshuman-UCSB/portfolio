from flask import Flask
from flask_cors import CORS
from routes.katex import katex_bp

app = Flask(__name__)
CORS(app)

# Register the blueprint
app.register_blueprint(katex_bp, url_prefix="/api/katex")


@app.route("/")
def hello():
    return {"message": "Hello from Flask!"}


if __name__ == "__main__":
    app.run(debug=True)
