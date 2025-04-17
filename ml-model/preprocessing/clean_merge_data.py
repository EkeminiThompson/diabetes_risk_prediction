import pandas as pd

def load_and_merge_datasets():
    pima = pd.read_csv('datasets/pima_indians.csv')
    africa = pd.read_csv('datasets/african_health.csv')

    # Example standardization
    africa = africa.rename(columns={
        'GlucoseLevel': 'Glucose',
        'BMI_Index': 'BMI',
        'AgeYears': 'Age'
    })

    common_columns = ['Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness',
                      'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age', 'Outcome']

    merged = pd.concat([
        pima[common_columns],
        africa[common_columns]
    ], ignore_index=True)

    merged.dropna(inplace=True)
    return merged
