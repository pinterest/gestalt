import fs from 'fs';
import { hashStrToInt, encodeInt } from './crypto.js';

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
      minified = encodeInt(hashStrToInt(classname) + incrementor, 2, 2);
      incrementor += 1;
    } while (this.hashes[minified]);

    this.hashes[minified] = classname;
    this.classnameCache[classname] = minified;
    this.classnameUses[classname] = (this.classnameUses[classname] || 0) + 1;

    this.saveClassnamesCache();

    return minified;
  }
}

const instance = new ClassnameBuilder();
export default instance;
