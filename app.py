from flask import Flask, request, jsonify, render_template
from db import collection
from bson import ObjectId

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

@app.route('/tasks', methods=['GET'])
def get_tasks():
    try:
        tasks = list(collection.find())
        for task in tasks:
            task['_id'] = str(task['_id'])  # Convert ObjectId to string for JSON
        return jsonify(tasks)
    except Exception as e:
        return jsonify({"message": "Error retrieving tasks!"}), 500

if __name__ == '__main__':
    app.run(debug=True)