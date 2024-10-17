from flask import Flask
from flask_cors import CORS
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)


@app.route("/")
def hello():
    return {"message": "Hello from Flask!"}


if __name__ == "__main__":
    app.run(debug=True)
