const BASE_URL = 'http://localhost:8888';
const BASE_PATH = '/integration-test/masonry';

const normalizeValue = (val: boolean | number) => {
  if (typeof val === 'boolean') {
    return val ? '1' : '0';
  }
  return String(val);
};

// These are used in docs/pages/integration-test/masonry.tsx
type Options = {
  constrained?: boolean;
  darkMode?: boolean;
  deferMount?: boolean;
  dynamicHeights?: boolean;
  dynamicHeightsV2?: boolean;
  externalCache?: boolean;
  experimental?: boolean;
  finiteLength?: boolean;
  flexible?: boolean;
  logWhitespace?: boolean;
  manualFetch?: boolean;
  multiColTest?: boolean;
  noScroll?: boolean;
  offsetTop?: number;
  realisticPinHeights?: boolean;
  scrollContainer?: boolean;
  twoColItems?: boolean;
  virtualBoundsBottom?: number;
  virtualBoundsTop?: number;
  virtualize?: boolean;
};

const getServerURL = (options?: Options | null): string => {
  let serializedOptions = '';

  if (options) {
    serializedOptions = Object.entries(options)
      .map(([key, value]) =>
        typeof value !== 'undefined' ? `${key}=${normalizeValue(value)}` : '',
      )
      .filter((item) => !!item)
      .join('&');
  }

  return `${process.env.CI ? '' : BASE_URL}${BASE_PATH}?${serializedOptions}`;
};

export default getServerURL;
