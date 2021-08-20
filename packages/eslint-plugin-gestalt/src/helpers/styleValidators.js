// @flow strict
const colorMap = {
  '#e60023': `color="red"`,
  'white': `color="white"`,
  '#fff': `color="white"`,
  '#ffffff': `color="white"`,
  '#333': `color="darkGray"`,
  '#333333': `color="darkGray"`,
  '#efefef': `color="lightGray"`,
  '#767676': `color="gray"`,
  '#0fa573': `color="green"`,
  '#0a6955': `color="pine"`,
  '#364a4c': `color="olive"`,
  '#0074e8': `color="blue"`,
  '#004b91': `color="navy"`,
  '#133a5e': `color="midnight"`,
  '#b469eb': `color="purple"`,
  '#8046a5': `color="orchid"`,
  '#5b2677': `color="eggplant"`,
  '#6e0f3c': `color="maroon"`,
  '#f13535': `color="watermelon"`,
  '#e3780c': `color="orange"`,
  'transparent': `color="transparent"`,
  'rgba(51,: 51,51,.8)': `color="transparentDarkGray"`,
  '#e2e2e2': `color="lightWash"`,
  '#dadada': `color="darkWash"`,
};

const borderRadiusMap = {
  '50%': `rounding="circle"`,
  '999px': `rounding="circle"`,
};

const borderMap = {
  '#efefef 1px solid': `borderStyle="sm"`,
  '#eee 1px solid': `borderStyle="sm"`,
  '1px lightgray solid': `borderStyle="sm"`,
  '#efefef 2px solid': `borderStyle="lg"`,
  '#eee 2px solid': `borderStyle="lg"`,
  '2px lightgray solid': `borderStyle="lg"`,
};

export function genBointLookup(
  propName: string,
  start: number,
  end: number = 12,
): {| [string | number]: string |} {
  const lookupMap = {};
  for (let i = start; i <= end; i += 1) {
    const px = i * 4;

    let msg = `${propName}={${i}}`;

    // Special case for marginLeft and marginRight
    if (['marginLeft', 'marginRight'].includes(propName)) {
      const recommendedProp = propName === 'marginLeft' ? 'marginStart' : 'marginEnd';
      msg = `${recommendedProp}={${i}}`;
    }
    lookupMap[px] = msg;
    lookupMap[`${px}px`] = msg;
  }
  return lookupMap;
}

export const validateBackgroundColor = (value: string): ?string => colorMap[value];

export const validateBorder = (value: string): ?string => {
  // If the value is a string:
  // 1) convert everything to lowerCase (css is case-insensitive)
  // 2) sort the values since some found uses have the wrong order
  const cleanValue =
    value && value.toLowerCase ? value.toLowerCase().split(' ').sort().join(' ') : value;

  // $FlowFixMe[prop-missing]
  return borderMap[cleanValue];
};

const roundingLookup = genBointLookup('rounding', 0, 8);

export const validateBorderRadius = (value: string): ?number | string =>
  borderRadiusMap[value] ? borderRadiusMap[value] : roundingLookup[value];

export const validateBoxShadow = (value: string): ?string => {
  // If the value is a string:
  // 1) strip out the rgba portion
  // 2) convert the pixel portion to only numbers
  // 3) If both pieces match, recommend borderStyle="shadow"
  const rgbaRegex = new RegExp(
    /rgba\(\s*(-?\d+|-?\d*\.\d+(?=%))(%?)\s*,\s*(-?\d+|-?\d*\.\d+(?=%))(\2)\s*,\s*(-?\d+|-?\d*\.\d+(?=%))(\2)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/,
    'g',
  );

  const rgbaPortion = value.match(rgbaRegex);
  const cleanRgbaPortion =
    rgbaPortion && rgbaPortion?.length > 0 ? rgbaPortion[0].replace(/ /g, '') : undefined;
  const rgbaMatch =
    cleanRgbaPortion && ['rgba(0,0,0,0.1)', 'rgba(0,0,0,.1)'].includes(cleanRgbaPortion);

  const pixelPortion = value.replace(rgbaRegex, '');
  const cleanPixelPortion = pixelPortion.replace(/px/g, '').replace(/ /g, '');
  const pixelsMatch = ['008', '0080'].includes(cleanPixelPortion);

  return rgbaMatch || pixelsMatch ? 'borderStyle="shadow"' : undefined;
};
