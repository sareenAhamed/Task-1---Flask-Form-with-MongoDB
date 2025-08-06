from flask import Flask, request, jsonify, render_template
from db import collection

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit_task():
    try:
        data = request.get_json()
        collection.insert_one(data)
        return jsonify({"message": "Task submitted successfully!"})
    except Exception as e:
        return jsonify({"message": "Error submitting task!"}), 500

if __name__ == '__main__':
    app.run(debug=True)