✅ README.md
markdown
Copy
Edit
# 🧠 Diabetes Risk Prediction App

Predict diabetes risk based on lifestyle and genetic factors using a machine learning model trained on the Pima Indians Diabetes dataset and African health surveys.

## 🧪 Technologies

- **Frontend**: React.js (client/)
- **Backend**: Express.js + Node.js (server/)
- **ML Model**: Python + Flask (ml-model/)
- **Database**: MongoDB
- **Deployment**: Render

## 🚀 Project Structure

diabetes-risk-predictor/ ├── client/ # React frontend ├── server/ # Express backend ├── ml-model/ # Python ML model (Flask)

shell
Copy
Edit

## 📊 Datasets

- Pima Indians Diabetes Dataset
- Preprocessed African health survey dataset

## 🛠️ Setup

### 1. Start ML Model API
```bash
cd ml-model
pip install -r requirements.txt
python app.py
2. Start Backend
bash
Copy
Edit
cd server
npm install
npm run dev
3. Start Frontend
bash
Copy
Edit
cd client
npm install
npm start
🌐 Deployment on Render
Each subproject (client, server, ml-model) is deployed as a separate service.

✨ Features
Diabetes risk prediction via form

Result display with health tips

Optional user history tracking

📦 Dataset Fields
Pregnancies

Glucose

Blood Pressure

Skin Thickness

Insulin

BMI

Diabetes Pedigree Function

Age

Physical Activity

Family History

pgsql
Copy
Edit

---

### ✅ `package.json` (Fullstack root level)

This manages common scripts or monorepo workflows.

```json
{
  "name": "diabetes-risk-predictor",
  "version": "1.0.0",
  "description": "MERN + Python Fullstack Diabetes Risk Prediction App",
  "scripts": {
    "start": "concurrently \"npm run server\" \"npm run client\" \"npm run ml\"",
    "client": "cd client && npm start",
    "server": "cd server && npm run dev",
    "ml": "cd ml-model && python app.py"
  },
  "author": "Ekemini Thompson",
  "license": "MIT",
  "devDependencies": {
    "concurrently": "^8.0.0"
  }
}
⚠️ You’ll need to install concurrently for the root:

bash
Copy
Edit
npm install --save-dev concurrently
