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

StyleDictionary.registerFormat({
  name: 'customJSArrayFormat',
  formatter: ({ dictionary }) => {
    const tokenArray = dictionary.allTokens.map((token) =>
      JSON.stringify({
        name: token.name,
        value: token.value,
        comment: token.comment,
        category: token.attributes.category,
      }),
    );
    return `module.exports = [${tokenArray}]`;
  },
});

StyleDictionary.registerTransformGroup({
  name: 'android-custom',
  transforms: ['attribute/cti', 'name/cti/snake', 'color/hex8android', 'size/pxToDp'],
});

StyleDictionary.buildAllPlatforms();
