// ClassnameBuilder is a hack used to help us minify Gestalt CSS classnames down
// to two characters each for prod builds.
//
// The issue with such an aggressive minification approach is that it leaves a
// very small hash value size and collisions often occur. Gestalt previously
// solved this by assigning each classname an incrementing number and hashing on
// that number, but this resulted in lots of name/hash changes whenever
// classnames were added or removed.
//
// To solve issues of hash collision and also thrashing on changes,
// ClassnameBuilder uses a bit of a hack: an on-disk cache holds all classnames
// and corresponding hashes and those names/hashes will remain reserved for as
// long as the classname lives in the code. This means that all existing
// classnames will remain the same when others are added or removed.
// Unfortunately, it requires all Gestalt developers to share a cache, and thus
// the cache must be checked into the repo and committed whenever it changes. As
// such, this cache should be treated the same as the yarn.lock file.

import fs from 'fs';

const CLASSNAMES_CACHE_PATH = './classnames-cache.json';

class ClassnameBuilder {
  constructor() {
    // Map of classnames to their minified versions.
    this.classnameCache = {};

    // The inverse of classnameCache. Used to detect hash collisions.
    this.hashes = {};

    // Keep track of how many times we've actually minified each classname over
    // the course of minification. When we write the cache out to disk, we skip
    // any classnames that weren't used.
    this.classnameUses = {};
  }

  // Populate this.classnameCache with the values on disk (if any).
  loadClassnamesCache() {
    if (!fs.existsSync(CLASSNAMES_CACHE_PATH)) {
      return;
    }

    const data = fs.readFileSync(CLASSNAMES_CACHE_PATH, 'utf8');
    this.classnameCache = JSON.parse(data);
    this.classnameUses = {};

    this.hashes = {};
    Object.keys(this.classnameCache).forEach(key => {
      this.hashes[this.classnameCache[key]] = key;
    });
  }

  // Write this.classnameCache out to disk, skipping any classes that have had
  // no uses (aka: a classname has been removed from CSS since last execution).
  saveClassnamesCache() {
    const usedClassnameCache = {};
    Object.keys(this.classnameCache).forEach(classname => {
      if (this.classnameUses[classname]) {
        usedClassnameCache[classname] = this.classnameCache[classname];
      }
    });

    fs.writeFileSync(CLASSNAMES_CACHE_PATH, JSON.stringify(usedClassnameCache));
  }

  // Minify a classname and return the hash. If there was a collision with
  // another value, add a modifier. The new value will be added to the cache and
  // saved out to disk.
  getMinifiedClassname(classname) {
    if (this.classnameCache[classname]) {
      return this.classnameCache[classname];
    }

    let minified;
    let incrementor = 0;

    do {
      minified = ClassnameBuilder.encodeInt(
        ClassnameBuilder.hashStrToInt(classname) + incrementor,
        2,
        2
      );
      incrementor += 1;
    } while (this.hashes[minified]);

    this.hashes[minified] = classname;
    this.classnameCache[classname] = minified;
    this.classnameUses[classname] = (this.classnameUses[classname] || 0) + 1;

    this.saveClassnamesCache();

    return minified;
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
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_'[
          remainder & 63
        ] + result;
      remainder >>>= 6;
    }
    /* eslint-enable no-bitwise */

    return result.substr(-maxLength);
  }
}

const instance = new ClassnameBuilder();
export default instance;
