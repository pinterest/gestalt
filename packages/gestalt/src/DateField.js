// @flow strict-local
import { type Node, useEffect, useState } from 'react';
import styles from './DateField.css';
import Box from './Box.js';
import FieldSet from './Fieldset.js';
import ComboBox from './Combobox.js';
import InlineCombobox from './Datefield/InlineCombobox';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import {default as formatDate}  from 'date-fns/format';
import parse from 'date-fns/parse';
import isValid from 'date-fns/isValid';
import select from 'eslint-plugin-jsx-a11y/lib/util/implicitRoles/select';


type Props = {|
  /**
   * Prop description.
   */
  accessibilityLabel?: string,
  /**
   * Date Format using MM dd yyyy. We will generate a list of options
   */
  format: string,
|};

/**
 * [DateField] https://gestalt.pinterest.systems/web/datefield component should be used for ... on the page.
 * ![DateField light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/DateField.spec.mjs-snapshots/DateField-chromium-darwin.png)
 * ![DateField dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/DateField-dark.spec.mjs-snapshots/DateField-dark-chromium-darwin.png)
 */
export default function DateField({ accessibilityLabel, format }: Props): Node {
  const formatString = format;
  const defaultYear = new Date().getFullYear();

  const DATE_FORMAT_REGEX = /\[([^\]]+)]|Y{1,4}|y{1,4}|M{1,4}|D{1,2}|d{1,4}|SSS/g;

  const [selectedDate, setSelectedDate] = useState({ day: undefined, month: undefined, year: 0 });
  const [errorMessage, setErrorMessage] = useState('');

  // map of {comboBoxID:value}
  const [selectedPickerOptions, setSelectedPickerOptions] = useState({});

  const generateOptionsFromArray = (values, useLabelAsValue?: boolean) =>
    values.map((val, index) => ({
      label: val,
      value: useLabelAsValue ? val : `${index}`,
    }));

  const generateMonths = (strFormat: string) => {
    // return the format time
    const startDate = new Date(2000, 0, 1);
    // tweak the month, and spit out the formatted months with the standard we want
    const months = [];
    for (let m = 0; m < 12; m++) {
      startDate.setMonth(m);
      months.push(formatDate(startDate, strFormat));
    }

    return generateOptionsFromArray(months);
  };

  const generateDaysInMonth = (strFormat: string) => {
    // if we have a month already set, use that
    const startMonth = selectedDate.month ? selectedDate.month : 0;
    const startYear = selectedDate.year ? selectedDate.year : defaultYear;
    const startDate = new Date(startYear, startMonth, 1);
    const numDays = getDaysInMonth(startDate);
    const days = [];
    for (let m = 1; m <= numDays; m++) {
      startDate.setDate(m);
      days.push(formatDate(startDate, strFormat));
    }

    return generateOptionsFromArray(days, true);
  };

  const generateYears = (strFormat: string) => {
    // if we have a month already set, use that
    const yearsStart = defaultYear;
    const numYears = 200;
    const years = [];
    for (let y = yearsStart; y >= yearsStart - numYears; y--) {
      years.push(formatDate(new Date(y, 0, 1), strFormat));
    }

    return generateOptionsFromArray(years, true);
  };

  const getValuesForField = (fieldFormat: string) => {
    switch (fieldFormat) {
      case 'm':
      case 'MM':
      case 'MMM':
      case 'MMMM':
      case 'MMMMM':
        return { values: generateMonths(fieldFormat), type: 'month' };
      case 'd':
      case 'dd':
        return { values: generateDaysInMonth(fieldFormat), type: 'day' };
      case 'yy':
      case 'yyyy':
        return { values: generateYears(fieldFormat), type: 'year' };
    }
    return { values: [], type: 'unknown' };
  };

  useEffect(() => {
    fixIncorrectDay();
  }, [selectedDate]);

  const fixIncorrectDay = () => {
    const { day, year, month } = selectedDate;

    if (day === undefined || month === undefined) return;
    
    const selectedYear = year ?? defaultYear;
    console.log('have all fields');

    console.log(month);
    const numDaysInMonth = getDaysInMonth(new Date(selectedYear, month));
    console.log(day, numDaysInMonth)
   
    if (day > numDaysInMonth) {
      /*      
      If the input wasn't controlled, we can just make it a valid date by picking backwards
      const allDays = generateDaysInMonth('MM');
      // pick the last possible day (like n-1 day)
      const itm = allDays.pop();
      const newDate = { ...selectedDate, day: parseInt(itm.value) };
      setSelectedDate(newDate);
      */

      setErrorMessage('That day is not valid');
    } else {
      setErrorMessage('');
    }
  };

  const getComboBox = (fieldFormat: string) => {
    const { values, type }: { values: any, type: 'month' | 'year' | 'day' | 'unknown' } =
      getValuesForField(fieldFormat);

    const pickerId = `box-${type}`;

    const { day, month, year } = selectedDate;

    const fieldValue =
      type !== 'unknown' && selectedDate[type] ? selectedDate[type].toString() : '';

    return (
      <ComboBox
        options={values}
        label={type}
        id="box-1"
        placeholder={fieldFormat.toUpperCase()}
        noResultText="None"
        onSelect={({ item }) => {
          const newDate = { ...selectedDate };
          const newPickerOptions = { ...selectedPickerOptions };
          if (type !== 'unknown') {
            newDate[type] = parseInt(item.value);
            setSelectedDate(newDate);
          }
          const seletedPickerOption = setSelectedPickerOptions({});
        }}
      />
    );
  };

  const fields = formatString.match(DATE_FORMAT_REGEX) || [];

  return (
    <FieldSet legend={''} errorMessage={errorMessage}>
      {' '}
      <Box display="flex">{fields.map((field) => getComboBox(field))}</Box>{' '}
    </FieldSet>
  );
}
