import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from preprocessing.clean_merge_data import load_and_merge_datasets

# Load data
data = load_and_merge_datasets()
X = data.drop('Outcome', axis=1)
y = data['Outcome']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Evaluate
preds = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, preds))

# Save model
joblib.dump(model, 'model/diabetes_model.pkl')
print("Model saved to model/diabetes_model.pkl")
