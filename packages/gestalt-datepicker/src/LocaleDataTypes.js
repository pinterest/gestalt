// @flow strict
import PropTypes from 'prop-types';

// flowlint unclear-type:off

// LocaleData type from https://github.com/date-fns/date-fns/blob/81ab18785146405ca2ae28710cdfbb13a294ec50/src/locale/af/index.js.flow
export type LocaleData = {|
  code?: string,
  formatDistance?: (...args: $ReadOnlyArray<any>) => any,

  formatRelative?: (...args: $ReadOnlyArray<any>) => any,
  localize?: {|
    ordinalNumber: (...args: $ReadOnlyArray<any>) => any,
    era: (...args: $ReadOnlyArray<any>) => any,
    quarter: (...args: $ReadOnlyArray<any>) => any,
    month: (...args: $ReadOnlyArray<any>) => any,
    day: (...args: $ReadOnlyArray<any>) => any,
    dayPeriod: (...args: $ReadOnlyArray<any>) => any,
  |},
  formatLong?: {|
    date: (...args: $ReadOnlyArray<any>) => any,
    time: (...args: $ReadOnlyArray<any>) => any,
    dateTime: (...args: $ReadOnlyArray<any>) => any,
  |},
  match?: {|
    ordinalNumber: (...args: $ReadOnlyArray<string>) => any,
    era: (...args: $ReadOnlyArray<any>) => any,
    quarter: (...args: $ReadOnlyArray<any>) => any,
    month: (...args: $ReadOnlyArray<any>) => any,
    day: (...args: $ReadOnlyArray<any>) => any,
    dayPeriod: (...args: $ReadOnlyArray<any>) => any,
  |},
  options?: {|
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6,
    firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7,
  |},
|};

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
