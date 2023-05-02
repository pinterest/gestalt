// @flow strict

// https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-colorhex-or-rgb-and-blend-colorhexs
function generateColorShade(colorhex: string, percent: number) {
  let R = parseInt(colorhex.substring(1, 3), 16);
  let G = parseInt(colorhex.substring(3, 5), 16);
  let B = parseInt(colorhex.substring(5, 7), 16);

  R = parseInt((R * (100 + percent)) / 100);
  G = parseInt((G * (100 + percent)) / 100);
  B = parseInt((B * (100 + percent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  R = Math.round(R);
  G = Math.round(G);
  B = Math.round(B);

  const RR = R.toString(16).length == 1 ? '0' + R.toString(16) : R.toString(16);
  const GG = G.toString(16).length == 1 ? '0' + G.toString(16) : G.toString(16);
  const BB = B.toString(16).length == 1 ? '0' + B.toString(16) : B.toString(16);

  return '#' + RR + GG + BB;
}

export default generateColorShade;
