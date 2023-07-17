import React = require('react');

/**
 * =========================================================
 * ====================== GESTALT PACKAGE DEPENDENCIES =====================
 * =========================================================
 */
interface RadioGroupRadioButtonProps {
  id: string;
  onChange: AbstractEventHandler<React.SyntheticEvent<HTMLInputElement>, { checked: boolean }>;
  value: string;
  checked?: boolean | undefined;
  disabled?: boolean | undefined;
  helperText?: string | undefined;
  image?: Node | undefined;
  label?: string | undefined;
  name?: string | undefined;
  size?: 'sm' | 'md' | undefined;
}

interface RadioGroupSubComponents {
  RadioButton: React.FunctionComponent<RadioGroupRadioButtonProps>;
}

interface RadioGroupProps {
  id: string;
  children: Node;
  legend: string;
  direction?: 'column' | 'row' | undefined;
  errorMessage?: string | undefined;
  legendDisplay?: 'visible' | 'hidden' | undefined;
}

declare const RadioGroup: React.FunctionComponent<RadioGroupProps> & RadioGroupSubComponents;

/**
 * =========================================================
 * ====================== SHARED UTILS =====================
 * =========================================================
 */

type Node = React.ReactNode;

type AbstractEventHandler<T extends React.SyntheticEvent<HTMLElement> | Event, U = {}> = (
  arg: U & {
    readonly event: T;
  },
) => void;

type ReactForwardRef<T, P> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<P> & React.RefAttributes<T>
>;

/**
 * =========================================================
 * ====================== SHARED TYPED =====================
 * =========================================================
 */

// All these types are copies form https://github.com/date-fns/date-fns

type Era = 0 | 1;

type Quarter = 1 | 2 | 3 | 4;

type Day = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type Month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

type Unit =
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'dayOfYear'
  | 'date'
  | 'week'
  | 'month'
  | 'quarter'
  | 'year';

type FirstWeekContainsDate = 1 | 4;

interface LocaleOptions {
  weekStartsOn?: Day;
  firstWeekContainsDate?: FirstWeekContainsDate;
}

type FormatDistanceToken =
  | 'lessThanXSeconds'
  | 'xSeconds'
  | 'halfAMinute'
  | 'lessThanXMinutes'
  | 'xMinutes'
  | 'aboutXHours'
  | 'xHours'
  | 'xDays'
  | 'aboutXWeeks'
  | 'xWeeks'
  | 'aboutXMonths'
  | 'xMonths'
  | 'aboutXYears'
  | 'xYears'
  | 'overXYears'
  | 'almostXYears';

type FormatDistanceLocale<Value> = {
  [token in FormatDistanceToken]: Value;
};

interface FormatDistanceFnOptions {
  addSuffix?: boolean;
  comparison?: -1 | 0 | 1;
}

type FormatDistanceTokenFn = (count: number, options?: FormatDistanceFnOptions) => string;

interface FormatDistanceFnOptions {
  addSuffix?: boolean;
  comparison?: -1 | 0 | 1;
}

type FormatDistanceFn = (
  token: FormatDistanceToken,
  count: number,
  options?: FormatDistanceFnOptions,
) => string;

type FormatRelativeTokenFn = <DateType extends Date>(
  date: DateType | number,
  baseDate: DateType | number,
  options?: { weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6 },
) => string;

type FormatRelativeToken = 'lastWeek' | 'yesterday' | 'today' | 'tomorrow' | 'nextWeek' | 'other';

interface FormatRelativeFnOptions {
  weekStartsOn?: Day;
  locale?: LocaleData;
}

type FormatRelativeFn = <DateType extends Date>(
  token: FormatRelativeToken,
  date: DateType,
  baseDate: DateType,
  options?: FormatRelativeFnOptions,
) => string;

// TODO: You're real champion if you're actually get back to it. Proud of you!
// Try to get rid of this and (especially) ArgCallback types because the only
// case when it's helpful is when using quarter. Maybe.
type LocalizeUnitIndex<Unit extends LocaleUnit | number> = Unit extends LocaleUnit
  ? LocalizeUnitValuesIndex<LocalizeUnitValues<Unit>>
  : number;

type LocalizeFn<
  Result extends LocaleUnit | number,
  ArgCallback extends BuildLocalizeFnArgCallback<Result> | undefined = undefined,
> = (
  value: ArgCallback extends undefined
    ? Result
    : Result extends Quarter
    ? Quarter
    : LocalizeUnitIndex<Result>,
  options?: {
    width?: LocalePatternWidth;
    context?: 'formatting' | 'standalone';
    unit?: Unit;
  },
) => string;

interface Localize {
  ordinalNumber: LocalizeFn<number, BuildLocalizeFnArgCallback<number> | undefined>;
  era: LocalizeFn<Era, undefined>;
  quarter: LocalizeFn<Quarter, BuildLocalizeFnArgCallback<Quarter>>;
  month: LocalizeFn<Month, undefined>;
  day: LocalizeFn<Day, undefined>;
  dayPeriod: LocalizeFn<LocaleDayPeriod, undefined>;
}

