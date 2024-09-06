const transformHEXRGBaForCSS = require('./transformers/hexToRgba');
const StyleDictionary = require('style-dictionary');
const tinycolor = require('tinycolor2');
const toCamelCase = require('lodash.camelcase');
const { registerTokenTransformGroups } = require('./transform');

// #region CONFIG

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

const integerResource = { 'resourceType': 'integer' };

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

const filterLineHeight = {
  'filter': {
    'attributes': {
      'category': 'font',
      'type': 'lineheight',
    },
  },
};

const filterMotionDuration = {
  'filter': 'filterMotionDuration',
  '_filter_comment': 'Custom',
};

const filterMotionEasing = {
  'filter': 'filterMotionEasing',
  '_filter_comment': 'Custom',
};

const androidResources = {
  'format': 'android/resources',
  '_format_comment': 'https://amzn.github.io/style-dictionary/#/formats?id=androidresources',
};

const composeObject = {
  'format': 'compose/object',
  '_format_comment': 'https://amzn.github.io/style-dictionary/#/formats?id=composeobject',
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

const semaLineHeightFilter = {
  'filter': 'semaLineHeightFilter',
  '_filter_comment': 'Custom filter for semantic lineheight tokens',
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
// #endregion

// #region HELPER FUNCTIONS

const filterList = [
  filterColor,
  filterRounding,
  filterOpacity,
  filterSpace,
  filterElevation,
  filterLineHeight,
  filterFontFamily,
  filterFontSize,
  filterFontWeight,
  filterMotionDuration,
  filterMotionEasing,
];

const getFilter = (category, type) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const item of filterList) {
    // eslint-disable-next-line no-underscore-dangle
    if (item._filter_comment === 'Custom') {
      if (
        typeof item.filter === 'string' &&
        item.filter.toLowerCase() === `filter${category}${type}`
      ) {
        return item;
      }

      // eslint-disable-next-line no-continue
      continue;
    }

    if (type === undefined) {
      if (item.filter.attributes.category === category) {
        return item;
      }
    } else if (
      item.filter.attributes.category === category &&
      item.filter.attributes.type === type
    ) {
      return item;
    }
  }
  return undefined;
};

function getTheme(theme) {
  return theme === 'vr-theme' ? 'VR' : '';
}

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

const regex = /(\{|\})/gi;
const regex1A = /(\{(?!\w)|\}(?!\w))/gi;

