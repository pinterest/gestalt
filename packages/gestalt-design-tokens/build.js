// @flow strict
const StyleDictionary = require('style-dictionary');

// HELPERS

// $FlowFixMe[missing-local-annot]
const getTokenSourcePaths = ({ theme, modeTheme, platform }) => {
  const paths = [
    `tokens/color/${theme}/base.json`,
    `tokens/color/${theme}/sema${modeTheme}.json`,
    `tokens/elevation/${theme}/base${modeTheme}.json`,
    `tokens/elevation/${theme}/sema.json`,
    `tokens/font/${theme}/base.json`,
    `tokens/font/${theme}/sema.json`,
    `tokens/space/${theme}/base.json`,
    `tokens/space/${theme}/sema.json`,
    `tokens/opacity/${theme}/base.json`,
    `tokens/opacity/${theme}/sema.json`,
    `tokens/rounding/${theme}/base.json`,
    `tokens/rounding/${theme}/sema.json`,
    ...(theme === 'classic'
      ? [
          `tokens/color/classic/data-visualization/base${modeTheme}.json`,
          `tokens/color/classic/data-visualization/sema${modeTheme}.json`,
        ]
      : []),
    ...(theme === 'classic' && platform === 'web'
      ? [`tokens/color/classic/component${modeTheme}.json`]
      : []),
  ];
  return paths;
};

// $FlowFixMe[missing-local-annot]
function nameOutputFile({ name, theme }) {
  const filePrefix = theme === 'classic' ? '' : `${theme.split('-')[0]}`;
  return `${filePrefix}/${name}`;
}

// $FlowFixMe[missing-local-annot]
function formatFlowTypes(dictionaryTokens) {
  return `// @flow strict\n/* File is autogenerated */\n\ndeclare module.exports: {|\n${dictionaryTokens
    .map((token) => `  +"${token.name}": ${JSON.stringify(token.value)}`)
    .join(',\n')}\n|}`;
}

const regex = /(\{|\})/gi;
const regex1A = /(\{(?!\w)|\}(?!\w))/gi;

// $FlowFixMe[missing-local-annot]
const commonJSFlowFormatter = ({ token, darkTheme }) =>
  JSON.stringify({
    name: token.path.join('-'),
    value: token.value,
    // For lightened values with appended 1A, let's keep {value}1A if not remove the parenthesis
    originalValue: token.original.value.endsWith('}1A')
      ? token.original.value?.replace(regex1A, '')
      : token.original.value.replace(regex, ''),
    // eslint-disable-next-line no-underscore-dangle
    ...(darkTheme ? { _darkModeSupport: !token._darkMode } : {}), // For dark mode we are adding this metadada to track unsupported tokens
    comment: token.comment,
    category: token.attributes.category,
  });

// $FlowFixMe[missing-local-annot]
const moduleExportFileHeader = ({ file, tokenArray, fileHeader }) =>
  `${fileHeader({ file, commentStyle: 'short' })} module.exports = [${tokenArray}]`;

// REGISTER FILE HEADERS

const { fileHeader } = StyleDictionary.formatHelpers;

StyleDictionary.registerFileHeader({
  name: 'fileHeader',
  // defaultMessage contains the 2 lines that appear in the default file header
  fileHeader: (defaultMessage) => ['File is autogenerated', ...defaultMessage],
});

StyleDictionary.registerFileHeader({
  name: 'flowFileHeader',
  // defaultMessage contains the 2 lines that appear in the default file header
  fileHeader: (defaultMessage) => ['@flow strict \n// File is autogenerated', ...defaultMessage],
});

StyleDictionary.registerFileHeader({
  name: 'androidFileHeader',
  fileHeader: (defaultMessage) => ['File is autogenerated', ...defaultMessage],
});

// REGISTER FORMATS

StyleDictionary.registerFormat({
  name: 'commonJS/flow',
  formatter: ({ dictionary, file }) => {
    const tokenArray = dictionary.allTokens.map((token) => commonJSFlowFormatter({ token }));
    return moduleExportFileHeader({ fileHeader, file, tokenArray });
  },
});

