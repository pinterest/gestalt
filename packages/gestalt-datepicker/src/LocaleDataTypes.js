// @flow strict
import PropTypes from 'prop-types';

// flowlint unclear-type:off

// LocaleData type from https://github.com/date-fns/date-fns/blob/81ab18785146405ca2ae28710cdfbb13a294ec50/src/locale/af/index.js.flow
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

// $FlowFixMe[signature-verification-failure]
export const LocaleDataPropTypes = PropTypes.shape({
  code: PropTypes.string,
  formatDistance: PropTypes.func,
  formatRelative: PropTypes.func,
  localize: PropTypes.shape({
    ordinalNumber: PropTypes.func,
    era: PropTypes.func,
    quarter: PropTypes.func,
    month: PropTypes.func,
    day: PropTypes.func,
    dayPeriod: PropTypes.func,
  }),
  formatLong: PropTypes.shape({
    date: PropTypes.func,
    time: PropTypes.func,
    dateTime: PropTypes.func,
  }),
  match: PropTypes.shape({
    ordinalNumber: PropTypes.func,
    era: PropTypes.func,
    quarter: PropTypes.func,
    month: PropTypes.func,
    day: PropTypes.func,
    dayPeriod: PropTypes.func,
  }),
  options: PropTypes.shape({
    weekStartsOn: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]),
    firstWeekContainsDate: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]),
  }),
});
