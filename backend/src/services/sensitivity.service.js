/**
 * Simple sensitivity analysis (mock logic)
 * Returns a score between 0–100
 */
const analyzeSensitivity = ({ duration, size }) => {
  let score = 0;

  // Longer videos → more chance of sensitive content
  if (duration > 60) score += 40;
  else if (duration > 30) score += 20;

  // Larger file size → higher score
  if (size > 10 * 1024 * 1024) score += 30;
  else if (size > 5 * 1024 * 1024) score += 15;

  // Clamp score
  if (score > 100) score = 100;

  return score;
};

module.exports = {
  analyzeSensitivity
};
