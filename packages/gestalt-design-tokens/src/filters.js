const dataVisualizationFilter = {
  'filter': 'dataVisualizationFilter',
  '_filter_comment': 'Custom',
};

const semaLineHeightFilter = {
  'filter': 'semaLineHeightFilter',
  '_filter_comment': 'Custom filter for semantic lineheight tokens',
};

const colorElevationFilter = {
  'filter': 'colorElevationFilter',
  '_filter_comment': 'Custom',
};

const filterColor = {
  'filter': {
    'attributes': {
      'category': 'color',
    },
  },
};

const filterComponentToken = (component) => ({
  'filter': {
    'attributes': {
      'category': `${component}`,
    },
  },
});

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

/**
 * registers any filters
 * @param {*} sd - StyleDictionary root
 */
function registerTokenFilters(sd) {
  // Filters only tokens with dark theme values
  sd.registerFilter({
    name: 'colorElevationFilter',
    matcher(token) {
      return token.attributes.category === 'color' || token.attributes.category === 'elevation';
    },
  });

  // Filters only tokens with data-visualization
  sd.registerFilter({
    name: 'dataVisualizationFilter',
    matcher(token) {
      return (
        token.attributes.category === 'color' &&
        ['data-visualization', 'dataviz', 'datavizbase'].includes(token.attributes.type)
      );
    },
  });

  // Filters only to semantic line-height tokens
  sd.registerFilter({
    name: 'semaLineHeightFilter',
    matcher(token) {
      return (
        token.attributes.category === 'font' &&
        token.attributes.type === 'lineheight' &&
        !token.name.startsWith('Base')
      );
    },
  });

  sd.registerFilter({
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

  sd.registerFilter({
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
}

module.exports = {
  dataVisualizationFilter,
  semaLineHeightFilter,
  colorElevationFilter,
  registerTokenFilters,
  filterColor,
  filterRounding,
  filterOpacity,
  filterSpace,
  filterElevation,
  filterFontWeight,
  filterFontSize,
  filterFontFamily,
  filterLineHeight,
  filterMotionDuration,
  filterMotionEasing,
  filterComponentToken,
};
