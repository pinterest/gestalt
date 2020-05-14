// @flow strict
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import controlStyles from './RadioButtonCheckbox.css';
import styles from './RadioButton.css';
import Box from './Box.js';
import Label from './Label.js';
import Text from './Text.js';

type Props = {|
  checked?: boolean,
  disabled?: boolean,
  id: string,
  label?: string,
  name?: string,
  onChange: ({
    event: SyntheticInputEvent<>,
    checked: boolean,
  }) => void,
  value: string,
  size?: 'sm' | 'md',
|};

type State = {|
  focused: boolean,
  hovered: boolean,
|};

export default class RadioButton extends React.Component<Props, State> {
  static propTypes = {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['sm', 'md']),
  };

  static defaultProps = {
    checked: false,
    disabled: false,
    size: 'md',
  };

  state = {
    focused: false,
    hovered: false,
  };

  handleChange = (event: SyntheticInputEvent<>) => {
    const { onChange } = this.props;
    const { checked } = event.target;
    onChange({ checked, event });
  };

  handleBlur = () => this.setState({ focused: false });

  handleFocus = () => this.setState({ focused: true });

  handleHover = (hovered: boolean) => {
    this.setState({ hovered });
  };

  render() {
    const { checked, disabled, id, label, name, size, value } = this.props;
    const { focused, hovered } = this.state;

    let borderStyle = styles.Border;
    if (disabled && checked) {
      borderStyle = styles.BorderDisabledChecked;
    } else if (!disabled && checked) {
      borderStyle = styles.BorderDarkGray;
    } else if (!disabled && hovered) {
      borderStyle = styles.BorderHovered;
    }

    let borderWidth = styles.BorderUnchecked;
    if (disabled && !checked) {
      borderWidth = styles.BorderDisabled;
    } else if (checked && size === 'sm') {
      borderWidth = styles.BorderCheckedSm;
    } else if (checked && size === 'md') {
      borderWidth = styles.BorderCheckedMd;
    }

    const styleSize =
      size === 'sm' ? controlStyles.sizeSm : controlStyles.sizeMd;

    const bgStyle = disabled && !checked ? styles.BgDisabled : styles.BgEnabled;

    return (
      <Box
        alignItems="center"
        display="flex"
        justifyContent="start"
        marginLeft={-1}
        marginRight={-1}
      >
        <Label htmlFor={id}>
          <Box paddingX={1}>
            <div
              className={classnames(
                bgStyle,
                borderStyle,
                borderWidth,
                styleSize,
                styles.RadioButton,
                {
                  [styles.RadioButtonIsFocused]: focused,
                }
              )}
            >
              <input
                checked={checked}
                className={classnames(controlStyles.input, styleSize, {
                  [styles.InputEnabled]: !disabled,
                })}
                disabled={disabled}
                id={id}
                name={name}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onMouseEnter={() => this.handleHover(true)}
                onMouseLeave={() => this.handleHover(false)}
                type="radio"
                value={value}
              />
            </div>
          </Box>
        </Label>

        {label && (
          <Label htmlFor={id}>
            <Box paddingX={1}>
              <Text
                color={disabled ? 'gray' : undefined}
                size={size === 'sm' ? 'md' : 'lg'}
              >
                {label}
              </Text>
            </Box>
          </Label>
        )}
      </Box>
    );
  }
}
