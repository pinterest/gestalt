// @flow strict-local
import * as React from 'react';
import { Box, Icon, Touchable, TextField } from 'gestalt';
import PropTypes from 'prop-types';

type OwnProps = {|
  accessibilityLabelIcon: string,
  isRTL?: boolean,
|};

type InjectedProps = {|
  disabled?: boolean,
  id?: string,
  onClick?: () => void,
  placeholder?: string,
  value?: string,
|};

type Props = {|
  ...OwnProps,
  ...InjectedProps,
  forwardedRef?: React.Ref<'input'>,
|};

function DatePickerTextField(props: Props) {
  const {
    accessibilityLabelIcon,
    disabled,
    forwardedRef,
    id,
    isRTL = false,
    onClick,
    placeholder,
    value,
  } = props;

  return (
    <Touchable onTouch={onClick}>
      <Box
        alignItems="center"
        column={12}
        flex="grow"
        display="flex"
        position="relative"
      >
        <Box column={12} flex="grow">
          <TextField
            autoComplete="off"
            disabled={disabled}
            id={id || ''}
            onBlur={() => {}}
            onFocus={() => {}}
            onChange={() => {}}
            onKeyDown={() => {}}
            placeholder={placeholder}
            ref={forwardedRef}
            size="lg"
            value={value}
          />
        </Box>
        <Box position="absolute" right={!isRTL} left={isRTL}>
          <Box position="relative" marginEnd={4}>
            <Icon
              accessibilityLabel={accessibilityLabelIcon}
              color="darkGray"
              icon="calendar"
              inline
            />
          </Box>
        </Box>
      </Box>
    </Touchable>
  );
}

function forwardRef(props, ref) {
  return <DatePickerTextField {...props} forwardedRef={ref} />;
}

forwardRef.displayName = 'DatePickerTextField';

export default React.forwardRef<Props, HTMLInputElement>(forwardRef);

DatePickerTextField.propTypes = {
  accessibilityLabelIcon: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any,
    }),
  ]),
  id: PropTypes.string.isRequired,
  isRTL: PropTypes.bool,
  onClick: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};
