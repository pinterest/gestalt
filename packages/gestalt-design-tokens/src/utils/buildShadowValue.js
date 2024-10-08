const tinycolor = require('tinycolor2');

function buildShadowValue(values, platform) {
  // destructure shadow values from original token value
  // x, y, blur, spread, color, alpha;
  // convert hex code to rgba string

  // print the last value

  return Object.values(values)
    .map((value) => {
      //  Note: we have two formats for elevation tokens.
      //  Classic and VR use a new set of properties

      let rgbString = value.color;
      const hexCode = tinycolor(rgbString).toHex();
      const opacity = tinycolor(rgbString).getAlpha();

      // older format has an explicit opacity value

      if (typeof value === 'object' && 'opacity' in value) {
        const shadowColor = tinycolor(rgbString);
        shadowColor.setAlpha(value.opacity);
        rgbString = shadowColor.toRgbString();
      }

      // strip the px ending in the value of the object, since we re-add it below
      function cleanValue(str) {
        return str.toString().replace('px', '');
      }

      const base = `${cleanValue(value.x ?? value.offsetX)}px ${cleanValue(
        value.y ?? value.offsetY,
      )}px ${cleanValue(value.blur ?? value.blurRadius)}px ${cleanValue(
        value.spread ?? value.spreadRadius,
      )}px`;

      return platform === 'css'
        ? `${base} ${rgbString}`
        : `${base} #${hexCode.toUpperCase()} ${opacity}`;
    })
    .join(', ');
}

module.exports = { buildShadowValue };
