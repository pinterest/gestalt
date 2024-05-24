const StyleDictionary = require('style-dictionary');
const tinycolor = require('tinycolor2');

// CONFIG

const optionsFileHeader = {
  'options': {
    'fileHeader': 'fileHeader',
    '_fileHeader_comment': 'Custom',
    'showFileHeader': true,
  },
};

const optionsFileHeaderOutputReferences = {
  'options': {
    'fileHeader': 'fileHeader',
    '_fileHeader_comment': 'Custom',
    'showFileHeader': true,
    'outputReferences': true,
  },
};

const dimenResource = { 'resourceType': 'dimen' };

const colorResource = { 'resourceType': 'color' };

const filterColor = {
  'filter': {
    'attributes': {
      'category': 'color',
    },
  },
};

const filterRounding = {
  'filter': {
    'attributes': {
      'category': 'rounding',
    },
  },
};

const filterOpacity = {
  'filter': {
    'attributes': {
      'category': 'opacity',
    },
  },
};

const filterSpace = {
  'filter': {
    'attributes': {
      'category': 'space',
    },
  },
};

const filterElevation = {
  'filter': {
    'attributes': {
      'category': 'elevation',
    },
  },
};

const filterFontWeight = {
  'filter': {
    'attributes': {
      'category': 'font',
      'type': 'weight',
    },
  },
};

const filterFontSize = {
  'filter': {
    'attributes': {
      'category': 'font',
      'type': 'size',
    },
  },
};

const filterFontFamily = {
  'filter': {
    'attributes': {
      'category': 'font',
      'type': 'family',
    },
  },
};

const androidResources = {
  'format': 'android/resources',
  '_format_comment': 'https://amzn.github.io/style-dictionary/#/formats?id=androidresources',
};

const iosColorsH = {
  'format': 'ios/colors.h',
  '_format_comment': 'https://amzn.github.io/style-dictionary/#/formats?id=ioscolorsh',
};

const iosColorsM = {
  'format': 'ios/colors.m',
  '_format_comment': 'https://amzn.github.io/style-dictionary/#/formats?id=ioscolorsm',
};

const iosStaticH = {
  'format': 'ios/static.h',
  '_format_comment': 'https://amzn.github.io/style-dictionary/#/formats?id=iosstringsh',
};

const iosStaticM = {
  'format': 'ios/static.m',
  '_format_comment': 'https://amzn.github.io/style-dictionary/#/formats?id=iosstringsm',
};

const iosSwiftEnumSwift = {
  'format': 'ios-swift/enum.swift',
  '_format_comment': 'https://amzn.github.io/style-dictionary/#/formats?id=ios-swiftenumswift',
};

const jsonFlat = {
  'format': 'json/flat',
  '_format_comment': 'https://amzn.github.io/style-dictionary/#/formats?id=jsonflat',
};

const cssVariables = {
  'format': 'css/variables',
  '_format_comment': 'https://amzn.github.io/style-dictionary/#/formats?id=cssvariables',
};

const colorElevationFilter = {
  'filter': 'colorElevationFilter',
  '_filter_comment': 'Custom',
};

const dataVisualizationFilter = {
  'filter': 'dataVisualizationFilter',
  '_filter_comment': 'Custom',
};

const webCssTransformGroup = {
  'transformGroup': 'webCssTransformGroup',
  '_transformGroup_comment':
    'Custom from https://amzn.github.io/style-dictionary/#/transform_groups?id=css',
};
const androidTransformGroup = {
  'transformGroup': 'androidTransformGroup',
  '_format_comment': 'Custom',
};

const iOSTransformGroup = {
  'transformGroup': 'iOSTransformGroup',
  '_transformGroup_comment':
    'Custom from https://amzn.github.io/style-dictionary/#/transform_groups?id=ios',
};
const iOSSwiftEnumTransformGroup = {
  'transformGroup': 'iOSSwiftEnumTransformGroup',
  '_transformGroup_comment':
    'Custom from https://amzn.github.io/style-dictionary/#/transform_groups?id=ios-swift-separate',
};

// HELPER FUNCTIONS

function getTheme(theme) {
  return theme === 'vr-theme' ? 'VR' : '';
}

