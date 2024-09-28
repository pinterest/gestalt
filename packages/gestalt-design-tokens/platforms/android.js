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

module.exports = { getAndroidConfiguration };
