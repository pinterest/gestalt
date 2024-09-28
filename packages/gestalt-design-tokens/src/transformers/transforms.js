const { transformHEXRGBaForCSS } = require('../utils/hexToRgba');
const { buildShadowValue } = require('../utils/buildShadowValue');

const toCamelCase = require('lodash.camelcase');

function registerTokenTransforms(sd) {
  sd.registerTransform({
    name: 'attribute/custom-cti',
    type: 'attribute',
    transformer(prop) {
      // this function is modified from the default cti transformer
      // https://github.com/amzn/style-dictionary/blob/c34cfa5313ee69f02783a2fb51d5f78720163d53/lib/common/transforms.js#L79

      const prefixes = ['base', 'sema', 'comp'];
      const hasPrefix = prefixes.some((prefix) => prop.path[0] === prefix);

      const attrNames = ['category', 'type', 'item', 'subitem', 'state'];
      if (hasPrefix) {
        attrNames.unshift('prefix');
      }

      const originalAttrs = prop.attributes || {};
      const generatedAttrs = {};

      for (let i = 0; i < prop.path.length && i < attrNames.length; i += 1) {
        generatedAttrs[attrNames[i]] = prop.path[i];
      }

      return Object.assign(generatedAttrs, originalAttrs);
    },
  });

  sd.registerTransform({
    name: 'color/css/hexrgba',
    type: 'value',
    transitive: true,
    matcher: (token) => {
      const type = token.$type ?? token.type;
      return typeof type === 'string' && ['color', 'shadow', 'border'].includes(type);
    },
    transformer: (token) => transformHEXRGBaForCSS(token),
  });

  /**
   * Adds 'px' ending to anything matching a font-size value
   */
  sd.registerTransform({
    name: 'font-size/px',
    type: 'value',
    matcher: (prop) => prop.attributes.category === 'font' && prop.attributes.type === 'size',
    transformer(prop) {
      const val = parseFloat(prop.value);
      if (Number.isNaN(val)) return val;
      return `${val}px`;
    },
  });

  /**
   * Adds 'px' ending to anything matching a font-size value
   */
  sd.registerTransform({
    name: 'font-size/px',
    type: 'value',
    matcher: (prop) => prop.attributes.category === 'font' && prop.attributes.type === 'size',
    transformer(prop) {
      const val = parseFloat(prop.value);
      if (Number.isNaN(val)) return val;
      return `${val}px`;
    },
  });

  /**
   * Adds 'px' ending to anything matching a font-size value
   */
  sd.registerTransform({
    name: 'line-height/px',
    type: 'value',
    matcher: (prop) =>
      prop.attributes.category === 'font' &&
      prop.attributes.type === 'lineheight' &&
      prop.attributes.prefix === 'sema',
    transformer(prop) {
      const val = parseFloat(prop.value);
      if (Number.isNaN(val)) return val;
      return `${val}px`;
    },
  });

  // #endregion

  // BUILD CONFIGURATION

  // #region WEB PLATFORM

  // REGISTER TRANSFORMS

  sd.registerTransform({
    name: 'value/elevation/css',
    type: 'value',
    matcher(prop) {
      return prop.attributes.category === 'elevation';
    },
    transformer(prop) {
      if (typeof prop.value === 'string' && prop.value === 'none') return 'none';
      return buildShadowValue(prop.value, 'css');
    },
  });

  sd.registerTransform({
    name: 'name/conflictFixing',
    type: 'name',
    matcher(prop) {
      return (
        (prop.filePath.includes('vr-theme') && prop.attributes.type.endsWith('appenda')) ||
        prop.attributes.type.endsWith('appendb')
      );
    },
    transformer(prop) {
      return prop.name.replace('appenda', '').replace('appendb', '');
    },
  });

  sd.registerTransform({
    name: 'value/duration/css',
    type: 'value',
    matcher(prop) {
      return prop.attributes.type === 'duration';
    },
    transformer(prop) {
      return `${prop.value}ms`;
    },
  });

  sd.registerTransform({
    name: 'value/easing/css',
    type: 'value',
    matcher(prop) {
      return prop.attributes.type === 'easing';
    },
    transformer(prop) {
      const { x1, y1, x2, y2 } = prop.value;
      return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
    },
  });

  // #region ANDROID PLATFORM

  // REGISTER TRANSFORM
  sd.registerTransform({
    name: 'size/pxToDpOrSp',
    type: 'value',
    matcher(prop) {
      return typeof prop.value === 'string' && prop.value.match(/^-?[\d.]+px$/);
    },
    transformer(prop) {
      return prop.name.includes('font')
        ? prop.value.replace(/px$/, 'sp')
        : prop.value.replace(/px$/, 'dp');
    },
  });

  sd.registerTransform({
    name: 'value/easing/android',
    type: 'value',
    matcher(prop) {
      return prop.attributes.type === 'easing';
    },
    transformer(prop) {
      const { x1, y1, x2, y2 } = prop.value;
      return `PathInterpolatorCompat.create(${x1}f, ${y1}f, ${x2}f, ${y2}f)`;
    },
  });

  // #endregion

  // #region IOS PLATFORM

  // REGISTER TRANSFORM
  sd.registerTransform({
    name: 'name/custom-ti/camel',
    type: 'name',
    transformer(prop) {
      const paths = [].concat(prop.path);
      if ('prefix' in prop.attributes) {
        // remove the category value from paths array
        paths.splice(1, 1);
      } else {
        paths.splice(0, 1);
      }
      return toCamelCase(paths.join(' '));
    },
  });

  sd.registerTransform({
    name: 'value/elevation/ios',
    type: 'value',
    matcher(prop) {
      return prop.attributes.category === 'elevation';
    },
    transformer(prop) {
      if (typeof prop.value === 'string' && prop.value === 'none') return 'none';
      return buildShadowValue(prop.value, 'ios');
    },
  });

  sd.registerTransform({
    name: 'value/duration/ios',
    type: 'value',
    matcher(prop) {
      return prop.attributes.type === 'duration';
    },
    transformer(prop) {
      return prop.value / 1000;
    },
  });

  sd.registerTransform({
    name: 'value/easing/ios',
    type: 'value',
    matcher(prop) {
      return prop.attributes.type === 'easing';
    },
    transformer(prop) {
      const { x1, y1, x2, y2 } = prop.value;
      return `[CAMediaTimingFunction functionWithControlPoints:${x1} :${y1} :${x2} :${y2}]`;
    },
  });

  sd.registerTransform({
    name: 'value/easing/ios-swift',
    type: 'value',
    matcher(prop) {
      return prop.attributes.type === 'easing';
    },
    transformer(prop) {
      const { x1, y1, x2, y2 } = prop.value;
      return `CAMediaTimingFunction(controlPoints: ${x1}, ${y1}, ${x2}, ${y2})`;
    },
  });
}
module.exports = { registerTokenTransforms };
