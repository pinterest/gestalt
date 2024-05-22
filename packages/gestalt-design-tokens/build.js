const StyleDictionary = require('style-dictionary');
const tinycolor = require('tinycolor2');

// HELPER FUNCTIONS

function nameOutputFile({ name, theme }) {
  if (theme) return name;
  return name;
}

function buildShadowValue(values) {
  // destructure shadow values from original token value
  // x, y, blur, spread, color, alpha;
  // convert hex code to rgba string

  return Object.values(values)
    .map((value) => {
      const shadowColor = tinycolor(value.color);
      shadowColor.setAlpha(value.opacity);
      shadowColor.toRgbString();

      return `${value.offsetX}px ${value.offsetY}px ${value.blurRadius}px ${value.spreadRadius}px ${shadowColor}`;
    })
    .join(', ');
}

const regex = /(\{|\})/gi;
const regex1A = /(\{(?!\w)|\}(?!\w))/gi;

const commonJSFormatter = ({ token, darkTheme }) =>
  JSON.stringify({
    name: token.path.join('-'),
    value: token.value,
    // For lightened values with appended 1A, let's keep {value}1A if not remove the parenthesis
    originalValue:
      // eslint-disable-next-line no-nested-ternary
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

const moduleExportFileHeader = ({ file, tokenArray, fileHeader }) =>
  `${fileHeader({ file, commentStyle: 'short' })} module.exports = [${tokenArray}]`;

function getSources({ theme, modeTheme, platform }) {
  if (theme === 'classic') {
    return [
      `tokens/${theme}/base-color.json`,
      `tokens/${theme}/base-font.json`,
      `tokens/${theme}/base-opacity.json`,
      `tokens/${theme}/base-rounding.json`,
      `tokens/${theme}/base-space.json`,
      `tokens/${theme}/sema-color${modeTheme}.json`,
      `tokens/${theme}/base-color-data-visualization${modeTheme}.json`,
      `tokens/${theme}/sema-color-data-visualization${modeTheme}.json`,

      ...(platform === 'web'
        ? [
            `tokens/${theme}/base-elevation${modeTheme}.json`,
            `tokens/${theme}/comp-web-color${modeTheme}.json`,
            `tokens/${theme}/comp-web-elevation${modeTheme}.json`,
            `tokens/${theme}/comp-web-rounding.json`,
          ]
        : []),
    ];
  }

  return [
    `tokens/${theme}/base-color.json`,
    `tokens/${theme}/base-font.json`,
    `tokens/${theme}/sema-font.json`,
    `tokens/${theme}/base-opacity.json`,
    `tokens/${theme}/sema-opacity.json`,
    `tokens/${theme}/base-rounding.json`,
    `tokens/${theme}/sema-rounding.json`,
    `tokens/${theme}/base-space.json`,
    `tokens/${theme}/sema-space.json`,
    `tokens/${theme}/base-elevation${modeTheme}.json`,
    `tokens/${theme}/sema-elevation.json`,
    `tokens/${theme}/sema-color${modeTheme}.json`,
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
  name: 'commonJS',
  formatter: ({ dictionary, file }) => {
    const tokenArray = dictionary.allTokens.map((token) => commonJSFormatter({ token }));
    return moduleExportFileHeader({ fileHeader, file, tokenArray });
  },
});

StyleDictionary.registerFormat({
  name: 'darkTheme-commonJS',
  formatter: ({ dictionary, file }) => {
    const tokenArray = dictionary.allTokens.map((token) =>
      commonJSFormatter({ token, darkTheme: true }),
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

        const formattedTokenName = token.path.join('_').toUpperCase().replace('-', '_');

        return `export const TOKEN_${prefix.toUpperCase()}_${formattedTokenName} = 'var(--${prefix}-${token.path.join(
          '-',
        )})';`;
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

    return buildShadowValue(prop.value);
  },
});

StyleDictionary.registerTransform({
  name: 'name/prefix/level/kebab',
  type: 'name',
  matcher(prop) {
    return !prop.filePath.includes('classic');
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
    'value/elevation/css',
    'name/cti/kebab',
    'name/prefix/level/kebab',
    'color/css',
  ],
});

StyleDictionary.registerTransformGroup({
  name: 'webJsTransformGroup',
  transforms: [
    'attribute/cti',
    'value/elevation/css',
    'name/cti/pascal',
    'name/prefix/level/pascal',
    'color/hex',
  ],
});

// REGISTER FILTERS

// Filters only tokens with dark theme values
StyleDictionary.registerFilter({
  name: 'darkThemeFilter',
  matcher(token) {
    return token.attributes.category === 'color' || token.attributes.category === 'elevation';
  },
});

// Filters only tokens with data-visualization
StyleDictionary.registerFilter({
  name: 'dataVisualizationFilter',
  matcher(token) {
    return token.attributes.category === 'color' && token.attributes.type === 'data-visualization';
  },
});

function getWebConfig({ theme = 'classic', mode = 'light' }) {
  const modeTheme = mode === 'dark' ? '-darkTheme' : '-lightTheme';

  return {
    'source': getSources({ theme, modeTheme, platform: 'web' }),
    'platforms': {
      'css': {
        'transformGroup': 'webCssTransformGroup',
        '_transformGroup_comment':
          'https://amzn.github.io/style-dictionary/#/transform_groups?id=css',
        'buildPath': `dist/css/${theme}/`,
        'files':
          mode === 'light'
            ? [
                {
                  'destination': nameOutputFile({ name: 'variables.css', theme }),
                  'format': 'css/variables',
                  '_format_comment':
                    'https://amzn.github.io/style-dictionary/#/formats?id=cssvariables',
                  'options': {
                    'fileHeader': 'fileHeader',
                    '_fileHeader_comment': 'Custom',
                    'showFileHeader': true,
                    'outputReferences': true,
                  },
                },
              ]
            : [
                {
                  'destination': nameOutputFile({ name: 'variables-dark.css', theme }),
                  'format': 'css/variables',
                  '_format_comment': 'Custom',
                  'filter': 'darkThemeFilter',
                  '_filter_comment': 'Custom',
                  'options': {
                    'fileHeader': 'fileHeader',
                    '_fileHeader_comment': 'Custom',
                    'showFileHeader': true,
                    'outputReferences': true,
                  },
                },
              ],
      },
      'json': {
        'transformGroup': 'webCssTransformGroup',
        '_transformGroup_comment':
          'https://amzn.github.io/style-dictionary/#/transform_groups?id=css',
        'buildPath': `dist/json/${theme}/`,
        'files':
          mode === 'light'
            ? [
                {
                  'destination': nameOutputFile({ name: 'variables.json', theme }),
                  'format': 'json/flat',
                  '_format_comment':
                    'https://amzn.github.io/style-dictionary/#/formats?id=jsonflat',
                },
                {
                  'destination': nameOutputFile({ name: 'variables-light.json', theme }),
                  'format': 'json/flat',
                  '_format_comment':
                    'https://amzn.github.io/style-dictionary/#/formats?id=jsonflat',
                  'filter': 'darkThemeFilter',
                  '_filter_comment': 'Custom',
                },
              ]
            : [
                {
                  'destination': nameOutputFile({ name: 'variables-dark.json', theme }),
                  'format': 'json/flat',
                  '_format_comment': 'Custom',
                  'filter': 'darkThemeFilter',
                  '_filter_comment': 'Custom',
                },
              ],
      },
      'js': {
        'transformGroup': 'webJsTransformGroup',
        '_transformGroup_comment':
          'https://amzn.github.io/style-dictionary/#/transform_groups?id=js',
        'buildPath': `dist/js/${theme}/`,
        'options': {
          'showFileHeader': true,
          'fileHeader': 'fileHeader',
          '_fileHeader_comment': 'Custom',
        },
        'files':
          mode === 'light'
            ? [
                {
                  'destination': 'constants.es.js',
                  'format': `constantLibrary-javascript/es6/${theme}`,
                  '_format_comment': 'Custom',
                },
                {
                  'destination': 'constants.js',
                  'format': `constantLibrary-commonJS/${theme}`,
                  '_format_comment': 'Custom',
                },
                {
                  'destination': 'constants.es.d.ts',
                  'format': `constantLibrary-javascript/es6/${theme}`,
                  '_format_comment': 'Custom',
                },
                {
                  'destination': 'constants.d.ts',
                  'format': `constantLibrary-commonJS/${theme}`,
                  '_format_comment': 'Custom',
                },
                ...(theme === 'classic'
                  ? [
                      {
                        'destination': nameOutputFile({ name: 'tokens.js', theme }),
                        'format': 'commonJS',
                        '_format_comment': 'Custom',
                      },
                      {
                        'destination': nameOutputFile({ name: 'data-viz-tokens.js', theme }),
                        'format': 'commonJS',
                        '_format_comment': 'Custom',
                        'filter': 'dataVisualizationFilter',
                        '_filter_comment': 'Custom',
                      },
                    ]
                  : []),
              ]
            : [
                ...(theme === 'classic'
                  ? [
                      {
                        'destination': nameOutputFile({ name: 'tokens_dark.js', theme }),
                        'format': 'darkTheme-commonJS',
                        '_format_comment': 'Custom',
                      },
                    ]
                  : []),
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
    'name/prefix/level/snake',
    'color/hex8android',
    'size/pxToDpOrSp',
  ],
});

function getAndroidConfiguration({ theme = 'main-theme', mode = 'light' }) {
  const modeTheme = mode === 'dark' ? '-darkTheme' : '-lightTheme';

  return {
    'source': getSources({ theme, modeTheme }),
    'platforms': {
      'android': {
        'transformGroup': 'androidTransformGroup',
        '_format_comment': 'Custom',
        'buildPath': `dist/android/${theme}/`,
        'options': {
          'showFileHeader': true,
          'fileHeader': 'fileHeader',
          '_fileHeader_comment': 'Custom',
        },
        'files':
          mode === 'light'
            ? [
                {
                  'destination': nameOutputFile({ name: 'colors-light.xml', theme }),
                  'format': 'android/resources',
                  '_format_comment':
                    'https://amzn.github.io/style-dictionary/#/formats?id=androidresources',
                  'resourceType': 'color',
                  'filter': {
                    'attributes': {
                      'category': 'color',
                    },
                  },
                  'options': {
                    'outputReferences': true,
                  },
                },
                {
                  'destination': 'font-size.xml',
                  'format': 'android/resources',
                  '_format_comment':
                    'https://amzn.github.io/style-dictionary/#/formats?id=androidresources',
                  'resourceType': 'dimen',
                  'filter': {
                    'attributes': {
                      'category': 'font',
                      'type': 'size',
                    },
                  },
                  'options': {
                    'outputReferences': true,
                  },
                },
                {
                  'destination': 'font-weight.xml',
                  'format': 'android/resources',
                  '_format_comment':
                    'https://amzn.github.io/style-dictionary/#/formats?id=androidresources',
                  'resourceType': 'dimen',
                  'filter': {
                    'attributes': {
                      'category': 'font',
                      'type': 'weight',
                    },
                  },
                  'options': {
                    'outputReferences': true,
                  },
                },
                {
                  'destination': 'opacity.xml',
                  'format': 'android/resources',
                  '_format_comment':
                    'https://amzn.github.io/style-dictionary/#/formats?id=androidresources',
                  'resourceType': 'dimen',
                  'filter': {
                    'attributes': {
                      'category': 'opacity',
                    },
                  },
                  'options': {
                    'outputReferences': true,
                  },
                },
                {
                  'destination': 'rounding.xml',
                  'format': 'android/resources',
                  '_format_comment':
                    'https://amzn.github.io/style-dictionary/#/formats?id=androidresources',
                  'resourceType': 'dimen',
                  'filter': {
                    'attributes': {
                      'category': 'rounding',
                    },
                  },
                  'options': {
                    'outputReferences': true,
                  },
                },
                {
                  'destination': 'space.xml',
                  'format': 'android/resources',
                  '_format_comment':
                    'https://amzn.github.io/style-dictionary/#/formats?id=androidresources',
                  'resourceType': 'dimen',
                  'filter': {
                    'attributes': {
                      'category': 'space',
                    },
                  },
                  'options': {
                    'outputReferences': true,
                  },
                },
              ]
            : [
                {
                  'destination': nameOutputFile({ name: 'color-dark.xml', theme }),
                  'format': 'android/resources',
                  '_format_comment':
                    'https://amzn.github.io/style-dictionary/#/formats?id=androidresources',
                  'resourceType': 'color',
                  'filter': {
                    'attributes': {
                      'category': 'color',
                    },
                  },
                  'options': {
                    'outputReferences': true,
                  },
                },
              ],
      },
    },
  };
}

// IOS PLATFORM

// REGISTER TRANSFORM
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
    'name/prefix/level/pascal',
    'color/UIColor',
    'content/objC/literal',
    'asset/objC/literal',
    'size/remToPt',
    'font/objC/literal',
  ],
});

StyleDictionary.registerTransformGroup({
  name: 'iOSSwiftTransformGroup',
  transforms: [
    'attribute/cti',
    'name/cti/camel',
    'name/prefix/level/camel',
    'color/UIColorSwift',
    'content/swift/literal',
    'asset/swift/literal',
    'size/swift/remToCGFloat',
    'font/swift/literal',
  ],
});

StyleDictionary.registerTransformGroup({
  name: 'iOSSwiftEnumTransformGroup',
  transforms: [
    'attribute/cti',
    'name/ti/camel',
    'name/prefix/level/camel',
    'color/UIColorSwift',
    'content/swift/literal',
    'asset/swift/literal',
    'size/swift/remToCGFloat',
    'font/swift/literal',
  ],
});

function getIOSConfiguration({ theme = 'main-theme', mode = 'light' }) {
  const modeTheme = mode === 'dark' ? '-darkTheme' : '-lightTheme';

  return {
    'source': getSources({ theme, modeTheme }),
    'platforms': {
      'ios': {
        'transformGroup': 'iOSTransformGroup',
        '_transformGroup_comment':
          'Custom from https://amzn.github.io/style-dictionary/#/transform_groups?id=ios',
        'buildPath': `dist/ios/${theme}/`,
        'files':
          mode === 'light'
            ? [
                {
                  'destination': 'GestaltDesignTokensColor.h',
                  'format': 'ios/colors.h',
                  '_format_comment':
                    'https://amzn.github.io/style-dictionary/#/formats?id=ioscolorsh',
                  'className': 'GestaltDesignTokensColor',
                  'type': 'GestaltDesignTokensColorName',
                  'filter': {
                    'attributes': {
                      'category': 'color',
                    },
                  },
                  'options': {
                    'fileHeader': 'fileHeader',
                    '_fileHeader_comment': 'Custom',
                    'showFileHeader': true,
                  },
                },
                {
                  'destination': 'GestaltDesignTokensColor.m',
                  'format': 'ios/colors.m',
                  '_format_comment':
                    'https://amzn.github.io/style-dictionary/#/formats?id=ioscolorsm',
                  'className': 'GestaltDesignTokensColor',
                  'type': 'GestaltDesignTokensColorName',
                  'filter': {
                    'attributes': {
                      'category': 'color',
                    },
                  },
                  'options': {
                    'fileHeader': 'fileHeader',
                    '_fileHeader_comment': 'Custom',
                    'showFileHeader': true,
                  },
                },
              ]
            : [
                {
                  'destination': 'GestaltDesignTokensColorDarkTheme.h',
                  'format': 'ios/colors.h',
                  '_format_comment':
                    'https://amzn.github.io/style-dictionary/#/formats?id=ioscolorsh',
                  'className': 'GestaltDesignTokensColor',
                  'type': 'GestaltDesignTokensColorName',
                  'filter': {
                    'attributes': {
                      'category': 'color',
                    },
                  },
                  'options': {
                    'fileHeader': 'fileHeader',
                    '_fileHeader_comment': 'Custom',
                    'showFileHeader': true,
                  },
                },
                {
                  'destination': 'GestaltDesignTokensColorDarkTheme.m',
                  'format': 'ios/colors.m',
                  '_format_comment':
                    'https://amzn.github.io/style-dictionary/#/formats?id=ioscolorsm',
                  'className': 'GestaltDesignTokensColor',
                  'type': 'GestaltDesignTokensColorName',
                  'filter': {
                    'attributes': {
                      'category': 'color',
                    },
                  },
                  'options': {
                    'fileHeader': 'fileHeader',
                    '_fileHeader_comment': 'Custom',
                    'showFileHeader': true,
                  },
                },
              ],
      },
      'ios-swift': {
        'transformGroup': 'iOSSwiftTransformGroup',
        '_transformGroup_comment':
          'Custom from https://amzn.github.io/style-dictionary/#/transform_groups?id=ios-swift',
        'buildPath': `dist/ios-swift/${theme}/`,
        'files':
          mode === 'light'
            ? [
                {
                  'destination': 'GestaltDesignTokens.swift',
                  'format': 'ios-swift/class.swift',
                  '_format_comment':
                    'https://amzn.github.io/style-dictionary/#/formats?id=ios-swiftclassswift',
                  'className': 'GestaltDesignTokens',
                  'options': {
                    'fileHeader': 'fileHeader',
                    '_fileHeader_comment': 'Custom',
                    'showFileHeader': true,
                  },
                },
              ]
            : [
                {
                  'destination': 'GestaltDesignTokensDarkTheme.swift',
                  'format': 'ios-swift/class.swift',
                  '_format_comment':
                    'https://amzn.github.io/style-dictionary/#/formats?id=ios-swiftclassswift',
                  'className': 'GestaltDesignTokens',
                  'options': {
                    'fileHeader': 'fileHeader',
                    '_fileHeader_comment': 'Custom',
                    'showFileHeader': true,
                  },
                },
              ],
      },
      'ios-swift-separate-enums': {
        'transformGroup': 'iOSSwiftEnumTransformGroup',
        '_transformGroup_comment':
          'Custom from https://amzn.github.io/style-dictionary/#/transform_groups?id=ios-swift-separate',
        'buildPath': `dist/ios-swift/${theme}/`,
        'files': [
          {
            'destination':
              mode === 'light'
                ? 'GestaltDesignTokensColor.swift'
                : 'GestaltDesignTokensColorDarkTheme.swift',
            'format': 'ios-swift/enum.swift',
            '_format_comment':
              'https://amzn.github.io/style-dictionary/#/formats?id=ios-swiftenumswift',
            'className': 'GestaltDesignTokensColor',
            'filter': {
              'attributes': {
                'category': 'color',
              },
            },
            'options': {
              'fileHeader': 'fileHeader',
              '_fileHeader_comment': 'Custom',
              'showFileHeader': true,
            },
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
  ios: ['ios', 'ios-swift', 'ios-swift-separate-enums'],
};

['classic', 'vr-theme'].forEach((theme) =>
  ['light', 'dark'].forEach((mode) => {
    // iOS platform
    const StyleDictionaryIOS = StyleDictionary.extend(getIOSConfiguration({ mode, theme }));
    platformFileMap.ios.forEach((platform) => StyleDictionaryIOS.buildPlatform(platform));

    // // Android platform
    const StyleDictionaryAndroid = StyleDictionary.extend(getAndroidConfiguration({ mode, theme }));
    platformFileMap.android.forEach((platform) => StyleDictionaryAndroid.buildPlatform(platform));

    // web platform
    const StyleDictionaryWeb = StyleDictionary.extend(getWebConfig({ mode, theme }));
    platformFileMap.web.forEach((platform) => StyleDictionaryWeb.buildPlatform(platform));
  }),
);
