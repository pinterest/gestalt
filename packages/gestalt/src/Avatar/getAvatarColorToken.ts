interface ColorToken {
  base: string;
  hover: string;
  pressed: string;
}

interface ColorTokens {
  [key: string]: ColorToken;
}

// Need to replace color tokens
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
const colorTokensLight: ColorTokens = {
=======
<<<<<<< HEAD
const colorTokensLight: ColorTokens = Object.freeze({
>>>>>>> bd0922cb1 (colors working)
=======
=======
>>>>>>> 83ae6ab77 (dark mode support for temp color values)
<<<<<<< HEAD
const colorTokensLight: ColorTokens = Object.freeze({
=======
const colorTokens: ColorTokens = {
>>>>>>> 80cd4e984 (working on docs)
<<<<<<< HEAD
>>>>>>> 1d7a86c2a (working on docs)
=======
=======
const colorTokensLight: ColorTokens = {
>>>>>>> 9c35bc114 (dark mode support for temp color values)
>>>>>>> 83ae6ab77 (dark mode support for temp color values)
  'default': {
    base: '#E8E7E1',
    hover: '#D6D4CD',
    pressed: '#C2C1BC',
  },
  '01': {
    // redWeak
    base: '#FFD3D1',
    hover: '#FBBEBB',
    pressed: '#F4A8A4',
=======
const colorTokens: ColorTokens = {
  '01': {
    // redWeak
    base: '#FFD3D1',
    hover: '#FBBEBB',
<<<<<<< HEAD
    pressed: '#F4A8A4'
>>>>>>> 466cf26aa (colors working)
=======
    pressed: '#F4A8A4',
>>>>>>> 245f695f5 (prettier)
  },
  '02': {
    // redDefault
    base: '#FF9494',
    hover: '#F87777',
<<<<<<< HEAD
<<<<<<< HEAD
    pressed: '#ED5A5A',
=======
    pressed: '#ED5A5A'
>>>>>>> 466cf26aa (colors working)
=======
    pressed: '#ED5A5A',
>>>>>>> 245f695f5 (prettier)
  },
  '03': {
    // purpleWeak
    base: '#FCD8FC',
    hover: '#FAC7FA',
<<<<<<< HEAD
<<<<<<< HEAD
    pressed: '#F8B5F8',
=======
    pressed: '#F8B5F8'
>>>>>>> 466cf26aa (colors working)
=======
    pressed: '#F8B5F8',
>>>>>>> 245f695f5 (prettier)
  },
  '04': {
    // purpleDefault
    base: '#EFADEF',
    hover: '#E599E5',
<<<<<<< HEAD
<<<<<<< HEAD
    pressed: '#DA86DA',
=======
    pressed: '#DA86DA'
>>>>>>> 466cf26aa (colors working)
=======
    pressed: '#DA86DA',
>>>>>>> 245f695f5 (prettier)
  },
  '05': {
    // blueWeak
    base: '#C5EAF7',
    hover: '#A8DDF0',
<<<<<<< HEAD
<<<<<<< HEAD
    pressed: '#8ECFE6',
=======
    pressed: '#8ECFE6'
>>>>>>> 466cf26aa (colors working)
=======
    pressed: '#8ECFE6',
>>>>>>> 245f695f5 (prettier)
  },
  '06': {
    // blueDefault
    base: '#7CBEDE',
    hover: '#58A9D0',
<<<<<<< HEAD
<<<<<<< HEAD
    pressed: '#4096BF',
=======
    pressed: '#4096BF'
>>>>>>> 466cf26aa (colors working)
=======
    pressed: '#4096BF',
>>>>>>> 245f695f5 (prettier)
  },
  '07': {
    // greenWeak
    base: '#D0E2A8',
    hover: '#BCD090',
<<<<<<< HEAD
<<<<<<< HEAD
    pressed: '#A7B97E',
=======
    pressed: '#A7B97E'
>>>>>>> 466cf26aa (colors working)
=======
    pressed: '#A7B97E',
>>>>>>> 245f695f5 (prettier)
  },
  '08': {
    // greenDefault
    base: '#A8BB63',
    hover: '#93A550',
<<<<<<< HEAD
<<<<<<< HEAD
    pressed: '#81904C',
=======
    pressed: '#81904C'
>>>>>>> 466cf26aa (colors working)
=======
    pressed: '#81904C',
>>>>>>> 245f695f5 (prettier)
  },
  '09': {
    // orangeWeak
    base: '#FDE7C9',
    hover: '#F9D9AE',
<<<<<<< HEAD
<<<<<<< HEAD
    pressed: '#F4CC95',
=======
    pressed: '#F4CC95'
>>>>>>> 466cf26aa (colors working)
=======
    pressed: '#F4CC95',
>>>>>>> 245f695f5 (prettier)
  },
  '10': {
    // orangeDefault
    base: '#FBC55B',
    hover: '#F8B430',
<<<<<<< HEAD
<<<<<<< HEAD
    pressed: '#F1A613',
=======
    pressed: '#F1A613'
>>>>>>> 466cf26aa (colors working)
  },
};

const colorTokensDark: ColorTokens = {
  'default': {
    base: '#757570',
    hover: '#757570',
    pressed: '#757570',
  },
  '01': {
    // redWeak
    base: '#8A0F0F',
    hover: '#8A0F0F',
    pressed: '#8A0F0F',
  },
  '02': {
    // redDefault
    base: '#B2001A',
    hover: '#B2001A',
    pressed: '#B2001A',
  },
  '03': {
    // purpleWeak
    base: '#6D4270',
    hover: '#6D4270',
    pressed: '#6D4270',
  },
  '04': {
    // purpleDefault
    base: '#8F4696',
    hover: '#8F4696',
    pressed: '#8F4696',
  },
  '05': {
    // blueWeak
    base: '#215D82',
    hover: '#215D82',
    pressed: '#215D82',
  },
  '06': {
    // blueDefault
    base: '#007DB8',
    hover: '#007DB8',
    pressed: '#007DB8',
  },
  '07': {
    // greenWeak
    base: '#265926',
    hover: '#265926',
    pressed: '#265926',
  },
  '08': {
    // greenDefault
    base: '#517D3B',
    hover: '#517D3B',
    pressed: '#517D3B',
  },
  '09': {
    // orangeWeak
    base: '#9B4B1C',
    hover: '#9B4B1C',
    pressed: '#9B4B1C',
  },
  '10': {
    // orangeDefault
    base: '#9B4B1C',
    hover: '#9B4B1C',
    pressed: '#9B4B1C',
  },
<<<<<<< HEAD
};
=======
});
=======
    pressed: '#F1A613',
  },
};

const colorTokensDark: ColorTokens = {
  'default': {
    base: '#757570',
    hover: '#757570',
    pressed: '#757570',
  },
  '01': {
    // redWeak
    base: '#8A0F0F',
    hover: '#8A0F0F',
    pressed: '#8A0F0F',
  },
  '02': {
    // redDefault
    base: '#B2001A',
    hover: '#B2001A',
    pressed: '#B2001A',
  },
  '03': {
    // purpleWeak
    base: '#6D4270',
    hover: '#6D4270',
    pressed: '#6D4270',
  },
  '04': {
    // purpleDefault
    base: '#8F4696',
    hover: '#8F4696',
    pressed: '#8F4696',
  },
  '05': {
    // blueWeak
    base: '#215D82',
    hover: '#215D82',
    pressed: '#215D82',
  },
  '06': {
    // blueDefault
    base: '#007DB8',
    hover: '#007DB8',
    pressed: '#007DB8',
  },
  '07': {
    // greenWeak
    base: '#265926',
    hover: '#265926',
    pressed: '#265926',
  },
  '08': {
    // greenDefault
    base: '#517D3B',
    hover: '#517D3B',
    pressed: '#517D3B',
  },
  '09': {
    // orangeWeak
    base: '#9B4B1C',
    hover: '#9B4B1C',
    pressed: '#9B4B1C',
  },
  '10': {
    // orangeDefault
    base: '#9B4B1C',
    hover: '#9B4B1C',
    pressed: '#9B4B1C',
  },
};

type BackgroundColorLight = keyof typeof colorTokensLight;
type BackgroundColorDark = keyof typeof colorTokensDark;
type GetAvatarColorToken = (
  avatarColor: BackgroundColorLight | BackgroundColorDark,
  isHovered?: boolean,
  isPressed?: boolean,
  colorScheme?: 'light' | 'dark',
) => string;
>>>>>>> 245f695f5 (prettier)
>>>>>>> e81ae73dd (prettier)

<<<<<<< HEAD
<<<<<<< HEAD
type BackgroundColorLight = keyof typeof colorTokensLight;
type BackgroundColorDark = keyof typeof colorTokensDark;
type GetAvatarColorToken = (
  avatarColor: BackgroundColorLight | BackgroundColorDark,
  isHovered?: boolean,
  isPressed?: boolean,
  colorScheme?: 'light' | 'dark',
) => string;

=======
>>>>>>> 9c35bc114 (dark mode support for temp color values)
const getAvatarColorToken: GetAvatarColorToken = (
  avatarColor,
  isHovered,
  isPressed,
<<<<<<< HEAD
  colorScheme,
=======
<<<<<<< HEAD
  isDarkMode,
>>>>>>> 83ae6ab77 (dark mode support for temp color values)
) => {
  const colorToken =
    colorScheme === 'light' ? colorTokensLight[avatarColor] : colorTokensDark[avatarColor];

=======
const getAvatarColorToken: GetAvatarColorToken = (avatarColor, isHovered, isPressed) => {
  const colorToken = colorTokens[avatarColor];
=======
  colorScheme,
) => {
  const colorToken =
    colorScheme === 'light' ? colorTokensLight[avatarColor] : colorTokensDark[avatarColor];
>>>>>>> 9c35bc114 (dark mode support for temp color values)

>>>>>>> b81f81405 (fixed prop naming)
  if (!colorToken || !avatarColor) {
    throw new Error(`Invalid background color: ${avatarColor}`);
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
