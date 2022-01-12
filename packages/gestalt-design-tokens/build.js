// @flow strict
// $FlowExpectedError[untyped-import]
const StyleDictionary = require('style-dictionary');

const { fileHeader } = StyleDictionary.formatHelpers;

StyleDictionary.registerFileHeader({
  name: 'flowCustomHeader',
  // defaultMessage contains the 2 lines that appear in the default file header
  fileHeader: (defaultMessage) => [`@flow strict`, ...defaultMessage],
});

StyleDictionary.registerTransform({
  name: 'size/pxToDpOrSp',
  type: 'value',
  matcher(prop) {
    return prop.value.match(/^-?[\d.]+px$/);
  },
  transformer(prop) {
    return prop.name.includes('font')
      ? prop.value.replace(/px$/, 'sp')
      : prop.value.replace(/px$/, 'dp');
  },
});

StyleDictionary.registerFormat({
  name: 'customJSArrayFormat',
  formatter: ({ dictionary, file }) => {
    const tokenArray = dictionary.allTokens.map((token) =>
      JSON.stringify({
        name: token.name,
        value: token.value,
        darkValue: token.darkValue,
        comment: token.comment,
        category: token.attributes.category,
      }),
    );
    return `${fileHeader({ file, commentStyle: 'short' })} module.exports = [${tokenArray}]`;
  },
});

function darkFormatWrapper(format) {
  return (args) => {
    const dictionary = { ...args.dictionary };
    // Override each token's `value` with `darkValue`
    dictionary.allTokens = dictionary.allTokens.map((token) => {
      const { darkValue } = token;
      if (darkValue) {
        return { ...token, value: token.darkValue };
      }
      return token;
    });
    // Use the built-in format but with our customized dictionary object
    // so it will output the darkValue instead of the value
    return StyleDictionary.format[format]({
      ...args,
      dictionary,
    });
  };
}

StyleDictionary.registerFormat({
  name: 'cssDark',
  formatter: darkFormatWrapper(`css/variables`),
});

StyleDictionary.registerFormat({
  name: 'cssDarkJson',
  formatter: darkFormatWrapper(`json/flat`),
});

StyleDictionary.registerFilter({
  name: 'customDarkColorFilter',
  matcher(token) {
    return token.darkValue && token.attributes.category === `color`;
  },
});

StyleDictionary.registerTransformGroup({
  name: 'android-custom',
  transforms: ['attribute/cti', 'name/cti/snake', 'color/hex8android', 'size/pxToDpOrSp'],
});

StyleDictionary.extend('config.json').buildAllPlatforms();
