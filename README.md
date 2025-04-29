Here's a step-by-step **guide to get your diabetes prediction app running** with MongoDB included. This version is designed for a novice, so don't worry if you're not familiar with all the steps. I've made it simple!

---

## 🧰 STEP 1: Install All Tools (One by One)

---

### ✅ 1. Install **Python**
#### ➤ What it's for: Running the ML model

1. Open your browser and go to:  
   👉 [https://www.python.org/downloads/windows/](https://www.python.org/downloads/windows/)
2. Click the yellow button that says:  
   **Download Python 3.x.x** (latest version)
3. Once the file downloads, **double-click it to install**.
4. **IMPORTANT**: On the first screen, **check the box that says**:  
   ✅ “Add Python to PATH”  
5. Then click **“Install Now”**.
6. After installation, press:
   - `Windows` key → Type **"cmd"** → Click **Command Prompt**
7. In the black window (Command Prompt), type:
   ```bash
   python --version
   ```
   You should see something like:  
   `Python 3.12.2` ✅

---

### ✅ 2. Install **MongoDB** (Local Database)
#### ➤ What it's for: Storing prediction data

1. Go to:  
   👉 [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Choose:
   - **Version:** Latest (e.g., 7.0.x)
   - **Platform:** Windows
   - **Package:** `.msi` installer
3. Download and run the installer.
4. During installation, make sure to select **"Install MongoDB as a Service"**.
5. After installation, check if MongoDB is running:
   - Open **Command Prompt** and type:
     ```bash
     mongod --version
     ```

> You should see version information. If this works, MongoDB is installed successfully.

---

### ✅ 3. Install **Node.js**
#### ➤ What it's for: Running the backend and frontend

1. Go to:  
   👉 [https://nodejs.org](https://nodejs.org)
2. Click the **LTS (green)** download button.
3. After it downloads, double-click to install it.
4. Keep clicking **Next → Next → Install** until done.
5. Now open **Command Prompt** again and type:
   ```bash
   node -v
   npm -v
   ```
   You should see something like:  
   `v20.11.0` and `9.6.7` ✅

---

### ✅ 4. Install **Git**
#### ➤ What it's for: Cloning your project from GitHub

1. Go to:  
   👉 [https://git-scm.com/download/win](https://git-scm.com/download/win)
2. Click **Download** and run the setup.
3. Accept all defaults and click **Next → Next → Install**.
4. After install, open **Command Prompt**, and check:
   ```bash
   git --version
   ```
   You should see something like:  
   `git version 2.44.0.windows.1` ✅

---

## 🔽 STEP 2: Download Your Project From GitHub

1. On your **Command Prompt**, type this to go to your Desktop:
   ```bash
   cd Desktop
   ```
2. Now clone your project (replace with your real GitHub URL if needed):
   ```bash
   git clone https://github.com/EkeminiThompson/diabetes_risk_prediction.git
   ```
3. Go into your project folder:
   ```bash
   cd diabetes_risk_prediction
   ```

---

## 🚀 STEP 3: Run the App (One Part at a Time)

---

### 🔸 A. Run the **ML Model (Python)**

1. In the same Command Prompt window:
   ```bash
   cd ml-model
   pip install -r requirements.txt
   python app.py
   ```
2. This should start a server on something like `http://localhost:5000`

> **Leave this window open**!

---

### 🔸 B. Open New Command Prompt for **Backend**

1. Press `Windows` key → search for **Command Prompt** → open it again
2. Go to your project:
   ```bash
   cd Desktop\diabetes_risk_prediction\server
   npm install
   npm run dev
   ```

> Your backend (Node.js server) will run at `http://localhost:5001` or `5000`.

---

### 🔸 C. Open Another Command Prompt for **Frontend**

1. Open **Command Prompt** again (third time)
2. Run:
   ```bash
   cd Desktop\diabetes_risk_prediction\client
   npm install
   npm start
   ```

> Your browser will open `http://localhost:3000` with the form.

---

## ✅ You're Done!

You now have:
- 🧠 Machine learning model running (Python)
- ⚙️ Backend running (Node.js)
- 🌐 Frontend open in your browser (React)

---
