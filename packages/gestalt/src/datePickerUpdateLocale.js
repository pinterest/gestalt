// @flow strict-local
import { registerLocale } from 'react-datepicker';

const localeLoaders = {
  'ar-SA': () => import('date-fns/locale/ar-SA/index.js'), // Arabic (Saudi Arabia)
  'cs-CZ': () => import('date-fns/locale/cs/index.js'), // Czech
  'da-DK': () => import('date-fns/locale/da/index.js'), // Danish
  de: () => import('date-fns/locale/de/index.js'), // German
  'el-GR': () => import('date-fns/locale/el/index.js'), // Greek
  'en-AU': () => import('date-fns/locale/en-GB/index.js'), // English (Australia)
  'en-GB': () => import('date-fns/locale/en-GB/index.js'), // English (British)
  'en-IN': () => import('date-fns/locale/en-GB/index.js'), // English (India)
  'en-US': () => import('date-fns/locale/en-US/index.js'), // English
  'es-419': () => import('date-fns/locale/es/index.js'), // Spanish (Latin America)
  'es-AR': () => import('date-fns/locale/es/index.js'), // Spanish (Argentina)
  'es-ES': () => import('date-fns/locale/es/index.js'), // Spanish (Spain)
  'es-MX': () => import('date-fns/locale/es/index.js'), // Spanish (Mexico)
  'fi-FI': () => import('date-fns/locale/fi/index.js'), // Finnish
  fr: () => import('date-fns/locale/fr/index.js'), // French
  'hi-IN': () => import('date-fns/locale/hi/index.js'), // Hindi
  'hu-HU': () => import('date-fns/locale/hu/index.js'), // Hungarian
  'id-ID': () => import('date-fns/locale/id/index.js'), // Indonesian
  it: () => import('date-fns/locale/it/index.js'), // Italian
  ja: () => import('date-fns/locale/ja/index.js'), // Japanese
  'ko-KR': () => import('date-fns/locale/ko/index.js'), // Korean
  'ms-MY': () => import('date-fns/locale/ms/index.js'), // Malay
  'nb-NO': () => import('date-fns/locale/nb/index.js'), // Norwegian (Bokm\u00e5l)
  nl: () => import('date-fns/locale/nl/index.js'), // Dutch
  'pl-PL': () => import('date-fns/locale/pl/index.js'), // Polish (Poland)
  'pt-BR': () => import('date-fns/locale/pt-BR/index.js'), // Portuguese (Brazilian)
  'pt-PT': () => import('date-fns/locale/pt/index.js'), // Portuguese (Portugal)
  'ro-RO': () => import('date-fns/locale/ro/index.js'), // Romanian
  'ru-RU': () => import('date-fns/locale/ru/index.js'), // Russian
  'sk-SK': () => import('date-fns/locale/sk/index.js'), // Slovak
  'sv-SE': () => import('date-fns/locale/sv/index.js'), // Swedish
  'th-TH': () => import('date-fns/locale/th/index.js'), // Thai
  tr: () => import('date-fns/locale/tr/index.js'), // Turkish
  'uk-UA': () => import('date-fns/locale/uk/index.js'), // Ukrainian
  'vi-VN': () => import('date-fns/locale/vi/index.js'), // Vietnamese
  'zh-CN': () => import('date-fns/locale/zh-CN/index.js'), // Chinese (Simplified)
  'zh-TW': () => import('date-fns/locale/zh-TW/index.js'), // Chinese (Traditional)
};

export default function datePickerUpdateLocale(locale: string) {
  if (locale in localeLoaders) {
    return localeLoaders[locale]().then(importedLocale => {
      registerLocale(locale, importedLocale);
      return importedLocale;
    });
  }
  return Promise.resolve(null);
}
