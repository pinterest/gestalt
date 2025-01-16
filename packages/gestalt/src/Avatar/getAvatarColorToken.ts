interface ColorToken {
  base: string;
  hover: string;
  pressed: string;
}

interface ColorTokens {
  [key: string]: ColorToken;
}

// Need to replace color tokens
const colorTokensLight: ColorTokens = Object.freeze({
  'default': {
    base: '#E8E7E1',
    hover: '#D6D4CD',
    pressed: '#C2C1BC',
  },
  1: {
    // redWeak
    base: '#FFD3D1',
    hover: '#FBBEBB',
    pressed: '#F4A8A4',
  },
  2: {
    // redDefault
    base: '#FF9494',
    hover: '#F87777',
    pressed: '#ED5A5A',
  },
  3: {
    // purpleWeak
    base: '#FCD8FC',
    hover: '#FAC7FA',
    pressed: '#F8B5F8',
  },
  4: {
    // purpleDefault
    base: '#EFADEF',
    hover: '#E599E5',
    pressed: '#DA86DA',
  },
  5: {
    // blueWeak
    base: '#C5EAF7',
    hover: '#A8DDF0',
    pressed: '#8ECFE6',
  },
  6: {
    // blueDefault
    base: '#7CBEDE',
    hover: '#58A9D0',
    pressed: '#4096BF',
  },
  7: {
    // greenWeak
    base: '#D0E2A8',
    hover: '#BCD090',
    pressed: '#A7B97E',
  },
  8: {
    // greenDefault
    base: '#A8BB63',
    hover: '#93A550',
    pressed: '#81904C',
  },
  9: {
    // orangeWeak
    base: '#FDE7C9',
    hover: '#F9D9AE',
    pressed: '#F4CC95',
  },
  10: {
    // orangeDefault
    base: '#FBC55B',
    hover: '#F8B430',
    pressed: '#F1A613',
  },
});

const colorTokensDark: ColorTokens = Object.freeze({
  'default': {
    base: '#757570',
    hover: '#757570',
    pressed: '#757570',
  },
  1: {
    // redWeak
    base: '#8A0F0F',
    hover: '#8A0F0F',
    pressed: '#8A0F0F',
  },
  2: {
    // redDefault
    base: '#B2001A',
    hover: '#B2001A',
    pressed: '#B2001A',
  },
  3: {
    // purpleWeak
    base: '#6D4270',
    hover: '#6D4270',
    pressed: '#6D4270',
  },
  4: {
    // purpleDefault
    base: '#8F4696',
    hover: '#8F4696',
    pressed: '#8F4696',
  },
  5: {
    // blueWeak
    base: '#215D82',
    hover: '#215D82',
    pressed: '#215D82',
  },
  6: {
    // blueDefault
    base: '#007DB8',
    hover: '#007DB8',
    pressed: '#007DB8',
  },
  7: {
    // greenWeak
    base: '#265926',
    hover: '#265926',
    pressed: '#265926',
  },
  8: {
    // greenDefault
    base: '#517D3B',
    hover: '#517D3B',
    pressed: '#517D3B',
  },
  9: {
    // orangeWeak
    base: '#9B4B1C',
    hover: '#9B4B1C',
    pressed: '#9B4B1C',
  },
  10: {
    // orangeDefault
    base: '#C66F31',
    hover: '#C66F31',
    pressed: '#C66F31',
  },
});

type BackgroundColorLight = keyof typeof colorTokensLight;
type BackgroundColorDark = keyof typeof colorTokensDark;
type GetAvatarColorToken = (
  color: BackgroundColorLight | BackgroundColorDark,
  isHovered?: boolean,
  isPressed?: boolean,
  isDarkMode?: boolean,
) => string;

const getAvatarColorToken: GetAvatarColorToken = (color, isHovered, isPressed, isDarkMode) => {
  const colorToken = isDarkMode ? colorTokensDark[color] : colorTokensLight[color];

  if (!colorToken || !color) {
    throw new Error(`Invalid background color: ${color}`);
  }

  if (isPressed) {
    return colorToken.pressed;
  }

  if (isHovered) {
    return colorToken.hover;
  }

  return colorToken.base;
};

export default getAvatarColorToken;
