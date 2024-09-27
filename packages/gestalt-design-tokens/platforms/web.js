const { getSources } = require('../sources');
const {
  dataVisualizationFilter,
  colorElevationFilter,
  semaLineHeightFilter,
} = require('../filters');

// FILE TRANSFORMS
const jsonFlat = {
  'format': 'json/flat',
  '_format_comment': 'https://amzn.github.io/style-dictionary/#/formats?id=jsonflat',
};

const cssVariables = {
  'format': 'css/variables',
  '_format_comment': 'https://amzn.github.io/style-dictionary/#/formats?id=cssvariables',
};

// transformGroups
const webCssTransformGroup = {
  'transformGroup': 'webCssTransformGroup',
  '_transformGroup_comment':
    'Custom from https://amzn.github.io/style-dictionary/#/transform_groups?id=css',
};

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

const getFiles = ({ theme, mode, language, fileType }) => {
  const mappedTheme = theme === 'vr-theme-web-mapping' ? 'vr-theme' : theme;

  const modeSuffix = theme === 'dark' ? '_dark' : '';
  const altModeSuffix = theme === 'dark' ? '-dark' : '';
  const modePrefix = theme === 'dark' ? 'darkTheme-' : '';

  const files = [];

  if (fileType === 'css') {
    files.push([
      {
        'destination': `variables${altModeSuffix}.css`,
        ...cssVariables,
        ...(mode === 'dark' ? colorElevationFilter : undefined),
      },
      language
        ? {
            'destination': `font-lineheight-${language}.css`,
            ...cssVariables,
            ...semaLineHeightFilter,
          }
        : undefined,
    ]);
  }

  if (fileType === 'js') {
    if (theme === 'vr-theme' || theme === 'classic') {
      files.push([
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
      ]);
    }
    files.push([
      {
        'destination': `tokens${modeSuffix}.js`,
        'format': `${modePrefix}commonJS/${mappedTheme}`,
        '_format_comment': 'Custom',
      },
      {
        'destination': `data-viz-tokens${modeSuffix}.js`,
        'format': `${modePrefix}commonJS/${mappedTheme}`,
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
    ]);
  }

  if (fileType === 'json') {
    files.push([
      {
        'destination': `variables-${mode}.json`,
        ...jsonFlat,
      },
      language
        ? {
            'destination': `variables-font-lineheight-${language}.json`,
            ...jsonFlat,
            ...semaLineHeightFilter,
          }
        : undefined,
    ]);
  }

  return files.flat();
};

function getWebConfig({ theme, mode, language }) {
  const modeTheme = mode === 'dark' ? 'dark' : 'light';

  // light theme

  // run languages in for loop

  return {
    'source': getSources({ theme, modeTheme, platform: 'web', language }),
    'platforms': {
      'css': {
        ...webCssTransformGroup,
        'buildPath': `dist/css/${theme}/`,
        ...optionsFileHeaderOutputReferences,
        'files': getFiles({ theme, mode, language, fileType: 'css' }),
      },
      'json': {
        ...webCssTransformGroup,
        'buildPath': `dist/json/${theme}/`,
        'files': getFiles({ theme, mode, language, fileType: 'json' }),
      },
      'js': {
        'transformGroup': 'webJsTransformGroup',
        '_transformGroup_comment':
          'https://amzn.github.io/style-dictionary/#/transform_groups?id=js',
        'buildPath': `dist/js/${theme}/`,
        ...optionsFileHeader,
        'files': getFiles({ theme, mode, language, fileType: 'js' }),
      },
    },
  };
}

module.exports = { getWebConfig };
