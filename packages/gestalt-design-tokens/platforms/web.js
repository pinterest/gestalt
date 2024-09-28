const { getSources, getComponentTokenOverrides } = require('../getSources');
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

const getFiles = ({ theme, modeTheme, language, fileType }) => {
  const mappedTheme = theme === 'vr-theme-web-mapping' ? 'vr-theme' : theme;

  const modeSuffix = modeTheme === 'dark' ? '_dark' : '';
  const altModeSuffix = modeTheme === 'dark' ? '-dark' : '';
  const modePrefix = modeTheme === 'dark' ? 'darkTheme-' : '';

  const files = [];

  if (fileType === 'css') {
    files.push([
      {
        'destination': `variables${altModeSuffix}.css`,
        ...cssVariables,
        ...(modeTheme === 'dark' ? colorElevationFilter : undefined),
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
    if ((theme === 'vr-theme' || theme === 'classic') && modeTheme === 'light') {
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

    if (language) {
      files.push([
        {
          'destination': `font-lineheight-${language}.js`,
          'format': `commonJS/${mappedTheme}`,
          '_format_comment': 'Custom',
          ...semaLineHeightFilter,
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
    ]);
  }

  if (fileType === 'json') {
    if (language) {
      files.push([
        {
          'destination': `variables-font-lineheight-${language}.json`,
          ...jsonFlat,
          ...semaLineHeightFilter,
        },
      ]);
    }
    files.push([
      {
        'destination': `variables-${modeTheme}.json`,
        ...jsonFlat,
      },
    ]);
  }

  return files.flat();
};

const getComponentTokenFiles = ({ theme }) => {
  if (theme === 'classic') {
    return [];
  }

  return getComponentTokenOverrides('web');
};

function getWebConfig({ theme, mode, language }) {
  const modeTheme = mode === 'dark' ? 'dark' : 'light';

  return {
    'include': getSources({ theme, modeTheme, platform: 'web', language }),
    'source': getComponentTokenFiles({ theme }),
    'platforms': {
      'css': {
        ...webCssTransformGroup,
        'buildPath': `dist/css/${theme}/`,
        ...optionsFileHeaderOutputReferences,
        'files': getFiles({ theme, modeTheme, language, fileType: 'css' }),
      },
      'json': {
        ...webCssTransformGroup,
        'buildPath': `dist/json/${theme}/`,
        'files': getFiles({ theme, modeTheme, language, fileType: 'json' }),
      },
      'js': {
        'transformGroup': 'webJsTransformGroup',
        '_transformGroup_comment':
          'https://amzn.github.io/style-dictionary/#/transform_groups?id=js',
        'buildPath': `dist/js/${theme}/`,
        ...optionsFileHeader,
        'files': getFiles({ theme, modeTheme, language, fileType: 'js' }),
      },
    },
  };
}

module.exports = { getWebConfig };
