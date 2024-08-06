import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Box, Icon, TapArea, TextField, useDangerouslyInGestaltExperiment } from 'gestalt';
import VRInternalTextField from './VRInternalTextField';

// InjectedProps are props that Datepicker adds on to DatePickerTextField.
// Datepicker takes this props and then funnels them to DatePickerTextField.
// See https://github.com/Hacker0x01/react-datepicker/blob/769d960d35d18f06bdee1b62a53d739ef4f0c39a/src/index.jsx#L844
type InjectedProps = {
  disabled?: boolean;
  id: string;
  label?: string;
  name?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
  errorMessage?: string;
  helperText?: string;
};

type Props = {
  id: string;
} & InjectedProps;

const DatePickerTextFieldWithForwardRef = forwardRef<HTMLInputElement, Props>(
  function DatePickerTextField(
    {
      disabled,
      id,
      name,
      label,
      onChange,
      onClick,
      onBlur,
      onFocus,
      onKeyDown,
      placeholder,
      value,
      errorMessage,
      helperText,
    }: Props,
    ref,
  ) {
    const isInVRExperiment = useDangerouslyInGestaltExperiment({
      webExperimentName: 'web_gestalt_visualRefresh',
      mwebExperimentName: 'web_gestalt_visualRefresh',
    });

    const innerRef = useRef<null | HTMLInputElement>(null);

    // @ts-expect-error - TS2322 - Type 'HTMLDivElement | HTMLInputElement | null' is not assignable to type 'HTMLInputElement'.
    useImperativeHandle(ref, () => innerRef.current);

    if (isInVRExperiment) {
      <VRInternalTextField
        ref={innerRef}
        disabled={disabled}
        errorMessage={errorMessage}
        helperText={helperText}
        id={id}
        label={label}
        name={name}
        onBlur={(data) => onBlur?.(data.event)}
        onChange={(data) => onChange?.(data.event)}
        onFocus={(data) => {
          onFocus?.(data.event);
          onClick?.();
        }}
        onKeyDown={(data) => onKeyDown?.(data.event)}
        placeholder={placeholder}
        value={value}
      />;
    }

    const handleOnIconTap = () => {
      innerRef.current?.focus();
    };

    return (
      <Box
        alignItems={!helperText && !errorMessage ? 'center' : undefined}
        display="flex"
        flex="grow"
        position="relative"
        width="100%"
      >
        <Box flex="grow" width="100%">
          <TextField
            ref={innerRef}
            autoComplete="off"
            disabled={disabled}
            errorMessage={errorMessage}
            helperText={helperText}
            id={id}
            mobileInputMode="none"
            name={name}
            onBlur={(data) => onBlur?.(data.event)}
            onChange={(data) => onChange?.(data.event)}
            onFocus={(data) => {
              onFocus?.(data.event);
              onClick?.();
            }}
            onKeyDown={(data) => onKeyDown?.(data.event)}
            placeholder={placeholder}
            size="lg"
            value={value}
          />
        </Box>
        <Box alignItems="center" display="flex" marginEnd={4} minHeight={48} position="relative">
          <TapArea fullHeight={false} fullWidth={false} mouseCursor='default' onTap={handleOnIconTap} rounding="circle"><Icon
            accessibilityLabel=""
            color={isInVRExperiment ? 'disabled' : 'default'}
            icon="calendar"
          /></TapArea>
        </Box>
      </Box>
    );
  },
);

DatePickerTextFieldWithForwardRef.displayName = 'DatePickerTextField';

export default DatePickerTextFieldWithForwardRef;
