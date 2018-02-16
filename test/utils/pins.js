const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const classicPins = Array.from({ length: 20 }).map((_, i) => ({
  name: `foo ${i}`,
  height: 200 + i,
  color: getRandomColor(),
}));

export default classicPins;