function buildShadowValue(values, platform) {
  // destructure shadow values from original token value
  // x, y, blur, spread, color, alpha;
  // convert hex code to rgba string

  return Object.values(values)
    .map((value) => {
      const shadowColor = tinycolor(value.color);
      shadowColor.setAlpha(value.opacity);
      shadowColor.toRgbString();

      return platform === 'css'
        ? `${value.offsetX}px ${value.offsetY}px ${value.blurRadius}px ${value.spreadRadius}px ${shadowColor}`
        : `${value.offsetX}px ${value.offsetY}px ${value.blurRadius}px ${value.spreadRadius}px ${value.color} ${value.opacity}`;
    })
    .join(', ');
}

const regex = /(\{|\})/gi;
const regex1A = /(\{(?!\w)|\}(?!\w))/gi;

const commonJSFormatter = ({ token, darkTheme, isVR }) => {
  const prefix = token.filePath.split('/').splice(-1)[0].substring(0, 4);

  const isWebMappingToken = token.filePath.includes('mapping');

  return JSON.stringify({
    name:
      isVR && !isWebMappingToken
        ? [prefix, token.path.join('-').replace('base', '')].join('-')
        : token.path.join('-').replace('base', ''),
    value: token.value,
    // For lightened values with appended 1A, let's keep {value}1A if not remove the parenthesis

    // eslint-disable-next-line no-nested-ternary
    originalValue: isVR
      ? 'NA'
      : // eslint-disable-next-line no-nested-ternary
      typeof token.original.value === 'string'
      ? token.original.value.endsWith('}1A')
        ? token.original.value?.replace(regex1A, '')
        : token.original.value.replace(regex, '')
      : token.value,
    // eslint-disable-next-line no-underscore-dangle
    ...(darkTheme ? { _darkModeSupport: !token._darkMode } : {}), // For dark mode we are adding this metadada to track unsupported tokens
    comment: token.comment,
    category: token.attributes.category,
  });
};

const moduleExportFileHeader = ({ file, tokenArray, fileHeader }) =>
  `${fileHeader({ file, commentStyle: 'short' })} module.exports = [${tokenArray}]`;

function getSources({ theme, modeTheme, platform }) {
  if (theme === 'classic') {
    return [
      `tokens/classic/base-color.json`,
      `tokens/classic/base-font.json`,
      `tokens/classic/base-opacity.json`,
      `tokens/classic/base-rounding.json`,
      `tokens/classic/base-space.json`,
      `tokens/classic/sema-color${modeTheme}.json`,
      `tokens/classic/base-color-data-visualization${modeTheme}.json`,
      `tokens/classic/sema-color-data-visualization${modeTheme}.json`,
      `tokens/classic/base-elevation${modeTheme}.json`,
      ...(platform === 'web'
        ? [
            `tokens/classic/comp-web-color${modeTheme}.json`,
            `tokens/classic/comp-web-elevation${modeTheme}.json`,
            `tokens/classic/comp-web-rounding.json`,
          ]
        : []),
    ];
  }

  return [
    `tokens/vr-theme/base-color.json`,
    `tokens/vr-theme/base-font.json`,
    `tokens/vr-theme/sema-font.json`,
    `tokens/vr-theme/base-opacity.json`,
    `tokens/vr-theme/sema-opacity.json`,
    `tokens/vr-theme/base-rounding.json`,
    `tokens/vr-theme/sema-rounding.json`,
    `tokens/vr-theme/base-space.json`,
    `tokens/vr-theme/sema-space.json`,
    `tokens/vr-theme/base-elevation${modeTheme}.json`,
    `tokens/vr-theme/sema-elevation.json`,
    `tokens/vr-theme/sema-color${modeTheme}.json`,
    ...(theme === 'vr-theme-web-mapping' ? [`tokens/vr-theme-web-mapping/base-color.json`] : []),
  ];
}

// X-PLATFORM REGISTERS

// REGISTER FILE HEADERS

const { fileHeader } = StyleDictionary.formatHelpers;

StyleDictionary.registerFileHeader({
  name: 'fileHeader',
  fileHeader: (defaultMessage) => ['File is autogenerated', ...defaultMessage],
});

// REGISTER FORMATS