StyleDictionary.registerFormat({
  name: 'darkTheme-commonJS/flow',
  formatter: ({ dictionary, file }) => {
    const tokenArray = dictionary.allTokens.map((token) =>
      commonJSFlowFormatter({ token, darkTheme: true }),
    );

    return moduleExportFileHeader({ fileHeader, file, tokenArray });
  },
});

StyleDictionary.registerFormat({
  name: 'javascript/es6/flow',
  // https://amzn.github.io/style-dictionary/#/formats?id=javascriptes6
  formatter: ({ dictionary }) =>
    `// @flow strict\n\n${StyleDictionary.format['javascript/es6']({
      dictionary,
    })}`,
});

StyleDictionary.registerFormat({
  name: 'json/flat/flow',
  formatter: ({ dictionary }) => formatFlowTypes(dictionary.allTokens),
});

StyleDictionary.registerFormat({
  name: `constantLibrary-javascript/es6/flow`,
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

    return `// @flow strict\n\n/* File is autogenerated */\n\n${tokenDataString}`;
  },
});

StyleDictionary.registerFormat({
  name: `constantLibrary-javascript/es6/ts`,
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
  name: `constantLibrary-commonJS/flow`,
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

// REGISTER TRANSFORMS

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

// $FlowFixMe[missing-local-annot]
function getMatchedThemeName(filePath) {
  const regexa = /(.*\/)(.*)(-theme\/.*)/;
  const matchedThemeName = filePath.match(regexa);

  return matchedThemeName && matchedThemeName.length > 2 ? matchedThemeName[2] : '';
}

StyleDictionary.registerTransform({
  name: 'name/prefix/level/css',
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
  name: 'name/prefix/level/ts',
  type: 'name',
  matcher(prop) {
    return !prop.filePath.includes('classic');
  },
  transformer(prop) {
    const prefix = prop.filePath.split('/').splice(-1)[0].substring(0, 4);
    return prop.name.replace(/^[^_]*/, (match) => `${prefix}${match}`);
  },
});

StyleDictionary.registerTransform({
  name: 'name/prefix/theme',
  type: 'name',
  matcher(prop) {
    return prop.filePath.includes('theme') && !prop.filePath.includes('classic');
  },
  transformer(prop) {
    const prefix = getMatchedThemeName(prop.filePath);
    return prop.name.replace(/^[^_]*/, (match) => `${prefix}_${match}`);
  },
});

// REGISTER TRANSFORM GROUPS
StyleDictionary.registerTransformGroup({
  name: 'webCssTransformGroup',
  transforms: ['attribute/cti', 'name/cti/kebab', 'name/prefix/level/css', 'color/css'],
});

StyleDictionary.registerTransformGroup({
  name: 'webTsTransformGroup',
  transforms: ['attribute/cti', 'name/cti/pascal', 'name/prefix/level/ts', 'color/hex'],
});

StyleDictionary.registerTransformGroup({
  name: 'androidTransformGroup',
  transforms: [
    'attribute/cti',
    'name/cti/snake',
    'name/prefix/theme',
    'color/hex8android',
    'size/pxToDpOrSp',
  ],
});

// BUILD CONFIGURATION

// $FlowFixMe[missing-local-annot]
function getWebConfig({ mode = 'light', theme }) {
  const modeTheme = mode === 'dark' ? '-darkTheme' : '-lightTheme';

  const sourcePaths = getTokenSourcePaths({ theme, modeTheme, platform: 'web' });

  console.log(sourcePaths);

  return {
    'source': sourcePaths,
    'platforms': {
      'css': {
        'transformGroup': 'webCssTransformGroup',
        '_format_comment':
          'Custom from https://amzn.github.io/style-dictionary/#/transform_groups?id=css',
        'buildPath': 'dist/css/',
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
                    '_fileHeader_comment': 'Custom.',
                    'showFileHeader': true,
                    'outputReferences': true,
                  },
                },
              ]
            : [
                {
                  'destination': nameOutputFile({ name: 'variables-dark.css', theme }),
                  'format': 'css/variables',
                  '_format_comment': 'Custom.',
                  'filter': 'darkThemeFilter',
                  '_filter_comment': 'Custom.',
                  'options': {
                    'fileHeader': 'fileHeader',
                    '_fileHeader_comment': 'Custom.',
                    'showFileHeader': true,
                    'outputReferences': true,
                  },
                },
              ],
      },
      'json': {
        'transformGroup': 'webCssTransformGroup',
        '_format_comment':
          'Custom from https://amzn.github.io/style-dictionary/#/transform_groups?id=css',
        'buildPath': 'dist/json/',
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
                  '_filter_comment': 'Custom.',
                },
              ]
            : [
                {
                  'destination': nameOutputFile({ name: 'variables-dark.json', theme }),
                  'format': 'json/flat',
                  '_format_comment': 'Custom.',
                  'filter': 'darkThemeFilter',
                  '_filter_comment': 'Custom.',
                },
              ],
      },
      'jsonflow': {
        'transformGroup': 'webCssTransformGroup',
        '_format_comment':
          'Custom from https://amzn.github.io/style-dictionary/#/transform_groups?id=css',
        'buildPath': 'dist/json/',
        'files':
          mode === 'light'
            ? [
                {
                  'destination': nameOutputFile({ name: 'variables.json.flow', theme }),
                  'format': 'json/flat/flow',
                  '_format_comment': 'Custom.',
                },
                {
                  'destination': nameOutputFile({ name: 'variables-light.json.flow', theme }),
                  'format': 'json/flat/flow',
                  '_format_comment': 'Custom.',
                  'filter': 'darkThemeFilter',
                  '_filter_comment': 'Custom.',
                },
              ]
            : [
                {
                  'destination': nameOutputFile({ name: 'variables-dark.json.flow', theme }),
                  'format': 'json/flat/flow',
                  '_format_comment': 'Custom.',
                  'filter': 'darkThemeFilter',
                  '_filter_comment': 'Custom.',
                },
              ],
      },
      'js': {
        'transformGroup': 'webTsTransformGroup',
        '_transformGroup_comment':
          'Custom from https://amzn.github.io/style-dictionary/#/transform_groups?id=js',
        'buildPath': 'dist/js/',
        'options': {
          'showFileHeader': true,
          'fileHeader': 'flowFileHeader',
          '_fileHeader_comment': 'Custom.',
        },
        'files':
          mode === 'light'
            ? [
                {
                  'destination': nameOutputFile({ name: 'constants.es.js', theme }),
                  'format': 'constantLibrary-javascript/es6/flow',
                  '_format_comment': 'Custom.',
                },
                {
                  'destination': nameOutputFile({ name: 'constants.js', theme }),
                  'format': 'constantLibrary-commonJS/flow',
                  '_format_comment': 'Custom.',
                },
                {
                  'destination': nameOutputFile({ name: 'tokens.js', theme }),
                  'format': 'commonJS/flow',
                  '_format_comment': 'Custom.',
                },
                {
                  'destination': nameOutputFile({ name: 'tokens_individual.js', theme }),
                  'format': 'javascript/es6/flow',
                  '_format_comment': 'Custom.',
                },
                {
                  'destination': nameOutputFile({ name: 'data-viz-tokens.js', theme }),
                  'format': 'commonJS/flow',
                  '_format_comment': 'Custom.',
                  'filter': 'dataVisualizationFilter',
                  '_filter_comment': 'Custom.',
                },
                {
                  'destination': nameOutputFile({ name: 'data-viz-tokens_individual.js', theme }),
                  'format': 'javascript/es6/flow',
                  '_format_comment': 'Custom.',
                  'filter': 'dataVisualizationFilter',
                  '_filter_comment': 'Custom.',
                },
              ]
            : [
                {
                  'destination': nameOutputFile({ name: 'tokens_dark.js', theme }),
                  'format': 'darkTheme-commonJS/flow',
                  '_format_comment': 'Custom.',
                },
                {
                  'destination': nameOutputFile({ name: 'tokens_individual_dark.js', theme }),
                  'format': 'javascript/es6/flow',
                  '_format_comment': 'Custom.',
                },
                {
                  'destination': nameOutputFile({ name: 'data-viz-tokens_dark.js', theme }),
                  'format': 'darkTheme-commonJS/flow',
                  '_format_comment': 'Custom.',
                  'filter': 'dataVisualizationFilter',
                  '_filter_comment': 'Custom.',
                },
                {
                  'destination': nameOutputFile({
                    name: 'data-viz-tokens_individual_dark.js',
                    theme,
                  }),
                  'format': 'javascript/es6/flow',
                  '_format_comment': 'Custom.',
                  'filter': 'dataVisualizationFilter',
                  '_filter_comment': 'Custom.',
                },
              ],
      },
      'ts': {
        'transformGroup': 'webTsTransformGroup',
        '_transformGroup_comment':
          'https://amzn.github.io/style-dictionary/#/transform_groups?id=js',
        'buildPath': 'dist/ts/',
        'options': {
          'showFileHeader': true,
          'fileHeader': 'fileHeader',
          '_fileHeader_comment': 'Custom.',
        },
        'files':
          mode === 'light'
            ? [
                {
                  'destination': nameOutputFile({ name: 'constants.es.ts', theme }),
                  'format': 'constantLibrary-javascript/es6/ts',
                  '_format_comment': 'Custom.',
                },
                {
                  'destination': nameOutputFile({ name: 'constants.es.d.ts', theme }),
                  'format': 'constantLibrary-javascript/es6/ts',
                  '_format_comment': 'Custom.',
                },
                {
                  'destination': nameOutputFile({ name: 'constants.ts', theme }),
                  'format': 'constantLibrary-commonJS/flow',
                  '_format_comment': 'Custom.',
                },
                {
                  'destination': nameOutputFile({ name: 'constants.d.ts', theme }),
                  'format': 'constantLibrary-commonJS/flow',
                  '_format_comment': 'Custom.',
                },
                {
                  'destination': nameOutputFile({ name: 'tokens.ts', theme }),
                  'format': 'commonJS/flow',
                  '_format_comment':
                    'https://amzn.github.io/style-dictionary/#/formats?id=javascriptes6',
                },
                {
                  'destination': nameOutputFile({ name: 'tokens_individual.ts', theme }),
                  'format': 'javascript/es6',
                  '_format_comment':
                    'https://amzn.github.io/style-dictionary/#/formats?id=javascriptes6',
                },
                {
                  'destination': nameOutputFile({ name: 'data-viz-tokens.ts', theme }),
                  'format': 'commonJS/flow',
                  '_format_comment': 'Custom.',
                  'filter': 'dataVisualizationFilter',
                  '_filter_comment': 'Custom.',
                },
                {
                  'destination': nameOutputFile({ name: 'data-viz-tokens_individual.ts', theme }),
                  'format': 'javascript/es6',
                  '_format_comment':
                    'https://amzn.github.io/style-dictionary/#/formats?id=javascriptes6',
                  'filter': 'dataVisualizationFilter',
                  '_filter_comment': 'Custom.',
                },
              ]
            : [
                {
                  'destination': nameOutputFile({ name: 'tokens_dark.ts', theme }),
                  'format': 'darkTheme-commonJS/flow',
                  '_format_comment': 'Custom.',
                },
                {
                  'destination': nameOutputFile({ name: 'tokens_individual_dark.ts', theme }),
                  'format': 'javascript/es6',
                  '_format_comment':
                    'https://amzn.github.io/style-dictionary/#/formats?id=javascriptes6',
                },
                {
                  'destination': nameOutputFile({ name: 'data-viz-tokens_dark.ts', theme }),
                  'format': 'darkTheme-commonJS/flow',
                  '_format_comment': 'Custom.',
                  'filter': 'dataVisualizationFilter',
                  '_filter_comment': 'Custom.',
                },
                {
                  'destination': nameOutputFile({
                    name: 'data-viz-tokens_individual_dark.ts',
                    theme,
                  }),
                  'format': 'javascript/es6',
                  '_format_comment':
                    'https://amzn.github.io/style-dictionary/#/formats?id=javascriptes6',
                  'filter': 'dataVisualizationFilter',
                  '_filter_comment': 'Custom.',
                },
              ],
      },
    },
  };
}

