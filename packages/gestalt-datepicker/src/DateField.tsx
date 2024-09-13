import { useEffect } from 'react';
import { Locale } from 'date-fns/locale';
import { useDangerouslyInGestaltExperiment, useGlobalEventsHandler } from 'gestalt';
import InternalDateField from './DateField/InternalDateField';
import VRInternalDateField from './DateField/VRInternalDateField';

export type Props = {
  /**
   * Indicate if birthday autocomplete should be available on the input.
   */
  autoComplete?: 'bday' | 'off';
  /**
   * Indicate if the input is disabled. See the [disabled example](https://gestalt.pinterest.systems/web/datefield#States) for more details.
   */
  disabled?: boolean;
  /**
   * Prevent the user from selecting future or past dates. "disableFuture" disables values after the current date and "disablePast" disables values before the current date. This will return an error on `onError`with values "disableFuture" or "disablePast". See the [controlled component example](https://gestalt.pinterest.systems/web/datefield#Controlled-component) to learn more.
   */
  disableRange?: 'disableFuture' | 'disablePast';
  /**
   * Customize your error message for the cases the user enters invalid dates. See the [controlled component example](https://gestalt.pinterest.systems/web/datefield#Controlled-component) to learn more.
   */
  errorMessage?: string;
  /**
   * More information about how to complete the date field. See the [controlled component example](https://gestalt.pinterest.systems/web/datefield#Controlled-component) to learn more.
   */
  helperText?: string;
  /**
   * A unique identifier for the input. See the [controlled component example](https://gestalt.pinterest.systems/web/datefield#Controlled-component) to learn more.
   */
  id: string;
  /**
   * The label for the input. Be sure to localize the text. See the [controlled component example](https://gestalt.pinterest.systems/web/datefield#Controlled-component) to learn more.
   */
  label?: string;
  /**
   * Whether the label should be visible or not. If `hidden`, the label is still available for screen reader users, but does not appear visually.
   */
  labelDisplay?: 'visible' | 'hidden';
  /**
   * DatePicker accepts imported locales from the open source date utility library date-fns. See the [locales example](https://gestalt.pinterest.systems/web/datefield#localeData) to learn more.
   */
  localeData?: Locale;
  /**
   * Maximal selectable date. Disables any date values after the provided date.
   */
  maxDate?: Date;
  /**
   * Minimal selectable date. Disables any date values before the provided date.
   */
  minDate?: Date;
  /**
   * Mobile only prop. Optionally specify the action label to present for the enter key on virtual keyboards.
   */
  mobileEnterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
  /**
   * A unique name for the input. See the [controlled component example](https://gestalt.pinterest.systems/web/datefield#Controlled-component) to learn more.
   */
  name?: string;
  /**
   * Callback triggered when the user blurs the input.
   */
  onBlur?: (arg1: { event: React.FocusEvent<HTMLInputElement>; value: string }) => void;
  /**
   * DateField is a controlled component. `onChange` is the  callback triggered when the value of the input changes. Should be used to modify the controlled value. See the [controlled component example](https://gestalt.pinterest.systems/web/datefield#Controlled-component) to learn more.
   */
  onChange: (arg1: { value: Date | null }) => void;
  /**
   * Callback triggered when the value entered is invalid. See the [controlled component example](https://gestalt.pinterest.systems/web/datefield#Controlled-component) to learn more.
   */
  onError?: (arg1: { errorMessage: string; value: Date | null }) => void;
  /**
   * DateField is a controlled component. `onClearInput` is the callback triggered when the user clicks on the "clear" icon button. Should be used to clear the entered dates in the controlled component. See the [controlled component example](https://gestalt.pinterest.systems/web/datefield#Controlled-component) to learn more.
   */
  onClearInput: () => void;
  /**
   * Callback triggered when the user focuses the input.
   */
  onFocus?: (arg1: { event: React.FocusEvent<HTMLInputElement>; value: string }) => void;
  /**
   * Indicate if the input is readOnly. See the [readOnly example](https://gestalt.pinterest.systems/web/datefield#States) for more details.
   */
  readOnly?: boolean;
  /**
   * Defines the height of ComboBox: md: 40px, lg: 48px. Width is defined by parent component.
   */
  size?: 'md' | 'lg';
  /**
   * DateField is a controlled component. `value` sets the current value of the input.  See the [controlled component example](https://gestalt.pinterest.systems/web/datefield#Controlled-component) to learn more.
   */
  value: Date | null;
};

/**
 * [DateField](https://gestalt.pinterest.systems/web/datefield) is used when the user has to select a date. Compared to [DatePicker](https://gestalt.pinterest.systems/web/datepicker), DateField has no supporting calendar to select a date, the user must input date values with a numeric keyboard.

 * DateField is distributed within the "gestalt-datepicker" package and must be installed separately.
 *
 * ![DateField light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/DateField.spec.ts-snapshots/DateField-chromium-darwin.png)
 * ![DateField dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/DateField-dark.spec.ts-snapshots/DateField-dark-chromium-darwin.png)
 */
function DateField({
  autoComplete,
  disabled = false,
  disableRange,
  errorMessage,
  helperText,
  id,
  label,
  labelDisplay = 'visible',
  localeData,
  maxDate,
  minDate,
  mobileEnterKeyHint,
  name,
  onBlur,
  onChange,
  onClearInput,
  onError,
  onFocus,
  readOnly = false,
  size = 'lg',
  value,
}: Props) {
  // Consume GlobalEventsHandlerProvider
  const { dateFieldHandlers } = useGlobalEventsHandler() ?? {
    dateFieldHandlers: undefined,
  };

  const isInVRExperiment = useDangerouslyInGestaltExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  useEffect(() => {
    if (dateFieldHandlers?.onRender) dateFieldHandlers?.onRender();
  }, [dateFieldHandlers]);

  if (isInVRExperiment) {
    return (
      <VRInternalDateField
        autoComplete={autoComplete}
        disabled={disabled}
        disableRange={disableRange}
        errorMessage={errorMessage}
        helperText={helperText}
        id={id}
        label={label}
        labelDisplay={labelDisplay}
        localeData={localeData}
        maxDate={maxDate}
        minDate={minDate}
        mobileEnterKeyHint={mobileEnterKeyHint}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onClearInput={onClearInput}
        onError={onError}
        onFocus={onFocus}
        readOnly={readOnly}
        size={size}
        value={value}
      />
    );
  }

  return (
    <InternalDateField
      autoComplete={autoComplete}
      disabled={disabled}
      disableRange={disableRange}
      errorMessage={errorMessage}
      helperText={helperText}
      id={id}
      label={label}
      labelDisplay={labelDisplay}
      localeData={localeData}
      maxDate={maxDate}
      minDate={minDate}
      mobileEnterKeyHint={mobileEnterKeyHint}
      name={name}
      onBlur={onBlur}
      onChange={onChange}
      onClearInput={onClearInput}
      onError={onError}
      onFocus={onFocus}
      readOnly={readOnly}
      size={size}
      value={value}
    />
  );
}

DateField.displayName = 'DateField';

export default DateField;
