// @flow strict
// $FlowExpectedError[untyped-import]
const StyleDictionary = require('style-dictionary').extend('config.json');

const { fileHeader } = StyleDictionary.formatHelpers;

StyleDictionary.registerFileHeader({
  name: 'flowCustomHeader',
  // defaultMessage contains the 2 lines that appear in the default file header
  fileHeader: (defaultMessage) => [`@flow strict`, ...defaultMessage],
});

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
  formatter: ({ dictionary, file }) => {
    const tokenArray = dictionary.allTokens.map((token) =>
      JSON.stringify({
        name: token.name,
        value: token.value,
        comment: token.comment,
        category: token.attributes.category,
      }),
    );
    return `${fileHeader({ file })} module.exports = [${tokenArray}]`;
  },
});

StyleDictionary.registerTransformGroup({
  name: 'android-custom',
  transforms: ['attribute/cti', 'name/cti/snake', 'color/hex8android', 'size/pxToDp'],
});

StyleDictionary.buildAllPlatforms();
