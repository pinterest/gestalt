// @flow strict

const BASE_DOMAIN = 'http://localhost:8888';
const BASE_PATH = '/integration-test/masonry';

const normalizeValue = (val /*: boolean | number */) => {
  if (typeof val === 'boolean') {
    return val ? '1' : '0';
  }
  return String(val);
};

// These are used in docs/pages/integration-test/masonry.js
/*::
type Options = ?{|
  batchPaints?: boolean,
  constrained?: boolean,
  deferMount?: boolean,
  externalCache?: boolean,
  finiteLength?: boolean,
  flexible?: boolean,
  logWhitespace?: boolean,
  manualFetch?: boolean,
  noScroll?: boolean,
  offsetTop?: number,
  realisticPinHeights?: boolean,
  scrollContainer?: boolean,
  twoColItems?: boolean,
  virtualize?: boolean,
  virtualBoundsTop?: number,
  virtualBoundsBottom?: number,
|};
*/

const getServerURL = (options /*: Options */) /*: string */ => {
  let serializedOptions = '';

  if (options) {
    serializedOptions = Object.keys(options ?? {})
      .map((key) =>
        typeof options[key] !== 'undefined'
          ? `${key}=${normalizeValue(options[key])}`
          : ''
      )
      .filter((item) => !!item)
      .join('&');
  }

  return `${BASE_DOMAIN}/${BASE_PATH}?${serializedOptions}`;
};

export default getServerURL;
