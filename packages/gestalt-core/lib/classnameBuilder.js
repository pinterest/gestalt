// ClassnameBuilder is a hack used to help us minify Gestalt CSS classnames down
// to three characters each for prod builds.
//
// The issue with such an aggressive minification approach is that it leaves a
// very small hash value size and collisions often occur. Gestalt previously
// solved this by assigning each classname an incrementing number and hashing on
// that number, but this resulted in lots of name/hash changes whenever
// classnames were added or removed. To solve this, we now hash based on the
// class name and only add variation when hashes collide.

// eslint-disable-next-line flowtype/require-valid-file-annotation
import md5 from 'blueimp-md5';

class ClassnameBuilder {
  constructor() {
    // Map of classnames to their minified versions.
    this.classnameCache = new Map();

    // The inverse of classnameCache. Used to detect hash collisions.
    this.hashes = new Map();
  }

  // Minify a classname and return the hash. If there was a collision with
  // another value, add a modifier. The new value will be added to the cache and
  // saved out to disk.
  getMinifiedClassname(classname) {
    const existingCacheEntry = this.classnameCache.get(classname);
    if (existingCacheEntry) {
      return existingCacheEntry;
    }

    let hash;
    let incrementor = 0;

    do {
      hash = ClassnameBuilder.minify(classname, incrementor);
      incrementor += 1;
    } while (this.hashes.has(hash) || '0123456789-'.includes(hash[0]));

    this.hashes.set(hash, classname);
    this.classnameCache.set(classname, hash);

    return hash;
  }

  static minify(classname, incrementor) {
    const md5Hash = md5(classname + incrementor);
    const intHash = ClassnameBuilder.hashStrToInt(md5Hash);
    return ClassnameBuilder.encodeInt(intHash, 3, 3);
  }

  // Hash any string to an int value.
  // https://gist.github.com/hyamamoto/fd435505d29ebfa3d9716fd2be8d42f0
  static hashStrToInt(s) {
    let h = 0;

    for (let i = 0; i < s.length; i += 1) {
      // eslint-disable-next-line no-bitwise
      h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
    }

    return h;
  }

  // Encode a number to a string using 6-bit characters (a-z, A-Z, 0-9, -, and _).
  // Conditionally zero-pad and/or truncate to max length.
  static encodeInt(int, minLength, maxLength) {
    let remainder = int;
    let result = '';

    /* eslint-disable no-bitwise */
    while (remainder > 0 || result.length < minLength) {
      result =
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'[remainder & 63] + result;
      remainder >>>= 6;
    }
    /* eslint-enable no-bitwise */

    return result.substr(-maxLength);
  }
}

const instance = new ClassnameBuilder();
export default instance;
