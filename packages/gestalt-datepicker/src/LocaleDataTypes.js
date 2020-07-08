// @flow strict

// flowlint unclear-type:off

// LocaleData type from https://github.com/date-fns/date-fns/blob/81ab18785146405ca2ae28710cdfbb13a294ec50/src/locale/af/index.js.flow
/* eslint-disable flowtype/require-exact-type */
export type LocaleData = {
  code?: string,
  formatDistance?: (...args: Array<any>) => any,

  formatRelative?: (...args: Array<any>) => any,
  localize?: {
    ordinalNumber: (...args: Array<any>) => any,
    era: (...args: Array<any>) => any,
    quarter: (...args: Array<any>) => any,
    month: (...args: Array<any>) => any,
    day: (...args: Array<any>) => any,
    dayPeriod: (...args: Array<any>) => any,
  },
  formatLong?: {
    date: (...args: Array<any>) => any,
    time: (...args: Array<any>) => any,
    dateTime: (...args: Array<any>) => any,
  },
  match?: {
    ordinalNumber: (...args: Array<string>) => any,
    era: (...args: Array<any>) => any,
    quarter: (...args: Array<any>) => any,
    month: (...args: Array<any>) => any,
    day: (...args: Array<any>) => any,
    dayPeriod: (...args: Array<any>) => any,
  },
  options?: {
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6,
    firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7,
  },
};
/* eslint-enable flowtype/require-exact-type */
