// eslint-disable-next-line no-unused-vars -- Importing for type definitions
const StyleDictionary = require('style-dictionary');

const baseTransforms = ['attribute/custom-cti'];

const webCssTransformGroup = [
  ...baseTransforms,
  'name/cti/kebab',
  'name/conflictFixing',
  'value/elevation/css',
  'font-size/px',
  'line-height/px',
  'value/duration/css',
  'value/easing/css',
  'color/css',
  'color/css/hexrgba',
];

const webJsTransformGroup = [
  ...baseTransforms,
  'name/cti/pascal',
  'name/conflictFixing',
  'value/elevation/css',
  'font-size/px',
  'line-height/px',
  'value/duration/css',
  'value/easing/css',
  'color/hex',
];

const androidTransformGroup = [
  ...baseTransforms,
  'name/cti/snake',
  'name/conflictFixing',
  'color/hex8android',
  'font-size/px',
  'size/pxToDpOrSp',
  'value/easing/android',
];

const iOSTransformGroup = [
  ...baseTransforms,
  'name/cti/pascal',
  'name/conflictFixing',
  'value/elevation/ios',
  'color/UIColor',
  'content/objC/literal',
  'asset/objC/literal',
  'font-size/px',
  'size/remToPt',
  'font/objC/literal',
  'value/easing/ios',
];

const iOSSwiftEnumTransformGroup = [
  ...baseTransforms,
  'name/custom-ti/camel',
  'name/conflictFixing',
  'value/elevation/ios',
  'color/UIColorSwift',
  'content/swift/literal',
  'asset/swift/literal',
  'size/swift/remToCGFloat',
  'font-size/px',
  'font/swift/literal',
  'value/duration/ios',
  'value/easing/ios-swift',
];

/**
 * Registers all the transform groups to the StyleDictionary root
 * @param {StyleDictionary} sd - StyleDictionary root
 */
function registerTokenTransformGroups(sd) {
  // Web CSS Transform Groups
  sd.registerTransformGroup({
    name: 'webCssTransformGroup',
    transforms: webCssTransformGroup,
  });

  // Web JS Transform Groups
  sd.registerTransformGroup({
    name: 'webJsTransformGroup',
    transforms: webJsTransformGroup,
  });

  // Android Transform Groups
  sd.registerTransformGroup({
    name: 'androidTransformGroup',
    transforms: androidTransformGroup,
  });

  // iOS Tranform Groups
  sd.registerTransformGroup({
    name: 'iOSTransformGroup',
    transforms: iOSTransformGroup,
  });

  sd.registerTransformGroup({
    name: 'iOSSwiftEnumTransformGroup',
    transforms: iOSSwiftEnumTransformGroup,
  });
}

module.exports = { registerTokenTransformGroups };
