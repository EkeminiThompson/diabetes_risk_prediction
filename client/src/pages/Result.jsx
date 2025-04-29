import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResultPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || state.prediction === undefined) {
    return (
      <div className="result-container error-state">
        <h2>No prediction data found</h2>
        <p>Please complete the assessment to view your results</p>
        <button 
          className="action-button"
          onClick={() => navigate('/')}
        >
          Take Assessment
        </button>
      </div>
    );
  }

  const { prediction, lifestyle = {}, predictionInput = {} } = state;
  const isHighRisk = prediction === 1;

  const getRiskFactors = () => {
    const factors = [];
    
    // Medical risk factors
    if (predictionInput.glucose > 140) {
      factors.push(`Elevated glucose level (${predictionInput.glucose} mg/dL)`);
    }
    if (predictionInput.bloodPressure > 130) {
      factors.push(`Elevated blood pressure (${predictionInput.bloodPressure} mmHg)`);
    }
    if (predictionInput.bmi >= 30) {
      factors.push(`High BMI (${predictionInput.bmi}) indicating obesity`);
    }
    if (predictionInput.age > 45) {
      factors.push(`Age (${predictionInput.age}) increases diabetes risk`);
    }

    return factors;
  };

  const getRecommendations = () => {
    const recs = [];
    const medicalRecs = [];

    // Medical recommendations
    if (predictionInput.glucose > 140) {
      medicalRecs.push({
        text: 'Your glucose levels are elevated. Consider consulting a doctor for an HbA1c test.',
        priority: 'high'
      });
    }
    if (predictionInput.bloodPressure > 130) {
      medicalRecs.push({
        text: 'Your blood pressure is above normal. Regular monitoring is recommended.',
        priority: 'high'
      });
    }
    if (predictionInput.bmi >= 30) {
      medicalRecs.push({
        text: 'Weight loss of 5-10% can significantly reduce your diabetes risk.',
        priority: 'medium'
      });
    }

    // Lifestyle recommendations
    if (lifestyle.physicalActivity === 'low') {
      recs.push({
        text: 'Aim for at least 150 minutes of moderate exercise per week.',
        icon: '🏃‍♂️',
        category: 'activity'
      });
    }

    if (lifestyle.smoking === 'yes') {
      recs.push({
        text: 'Quitting smoking can improve insulin sensitivity within weeks.',
        icon: '🚭',
        category: 'habits'
      });
    }

    if (lifestyle.diet === 'poor') {
      recs.push({
        text: 'Focus on whole foods: vegetables, lean proteins, and whole grains.',
        icon: '🥗',
        category: 'nutrition'
      });
    } else if (lifestyle.diet === 'average') {
      recs.push({
        text: 'Consider reducing processed foods and added sugars for additional benefits.',
        icon: '🍎',
        category: 'nutrition'
      });
    }

    if (lifestyle.alcohol === 'frequently') {
      recs.push({
        text: 'Limit alcohol to 1 drink/day for women, 2 for men to reduce risk.',
        icon: '🚱',
        category: 'habits'
      });
    }

    // Default positive reinforcement
    if (recs.length === 0) {
      recs.push({
        text: 'Your current lifestyle choices are helping to reduce your diabetes risk!',
        icon: '👍',
        category: 'general'
      });
    }

    return {
      medical: medicalRecs,
      lifestyle: recs
    };
  };

  const { medical, lifestyle: lifestyleRecs } = getRecommendations();
  const riskFactors = getRiskFactors();

  return (
    <div className={`result-container ${isHighRisk ? 'high-risk' : 'low-risk'}`}>
      <div className="result-header">
        <h1>Your Diabetes Risk Assessment</h1>
        <p className="result-subtitle">
          {isHighRisk 
            ? 'Important health insights for you' 
            : 'Your current health snapshot'}
        </p>
      </div>

      <div className="risk-summary">
        <div className={`risk-badge ${isHighRisk ? 'high' : 'low'}`}>
          <span className="risk-label">
            {isHighRisk ? 'Higher Risk' : 'Lower Risk'}
          </span>
          <span className="risk-emoji">
            {isHighRisk ? '⚠️' : '✅'}
          </span>
        </div>
        
        <p className="risk-description">
          {isHighRisk
            ? 'Our analysis indicates you may be at increased risk for diabetes. The good news is that early awareness gives you the power to make positive changes.'
            : 'Your current health metrics and lifestyle choices suggest a lower risk profile for diabetes. Maintaining these healthy habits is key.'}
        </p>

        {isHighRisk && (
          <div className="action-alert">
            <svg className="alert-icon" viewBox="0 0 24 24">
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
            <p>Consider consulting with a healthcare provider for personalized advice</p>
          </div>
        )}
      </div>

      {riskFactors.length > 0 && (
        <div className="risk-factors">
          <h3>Key Risk Factors Identified</h3>
          <ul>
            {riskFactors.map((factor, index) => (
              <li key={index}>{factor}</li>
            ))}
          </ul>
        </div>
      )}

      {medical.length > 0 && (
        <div className="medical-recommendations">
          <h3>Medical Recommendations</h3>
          <div className="recommendation-cards">
            {medical.map((rec, index) => (
              <div key={index} className={`recommendation-card priority-${rec.priority}`}>
                <div className="card-content">
                  <p>{rec.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="lifestyle-recommendations">
        <h3>Lifestyle Suggestions</h3>
        {lifestyleRecs[0].category === 'general' ? (
          <div className="positive-reinforcement">
            <span className="positive-icon">{lifestyleRecs[0].icon}</span>
            <p>{lifestyleRecs[0].text}</p>
          </div>
        ) : (
          <div className="recommendation-grid">
            {lifestyleRecs.map((rec, index) => (
              <div key={index} className="recommendation-tip">
                <span className="tip-icon">{rec.icon}</span>
                <p>{rec.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="result-footer">
        <button 
          className="action-button primary"
          onClick={() => navigate('/')}
        >
          Take Assessment Again
        </button>
        <p className="disclaimer">
          <svg className="lock-icon" viewBox="0 0 24 24">
            <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v2h8z"/>
          </svg>
          Your information was not stored and this is not a medical diagnosis
        </p>
      </div>

      <style jsx>{`
        .result-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #1e293b;
        }
        
        .high-risk {
          background: linear-gradient(to bottom, #fff5f5 0%, #fff 100px);
        }
        
        .low-risk {
          background: linear-gradient(to bottom, #f0fdf4 0%, #fff 100px);
        }
        
        .error-state {
          text-align: center;
          padding: 4rem 2rem;
          background: #f8fafc;
        }
        
        .result-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        
        .result-header h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }
        
        .result-subtitle {
          font-size: 1.1rem;
          color: #64748b;
          margin-top: 0;
        }
        
        .risk-summary {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          border: 1px solid #f1f5f9;
          text-align: center;
        }
        
        .risk-badge {
          display: inline-flex;
          align-items: center;
          padding: 0.5rem 1.25rem;
          border-radius: 50px;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }
        
        .risk-badge.high {
          background: #fee2e2;
          color: #b91c1c;
        }
        
        .risk-badge.low {
          background: #dcfce7;
          color: #15803d;
        }
        
        .risk-emoji {
          margin-left: 0.5rem;
          font-size: 1.2rem;
        }
        
        .risk-description {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #334155;
          max-width: 600px;
          margin: 0 auto 1.5rem;
        }
        
        .action-alert {
          display: inline-flex;
          align-items: center;
          padding: 0.75rem 1.25rem;
          background: #fffbeb;
          border-radius: 8px;
          color: #92400e;
          font-weight: 500;
          gap: 0.75rem;
        }
        
        .alert-icon {
          width: 20px;
          height: 20px;
          stroke: currentColor;
          stroke-width: 2;
          fill: none;
        }
        
        .risk-factors, 
        .medical-recommendations,
        .lifestyle-recommendations {
          background: white;
          border-radius: 16px;
          padding: 1.5rem 2rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          border: 1px solid #f1f5f9;
        }
        
        .risk-factors h3,
        .medical-recommendations h3,
        .lifestyle-recommendations h3 {
          color: #1e293b;
          margin-top: 0;
          margin-bottom: 1.25rem;
          font-size: 1.25rem;
          position: relative;
          padding-left: 1rem;
        }
        
        .risk-factors h3::before,
        .medical-recommendations h3::before,
        .lifestyle-recommendations h3::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 4px;
          background: #4f46e5;
          border-radius: 2px;
        }
        
        .risk-factors ul {
          padding-left: 1.25rem;
          margin: 0;
        }
        
        .risk-factors li {
          margin-bottom: 0.75rem;
          line-height: 1.5;
        }
        
        .recommendation-cards {
          display: grid;
          gap: 1rem;
        }
        
        .recommendation-card {
          padding: 1.25rem;
          border-radius: 12px;
          border-left: 4px solid;
        }
        
        .priority-high {
          background: #fef2f2;
          border-left-color: #ef4444;
        }
        
        .priority-medium {
          background: #fffbeb;
          border-left-color: #f59e0b;
        }
        
        .positive-reinforcement {
          text-align: center;
          padding: 1.5rem;
          background: #f0fdf4;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .positive-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        
        .recommendation-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.25rem;
        }
        
        .recommendation-tip {
          background: #f8fafc;
          border-radius: 12px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        
        .tip-icon {
          font-size: 1.75rem;
          margin-bottom: 0.75rem;
        }
        
        .result-footer {
          text-align: center;
          margin-top: 2rem;
        }
        
        .action-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        .action-button.primary {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
          color: white;
        }
        
        .action-button.primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 12px rgba(79, 70, 229, 0.15);
        }
        
        .disclaimer {
          font-size: 0.8rem;
          color: #64748b;
          margin-top: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        
        .lock-icon {
          width: 14px;
          height: 14px;
          stroke: currentColor;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
          fill: none;
        }
        
        @media (max-width: 768px) {
          .result-container {
            padding: 1.5rem;
          }
          
          .risk-summary,
          .risk-factors, 
          .medical-recommendations,
          .lifestyle-recommendations {
            padding: 1.25rem;
          }
          
          .recommendation-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default ResultPage;