StyleDictionary.registerFormat({
  name: 'commonJS/classic',
  formatter: ({ dictionary, file }) => {
    const tokenArray = dictionary.allTokens.map((token) => commonJSFormatter({ token }));
    return moduleExportFileHeader({ fileHeader, file, tokenArray });
  },
});

StyleDictionary.registerFormat({
  name: 'commonJS/vr-theme',
  formatter: ({ dictionary, file }) => {
    const tokenArray = dictionary.allTokens.map((token) =>
      commonJSFormatter({ token, isVR: true }),
    );
    return moduleExportFileHeader({ fileHeader, file, tokenArray });
  },
});

StyleDictionary.registerFormat({
  name: 'darkTheme-commonJS/classic',
  formatter: ({ dictionary, file }) => {
    const tokenArray = dictionary.allTokens.map((token) =>
      commonJSFormatter({ token, darkTheme: true }),
    );

    return moduleExportFileHeader({ fileHeader, file, tokenArray });
  },
});

StyleDictionary.registerFormat({
  name: 'darkTheme-commonJS/vr-theme',
  formatter: ({ dictionary, file }) => {
    const tokenArray = dictionary.allTokens.map((token) =>
      commonJSFormatter({ token, darkTheme: true, isVR: true }),
    );

    return moduleExportFileHeader({ fileHeader, file, tokenArray });
  },
});

StyleDictionary.registerFormat({
  name: `constantLibrary-javascript/es6/classic`,
  formatter({ dictionary }) {
    const tokenDataString = dictionary.allTokens
      .map((token) => {
        let value = JSON.stringify(token.value);
        if (dictionary.usesReference(token.original.value)) {
          const refs = dictionary.getReferences(token.original.value);
          refs.forEach((ref) => {
            value = value.replace(ref.value, ref.name);
          });
        }

        const formattedTokenName = token.path.join('_').toUpperCase().replace('-', '_');

        return `export const TOKEN_${formattedTokenName} = 'var(--${token.path.join('-')})';`;
      })
      .join(`\n`);

    return `/* File is autogenerated */\n\n${tokenDataString}`;
  },
});

StyleDictionary.registerFormat({
  name: `constantLibrary-javascript/es6/vr-theme`,
  formatter({ dictionary }) {
    const tokenDataString = dictionary.allTokens
      .map((token) => {
        const prefix = token.filePath.split('/').splice(-1)[0].substring(0, 4);

        let value = JSON.stringify(token.value);
        if (dictionary.usesReference(token.original.value)) {
          const refs = dictionary.getReferences(token.original.value);
          refs.forEach((ref) => {
            value = value.replace(ref.value, ref.name);
          });
        }

        const formattedTokenNameKey = token.path
          .join('_')
          .toUpperCase()
          .replace('-', '_')
          .replace('base', '')
          .replace('BASE', '');

        const formattedTokenNameValue = token.path.join('-').replace('base', '');

        return `export const TOKEN_${prefix.toUpperCase()}_${formattedTokenNameKey} = 'var(--${prefix}-${formattedTokenNameValue})';`;
      })
      .join(`\n`);

    return `/* File is autogenerated */\n\n${tokenDataString}`;
  },
});

StyleDictionary.registerFormat({
  name: `constantLibrary-commonJS/classic`,
  formatter({ dictionary, file }) {
    const tokens = dictionary.allTokens
      .map((token) => {
        let value = JSON.stringify(token.value);
        if (dictionary.usesReference(token.original.value)) {
          const refs = dictionary.getReferences(token.original.value);
          refs.forEach((ref) => {
            value = value.replace(ref.value, ref.name);
          });
        }
        return `  TOKEN_${token.path
          .join('_')
          .toUpperCase()
          .replace('-', '_')}: 'var(--${token.path.join('-')})',`;
      })
      .join(`\n`)
      .slice(0, -1);

    const fileHeaderString = fileHeader({
      file,
      commentStyle: 'short',
    });

    return `${fileHeaderString}module.exports = Object.freeze({\n${tokens}\n})`;
  },
});

