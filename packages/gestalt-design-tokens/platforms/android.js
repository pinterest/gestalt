const { getSources } = require('../getSources');
const {
  filterColor,
  filterRounding,
  filterOpacity,
  filterSpace,
  filterLineHeight,
  filterFontSize,
  filterFontWeight,
  filterMotionDuration,
  filterMotionEasing,
} = require('../filters');

function getAndroidConfiguration({ theme, mode, language }) {
  const modeTheme = mode === 'dark' ? 'dark' : 'light';

  const androidTransformGroup = {
    'transformGroup': 'androidTransformGroup',
    '_format_comment': 'Custom',
  };

  const androidResources = {
    'format': 'android/resources',
    '_format_comment': 'https://amzn.github.io/style-dictionary/#/formats?id=androidresources',
  };

  const colorResource = { 'resourceType': 'color' };

  const dimenResource = { 'resourceType': 'dimen' };

  const integerResource = { 'resourceType': 'integer' };

  const optionsFileHeaderOutputReferences = {
    'options': {
      'fileHeader': 'fileHeader',
      '_fileHeader_comment': 'Custom',
      'showFileHeader': true,
      'outputReferences': true,
    },
  };

  const composeObject = {
    'format': 'compose/object',
    '_format_comment': 'https://amzn.github.io/style-dictionary/#/formats?id=composeobject',
  };

  const getFiles = ({ theme, modeTheme, language }) => {
    const files = [];

    if (modeTheme === 'dark') {
      return [
        {
          'destination': 'color-dark.xml',
          ...androidResources,
          ...colorResource,
          ...filterColor,
        },
      ];
    }

    if (language) {
      files.push({
        'destination': `font-lineheight-${language}.xml`,
        ...androidResources,
        ...dimenResource,
        ...filterLineHeight,
      });
    }

    files.push([
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
    ]);

    return files.flat();
  };

  return {
    'include': getSources({ theme, modeTheme, language }),
    'platforms': {
      'android': {
        ...androidTransformGroup,
        'buildPath': `dist/android/${theme}/`,
        ...optionsFileHeaderOutputReferences,
        'files': getFiles({ theme, modeTheme, language }),
      },
    },
  };
}

module.exports = { getAndroidConfiguration };
