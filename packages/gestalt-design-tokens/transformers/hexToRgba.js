const tinycolor = require('tinycolor2');

/**
 * Helper: Transforms hex rgba colors used in figma tokens:
 * rgba(#ffffff, 0.5) =? rgba(255, 255, 255, 0.5).
 * This is kind of like an alpha() function.
 */
function transformHEXRGBaForCSS(token) {
  const val = token.$value ?? token.value;
  const type = token.$type ?? token.type;
  if (val === undefined) return undefined;

  const transformHEXRGBa = (tokVal) => {
    const regex = /rgba\(\s*(?<hex>#.+?)\s*,\s*(?<alpha>\d*(\.\d*|%)*)\s*\)/g;
    return tokVal.replace(regex, (match, hex, alpha) => {
      try {
        const { r, g, b } = tinycolor(hex).toRgb();
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      } catch (e) {
        console.warn(`Tried parsing "${hex}" as a hex value, but failed.`);
        return match;
      }
    });
  };

  const transformProp = (tokVal, prop) => {
    if (tokVal[prop] !== undefined) {
      // eslint-disable-next-line no-param-reassign
      tokVal[prop] = transformHEXRGBa(val[prop]);
    }
    return val;
  };

  let transformed = val;

  switch (type) {
    case 'border':
    case 'shadow': {
      if (Array.isArray(transformed)) {
        transformed = transformed.map((item) => transformProp(item, 'color'));
      } else {
        transformed = transformProp(transformed, 'color');
      }
      break;
    }
    default:
      transformed = transformHEXRGBa(val);
  }

  return transformed;
}

module.exports = transformHEXRGBaForCSS;