StyleDictionary.registerFormat({
  name: `constantLibrary-commonJS/vr-theme`,
  formatter({ dictionary, file }) {
    const tokens = dictionary.allTokens
      .map((token) => {
        const prefix = token.filePath.split('/').splice(-1)[0].substring(0, 4);
        let value = JSON.stringify(token.value);
        if (dictionary.usesReference(token.original.value)) {
          const refs = dictionary.getReferences(token.original.value);
          refs.forEach((ref) => {
            value = value.replace(ref.value, ref.name);
          });
        }
        return `  TOKEN_${prefix.toUpperCase()}_${token.path
          .join('_')
          .toUpperCase()
          .replace('-', '_')}: 'var(--${`${prefix}-${token.path.join('-')}`})',`;
      })
      .join(`\n`)
      .slice(0, -1);

    const fileHeaderString = fileHeader({
      file,
      commentStyle: 'short',
    });

    return `${fileHeaderString}module.exports = Object.freeze({\n${tokens}\n})`;
  },
});

// BUILD CONFIGURATION

// WEB PLATFORM

// REGISTER TRANSFORMS

StyleDictionary.registerTransform({
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

StyleDictionary.registerTransform({
  name: 'name/conflictFixing',
  type: 'name',
  matcher(prop) {
    return (
      prop.filePath.includes('vr-theme') &&
      prop.filePath.includes('base') &&
      prop.attributes.type.endsWith('base')
    );
  },
  transformer(prop) {
    return prop.name.replace('base', '');
  },
});

StyleDictionary.registerTransform({
  name: 'name/prefix/level/kebab',
  type: 'name',
  matcher(prop) {
    return prop.filePath.includes('classic') || !prop.filePath.includes('vr-theme-web-mapping');
  },
  transformer(prop) {
    const prefix = prop.filePath.split('/').splice(-1)[0].substring(0, 4);
    return prop.name.replace(/^[^_]*/, (match) => `${prefix}-${match}`);
  },
});

StyleDictionary.registerTransform({
  name: 'name/prefix/level/pascal',
  type: 'name',
  matcher(prop) {
    return !prop.filePath.includes('classic');
  },
  transformer(prop) {
    const level = prop.filePath.split('/').splice(-1)[0].substring(0, 4);
    const prefix = level.charAt(0).toUpperCase() + level.slice(1);

    return prop.name.replace(/^[^_]*/, (match) => `${prefix}${match}`);
  },
});

// REGISTER TRANSFORM GROUP
StyleDictionary.registerTransformGroup({
  name: 'webCssTransformGroup',
  transforms: [
    'attribute/cti',
    'name/cti/kebab',
    'name/conflictFixing',
    'name/prefix/level/kebab',
    'value/elevation/css',
    'color/css',
  ],
});

StyleDictionary.registerTransformGroup({
  name: 'webJsTransformGroup',
  transforms: [
    'attribute/cti',
    'name/cti/pascal',
    'name/conflictFixing',
    'name/prefix/level/pascal',
    'value/elevation/css',
    'color/hex',
  ],
});

// REGISTER FILTERS

// Filters only tokens with dark theme values
StyleDictionary.registerFilter({
  name: 'colorElevationFilter',
  matcher(token) {
    return token.attributes.category === 'color' || token.attributes.category === 'elevation';
  },
});

// Filters only tokens with data-visualization
StyleDictionary.registerFilter({
  name: 'dataVisualizationFilter',
  matcher(token) {
    return (
      token.attributes.category === 'color' &&
      ['data-visualization', 'dataviz', 'datavizbase'].includes(token.attributes.type)
    );
  },
});

function getWebConfig({ theme, mode }) {
  const modeTheme = mode === 'dark' ? '-darkTheme' : '-lightTheme';

  const mappedTheme = theme === 'vr-theme-web-mapping' ? 'vr-theme' : theme;

  return {
    'source': getSources({ theme, modeTheme, platform: 'web' }),
    'platforms': {
      'css': {
        ...webCssTransformGroup,
        'buildPath': `dist/css/${theme}/`,
        ...optionsFileHeaderOutputReferences,
        'files':
          mode === 'light'
            ? [
                {
                  'destination': 'variables.css',
                  ...cssVariables,
                },
              ]
            : [
                {
                  'destination': 'variables-dark.css',
                  ...cssVariables,
                  ...colorElevationFilter,
                },
              ],
      },
      'json': {
        ...webCssTransformGroup,
        'buildPath': `dist/json/${theme}/`,
        'files':
          mode === 'light'
            ? [
                {
                  'destination': 'variables.json',
                  ...jsonFlat,
                },
                {
                  'destination': 'variables-light.json',
                  ...jsonFlat,
                  ...colorElevationFilter,
                },
              ]
            : [
                {
                  'destination': 'variables-dark.json',
                  ...jsonFlat,
                  ...colorElevationFilter,
                },
              ],
      },
      'js': {
        'transformGroup': 'webJsTransformGroup',
        '_transformGroup_comment':
          'https://amzn.github.io/style-dictionary/#/transform_groups?id=js',
        'buildPath': `dist/js/${theme}/`,
        ...optionsFileHeader,
        'files':
          mode === 'light'
            ? [
                ...(theme === 'vr-theme'
                  ? [
                      {
                        'destination': 'constants.es.js',
                        'format': `constantLibrary-javascript/es6/${mappedTheme}`,
                        '_format_comment': 'Custom',
                      },
                      {
                        'destination': 'constants.js',
                        'format': `constantLibrary-commonJS/${mappedTheme}`,
                        '_format_comment': 'Custom',
                      },
                      {
                        'destination': 'constants.es.d.ts',
                        'format': `constantLibrary-javascript/es6/${mappedTheme}`,
                        '_format_comment': 'Custom',
                      },
                      {
                        'destination': 'constants.d.ts',
                        'format': `constantLibrary-commonJS/${mappedTheme}`,
                        '_format_comment': 'Custom',
                      },
                    ]
                  : []),
                {
                  'destination': 'tokens.js',
                  'format': `commonJS/${mappedTheme}`,
                  '_format_comment': 'Custom',
                },
                {
                  'destination': 'data-viz-tokens.js',
                  'format': `commonJS/${mappedTheme}`,
                  '_format_comment': 'Custom',
                  ...dataVisualizationFilter,
                },
              ]
            : [
                {
                  'destination': 'tokens_dark.js',
                  'format': `darkTheme-commonJS/${mappedTheme}`,
                  '_format_comment': 'Custom',
                },
                {
                  'destination': 'data-viz-tokens_dark.js',
                  'format': `darkTheme-commonJS/${mappedTheme}`,
                  '_format_comment': 'Custom',
                  ...dataVisualizationFilter,
                },
              ],
      },
    },
  };
}

// ANDROID PLATFORM

// REGISTER TRANSFORM
StyleDictionary.registerTransform({
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

StyleDictionary.registerTransform({
  name: 'name/prefix/level/snake',
  type: 'name',
  matcher(prop) {
    return !prop.filePath.includes('classic');
  },
  transformer(prop) {
    const prefix = prop.filePath.split('/').splice(-1)[0].substring(0, 4);
    return prop.name.replace(/^[^_]*/, (match) => `${prefix}_${match}`);
  },
});

// REGISTER TRANSFORM GROUP
StyleDictionary.registerTransformGroup({
  name: 'androidTransformGroup',
  transforms: [
    'attribute/cti',
    'name/cti/snake',
    'name/conflictFixing',
    'name/prefix/level/snake',
    'color/hex8android',
    'size/pxToDpOrSp',
  ],
});

function getAndroidConfiguration({ theme, mode }) {
  const modeTheme = mode === 'dark' ? '-darkTheme' : '-lightTheme';

  return {
    'source': getSources({ theme, modeTheme }),
    'platforms': {
      'android': {
        ...androidTransformGroup,
        'buildPath': `dist/android/${theme}/`,
        ...optionsFileHeaderOutputReferences,
        'files':
          mode === 'light'
            ? [
                {
                  'destination': 'colors-light.xml',
                  ...androidResources,
                  ...colorResource,
                  ...filterColor,
                },
                {
                  'destination': 'font-size.xml',
                  ...androidResources,
                  ...dimenResource,
                  ...filterFontSize,
                },
                {
                  'destination': 'font-weight.xml',
                  ...androidResources,
                  ...dimenResource,
                  ...filterFontWeight,
                },
                {
                  'destination': 'opacity.xml',
                  ...androidResources,
                  ...dimenResource,
                  ...filterOpacity,
                },
                {
                  'destination': 'rounding.xml',
                  ...androidResources,
                  ...dimenResource,
                  ...filterRounding,
                },
                {
                  'destination': 'space.xml',
                  ...androidResources,
                  ...dimenResource,
                  ...filterSpace,
                },
              ]
            : [
                {
                  'destination': 'color-dark.xml',
                  ...androidResources,
                  ...colorResource,
                  ...filterColor,
                },
              ],
      },
    },
  };
}

// IOS PLATFORM

// REGISTER TRANSFORM

StyleDictionary.registerTransform({
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

StyleDictionary.registerTransform({
  name: 'name/prefix/level/camel',
  type: 'name',
  matcher(prop) {
    return !prop.filePath.includes('classic');
  },
  transformer(prop) {
    const prefix = prop.filePath.split('/').splice(-1)[0].substring(0, 4);
    return prop.name.replace(
      /^[^_]*/,
      (match) => `${prefix}${match.charAt(0).toUpperCase() + match.slice(1)}`,
    );
  },
});

// REGISTER TRANSFORM GROUP
StyleDictionary.registerTransformGroup({
  name: 'iOSTransformGroup',
  transforms: [
    'attribute/cti',
    'name/cti/pascal',
    'name/conflictFixing',
    'name/prefix/level/pascal',
    'value/elevation/ios',
    'color/UIColor',
    'content/objC/literal',
    'asset/objC/literal',
    'size/remToPt',
    'font/objC/literal',
  ],
});

StyleDictionary.registerTransformGroup({
  name: 'iOSSwiftEnumTransformGroup',
  transforms: [
    'attribute/cti',
    'name/ti/camel',
    'name/conflictFixing',
    'name/prefix/level/camel',
    'value/elevation/ios',
    'color/UIColorSwift',
    'content/swift/literal',
    'asset/swift/literal',
    'size/swift/remToCGFloat',
    'font/swift/literal',
  ],
});

function getIOSConfiguration({ theme, mode }) {
  const modeTheme = mode === 'dark' ? '-darkTheme' : '-lightTheme';

  return {
    'source': getSources({ theme, modeTheme }),
    'platforms': {
      'ios': {
        ...iOSTransformGroup,
        'buildPath': `dist/ios/${theme}/`,
        ...optionsFileHeader,
        'files':
          mode === 'light'
            ? [
                {
                  'destination': `GestaltTokensColor${getTheme(theme)}.h`,
                  ...iosColorsH,
                  'className': `GestaltTokensColor${getTheme(theme)}`,
                  'type': `GestaltTokensColorName${getTheme(theme)}`,
                  ...filterColor,
                },
                {
                  'destination': `GestaltTokensColor${getTheme(theme)}.m`,
                  ...iosColorsM,
                  'className': `GestaltTokensColor${getTheme(theme)}`,
                  'type': `GestaltTokensColorName${getTheme(theme)}`,
                  ...filterColor,
                },
                {
                  'destination': `GestaltTokensRounding${getTheme(theme)}.h`,
                  ...iosStaticH,
                  'className': `GestaltTokensRounding${getTheme(theme)}`,
                  'type': `GestaltTokensRoundingName${getTheme(theme)}`,
                  ...filterRounding,
                },
                {
                  'destination': `GestaltTokensRounding${getTheme(theme)}.m`,
                  ...iosStaticM,
                  'className': `GestaltTokensRounding${getTheme(theme)}`,
                  'type': `GestaltTokensRoundingName${getTheme(theme)}`,
                  ...filterRounding,
                },
                {
                  'destination': `GestaltTokensSpace${getTheme(theme)}.h`,
                  ...iosStaticH,
                  'className': `GestaltTokensSpace${getTheme(theme)}`,
                  'type': `GestaltTokensSpaceName${getTheme(theme)}`,
                  ...filterSpace,
                },
                {
                  'destination': `GestaltTokensSpace${getTheme(theme)}.m`,
                  ...iosStaticM,
                  'className': `GestaltTokensSpace${getTheme(theme)}`,
                  'type': `GestaltTokensSpaceName${getTheme(theme)}`,
                  ...filterSpace,
                },
                {
                  'destination': `GestaltTokensOpacity${getTheme(theme)}.h`,
                  ...iosStaticH,
                  'className': `GestaltTokensOpacity${getTheme(theme)}`,
                  'type': `GestaltTokensOpacityName${getTheme(theme)}`,
                  ...filterOpacity,
                },
                {
                  'destination': `GestaltTokensOpacity${getTheme(theme)}.m`,
                  ...iosStaticM,
                  'className': `GestaltTokensOpacity${getTheme(theme)}`,
                  'type': `GestaltTokensOpacityName${getTheme(theme)}`,
                  ...filterOpacity,
                },
                {
                  'destination': `GestaltTokensFontSize${getTheme(theme)}.h`,
                  ...iosStaticH,
                  'className': `GestaltTokensFontSize${getTheme(theme)}`,
                  'type': `GestaltTokensFontSizeName${getTheme(theme)}`,
                  ...filterFontSize,
                },
                {
                  'destination': `GestaltTokensFontSize${getTheme(theme)}.m`,
                  ...iosStaticM,
                  'className': `GestaltTokensFontSize${getTheme(theme)}`,
                  'type': `GestaltTokensFontSizeName${getTheme(theme)}`,
                  ...filterFontSize,
                },
                {
                  'destination': `GestaltTokensFontWeight${getTheme(theme)}.h`,
                  ...iosStaticH,
                  'className': `GestaltTokensFontWeight${getTheme(theme)}`,
                  'type': `GestaltTokensFontWeightName${getTheme(theme)}`,
                  ...filterFontWeight,
                },
                {
                  'destination': `GestaltTokensFontWeight${getTheme(theme)}.m`,
                  ...iosStaticM,
                  'className': `GestaltTokensFontWeight${getTheme(theme)}`,
                  'type': `GestaltTokensFontWeightName${getTheme(theme)}`,
                  ...filterFontWeight,
                },
                {
                  'destination': `GestaltTokensFontFamily${getTheme(theme)}.h`,
                  ...iosStaticH,
                  'className': `GestaltTokensFontFamily${getTheme(theme)}`,
                  'type': `GestaltTokensFontFamilyName${getTheme(theme)}`,
                  ...filterFontFamily,
                },
                {
                  'destination': `GestaltTokensFontFamily${getTheme(theme)}.m`,
                  ...iosStaticM,
                  'className': `GestaltTokensFontFamily${getTheme(theme)}`,
                  'type': `GestaltTokensFontFamilyName${getTheme(theme)}`,
                  ...filterFontFamily,
                },
                {
                  'destination': `GestaltTokensElevation${getTheme(theme)}.h`,
                  ...iosStaticH,
                  'className': `GestaltTokensElevation${getTheme(theme)}`,
                  'type': `GestaltTokensElevation${getTheme(theme)}`,
                  ...filterElevation,
                },
                {
                  'destination': `GestaltTokensElevation${getTheme(theme)}.m`,
                  ...iosStaticM,
                  'className': `GestaltTokensElevation${getTheme(theme)}`,
                  'type': `GestaltTokensElevation${getTheme(theme)}`,
                  ...filterElevation,
                },
              ]
            : [
                {
                  'destination': `GestaltTokensColorDark${getTheme(theme)}.h`,
                  ...iosColorsH,
                  'className': `GestaltTokensColor${getTheme(theme)}`,
                  'type': `GestaltTokensColorName${getTheme(theme)}`,
                  ...filterColor,
                },
                {
                  'destination': `GestaltTokensColorDark${getTheme(theme)}.m`,
                  ...iosColorsM,
                  'className': `GestaltTokensColor${getTheme(theme)}`,
                  'type': `GestaltTokensColorName${getTheme(theme)}`,
                  ...filterColor,
                },
                {
                  'destination': `GestaltTokensElevationDark${getTheme(theme)}.h`,
                  ...iosStaticH,
                  'className': `GestaltTokensElevationDark${getTheme(theme)}`,
                  'type': `GestaltTokensElevationDark${getTheme(theme)}`,
                  ...filterElevation,
                },
                {
                  'destination': `GestaltTokensElevationDark${getTheme(theme)}.m`,
                  ...iosStaticM,
                  'className': `GestaltTokensElevationDark${getTheme(theme)}`,
                  'type': `GestaltTokensElevationDark${getTheme(theme)}`,
                  ...filterElevation,
                },
              ],
      },
      'ios-swift': {
        ...iOSSwiftEnumTransformGroup,
        'buildPath': `dist/ios-swift/${theme}/`,
        ...optionsFileHeaderOutputReferences,
        'files':
          mode === 'light'
            ? [
                {
                  'destination': `GestaltTokensColor${getTheme(theme)}.swift`,
                  ...iosSwiftEnumSwift,
                  'className': `GestaltTokensColor${getTheme(theme)}`,
                  ...filterColor,
                },
                {
                  'destination': `GestaltTokensRounding${getTheme(theme)}.swift`,
                  ...iosSwiftEnumSwift,
                  'className': `GestaltTokensRounding${getTheme(theme)}`,
                  ...filterRounding,
                },
                {
                  'destination': `GestaltTokensSpace${getTheme(theme)}.swift`,
                  ...iosSwiftEnumSwift,
                  'className': `GestaltTokensSpace${getTheme(theme)}`,
                  ...filterSpace,
                },
                {
                  'destination': `GestaltTokensOpacity${getTheme(theme)}.swift`,
                  ...iosSwiftEnumSwift,
                  'className': `GestaltTokensOpacity${getTheme(theme)}`,
                  ...filterOpacity,
                },
                {
                  'destination': `GestaltTokensElevation${getTheme(theme)}.swift`,
                  ...iosSwiftEnumSwift,
                  'className': `GestaltTokensElevation${getTheme(theme)}`,
                  ...filterElevation,
                },
                {
                  'destination': `GestaltTokensFontWeight${getTheme(theme)}.swift`,
                  ...iosSwiftEnumSwift,
                  'className': `GestaltTokensFontWeight${getTheme(theme)}`,
                  ...filterFontWeight,
                },
                {
                  'destination': `GestaltTokensFontSize${getTheme(theme)}.swift`,
                  ...iosSwiftEnumSwift,
                  'className': `GestaltTokensFontSize${getTheme(theme)}`,
                  ...filterFontSize,
                },
                {
                  'destination': `GestaltTokensFontFamily${getTheme(theme)}.swift`,
                  ...iosSwiftEnumSwift,
                  'className': `GestaltTokensFontFamily${getTheme(theme)}`,
                  ...filterFontFamily,
                },
              ]
            : [
                {
                  'destination': `GestaltTokensColorDark${getTheme(theme)}.swift`,
                  ...iosSwiftEnumSwift,
                  'className': `GestaltTokensColor${getTheme(theme)}`,
                  ...filterColor,
                },
                {
                  'destination': `GestaltTokensElevationDark${getTheme(theme)}.swift`,
                  ...iosSwiftEnumSwift,
                  'className': `GestaltTokensElevationDark${getTheme(theme)}`,
                  ...filterElevation,
                },
              ],
      },
    },
  };
}

// BUILD EXECUTION

const platformFileMap = {
  web: ['css', 'json', 'js'],
  android: ['android'],
  ios: ['ios', 'ios-swift'],
};

['classic', 'vr-theme', 'vr-theme-web-mapping'].forEach((theme) =>
  ['light', 'dark'].forEach((mode) => {
    // iOS platform
    if (theme !== 'vr-theme-web-mapping') {
      const StyleDictionaryIOS = StyleDictionary.extend(getIOSConfiguration({ mode, theme }));
      platformFileMap.ios.forEach((platform) => StyleDictionaryIOS.buildPlatform(platform));

      // // Android platform
      const StyleDictionaryAndroid = StyleDictionary.extend(
        getAndroidConfiguration({ mode, theme }),
      );
      platformFileMap.android.forEach((platform) => StyleDictionaryAndroid.buildPlatform(platform));
    }

    // web platform
    const StyleDictionaryWeb = StyleDictionary.extend(getWebConfig({ mode, theme }));
    platformFileMap.web.forEach((platform) => StyleDictionaryWeb.buildPlatform(platform));
  }),
);
