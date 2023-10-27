// @flow strict
import Box from '../Box.js';

type Gap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

const applyModuleDensityStyle = (
  size: 'sm' | 'md' | 'lg',
): {
  gap: Gap,
  padding: $ElementType<React$ElementConfig<typeof Box>, 'padding'>,
  rounding: $ElementType<React$ElementConfig<typeof Box>, 'rounding'>,
  titleGap: Gap,
  summaryListGap: Gap,
} => {
  switch (size) {
    case 'sm':
      return { gap: 2, padding: 2, rounding: 2, titleGap: 1, summaryListGap: 1 };
    case 'md':
      return { gap: 4, padding: 4, rounding: 3, titleGap: 2, summaryListGap: 1 };
    case 'lg':
    default:
      return { gap: 6, padding: 6, rounding: 4, titleGap: 3, summaryListGap: 2 };
  }
};

export default applyModuleDensityStyle;
