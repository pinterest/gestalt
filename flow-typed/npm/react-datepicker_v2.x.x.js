// react-datepicker flow-typed version based on https://github.com/Hacker0x01/react-datepicker/blob/master/docs/datepicker.md
// LocaleData type from https://github.com/date-fns/date-fns/blob/81ab18785146405ca2ae28710cdfbb13a294ec50/src/locale/af/index.js.flow

declare module 'react-datepicker' {
  import type { Node as ReactNode, ElementRef } from 'react';

  declare type PopperPlacementPositions =
    | 'auto'
    | 'auto-start'
    | 'auto-end'
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'left'
    | 'left-start'
    | 'left-end';

  declare type LocaleData = {
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

  declare export function registerLocale(string, LocaleData): void

  declare type Props = {|
    adjustDateOnChange?: boolean,
    allowSameDay?: boolean,
    ariaLabelClose?: string,
    ariaLabelledBy?: string,
    autoComplete?: string,
    autoFocus?: boolean,
    calendarClassName?: string,
    calendarContainer?: any,
    children?: Node,
    chooseDayAriaLabelPrefix?: string,
    className?: string,
    customInput?: React$Element<any>,
    customInputRef?: string,
    dateFormat: ?string,
    dateFormatCalendar?: string,
    dayClassName?: any,
    weekDayClassName?: any,
    disabledDayAriaLabelPrefix?: string,
    monthClassName?: any,
    timeClassName?: any,
    disabled?: boolean,
    disabledKeyboardNavigation?: boolean,
    dropdownMode?: "scroll" | "select",
    endDate?: Date,
    excludeDates?: Array<Date>,
    filterDate?: any,
    fixedHeight?: boolean,
    formatWeekNumber?: any,
    highlightDates?: Array<Date>,
    id?: string,
    includeDates?: Array<Date>,
    includeTimes?: Array<Date>,
    injectTimes?: Array<Date>,
    inline?: boolean,
    isClearable?: boolean,
    locale?: ?string,
    maxDate?: Date,
    minDate?: Date,
    monthsShown?: number,
    name?: string,
    onBlur?: any,
    onChange: any,
    onSelect?: any,
    onWeekSelect?: any,
    onClickOutside?: any,
    onChangeRaw?: any,
    onFocus?: any,
    onInputClick?: any,
    onKeyDown?: any,
    onMonthChange?: any,
    onYearChange?: any,
    onInputError?: any,
    open?: boolean,
    onCalendarOpen?: any,
    onCalendarClose?: any,
    openToDate?: Date,
    peekNextMonth?: boolean,
    placeholderText?: string,
    popperContainer?: any,
    popperClassName?: string, // <PopperComponent/> props
    popperModifiers?: any, // <PopperComponent/> props
    popperPlacement?: PopperPlacementPositions, // <PopperComponent/> props
    popperProps?: any,
    preventOpenOnFocus?: boolean,
    readOnly?: boolean,
    required?: boolean,
    scrollableYearDropdown?: boolean,
    scrollableMonthYearDropdown?: boolean,
    selected?: ?Date,
    selectsEnd?: boolean,
    selectsStart?: boolean,
    selectsRange?: boolean,
    showMonthDropdown?: boolean,
    showPreviousMonths?: boolean,
    showMonthYearDropdown?: boolean,
    showWeekNumbers?: boolean,
    showYearDropdown?: boolean,
    strictParsing?: boolean,
    forceShowMonthNavigation?: boolean,
    showDisabledMonthNavigation?: boolean,
    startDate?: Date,
    startOpen?: boolean,
    tabIndex?: number,
    timeCaption?: string,
    title?: string,
    todayButton?: Node,
    useWeekdaysShort?: boolean,
    formatWeekDay?: any,
    value?: string,
    weekLabel?: string,
    withPortal?: boolean,
    portalId?: string,
    yearDropdownItemNumber?: number,
    shouldCloseOnSelect?: boolean,
    showTimeInput?: boolean,
    showMonthYearPicker?: boolean,
    showFullMonthYearPicker?: boolean,
    showTwoColumnMonthYearPicker?: boolean,
    showYearPicker?: boolean,
    showQuarterYearPicker?: boolean,
    showTimeSelect?: boolean,
    showTimeSelectOnly?: boolean,
    timeFormat?: string,
    timeIntervals?: number,
    minTime?: Date,
    maxTime?: Date,
    excludeTimes?: Array<Date>,
    useShortMonthInDropdown?: boolean,
    clearButtonTitle?: string,
    previousMonthButtonLabel?: ReactNode,
    nextMonthButtonLabel?: ReactNode,
    previousYearButtonLabel?: string,
    nextYearButtonLabel?: string,
    timeInputLabel?: string,
    renderCustomHeader?: any,
    renderDayContents?: any,
    wrapperClassName?: string,
    focusSelectedMonth?: boolean,
    onDayMouseEnter?: any,
    onMonthMouseLeave?: any,
    showPopperArrow?: boolean,
    excludeScrollbar?: boolean,
    enableTabLoop?: boolean,
    customTimeInput?: any,
    weekAriaLabelPrefix?: string
  |};

  declare class Datepicker extends React$Component<Props> { input: ElementRef<any> }
  declare export default typeof Datepicker;
}
