// @flow strict
// $FlowExpectedError[untyped-import]
const StyleDictionary = require('style-dictionary').extend('config.json');

StyleDictionary.registerTransform({
  name: 'size/pxToDp',
  type: 'value',
  matcher(prop) {
    return prop.value.match(/^-?[\d.]+px$/);
  },
  transformer(prop) {
    return prop.value.replace(/px$/, 'dp');
  },
});

StyleDictionary.registerTransformGroup({
  name: 'android-custom',
  transforms: ['attribute/cti', 'name/cti/snake', 'color/hex8android', 'size/pxToDp'],
});

StyleDictionary.buildAllPlatforms();
