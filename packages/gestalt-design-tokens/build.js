const transformHEXRGBaForCSS = require('./transformers/hexToRgba');
const StyleDictionary = require('style-dictionary');
const tinycolor = require('tinycolor2');
const toCamelCase = require('lodash.camelcase');
const { registerTokenTransformGroups } = require('./transform');
const { registerTokenFilters } = require('./filters');
const { getWebConfig } = require('./platforms/web');
const { registerWebFormats } = require('./platforms/registerWebFormats');
const { getSources } = require('./getSources');

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

const semaLineHeightFilter = {
  'filter': 'semaLineHeightFilter',
  '_filter_comment': 'Custom filter for semantic lineheight tokens',
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

// #endregion

// #region X-PLATFORM REGISTERS

StyleDictionary.registerFileHeader({
  name: 'fileHeader',
  fileHeader: (defaultMessage) => ['File is autogenerated', ...defaultMessage],
});

// REGISTER FORMATS

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
    'include': getSources({ theme, modeTheme, language }),
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
    'include': getSources({ theme, modeTheme, language }),
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

registerWebFormats(StyleDictionary);
registerTokenTransformGroups(StyleDictionary);
registerTokenFilters(StyleDictionary);

['classic', 'vr-theme', 'vr-theme-web-mapping'].forEach((theme) =>
  ['light', 'dark'].forEach((mode) => {
    // THIS NEEDS A CLEANUP BUT INTERIM SOLUTION 'default' MUST BE LAST
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
