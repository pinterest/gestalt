// Hash any string to an int value.
// https://gist.github.com/hyamamoto/fd435505d29ebfa3d9716fd2be8d42f0
export const hashStrToInt = s => {
  let h = 0;

  for (let i = 0; i < s.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }

  return h;
};

// Encode a number to a string using 6-bit characters (a-z, A-Z, 0-9, -, and _).
// Conditionally zero-pad and/or truncate to max length.
export const encodeInt = (int, minLength, maxLength) => {
  let remainder = int;
  let result = '';

  /* eslint-disable no-bitwise */
  while (remainder > 0 || result.length < minLength) {
    result =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'[
        remainder & 63
      ] + result;
    remainder >>>= 6;
  }
  /* eslint-enable no-bitwise */

  return result.substr(-maxLength);
};
