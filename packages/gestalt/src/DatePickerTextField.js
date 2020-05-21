// @flow strict
import * as React from 'react';
import Box from './Box.js';
import Icon from './Icon.js';
import TextField from './TextField.js';
import Touchable from './Touchable.js';

const calendarSvg =
  'M4 20V9h16v11H4zm2-4h5v-5H6v5zM8 1a1.5 1.5 0 0 0-1.5 1.5V4H4C2.35 4 1 5.35 1 7v13c0 1.65 1.35 3 3 3h16c1.65 0 3-1.35 3-3V7c0-1.65-1.35-3-3-3h-2.5V2.5a1.5 1.5 0 1 0-3 0V4h-5V2.5A1.5 1.5 0 0 0 8 1z';
const calendarPath = { __path: calendarSvg };

type Props = {|
  accessibilityLabelIcon: string,
  disabled?: boolean,
  // $FlowFixMe react-datepicker doesn't use Flow
  forwardedRef: React.ElementRef<any>,
  icon: 'calendar' | 'clock',
  id: string,
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
      onClick,
      placeholder,
      value,
    } = this.props;

    return (
      <Touchable onTouch={onClick}>
        <Box column={12} display="flex" alignItems="center" position="relative">
          <Box column={12} flex="grow">
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
          </Box>
          <Box
            position="absolute"
            right
            dangerouslySetInlineStyle={{ __style: { paddingRight: 14 } }}
          >
            <Icon
              accessibilityLabel={accessibilityLabelIcon}
              color="darkGray"
              dangerouslySetSvgPath={
                icon === 'calendar' ? calendarPath : undefined
              }
              icon={icon === 'clock' ? 'clock' : undefined}
              inline
            />
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
