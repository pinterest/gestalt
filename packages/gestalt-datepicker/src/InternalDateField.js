// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/display-name */
// @flow strict-local
import { useState, forwardRef, type Node } from 'react';
import { unstable_useDateField as useDateField } from '@mui/x-date-pickers/DateField';
import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers/DatePicker';
import classnames from 'classnames';
import { Box, Text, Flex, Status, TapArea, Pog } from 'gestalt';
import styles from './DateField.css';

const ENTER: number = 13;
const SPACE: number = 32;
const TAB: number = 9;

type CustomTextFieldProps = {|
  disabled: boolean,
  InputProps: {| ref: {| current: ?HTMLElement |} |},
  focused: boolean,
  placeholder: string,
  value: string,
  readOnly: boolean,
  onClick: () => void,
  onPaste: () => void,
  onChange: () => void,
  onKeyDown: () => void,
  onMouseUp: () => void,
  ownerState: {|
    passthroughProps: {|
      autoComplete: 'bday' | 'off',
      size: 'md' | 'lg',
      id: string,
      errorMessage: boolean,
      enterKeyHint: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send',
      name: string,
      onBlur: ({|
        event: SyntheticFocusEvent<HTMLInputElement>,
        value: string,
      |}) => void,
      onFocus: ({|
        event: SyntheticFocusEvent<HTMLInputElement>,
        value: string,
      |}) => void,
    |},
  |},
|};

const CustomTextField = forwardRef(
  (
    {
      disabled,
      InputProps: { ref: containerRef } = {},
      focused,
      placeholder,
      value,
      readOnly,
      onClick,
      onPaste,
      onChange,
      onKeyDown,
      onMouseUp,
      ownerState,
    }: CustomTextFieldProps,
    inputRef,
  ): Node => {
    const styledClasses = classnames(
      styles.textField,
      styles.formElementBase,
      styles.typographyTruncate,
      styles.actionButton,
      disabled ? styles.formElementDisabled : styles.formElementEnabled,
      ownerState?.passthroughProps?.errorMessage && !focused
        ? styles.formElementErrored
        : styles.formElementNormal,
      {
        [styles.layoutMedium]: ownerState?.passthroughProps?.size === 'md',
        [styles.layoutLarge]: ownerState?.passthroughProps?.size === 'lg',
      },
    );

    return (
      <Box ref={containerRef} rounding={4}>
        <input
          autoComplete={ownerState?.passthroughProps?.autoComplete ?? 'off'}
          id={ownerState?.passthroughProps?.id}
          className={styledClasses}
          disabled={disabled}
          ref={inputRef}
          placeholder={placeholder}
          value={value}
          enterKeyHint={ownerState?.passthroughProps?.enterKeyHint}
          inputMode="numeric"
          readOnly={readOnly}
          onClick={onClick}
          onFocus={(event) => ownerState?.passthroughProps?.onFocus?.({ event, value })}
          onBlur={(event) => ownerState?.passthroughProps?.onBlur?.({ event, value })}
          onPaste={onPaste}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onMouseUp={onMouseUp}
        />
      </Box>
    );
  },
);

type CustomDateFieldProps = {
  inputRef: {| ref: {| current: ?HTMLElement |} |},
  slots: string,
  slotProps: string,
  ...
};

function CustomDateField({
  inputRef: externalInputRef,
  slots,
  slotProps,
  ...textFieldProps
}: CustomDateFieldProps): Node {
  return (
    <CustomTextField
      {...useDateField({
        props: textFieldProps,
        inputRef: externalInputRef,
      })}
    />
  );
}

type InternalDateFieldProps = {|
  autoComplete?: 'bday' | 'off',
  disabled?: boolean,
  disableRange?: 'disableFuture' | 'disablePast',
  errorMessage?: Node,
  helperText?: string,
  id: string,
  label?: string,
  labelDisplay?: 'visible' | 'hidden',
  maxDate?: Date,
  minDate?: Date,
  mobileEnterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send',
  name?: string,
  onBlur?: ({|
    event: SyntheticFocusEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  onChange: (value: Date) => void,
  onClearInput: () => void,
  onError?: ({|
    errorMessage: string,
    value: ?Date,
  |}) => void,
  onFocus?: ({|
    event: SyntheticFocusEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  readOnly?: boolean,
  ref?: Element<'input'>, // eslint-disable-line react/no-unused-prop-types
  size?: 'md' | 'lg',
  value: ?Date,
|};

function InternalDateField({
  autoComplete,
  disabled = false,
  disableRange,
  errorMessage,
  helperText,
  id,
  label,
  labelDisplay = 'visible',
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
  size = 'md',
  value,
}: InternalDateFieldProps): Node {
  const [focused, setFocused] = useState(false);

  return (
    <Box>
      <label
        className={classnames(styles.label, {
          [styles.visuallyHidden]: labelDisplay === 'hidden',
        })}
        htmlFor={id}
      >
        <div className={styles.formLabel}>
          <Text size="100">{label}</Text>
        </div>
      </label>
      <Box position="relative" display="flex" alignItems="center">
        <MUIDatePicker
          onChange={onChange}
          disabled={disabled}
          readOnly={readOnly}
          onError={(error) => onError?.({ errorMessage: error, value })}
          errorMessage={!!errorMessage}
          maxDate={maxDate}
          minDate={minDate}
          disableFuture={disableRange === 'disableFuture'}
          disablePast={disableRange === 'disablePast'}
          slots={{ field: CustomDateField }}
          value={value}
          passthroughProps={{
            autoComplete,
            size,
            id,
            errorMessage: !!errorMessage,
            enterKeyHint: mobileEnterKeyHint,
            name,
            onBlur,
            onFocus,
          }}
          viewRenderers={null}
        />
        {!disabled && !readOnly ? (
          <div className={classnames(styles.actionButtonContainer)}>
            <Box alignItems="center" display="flex" height="100%" marginEnd={2} rounding="circle">
              <TapArea
                accessibilityLabel="Clear date"
                onBlur={() => setFocused(false)}
                onFocus={() => setFocused(true)}
                onKeyDown={({ event }) => {
                  if ([ENTER, SPACE].includes(event.keyCode)) onClearInput();
                  if (event.keyCode !== TAB) event.preventDefault();
                }}
                onMouseEnter={() => setFocused(true)}
                onMouseLeave={() => setFocused(false)}
                onTap={() => onClearInput()}
                rounding="circle"
                tapStyle="compress"
              >
                <Pog
                  accessibilityLabel=""
                  bgColor={focused ? 'lightGray' : 'transparent'}
                  icon="cancel"
                  iconColor="darkGray"
                  size="xs"
                />
              </TapArea>
            </Box>
          </div>
        ) : null}
      </Box>
      {helperText && !errorMessage ? (
        <Box marginTop={2} id={`${id}-helperText`}>
          <Flex gap={4}>
            <Flex.Item flex="grow">
              {helperText ? (
                <Text color="subtle" size="100">
                  {helperText}
                </Text>
              ) : null}
            </Flex.Item>
          </Flex>
        </Box>
      ) : null}
      {errorMessage ? (
        <Box marginTop={2}>
          <Text color="error" size="100">
            <span className={styles.formErrorMessage} id={`${id}-error`}>
              <Box role="alert">
                <Flex gap={2}>
                  <Status type="problem" />
                  {errorMessage}
                </Flex>
              </Box>
            </span>
          </Text>
        </Box>
      ) : null}
    </Box>
  );
}

InternalDateField.displayName = 'InternalDateField';

export default InternalDateField;
