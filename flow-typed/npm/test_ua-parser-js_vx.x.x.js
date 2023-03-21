// Source: https://github.com/flow-typed/flow-typed/blob/7230a2c59c0300365377d5d0b45d0b7246fe3421/definitions/npm/ua-parser-js_v0.7.x/flow_v0.104.x-/ua-parser-js_v0.7.x.js
declare module 'ua-parser-js' {
  declare type UABrowser = {
    name: string,
    version: string,
    ...
  };

  declare type UACpu = { architecture: string, ... };

  declare type UADevice = {
    model: string,
    type:
      | 'console'
      | 'mobile'
      | 'tablet'
      | 'smarttv'
      | 'wearable'
      | 'embedded',
    vendor: string,
    ...
  };

  declare type UAEngine = {
    name: string,
    version: string,
    ...
  };

  declare type UAOs = {
    name: string,
    version: string,
    ...
  };

  declare type UAResult = {
    browser: UABrowser,
    cpu: UACpu,
    device: UADevice,
    engine: UAEngine,
    os: UAOs,
    ua: string,
    ...
  };

  declare class UAParser {
    /**
     * NOTE: It's a bit of a weird API, but the main export (UAParser) can be
     * instantiated as a class (option 2) - which forces the called to
     * subsequently call .setUA() and then .getResult() to obtain the parsed
     * result, or be invoked like a function, which directly the parsed result.
     */

    // Option 1: When used as a function
    static (userAgent?: string): UAResult;

    // Option 2: When used as a class
    constructor(): UAParser;
    getBrowser(): UABrowser;
    getCPU(): UACpu;
    getDevice(): UADevice;
    getEngine(): UAEngine;
    getOS(): UAOs;
    getResult(): UAResult;
    getUA(): string;
    setUA(ua: string): UAParser;
  }

  declare export default typeof UAParser;
}
