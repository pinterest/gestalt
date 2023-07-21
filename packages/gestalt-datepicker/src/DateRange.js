// @flow strict-local
import { Children, type Element, type Node, useId } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  RadioGroup,
  Text,
  useDefaultLabel,
  useDeviceType,
} from 'gestalt';
import InternalDateField from './DateField/InternalDateField.js';
import borderStyles from './DateRange.css';
import InternalDatePicker from './DateRange/InternalDatePicker.js';

const MOBILE_DATEFIELD_WIDTH = 171;
const DATEFIELD_WIDTH = 280;

type LocaleData = {|
  code?: string,
  formatDistance?: (...args: $ReadOnlyArray<{ ... }>) => { ... },
  formatRelative?: (...args: $ReadOnlyArray<{ ... }>) => { ... },
  localize?: {|
    ordinalNumber: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    era: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    quarter: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    month: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    day: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    dayPeriod: (...args: $ReadOnlyArray<{ ... }>) => { ... },
  |},
  formatLong?: {|
    date: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    time: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    dateTime: (...args: $ReadOnlyArray<{ ... }>) => { ... },
  |},
  match?: {|
    ordinalNumber: (...args: $ReadOnlyArray<string>) => { ... },
    era: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    quarter: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    month: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    day: (...args: $ReadOnlyArray<{ ... }>) => { ... },
    dayPeriod: (...args: $ReadOnlyArray<{ ... }>) => { ... },
  |},
  options?: {|
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6,
    firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7,
  |},
|};

