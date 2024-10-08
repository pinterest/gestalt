const StyleDictionary = require('style-dictionary');

const { registerTokenTransformGroups } = require('./transformers/transformGroups');
const { registerTokenTransforms } = require('./transformers/transforms');
const { registerTokenFilters } = require('./filters');
const { getWebConfig } = require('./platforms/web');
const { getAndroidConfiguration } = require('./platforms/android');
const { getIOSConfiguration } = require('./platforms/ios');
const { registerWebFormats } = require('./formatters/registerWebFormats');
const { registerFileHeaders } = require('./headers/fileheader');

const platformFileMap = {
  web: ['css', 'json', 'js'],
  android: ['android'],
  ios: ['ios', 'ios-swift'],
};

registerFileHeaders(StyleDictionary);
registerWebFormats(StyleDictionary);
registerTokenFilters(StyleDictionary);
registerTokenTransforms(StyleDictionary);
registerTokenTransformGroups(StyleDictionary);

['classic', 'vr-theme', 'vr-theme-web-mapping'].forEach((theme) =>
  ['light', 'dark'].forEach((mode) => {
    // THIS NEEDS A CLEANUP BUT INTERIM SOLUTION 'default' MUST BE LAST
    ['ck', 'ja', 'tall', 'th', 'vi', 'default'].forEach((lang) => {
      // only generate languages for the vr-themes
      const language = theme === 'vr-theme' || theme === 'vr-theme-web-mapping' ? lang : undefined;

      // iOS platform
      if (theme !== 'vr-theme-web-mapping') {
        const StyleDictionaryIOS = StyleDictionary.extend(
          getIOSConfiguration({ mode, theme, language }),
        );
        platformFileMap.ios.forEach((platform) => StyleDictionaryIOS.buildPlatform(platform));

        // // Android platform
        const StyleDictionaryAndroid = StyleDictionary.extend(
          getAndroidConfiguration({ mode, theme, language }),
        );
        platformFileMap.android.forEach((platform) =>
          StyleDictionaryAndroid.buildPlatform(platform),
        );
      }

      // web platform
      const StyleDictionaryWeb = StyleDictionary.extend(getWebConfig({ mode, theme, language }));
      platformFileMap.web.forEach((platform) => StyleDictionaryWeb.buildPlatform(platform));
    });
  }),
);