interface BuildMatchFnArgs<
  Result extends LocaleUnit,
  DefaultMatchWidth extends LocalePatternWidth,
  DefaultParseWidth extends LocalePatternWidth,
> {
  matchPatterns: MatchPatterns<DefaultMatchWidth>;
  defaultMatchWidth: DefaultMatchWidth;
  parsePatterns: ParsePatterns<Result, DefaultParseWidth>;
  defaultParseWidth: DefaultParseWidth;
  valueCallback?: MatchValueCallback<Result extends LocaleDayPeriod ? string : number, Result>;
}

type MatchPatterns<DefaultWidth extends LocalePatternWidth> = {
  [pattern in LocalePatternWidth]?: RegExp;
} & { [key in DefaultWidth]: RegExp };

type ParsePatterns<Result extends LocaleUnit, DefaultWidth extends LocalePatternWidth> = {
  [pattern in LocalePatternWidth]?: ParsePattern<Result>;
} & { [key in DefaultWidth]: ParsePattern<Result> };

type ParsePattern<Result extends LocaleUnit> = Result extends LocaleDayPeriod
  ? Record<LocaleDayPeriod, RegExp>
  : Result extends Quarter
  ? readonly [RegExp, RegExp, RegExp, RegExp]
  : Result extends Era
  ? readonly [RegExp, RegExp]
  : Result extends Day
  ? readonly [RegExp, RegExp, RegExp, RegExp, RegExp, RegExp, RegExp]
  : Result extends Month
  ? readonly [
      RegExp,
      RegExp,
      RegExp,
      RegExp,
      RegExp,
      RegExp,
      RegExp,
      RegExp,
      RegExp,
      RegExp,
      RegExp,
      RegExp,
    ]
  : never;

type BuildMatchFn<
  Result extends LocaleUnit,
  DefaultMatchWidth extends LocalePatternWidth,
  DefaultParseWidth extends LocalePatternWidth,
> = (args: BuildMatchFnArgs<Result, DefaultMatchWidth, DefaultParseWidth>) => MatchFn<Result>;

type MatchFn<Result, ExtraOptions = Record<string, unknown>> = (
  str: string,
  options?: {
    width?: LocalePatternWidth;
    /**
     * @deprecated Map the value manually instead.
     * @example
     * const matchResult = locale.match.ordinalNumber('1st')
     * if (matchResult) {
     *   matchResult.value = valueCallback(matchResult.value)
     * }
     */
    valueCallback?: MatchValueCallback<string, Result>;
  } & ExtraOptions,
) => { value: Result; rest: string } | null;

type MatchValueCallback<Arg, Result> = (value: Arg) => Result;

interface Match {
  ordinalNumber: MatchFn<
    number,
    {
      unit: LocaleOrdinalUnit;
    }
  >;
  era: MatchFn<Era>;
  quarter: MatchFn<Quarter>;
  month: MatchFn<Month>;
  day: MatchFn<Day>;
  dayPeriod: MatchFn<LocaleDayPeriod>;
}

type LocaleOrdinalUnit =
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'quarter'
  | 'year'
  | 'date'
  | 'dayOfYear';

type LocalePatternWidth = 'narrow' | 'short' | 'abbreviated' | 'wide' | 'any';

type LocaleDayPeriod =
  | 'am'
  | 'pm'
  | 'midnight'
  | 'noon'
  | 'morning'
  | 'afternoon'
  | 'evening'
  | 'night';

type LocaleOptionUnit =
  | 'year'
  | 'quarter'
  | 'month'
  | 'week'
  | 'date'
  | 'dayOfYear'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second';

type FormatLongWidth = 'full' | 'long' | 'medium' | 'short' | 'any';

type DateTimeFormat = { [format in FormatLongWidth]: string };

type LocaleUnit = Era | Quarter | Month | Day | LocaleDayPeriod;

interface FormatLong {
  date: FormatLongFn;
  time: FormatLongFn;
  dateTime: FormatLongFn;
}

interface FormatLongFnOptions {
  width?: FormatLongWidth;
}

type FormatLongFn = (options: FormatLongFnOptions) => string;

type BuildLocalizeFnArgCallback<Result extends LocaleUnit | number> = (
  value: Result,
) => LocalizeUnitIndex<Result>;

type LocalizeEraValues = readonly [string, string];

type LocalizeQuarterValues = readonly [string, string, string, string];

type LocalizeDayValues = readonly [string, string, string, string, string, string, string];

