// @flow strict

function randomSample(samples) {
  // [0..1) * sum of weight
  let sample = Math.random() * samples.reduce((sum, { weight }) => sum + weight, 0);

  // first sample n where sum of weight for [0..n] > sample
  const { value } = samples.find(({ weight }) => (sample -= weight) < 0);

  return value;
}
