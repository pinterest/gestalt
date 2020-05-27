// @flow strict-local
import * as React from 'react';
import { Box, Icon, Touchable, TextField } from 'gestalt';
import PropTypes from 'prop-types';

type Props = {|
  accessibilityLabelIcon: string,
  disabled?: boolean,
  forwardedRef: React.ElementRef<any>,
  id: string,
  isRTL?: boolean,
  onBlur?: (event: SyntheticFocusEvent<HTMLInputElement>) => void,
  onChange?: (event: SyntheticInputEvent<HTMLInputElement>) => void,
  onClick?: () => void,
  onFocus?: (event: SyntheticFocusEvent<HTMLInputElement>) => void,
  onKeyDown?: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  placeholder?: string,
  value?: string,
|};

class DatePickerTextField extends React.Component<Props> {
  static propTypes = {
    accessibilityLabelIcon: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    forwardedRef: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.instanceOf(TextField) }),
    ]),
    id: PropTypes.string.isRequired,
    isRTL: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.instanceOf(Date),
  };

  setTextFieldRef = (component: ?React.ElementRef<typeof TextField>) => {
    const { forwardedRef } = this.props;
    if (component && component.textfield) {
      forwardedRef(component.textfield);
    } else {
      forwardedRef(null);
    }
  };

  handleBlur = ({
    event,
  }: {
    event: SyntheticFocusEvent<HTMLInputElement>,
  }) => {
    const { onBlur } = this.props;
    if (onBlur) {
      onBlur(event);
    }
  };

  handleChange = ({
    event,
  }: {
    event: SyntheticInputEvent<HTMLInputElement>,
  }) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(event);
    }
  };

  handleFocus = ({
    event,
  }: {
    event: SyntheticFocusEvent<HTMLInputElement>,
  }) => {
    const { onFocus } = this.props;
    if (onFocus) {
      onFocus(event);
    }
  };

  handleKeyDown = ({
    event,
  }: {
    event: SyntheticKeyboardEvent<HTMLInputElement>,
  }) => {
    const { onKeyDown } = this.props;
    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  render() {
    const {
      accessibilityLabelIcon,
      disabled,
      id,
      isRTL = false,
      onClick,
      placeholder,
      value,
    } = this.props;

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
              id={id}
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              onFocus={this.handleFocus}
              onKeyDown={this.handleKeyDown}
              placeholder={placeholder}
              ref={this.setTextFieldRef}
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
}

// $FlowIssue React.forwardRef is still missing https://github.com/facebook/flow/issues/6103
export default React.forwardRef((props: Props, ref: React.ElementRef<any>) => (
  <DatePickerTextField {...props} forwardedRef={ref} />
));
