const {
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
} = require('../filters');

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

module.exports = { getFilter };
