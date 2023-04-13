// @flow strict

export default function getRandomColor(getRandomNumber?: () => number = Math.random): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(getRandomNumber() * 16)];
  }
  return color;
}