type Props = {|
  /**
   * Customize your error message for the cases the user enters invalid end dates. See the [error messaging variant](https://gestalt.pinterest.systems/web/daterange#Error-messaging) to learn more.
   */
  endDateErrorMessage?: string | null,
  /**
   * DateRange is a controlled component. `startDateValue` sets the value of the start date.  See the [controlled component variant](https://gestalt.pinterest.systems/web/daterange#Controlled-component) to learn more.
   */
  endDateValue: Date | null,
  /**
   * DateRange accepts imported locales from the open source date utility library date-fns. See the [locales variant](https://gestalt.pinterest.systems/web/datefield#localeData) to learn more.
   */
  localeData?: LocaleData,
  /**
   * Maximal selectable date. Disables any date values after the provided date. See the [disable future and past variant](https://gestalt.pinterest.systems/web/datefield#Disable-past-and-future-dates) to learn more.
   */
  maxDate?: Date,
  /**
   * Minimal selectable date. Disables any date values before the provided date.  See the [disable future and past variant](https://gestalt.pinterest.systems/web/datefield#Disable-past-and-future-dates) to learn more.
   */
  minDate?: Date,
  /**
   * Callback triggered when the user clicks the Cancel button to not persist the selected dates. It should be used to close DateRange. See the [controlled component variant](https://gestalt.pinterest.systems/web/daterange#Controlled-component) to learn more.
   */
  onCancel: () => void,
  /**
   * Callback triggered when the end date input loses focus. See the [error messaging variant](https://gestalt.pinterest.systems/web/daterange#Error-messaging) to learn more.
   */
  onEndDateBlur?: ({|
    event: SyntheticFocusEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  /**
   * DateField is a controlled component. `onEndDateChange` is the  callback triggered when the end date value changes. Should be used to modify the controlled value. See the [controlled component variant](https://gestalt.pinterest.systems/web/daterange#Controlled-component) to learn more.
   */
  onEndDateChange: ({| value: Date | null |}) => void,
  /**
   * Callback triggered when the end date value entered is invalid. See the [error messaging variant](https://gestalt.pinterest.systems/web/daterange#Error-messaging) to learn more.
   */
  onEndDateError: ({|
    errorMessage: string,
    value: Date | null,
  |}) => void,
  /**
   * Callback triggered when the user focus on the input of the end date DateField. See the [error messaging variant](https://gestalt.pinterest.systems/web/daterange#Error-messaging) to learn more.
   */
  onEndDateFocus?: ({|
    event: SyntheticFocusEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  /**
   * Callback triggered when the end date input loses focus. See the [error messaging variant](https://gestalt.pinterest.systems/web/daterange#Error-messaging) to learn more.
   */
  onStartDateBlur?: ({|
    event: SyntheticFocusEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  /**
   * DateField is a controlled component. `onStartDateChange` is the  callback triggered when the start date value changes. Should be used to modify the controlled value. See the [controlled component variant](https://gestalt.pinterest.systems/web/daterange#Controlled-component) to learn more.
   */
  onStartDateChange: ({| value: Date | null |}) => void,
  /**
   * Callback triggered when the start date value entered is invalid. See the [error messaging variant](https://gestalt.pinterest.systems/web/daterange#Error-messaging) to learn more.
   */
  onStartDateError: ({|
    errorMessage: string,
    value: Date | null,
  |}) => void,
  /**
   * Callback triggered when the user focus on the input of the start date DateField. See the [error messaging variant](https://gestalt.pinterest.systems/web/daterange#Error-messaging) to learn more.
   */
  onStartDateFocus?: ({|
    event: SyntheticFocusEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  /**
   * Callback triggered when the user clicks the Apply button to persist the selected dates. It should be used to persist the dates selected and close the DateRange. See the [controlled component variant](https://gestalt.pinterest.systems/web/daterange#Controlled-component) to learn more.
   */
  onSubmit: () => void,
  /**
   * An optional RadioGroup to provide preestablished date range options. See the [with RadioGroup variant](https://gestalt.pinterest.systems/web/daterange#With-RadioGroup) to learn more.
   */
  radioGroup?: Element<typeof RadioGroup>,
  /**
   * DateRange is a controlled component. `startDateValue` sets the value of the start date.  See the [controlled component variant](https://gestalt.pinterest.systems/web/daterange#Error-messaging) to learn more.
   */
  startDateValue: Date | null,
  /**
   * Customize your error message for the cases the user enters invalid start dates. See the [error messaging variant](https://gestalt.pinterest.systems/web/daterange#Error-messaging) to learn more.
   */
  startDateErrorMessage?: string | null,
|};

/**
 * [DateRange](https://gestalt.pinterest.systems/web/daterange) enables users to preview and select a range of days by picking dates from a calendar or adding a text input.
 * DateRange is distributed in its own package and must be installed separately.
 *
 * ![DateRange light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/DateRange.spec.mjs-snapshots/DateRange-chromium-darwin.png)
 * ![DateRange dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/DateRange-dark.spec.mjs-snapshots/DateRange-dark-chromium-darwin.png)
 */
function DateRange({
  endDateValue,
  endDateErrorMessage,
  localeData,
  maxDate,
  minDate,
  onCancel,
  onEndDateBlur,
  onEndDateChange,
  onEndDateError,
  onEndDateFocus,
  onStartDateBlur,
  onStartDateChange,
  onStartDateError,
  onStartDateFocus,
  onSubmit,
  radioGroup,
  startDateValue,
  startDateErrorMessage,
}: Props): Node {
  const componentId = useId();
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';

  if (!startDateValue && endDateValue) {
    onEndDateChange({ value: null });
  }

  const { applyText, cancelText } = useDefaultLabel('DateRange');

  return (
    <Box rounding={4} color="default" borderStyle="shadow" minHeight={425} display="inlineBlock">
      <Flex>
        {radioGroup &&
        Children.only<Element<typeof RadioGroup>>(radioGroup).type.displayName === 'RadioGroup' &&
        !isMobile ? (
          <div className={borderStyles.borderRight}>
            <Box paddingY={4} paddingX={6} width={216}>
              {radioGroup}
            </Box>
          </div>
        ) : null}
        <Box>
          <Flex alignItems="start" justifyContent="center" direction="column">
            <div className={borderStyles.dateFieldSection}>
              <Flex gap={3}>
                <Box width={isMobile ? MOBILE_DATEFIELD_WIDTH : DATEFIELD_WIDTH}>
                  <InternalDateField
                    autoComplete="off"
                    mobileEnterKeyHint="enter"
                    id={`datefield-start-${componentId}`}
                    localeData={localeData}
                    onChange={({ value }) => {
                      if (value?.getTime() || value === null) onStartDateChange({ value });
                    }}
                    onError={onStartDateError}
                    onBlur={onStartDateBlur}
                    onFocus={onStartDateFocus}
                    value={startDateValue}
                    minDate={minDate}
                    maxDate={maxDate}
                    errorMessage={startDateErrorMessage}
                  />
                </Box>
                {/* We are not using Flex here because the error message prevents keeping the dash aligned to the form field */}
                <Box dangerouslySetInlineStyle={{ __style: { marginTop: '15px' } }}>
                  <Text>—</Text>
                </Box>
                <Box width={isMobile ? MOBILE_DATEFIELD_WIDTH : DATEFIELD_WIDTH}>
                  <InternalDateField
                    autoComplete="off"
                    mobileEnterKeyHint="enter"
                    id={`datefield-end-${componentId}`}
                    localeData={localeData}
                    onChange={({ value }) => {
                      if (value?.getTime() || value === null) onEndDateChange({ value });
                    }}
                    value={endDateValue}
                    minDate={startDateValue}
                    onError={({ errorMessage, value }) => {
                      onEndDateError({ errorMessage, value });
                    }}
                    onBlur={onEndDateBlur}
                    onFocus={onEndDateFocus}
                    maxDate={maxDate}
                    errorMessage={endDateErrorMessage}
                  />
                </Box>
              </Flex>
            </div>
            <Box
              width={isMobile ? '100%' : 629}
              display={isMobile ? 'flex' : undefined}
              justifyContent={isMobile ? 'center' : undefined}
            >
              <InternalDatePicker
                localeData={localeData}
                rangeStartDate={startDateValue}
                rangeEndDate={endDateValue}
                id={`datepicker-${componentId}`}
                onChange={({ startDate, endDate }) => {
                  onStartDateChange({ value: startDate });
                  onEndDateChange({ value: endDate });
                }}
                minDate={minDate}
                maxDate={maxDate}
              />
            </Box>
            <Flex.Item alignSelf={isMobile ? 'center' : 'end'}>
              <Box marginBottom={4} marginEnd={4}>
                <ButtonGroup>
                  <Button color="gray" text={cancelText} onClick={() => onCancel()} />

                  <Button
                    color="red"
                    text={applyText}
                    disabled={
                      !!endDateErrorMessage ||
                      !!startDateErrorMessage ||
                      !endDateValue ||
                      !startDateValue
                    }
                    onClick={() => onSubmit()}
                  />
                </ButtonGroup>
              </Box>
            </Flex.Item>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default DateRange;
