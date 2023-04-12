// @flow strict
import pinHeights, { type PinHeight } from './pinHeights.js';

function randomSample(
  samples: $ReadOnlyArray<PinHeight>,
  field: 'impressionsCount' | 'pinsCount',
): number {
  // [0..1) * sum of weight
  let sample = Math.random() * samples.reduce((sum, pin) => sum + pin[field], 0);

  // first sample n where sum of weight for [0..n] > sample
  // eslint-disable-next-line no-return-assign
  const { height } = samples.find((pin) => (sample -= pin[field]) < 0) ?? {};

  return height;
}

interface PinHeightsSingletonType {
  pinHeightSample: $ReadOnlyArray<number>;
  pinHeightSampleIndex: number;
}

class PinHeightsSingleton implements PinHeightsSingletonType {
  pinHeightSample: $ReadOnlyArray<number>;

  pinHeightSampleIndex: number;

  constructor() {
    this.pinHeightSample = Array.from({ length: 1000 }).map(() =>
      randomSample(pinHeights, 'pinsCount'),
    );
    this.pinHeightSampleIndex = 0;
  }
}

const pinHeightsSingleton: PinHeightsSingletonType = new PinHeightsSingleton();

export default pinHeightsSingleton;
