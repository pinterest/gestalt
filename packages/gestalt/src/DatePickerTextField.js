// @flow strict
import * as React from 'react';
import Box from './Box.js';
import Icon from './Icon.js';
import TextField from './TextField.js';
import Touchable from './Touchable.js';

type Props = {|
  accessibilityLabelIcon: string,
  disabled?: boolean,
  // $FlowFixMe
  forwardedRef: React.ElementRef<any>,
  icon: 'calendar' | 'clock',
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

export class TextFieldWrapper extends React.Component<Props> {
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
      icon,
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
          <TextField
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
          <Box position="absolute" right={!isRTL} left={isRTL}>
            <Box position="relative" marginEnd={4}>
              <Icon
                accessibilityLabel={accessibilityLabelIcon}
                color="darkGray"
                icon={icon === 'clock' ? 'clock' : 'calendar'}
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
  <TextFieldWrapper {...props} forwardedRef={ref} />
));
