// @flow strict
export function genBointLookup(
  propName: string,
  start: number,
  end: number = 12,
): {| [string | number]: string |} {
  const lookupMap = {};
  for (let i = start; i <= end; i += 1) {
    const px = i * 4;
    let msg = `  Use prop \`${propName}={${i}}\` instead`;
    // Special case for marginLeft and marginRight
    if (['marginLeft', 'marginRight'].includes(propName)) {
      const recommendedProp = propName === 'marginLeft' ? 'marginStart' : 'marginEnd';
      msg = `  Use prop \`${recommendedProp}={${i}}\` instead`;
    }
    lookupMap[px] = msg;
    lookupMap[`${px}px`] = msg;
  }
  return lookupMap;
}

const roundingLookup = genBointLookup('rounding', 0, 8);

export const validateBackgroundColor = (value: string): ?string => {
  if (value === '#e60023') {
    return '  Use prop `color="red"` instead';
  }
  if (value === 'white' || value === '#fff' || value === '#ffffff') {
    return '  Use prop `color="white"` instead';
  }
  if (value === '#efefef') {
    return '  Use prop `color="lightGray"` instead';
  }
  if (value === '#767676') {
    return '  Use prop `color="gray"` instead';
  }
  if (value === '#333' || value === '#333333') {
    return '  Use prop `color="darkGray"` instead';
  }
  if (value === '#0fa573') {
    return '  Use prop `color="green"` instead';
  }
  if (value === '#0a6955') {
    return '  Use prop `color="pine"` instead';
  }
  if (value === '#364a4c') {
    return '  Use prop `color="olive"` instead';
  }
  if (value === '#0074e8') {
    return '  Use prop `color="blue"` instead';
  }
  if (value === '#004b91') {
    return '  Use prop `color="navy"` instead';
  }
  if (value === '#133a5e') {
    return '  Use prop `color="midnight"` instead';
  }
  if (value === '#b469eb') {
    return '  Use prop `color="purple"` instead';
  }
  if (value === '#8046a5') {
    return '  Use prop `color="orchid"` instead';
  }
  if (value === '#5b2677') {
    return '  Use prop `color="eggplant"` instead';
  }
  if (value === '#6e0f3c') {
    return '  Use prop `color="maroon"` instead';
  }
  if (value === '#f13535') {
    return '  Use prop `color="watermelon"` instead';
  }
  if (value === '#e3780c') {
    return '  Use prop `color="orange"` instead';
  }
  if (value === 'transparent') {
    return '  Use prop `color="transparent"` instead';
  }
  if (value === 'rgba(51,51,51,.8)') {
    return '  Use prop `color="transparentDarkGray"` instead';
  }
  if (value === '#e2e2e2') {
    return '  Use prop `color="lightWash"` instead';
  }
  if (value === '#dadada') {
    return '  Use prop `color="darkWash"` instead';
  }
  return undefined;
};

export const validateBorderRadius = (value: string): number | string => {
  if (value === '50%') {
    return '  Use prop `rounding="circle"` instead';
  }
  if (value === '999px') {
    return '  Use prop `rounding="pill"` instead';
  }
  return roundingLookup[value];
};

export const validateBorder = (value: string): ?string => {
  // If the value is a string:
  // 1) convert everything to lowerCase (css is case-insensitive)
  // 2) sort the values since some found uses have the wrong order
  const cleanValue =
    value && value.toLowerCase ? value.toLowerCase().split(' ').sort().join(' ') : value;
  if (
    cleanValue === '#efefef 1px solid' ||
    cleanValue === '#eee 1px solid' ||
    cleanValue === '1px lightgray solid'
  ) {
    return '  Use prop `borderStyle="sm"` instead';
  }
  if (
    cleanValue === '#efefef 2px solid' ||
    cleanValue === '#eee 2px solid' ||
    cleanValue === '2px lightgray solid'
  ) {
    return '  Use prop `borderStyle="lg"` instead';
  }
  return undefined;
};

export const validateBoxShadow = (value: string): ?string => {
  // If the value is a string:
  // 1) strip out the rgba portion
  // 2) convert the pixel portion to only numbers
  // 3) If both pieces match, recommend borderStyle="shadow"

  const rgbaRegex =
    '/rgba\\(\\s*(-?\\d+|-?\\d*\\.\\d+(?=%))(%?)\\s*,\\s*(-?\\d+|-?\\d*\\.\\d+(?=%))(\\2)\\s*,\\s*(-?\\d+|-?\\d*\\.\\d+(?=%))(\\2)\\s*,\\s*(-?\\d+|-?\\d*.\\d+)\\s*\\)/g';
  const rgbaPortion = value.match(rgbaRegex);
  const cleanRgbaPortion =
    rgbaPortion && rgbaPortion.length > 0 ? rgbaPortion[0].split(' ').join('') : undefined;

  const pixelPortion = value.replace(rgbaRegex, '');
  // $FlowIssue[prop-missing] Flow can't find replaceAll
  const cleanPixelPortion = pixelPortion.replaceAll('px', '').replaceAll(' ', '');

  let rgbaMatch = false;
  let pixelsMatch = false;
  if (
    cleanRgbaPortion &&
    (cleanRgbaPortion === 'rgba(0,0,0,0.1)' || cleanRgbaPortion === 'rgba(0,0,0,.1)')
  ) {
    rgbaMatch = true;
  }
  if (cleanPixelPortion === '008' || cleanPixelPortion === '0080') {
    pixelsMatch = true;
  }

  if (rgbaMatch && pixelsMatch) {
    return '  Use prop `borderStyle="shadow"` instead';
  }
  return undefined;
};
