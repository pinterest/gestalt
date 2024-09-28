const { getFilter } = require('../utils/getFilter');
const {
  filterLineHeight,
  filterColor,
  filterElevation,
  filterComponentToken,
} = require('../filters');
const { getSources, getListOfComponents, getComponentTokenOverrides } = require('../getSources');

const toPascal = (str) => str.charAt(0).toUpperCase() + str.slice(1);

function getTheme(theme) {
  return theme === 'vr-theme' ? 'VR' : '';
}

const optionsFileHeaderOutputReferences = {
  'options': {
    'fileHeader': 'fileHeader',
    '_fileHeader_comment': 'Custom',
    'showFileHeader': true,
    'outputReferences': true,
  },
};

const optionsFileHeader = {
  'options': {
    'fileHeader': 'fileHeader',
    '_fileHeader_comment': 'Custom',
    'showFileHeader': true,
  },
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

function getFiles({ theme, modeTheme, language, fileType }) {
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

  if (theme === 'vr-theme') {
    iOSSwiftFiles.push(
      ...getListOfComponents(theme).map((component) => ({
        'destination': `components/GestaltTokens${toPascal(component)}.swift`,
        ...iosSwiftEnumSwift,
        'className': `GestaltTokens${toPascal(component)}`,
        ...filterComponentToken(component),
        fileHeader: `// ${language} specific tokens`,
      })),
    );
  }

  if (fileType === 'swift') {
    if (modeTheme === 'dark') {
      return [
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
      ];
    }
    return iOSSwiftFiles;
  }

  if (fileType === 'objc') {
    if (modeTheme === 'dark') {
      return [
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
      ];
    }
    return iOSObjectiveCFiles;
  }

  return [];
}

const getComponentTokenFiles = ({ theme }) => {
  if (theme !== 'vr-theme') {
    return [];
  }

  return getComponentTokenOverrides('ios');
};

function getIOSConfiguration({ theme, mode, language }) {
  const modeTheme = mode === 'dark' ? 'dark' : 'light';

  return {
    'include': getSources({ theme, modeTheme, language }),
    'source': getComponentTokenFiles({ theme }),
    'platforms': {
      'ios': {
        ...iOSTransformGroup,
        'buildPath': `dist/ios/${theme}/`,
        ...optionsFileHeader,
        'files': getFiles({ theme, modeTheme, language, fileType: 'objc' }),
      },
      'ios-swift': {
        ...iOSSwiftEnumTransformGroup,
        'buildPath': `dist/ios-swift/${theme}/`,
        ...optionsFileHeaderOutputReferences,
        'files': getFiles({ theme, modeTheme, language, fileType: 'swift' }),
      },
    },
  };
}

module.exports = { getIOSConfiguration };
