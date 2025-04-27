from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend/backend communication

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    input_value = data.get("input")
    
    if "666" in input_value:
        result = "Malicious"
    else:
        result = "Safe"

    return jsonify({"status": result})

if __name__ == "__main__":
    app.run(port=5001)
