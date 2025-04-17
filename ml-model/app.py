from flask import Flask, request, jsonify
import joblib
import numpy as np
import os

app = Flask(__name__)

model_path = os.path.join(os.path.dirname(__file__), 'model/diabetes_model.pkl')
model = joblib.load(model_path)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    try:
        features = np.array([
            data['Pregnancies'],
            data['Glucose'],
            data['BloodPressure'],
            data['SkinThickness'],
            data['Insulin'],
            data['BMI'],
            data['DiabetesPedigreeFunction'],
            data['Age']
        ]).reshape(1, -1)
        prediction = model.predict(features)[0]
        return jsonify({'prediction': int(prediction)})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/', methods=['GET'])
def home():
    return "Diabetes ML Model Server is up!"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
