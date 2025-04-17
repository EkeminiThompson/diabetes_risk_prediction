// Example helper function
const calculateRisk = (data) => {
  // Your custom logic here
  return data.glucose > 100 ? 'high' : 'low';
};

module.exports = { calculateRisk };
