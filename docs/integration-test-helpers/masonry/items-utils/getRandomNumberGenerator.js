// @flow strict

export default function getRandomNumberGenerator(seed: number): () => number {
  let localSeed = seed;

  return () => {
    localSeed += 1;
    const rnd = Math.sin(localSeed);
    return rnd - Math.floor(rnd);
  };
}
