// @flow strict-local
import React, { useRef, useState, type ElementRef, type Node } from 'react';
// import ReactDatePicker from 'react-datepicker';
// import typeof Locales from 'date-fns/locale';
// import PropTypes from 'prop-types';
// import classnames from 'classnames';
// import Box from './Box.js';
// import Label from './Label.js';
// import Text from './Text.js';
// import Icon from './Icon.js';
// import DatePickerTextField from './DatePickerTextField.js';
// import datePickerUpdateLocale from './datePickerUpdateLocale.js';
// import styles from './DatePicker.css';

const ARROW_ICON_SIZE = 16;

type Props = {|
  accessibilityLabelNext: string,
  accessibilityLabelPrevious: string,
  accessibilityLabelIcon: string,
  disabled?: boolean,
  endDate?: Date,
  errorMessage?: Node,
  excludeDates?: Array<Date>,
  helperText?: Node,
  id: string,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  includeDates?: Array<Date>,
  isRTL?: boolean,
  label?: string,
  locale: string,
  maxDate?: Date,
  minDate?: Date,
  onChange: ({
    event: SyntheticInputEvent<HTMLInputElement>,
    value: Date,
  }) => void,
  placeholder?: string,
  selectsEnd?: boolean,
  selectsStart?: boolean,
  startDate?: Date,
  value: ?Date,
|};

export default function DatePicker(props: Props) {
  return <div />;
}
//   const {
//     accessibilityLabelIcon,
//     accessibilityLabelNext,
//     accessibilityLabelPrevious,
//     helperText,
//     disabled,
//     endDate,
//     errorMessage,
//     excludeDates,
//     id,
//     idealDirection = 'down',
//     includeDates,
//     isRTL = false,
//     label,
//     locale,
//     maxDate,
//     minDate,
//     onChange,
//     placeholder,
//     selectsEnd,
//     selectsStart,
//     startDate,
//     value: selected,
//   } = props;

//   const [dateFormat, setDateFormat] = useState<?string>();
//   const [, setMonth] = useState<?number>();

//   // $FlowFixMe
//   const pickerRef: ElementRef<any> = useRef();

//   const handleChange = (
//     value: Date,
//     event: SyntheticInputEvent<HTMLInputElement>
//   ) => onChange({ event, value });

//   // Re-render flyout when month changes since height will vary by where days fall
//   // in the month and we need to keep the flyout pointed at the input correctly
//   const handleMonthChange = (newMonth: Date) => {
//     setMonth(newMonth.getMonth());
//   };

//   const customInput = (
//     <DatePickerTextField
//       accessibilityLabelIcon={accessibilityLabelIcon}
//       icon="calendar"
//       id={id}
//       isRTL={isRTL}
//     />
//   );

//   const nextMonthButtonLabel = (
//     <Icon
//       icon={isRTL ? 'arrow-back' : 'arrow-forward'}
//       accessibilityLabel={accessibilityLabelNext}
//       color="darkGray"
//       size={ARROW_ICON_SIZE}
//     />
//   );

//   const previousMonthButtonLabel = (
//     <Icon
//       icon={isRTL ? 'arrow-forward' : 'arrow-back'}
//       accessibilityLabel={accessibilityLabelPrevious}
//       color="darkGray"
//       size={ARROW_ICON_SIZE}
//     />
//   );

//   const popperPlacement = {
//     up: 'top',
//     right: 'right',
//     down: 'bottom',
//     left: 'left',
//   };

//   const changeDateFormat = (localeData: $Values<Locales> | null) => {
//     if (localeData) {
//       setDateFormat(
//         localeData.formatLong && localeData.formatLong.date({ width: 'short' })
//       );
//     }
//   };

//   datePickerUpdateLocale(locale).then(changeDateFormat);

//   return (
//     <div className="_gestalt">
//       <Text size="sm">{label}</Text>

//       {label && (
//         <Label htmlFor={id}>
//           <Box marginBottom={2}>
//             <Text size="sm">{label}</Text>
//           </Box>
//         </Label>
//       )}
//       <ReactDatePicker
//         customInput={customInput}
//         dateFormat={dateFormat}
//         disabled={disabled}
//         excludeDates={excludeDates}
//         id={id}
//         includeDates={includeDates}
//         maxDate={selectsEnd ? maxDate : endDate || maxDate}
//         minDate={selectsStart ? minDate : startDate || minDate}
//         nextMonthButtonLabel={nextMonthButtonLabel}
//         locale={locale}
//         onChange={handleChange}
//         onMonthChange={handleMonthChange}
//         placeholderText={placeholder}
//         calendarClassName={classnames(styles['react-datepicker'])}
//         popperClassName={classnames(
//           styles['react-datepicker-popper'],
//           styles[`react-datepicker-popper-${popperPlacement[idealDirection]}`]
//         )}
//         dayClassName={() =>
//           classnames(
//             styles['react-datepicker__day'],
//             styles['react-datepicker__day:hover'],
//             styles['react-datepicker__day:focus']
//           )
//         }
//         popperPlacement={popperPlacement[idealDirection]}
//         previousMonthButtonLabel={previousMonthButtonLabel}
//         ref={pickerRef}
//         selected={selected}
//         selectsEnd={selectsEnd}
//         selectsStart={selectsStart}
//         showPopperArrow={false}
//         startDate={startDate}
//         endDate={endDate}
//       />
//       {(!!errorMessage || !!helperText) && (
//         <Box marginTop={2}>
//           <Text color={errorMessage ? 'red' : 'gray'} size="sm">
//             {errorMessage || helperText}
//           </Text>
//         </Box>
//       )}
//     </div>
//   );
// }

// DatePicker.propTypes = {
//   accessibilityLabelNext: PropTypes.string.isRequired,
//   accessibilityLabelPrevious: PropTypes.string.isRequired,
//   accessibilityLabelIcon: PropTypes.string.isRequired,
//   disabled: PropTypes.bool,
//   endDate: PropTypes.instanceOf(Date),
//   errorMessage: PropTypes.node,
//   excludeDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
//   helperText: PropTypes.node,
//   id: PropTypes.string.isRequired,
//   idealDirection: PropTypes.oneOf(['up', 'right', 'down', 'left']),
//   includeDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
//   isRTL: PropTypes.bool,
//   label: PropTypes.string,
//   locale: PropTypes.string.isRequired,
//   maxDate: PropTypes.instanceOf(Date),
//   minDate: PropTypes.instanceOf(Date),
//   onChange: PropTypes.func.isRequired,
//   placeholder: PropTypes.string,
//   selectsEnd: PropTypes.bool,
//   selectsStart: PropTypes.bool,
//   startDate: PropTypes.instanceOf(Date),
//   value: PropTypes.instanceOf(Date),
// };
