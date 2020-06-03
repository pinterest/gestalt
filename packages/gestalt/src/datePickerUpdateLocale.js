// @flow strict-local
import { registerLocale } from 'react-datepicker';
// import {
//   arSA,
//   cs,
//   da,
//   de,
//   el,
//   enGB,
//   enUS,
//   es,
//   fi,
//   fr,
//   hi,
//   hu,
//   id,
//   it,
//   ja,
//   ko,
//   ms,
//   nb,
//   nl,
//   pl,
//   ptBR,
//   pt,
//   ro,
//   ru,
//   sk,
//   sv,
//   th,
//   tr,
//   uk,
//   vi,
//   zhCN,
//   zhTW,
// } from 'date-fns/locale';

// const map = {
//   'ar-SA': arSA, // Arabic (Saudi Arabia)
//   'cs-CZ': cs, // Czech
//   'da-DK': da, // Danish
//   de, // German
//   'el-GR': el, // Greek
//   'en-AU': enGB, // English (Australia)
//   'en-GB': enGB, // English (British)
//   'en-IN': enGB, // English (India)
//   'en-US': enUS, // English (US)
//   'es-419': es, // Spanish (Latin America)
//   'es-AR': es, // Spanish (Argentina)
//   'es-ES': es, // Spanish (Spain)
//   'es-MX': es, // Spanish (Mexico)
//   'fi-FI': fi, // Finnish
//   fr, // French
//   'hi-IN': hi, // Hindi
//   'hu-HU': hu, // Hungarian
//   'id-ID': id, // Indonesian
//   it, // Italian
//   ja, // Japanese
//   'ko-KR': ko, // Korean
//   'ms-MY': ms, // Malay
//   'nb-NO': nb, // Norwegian (Bokm\u00e5l)
//   nl, // Dutch
//   'pl-PL': pl, // Polish (Poland)
//   'pt-BR': ptBR, // Portuguese (Brazilian)
//   'pt-PT': pt, // Portuguese (Portugal)
//   'ro-RO': ro, // Romanian
//   'ru-RU': ru, // Russian
//   'sk-SK': sk, // Slovak
//   'sv-SE': sv, // Swedish
//   'th-TH': th, // Thai
//   tr, // Turkish
//   'uk-UA': uk, // Ukrainian
//   'vi-VN': vi, // Vietnamese
//   'zh-CN': zhCN, // Chinese (Simplified)
//   'zh-TW': zhTW, // Chinese (Traditional)
// };

// export default async function datePickerUpdateLocale(locale: string) {
//   if (!map[locale]) {
//     return Promise.resolve(null);
//   }

//   const importedLocale = await map[locale];
//   registerLocale(locale, importedLocale);
//   return importedLocale;
// }

const localeLoaders = {
  'ar-SA': () => import('date-fns/locale/ar-SA/index.js'), // Arabic (Saudi Arabia)
  'cs-CZ': () => import('date-fns/locale/cs/index.js'), // Czech
  'da-DK': () => import('date-fns/locale/da/index.js'), // Danish
  de: () => import('date-fns/locale/de/index.js'), // German
  'el-GR': () => import('date-fns/locale/el/index.js'), // Greek
  'en-AU': () => import('date-fns/locale/en-GB/index.js'), // English (Australia)
  'en-GB': () => import('date-fns/locale/en-GB/index.js'), // English (British)
  'en-IN': () => import('date-fns/locale/en-GB/index.js'), // English (India)
  'en-US': () => import('date-fns/locale/en-US/index.js'), // English (US)
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

export default async function datePickerUpdateLocale(locale: string) {
  if (!(locale in localeLoaders)) {
    return Promise.resolve(null);
  }

  const importedLocale = await localeLoaders[locale]();
  registerLocale(locale, importedLocale);
  return importedLocale;
}