// $FlowFixMe[missing-local-annot]
function getAndroidConfiguration({ theme = 'classic', mode = 'light' }) {
  const modeTheme = mode === 'dark' ? '-darkTheme' : '-lightTheme';

  const sourcePaths = getTokenSourcePaths({ theme, modeTheme });

  return {
    'source': sourcePaths,
    'platforms': {
      'android': {
        'transformGroup': 'androidTransformGroup',
        '_format_comment': 'Custom.',
        'buildPath': 'dist/android/',
        'options': {
          'showFileHeader': true,
          'fileHeader': 'androidFileHeader',
          '_fileHeader_comment': 'Custom.',
        },
        'files':
          mode === 'light'
            ? [
                {
                  'destination': nameOutputFile({ name: 'colors.xml', theme }),
                  'format': 'android/resources',
                  '_format_comment':
                    'https://amzn.github.io/style-dictionary/#/formats?id=androidcolors',
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
                  'destination': nameOutputFile({ name: 'font-size.xml', theme }),
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
                  'destination': 'opacity.xml',
                  'format': 'android/resources',
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
                  'destination': nameOutputFile({ name: 'colors-dark.xml', theme }),
                  'format': 'android/resources',
                  '_filter_comment': 'Custom.',
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

// $FlowFixMe[missing-local-annot]
function getIOSConfiguration({ theme = 'classic', mode = 'light' }) {
  const modeTheme = mode === 'dark' ? '-darkTheme' : '-lightTheme';

  const sourcePaths = getTokenSourcePaths({ theme, modeTheme });

  return {
    'source': sourcePaths,
    'platforms': {
      'ios': {
        'transformGroup': 'ios',
        '_transformGroup_comment':
          'https://amzn.github.io/style-dictionary/#/transform_groups?id=ios',
        'buildPath': 'dist/ios/',
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
                    '_fileHeader_comment': 'Custom.',
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
                    '_fileHeader_comment': 'Custom.',
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
                    '_fileHeader_comment': 'Custom.',
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
                    '_fileHeader_comment': 'Custom.',
                    'showFileHeader': true,
                  },
                },
              ],
      },
      'ios-swift': {
        'transformGroup': 'ios-swift',
        '_transformGroup_comment':
          'https://amzn.github.io/style-dictionary/#/transform_groups?id=ios-swift',
        'buildPath': 'dist/ios-swift/',
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
                    '_fileHeader_comment': 'Custom.',
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
                    '_fileHeader_comment': 'Custom.',
                    'showFileHeader': true,
                  },
                },
              ],
      },
      'ios-swift-separate-enums': {
        'transformGroup': 'ios-swift-separate',
        '_transformGroup_comment':
          'https://amzn.github.io/style-dictionary/#/transform_groups?id=ios-swift-separate',
        'buildPath': 'dist/ios-swift/',
        'files':
          mode === 'light'
            ? [
                {
                  'destination': 'GestaltDesignTokensColor.swift',
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
                    '_fileHeader_comment': 'Custom.',
                    'showFileHeader': true,
                  },
                },
              ]
            : [
                {
                  'destination': 'GestaltDesignTokensColorDarkTheme.swift',
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
                    '_fileHeader_comment': 'Custom.',
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
  // web: ['css', 'json', 'jsonflow', 'js', 'ts'],
  web: ['css', 'ts'],
  // android: ['android'],
  // ios: ['ios', 'ios-swift', 'ios-swift-separate-enums'],
};

['classic', 'vrweb-theme'].forEach((theme) =>
  ['light', 'dark'].forEach((mode) => {
    // if (['classic', 'vr-theme'] === theme) {
    //   // iOS platform
    //   const StyleDictionaryIOS = StyleDictionary.extend(getIOSConfiguration({ mode, theme }));
    //   platformFileMap.ios.forEach((platform) => StyleDictionaryIOS.buildPlatform(platform));

    //   // Android platform
    //   const StyleDictionaryAndroid = StyleDictionary.extend(
    //     getAndroidConfiguration({ mode, theme }),
    //   );
    //   platformFileMap.android.forEach((platform) => StyleDictionaryAndroid.buildPlatform(platform));
    // }
    if (['classic', 'vrweb-theme'].includes(theme)) {
      console.log(theme);
      // // web platform
      const StyleDictionaryWeb = StyleDictionary.extend(getWebConfig({ mode, theme }));
      platformFileMap.web.forEach((platform) => StyleDictionaryWeb.buildPlatform(platform));
    }
  }),
);
