// @flow strict-local
const format: { [string]: string } = {
  'ar-SA': 'MM/dd/yyyy', // Arabic (Saudi Arabia)
  cs: 'dd.MM.yyyy', // Czech
  da: 'dd/MM/yyyy', // Danish
  de: 'dd.MM.yyyy', // German
  el: 'dd/MM/yyyy', // Greek
  'en-GB': 'dd/MM/yyyy', // English (British)
  'en-US': 'MM/dd/yyyy', // English
  es: 'dd/MM/yyyy', // Spanish
  fi: 'dd.MM.yyyy', // Finnish
  fr: 'dd/MM/yyyy', // French
  hi: 'dd/MM/yyyy', // Hindi
  hu: 'yyyy. MM. dd', // Hungarian
  id: 'dd/MM/yyyy', // Indonesian
  it: 'dd/MM/yyyy', // Italian
  ja: 'yyyy/MM/dd', // Japanese
  ko: 'yyyy.MM.dd', // Korean
  ms: 'dd/MM/yyyy', // Malay
  nb: 'dd.MM.yyyy', // Norwegian (Bokm\u00e5l)
  nl: 'dd-MM-yyyy', // Dutch
  pl: 'dd.MM.yyyy', // Polish (Poland)
  pt: 'dd/MM/yyyy', // Portuguese
  ro: 'dd/MM/yyyy', // Romanian
  ru: 'dd.MM.yyyy', // Russian
  sk: 'dd. MM. yyyy', // Slovak
  sv: 'yyyy-MM-dd', // Swedish
  th: 'dd/MM/yyyy', // Thai
  tr: 'dd.MM.yyyy', // Turkish
  uk: 'dd.MM.yyyy', // Ukrainian
  vi: 'dd/MM/yyyy', // Vietnamese
  'zh-CN': 'yyyy-MM-dd', // Chinese (Simplified)
  'zh-TW': 'yyyy-MM-dd', // Chinese (Traditional)
};

export default format;