const commonJSFormatter = ({ token, darkTheme, isVR }) => {
  const isWebMappingToken = token.filePath.includes('mapping');

  return JSON.stringify({
    name:
      isVR && !isWebMappingToken
        ? token.path.join('-').replace('appenda', '')
        : token.path.join('-').replace('appenda', '').replace('appendb', ''),
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

function getSources({ theme, modeTheme, platform, language }) {
  if (theme === 'classic') {
    return [
      `tokens/classic/base-color.json`,
      `tokens/classic/base-font.json`,
      `tokens/classic/base-opacity.json`,
      `tokens/classic/base-rounding.json`,
      `tokens/classic/base-space.json`,
      `tokens/classic/sema-color-${modeTheme}.json`,
      `tokens/classic/base-color-dataviz-${modeTheme}.json`,
      `tokens/classic/sema-color-dataviz-${modeTheme}.json`,
      `tokens/classic/base-elevation-${modeTheme}.json`,
      ...(platform === 'web'
        ? [
            `tokens/classic/comp-web-color-${modeTheme}.json`,
            `tokens/classic/comp-web-elevation-${modeTheme}.json`,
            `tokens/classic/comp-web-rounding.json`,
            `tokens/classic/comp-web-font.json`,
          ]
        : []),
    ];
  }

  return [
    'tokens/vr-theme/base/color/default.json',
    'tokens/vr-theme/base/text/font.json',
    'tokens/vr-theme/base/opacity.json',
    'tokens/vr-theme/base/rounding.json',
    'tokens/vr-theme/base/space.json',
    'tokens/vr-theme/base/lineheight.json',
    'tokens/vr-theme/base/motion.json',
    `tokens/vr-theme/sema/color/${modeTheme}/default.json`,
    `tokens/vr-theme/sema/elevation/${modeTheme}.json`,
    'tokens/vr-theme/sema/text/font.json',
    ...(platform === 'web'
      ? [
          'tokens/vr-theme/base/color/pressed.json',
          'tokens/vr-theme/base/color/hover.json',
          `tokens/vr-theme/sema/color/${modeTheme}/hover.json`,
          `tokens/vr-theme/sema/color/${modeTheme}/pressed.json`,
        ]
      : []),
    'tokens/vr-theme/sema/elevation.json',
    'tokens/vr-theme/sema/opacity.json',
    'tokens/vr-theme/sema/rounding.json',
    'tokens/vr-theme/sema/space.json',
    `tokens/vr-theme/sema/text/language/${language}.json`,
    'tokens/vr-theme/sema/motion.json',
    ...(theme === 'vr-theme-web-mapping'
      ? [
          `tokens/vr-theme-web-mapping/base-color-dataviz-${modeTheme}.json`,
          'tokens/vr-theme-web-mapping/base-color.json',
          `tokens/vr-theme-web-mapping/base-elevation-${modeTheme}.json`,
          'tokens/vr-theme-web-mapping/base-font.json',
          'tokens/vr-theme-web-mapping/base-opacity.json',
          'tokens/vr-theme-web-mapping/base-rounding.json',
          'tokens/vr-theme-web-mapping/base-space.json',
          `tokens/vr-theme-web-mapping/sema-color-dataviz-${modeTheme}.json`,
          'tokens/vr-theme-web-mapping/sema-color.json',
          `tokens/vr-theme-web-mapping/comp-web-color-${modeTheme}.json`,
          `tokens/vr-theme-web-mapping/comp-web-rounding.json`,
          `tokens/vr-theme-web-mapping/comp-web-font.json`,
        ]
      : []),
  ];
}
// #endregion

// #region X-PLATFORM REGISTERS

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

StyleDictionary.registerTransform({
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

StyleDictionary.registerTransform({
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
StyleDictionary.registerTransform({
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
StyleDictionary.registerTransform({
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
StyleDictionary.registerTransform({
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

StyleDictionary.registerFormat({
  name: `constantLibrary-javascript/es6/vr-theme`,
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

        const formattedTokenNameKey = token.path
          .join('_')
          .toUpperCase()
          .replace('-', '_')
          .replace('appenda', '')
          .replace('appendb', '')
          .replace('APPENDA', '')
          .replace('APPENDB', '');

        const formattedTokenNameValue = token.path
          .join('-')
          .replace('appenda', '')
          .replace('appendb', '');

        return `export const TOKEN_${formattedTokenNameKey} = 'var(--${formattedTokenNameValue})';`;
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
          .replace('-', '_')}: 'var(--${`${token.path.join('-')}`})',`;
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

StyleDictionary.registerFilter({
  name: 'filterMotionDuration',
  matcher(token) {
    return (
      token.attributes.category === 'motion' &&
      (token.attributes.type === 'duration' ||
        token.attributes.item === 'duration' ||
        token.attributes.subitem === 'duration')
    );
  },
});

StyleDictionary.registerFilter({
  name: 'filterMotionEasing',
  matcher(token) {
    return (
      token.attributes.category === 'motion' &&
      (token.attributes.type === 'easing' ||
        token.attributes.item === 'easing' ||
        token.attributes.subitem === 'easing')
    );
  },
});
// #endregion

// BUILD CONFIGURATION

// #region WEB PLATFORM

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
      (prop.filePath.includes('vr-theme') && prop.attributes.type.endsWith('appenda')) ||
      prop.attributes.type.endsWith('appendb')
    );
  },
  transformer(prop) {
    return prop.name.replace('appenda', '').replace('appendb', '');
  },
});

StyleDictionary.registerTransform({
  name: 'value/duration/css',
  type: 'value',
  matcher(prop) {
    return prop.attributes.type === 'duration';
  },
  transformer(prop) {
    return `${prop.value}ms`;
  },
});

StyleDictionary.registerTransform({
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

// Filters only to semantic line-height tokens
StyleDictionary.registerFilter({
  name: 'semaLineHeightFilter',
  matcher(token) {
    return (
      token.attributes.category === 'font' &&
      token.attributes.type === 'lineheight' &&
      !token.name.startsWith('Base')
    );
  },
});

function getWebConfig({ theme, mode, language }) {
  const modeTheme = mode === 'dark' ? 'dark' : 'light';

  const mappedTheme = theme === 'vr-theme-web-mapping' ? 'vr-theme' : theme;

  // light theme
  // run languages in for loop

  return {
    'source': getSources({ theme, modeTheme, platform: 'web', language }),
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
                language
                  ? {
                      'destination': `font-lineheight-${language}.css`,
                      ...cssVariables,
                      ...semaLineHeightFilter,
                    }
                  : undefined,
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
        'files': [
          {
            'destination': `variables-${mode}.json`,
            ...jsonFlat,
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
                ...(theme === 'vr-theme' || theme === 'classic'
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
                language
                  ? {
                      'destination': `font-lineheight-${language}.js`,
                      'format': `commonJS/${mappedTheme}`,
                      '_format_comment': 'Custom',
                      ...semaLineHeightFilter,
                    }
                  : undefined,
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
// #endregion

// #region ANDROID PLATFORM

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

function getAndroidConfiguration({ theme, mode, language }) {
  const modeTheme = mode === 'dark' ? 'dark' : 'light';

  return {
    'source': getSources({ theme, modeTheme, language }),
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
                language && {
                  'destination': `font-lineheight-${language}.xml`,
                  ...androidResources,
                  ...dimenResource,
                  ...filterLineHeight,
                },
                {
                  'destination': 'motion-duration.xml',
                  ...androidResources,
                  ...integerResource,
                  ...filterMotionDuration,
                },
                {
                  'destination': 'motion-easing.kt',
                  className: 'GestaltInterpolators',
                  packageName: 'interpolator',
                  options: {
                    import: ['androidx.core.view.animation.PathInterpolatorCompat'],
                  },
                  ...composeObject,
                  ...filterMotionEasing,
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
// #endregion

// #region IOS PLATFORM

// REGISTER TRANSFORM
StyleDictionary.registerTransform({
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
  name: 'value/duration/ios',
  type: 'value',
  matcher(prop) {
    return prop.attributes.type === 'duration';
  },
  transformer(prop) {
    return prop.value / 1000;
  },
});

StyleDictionary.registerTransform({
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

StyleDictionary.registerTransform({
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

function getIOSConfiguration({ theme, mode, language }) {
  const modeTheme = mode === 'dark' ? 'dark' : 'light';

  const categories = [
    'color',
    'rounding',
    'space',
    'opacity',
    'elevation',
    'font size',
    'font weight',
    'font family',
    'motion duration',
    'motion easing',
  ];

  /**
   * Example output:
   * {
     "destination": "GestaltTokensFontSize.h",
      "format": "ios/static.h",
      "_format_comment": "https://amzn.github.io/style-dictionary/#/formats?id=iosstringsh",
      "className": "GestaltTokensFontSize",
      "type": "GestaltTokensFontSizeName"
    }
  */
  let iOSObjectiveCFiles = categories.flatMap((category) => {
    const pascalName = category
      .split(' ')
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      .join('');

    // generate both header and methods file extensions
    return ['h', 'm'].map((ext) => {
      const fileTypeDetails = ext === 'h' ? iosStaticH : iosStaticM;

      return {
        'destination': `GestaltTokens${pascalName}${getTheme(theme)}.${ext}`,
        ...fileTypeDetails,
        'className': `GestaltTokens${pascalName}${getTheme(theme)}`,
        'type': `GestaltTokens${pascalName}Name${getTheme(theme)}`,
        ...getFilter(category.split(' ')[0], category.split(' ')[1]),
      };
    });
  });

  const iOSSwiftFiles = categories.flatMap((category) => {
    const pascalName = category
      .split(' ')
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      .join('');

    return {
      'destination': `GestaltTokens${pascalName}${getTheme(theme)}.swift`,
      ...iosSwiftEnumSwift,
      'className': `GestaltTokens${pascalName}${getTheme(theme)}`,
      ...getFilter(category.split(' ')[0], category.split(' ')[1]),
    };
  });

  // add the relevant language output
  if (language) {
    // generate both header and methods file extensions
    iOSObjectiveCFiles = iOSObjectiveCFiles.concat(
      ['h', 'm'].map((ext) => {
        const fileTypeDetails = ext === 'h' ? iosStaticH : iosStaticM;
        return {
          'destination': `/GestaltTokensFontLineHeight${getTheme(
            theme,
          )}-${language.toUpperCase()}.${ext}`,
          ...fileTypeDetails,
          'className': `GestaltTokensFontLineHeight${language.toUpperCase()}${getTheme(theme)}`,
          'type': `GestaltTokensFontLineHeight${language.toUpperCase()}Name${getTheme(theme)}`,
          ...filterLineHeight,
          comment: `// ${language} specific tokens`,
        };
      }),
    );

    iOSSwiftFiles.push({
      'destination': `GestaltTokensFontLineHeight${getTheme(
        theme,
      )}-${language.toUpperCase()}.swift`,
      ...iosSwiftEnumSwift,
      'className': `GestaltTokensFontLineHeight${language.toUpperCase()}${getTheme(theme)}`,
      ...semaLineHeightFilter,
      fileHeader: `// ${language} specific tokens`,
    });
  }

  return {
    'source': getSources({ theme, modeTheme, language }),
    'platforms': {
      'ios': {
        ...iOSTransformGroup,
        'buildPath': `dist/ios/${theme}/`,
        ...optionsFileHeader,
        'files':
          mode === 'light'
            ? iOSObjectiveCFiles
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
            ? iOSSwiftFiles
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
// #endregion

// #region BUILD EXECUTION

const platformFileMap = {
  web: ['css', 'json', 'js'],
  android: ['android'],
  ios: ['ios', 'ios-swift'],
};

registerTokenTransformGroups(StyleDictionary);

['classic', 'vr-theme', 'vr-theme-web-mapping'].forEach((theme) =>
  ['light', 'dark'].forEach((mode) => {
    // THIS NEEDS A CLEANUP BUT INTERIM SOLUTION 'default'MUST BE LAST
    ['ck', 'ja', 'tall', 'th', 'vi', 'default'].forEach((lang) => {
      // only generate languages for the vr-themes
      const language = theme === 'vr-theme' || theme === 'vr-theme-web-mapping' ? lang : undefined;

      // iOS platform
      if (theme !== 'vr-theme-web-mapping') {
        const StyleDictionaryIOS = StyleDictionary.extend(
          getIOSConfiguration({ mode, theme, language }),
        );
        platformFileMap.ios.forEach((platform) => StyleDictionaryIOS.buildPlatform(platform));

        // // Android platform
        const StyleDictionaryAndroid = StyleDictionary.extend(
          getAndroidConfiguration({ mode, theme, language }),
        );
        platformFileMap.android.forEach((platform) =>
          StyleDictionaryAndroid.buildPlatform(platform),
        );
      }

      // web platform
      const StyleDictionaryWeb = StyleDictionary.extend(getWebConfig({ mode, theme, language }));
      platformFileMap.web.forEach((platform) => StyleDictionaryWeb.buildPlatform(platform));
    });
  }),
);
// #endregion
