// @flow strict

const BASE_DOMAIN = 'http://localhost:8888';
const BASE_PATH = '/integration-test/masonry';

const normalizeValue = (val) => {
  if (typeof val === 'boolean') {
    return val ? '1' : '0';
  }
  return String(val);
};

/*::
type Options = ?{|
  offsetTop?: number,
  scrollContainer?: boolean,
  virtualize?: boolean,
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