type LocalizeMonthValues = readonly [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

type LocalizeUnitValuesIndex<Values extends LocalizeUnitValues<any>> = Values extends Record<
  LocaleDayPeriod,
  string
>
  ? string
  : Values extends LocalizeEraValues
  ? Era
  : Values extends LocalizeQuarterValues
  ? Quarter
  : Values extends LocalizeDayValues
  ? Day
  : Values extends LocalizeMonthValues
  ? Month
  : never;

type LocalizeUnitValues<Unit extends LocaleUnit> = Unit extends LocaleDayPeriod
  ? Record<LocaleDayPeriod, string>
  : Unit extends Era
  ? LocalizeEraValues
  : Unit extends Quarter
  ? LocalizeQuarterValues
  : Unit extends Day
  ? LocalizeDayValues
  : Unit extends Month
  ? LocalizeMonthValues
  : never;

interface LocaleData {
  code: string;
  formatDistance: FormatDistanceFn;
  formatRelative: FormatRelativeFn;
  localize: Localize;
  formatLong: FormatLong;
  match: Match;
  options?: LocaleOptions;
}

/**
 * =========================================================
 * =============== COMPONENT API INTERFACES  ===============
 * =========================================================
 */

export interface DateRangeProps {
  endDateErrorMessage?: string | null;
  endDateValue: Date | null;
  localeData?: LocaleData;
  maxDate?: Date;
  minDate?: Date;
  onCancel: () => void;
  onEndDateBlur?: AbstractEventHandler<
        React.FocusEvent<HTMLInputElement>,
        {
          value: string;
        }
      >;
  onEndDateChange: (arg: { value: Date | null }) => void;
  onEndDateError: (arg: {
    errorMessage: string,
    value: Date | null,
  }) => void;
  onEndDateFocus?: AbstractEventHandler<
        React.FocusEvent<HTMLInputElement>,
        {
          value: string,
        }
      >;
  onStartDateBlur?: AbstractEventHandler<
        React.FocusEvent<HTMLInputElement>,
        {
          value: string,
        }
      >;
  onStartDateChange: (arg: { value: Date | null }) => void;
  onStartDateError: (arg: {
    errorMessage: string,
    value: Date | null,
  }) => void;
  onStartDateFocus?: AbstractEventHandler<
        React.FocusEvent<HTMLInputElement>,
        {
          value: string,
        }
      >;
  onSubmit: () => void;
  radioGroup?: React.ReactElement<typeof RadioGroup>;
  startDateValue: Date | null;
  startDateErrorMessage?: string | null;
}

export interface DatePickerProps {
  id: string;
  disabled?: boolean | undefined;
  errorMessage?: string | undefined;
  excludeDates?: Date[] | undefined;
  helperText?: string | undefined;
  idealDirection?: 'up' | 'right' | 'down' | 'left' | undefined;
  includeDates?: Date[] | undefined;
  label?: string | undefined;
  localeData?: LocaleData | undefined;
  maxDate?: Date | undefined;
  minDate?: Date | undefined;
  name?: string | undefined;
  nextRef?: { current: HTMLElement | null } | undefined;
  onChange: AbstractEventHandler<React.SyntheticEvent<HTMLInputElement>, { value: Date | null }>;
  placeholder?: string | undefined;
  rangeEndDate?: Date | null | undefined;
  rangeSelector?: 'start' | 'end' | undefined;
  rangeStartDate?: Date | null | undefined;
  ref?: { current: HTMLElement | null } | undefined;
  selectLists?: ('month' | 'year')[] | undefined;
  value?: Date | null | undefined;
}

export interface DateFieldProps {
  id: string;
  onChange: (arg: { value: Date | null | undefined }) => void;
  onClearInput: () => void;
  autoComplete?: 'bday' | 'off' | undefined;
  disabled?: boolean;
  disableRange?: 'disableFuture' | 'disablePast' | undefined;
  errorMessage?: string | undefined;
  helperText?: string | undefined;
  label?: string | undefined;
  labelDisplay?: 'visible' | 'hidden' | undefined;
  localeData?: LocaleData | undefined;
  maxDate?: Date | undefined;
  minDate?: Date | undefined;
  mobileEnterKeyHint?:
    | 'enter'
    | 'done'
    | 'go'
    | 'next'
    | 'previous'
    | 'search'
    | 'send'
    | undefined;
  name?: string | undefined;
  onBlur?:
    | AbstractEventHandler<
        React.FocusEvent<HTMLInputElement>,
        {
          value: string;
        }
      >
    | undefined;
  onError?: (arg: { errorMessage: string; value: Date | null | undefined }) => void;
  onFocus?:
    | AbstractEventHandler<React.SyntheticEvent<HTMLInputElement>, { value: string }>
    | undefined;
  readOnly?: boolean | undefined;
  value: Date | null | undefined;
}

/**
 * =========================================================
 * ========================= INDEX =========================
 * =========================================================
 */

/**
 * https://gestalt.pinterest.systems/web/daterange
 */
export const DateRange: React.FunctionComponent<DateRangeProps>;

/**
 * https://gestalt.pinterest.systems/web/datepicker
 */
export const DatePicker: ReactForwardRef<HTMLInputElement, DatePickerProps>;

/**
 * https://gestalt.pinterest.systems/web/datefield
 */
export const DateField: React.FunctionComponent<DateFieldProps>;
