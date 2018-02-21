// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './RadioButton.css';

type Props = {|
  checked?: boolean,
  disabled?: boolean,
  id: string,
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
|};

export default class RadioButton extends React.Component<Props, State> {
  static propTypes = {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    id: PropTypes.string.isRequired,
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
  };

  handleChange = (event: SyntheticInputEvent<>) => {
    const { checked } = event.target;
    this.props.onChange({ checked, event });
  };

  handleBlur = () => this.setState({ focused: false });
  handleFocus = () => {
    this.setState({ focused: true });
  };

  render() {
    const { checked, disabled, id, name, size, value } = this.props;
    return (
      <div
        className={classnames(styles.RadioButton, {
          [styles.RadioButtonIsFocused]: this.state.focused,
          [styles.RadioButtonSm]: size === 'sm',
          [styles.RadioButtonMd]: size === 'md',
          [styles.RadioButtonWhiteBg]: !disabled || checked,
          [styles.RadioButtonLightGrayBg]: disabled && !checked,
        })}
      >
        <input
          checked={checked}
          className={classnames(styles.Input, {
            [styles.InputEnabled]: !disabled,
            [styles.InputSm]: size === 'sm',
            [styles.InputMd]: size === 'md',
          })}
          disabled={disabled}
          id={id}
          name={name}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          type="radio"
          value={value}
        />
        {checked && (
          <div
            className={classnames(styles.Check, {
              [styles.CheckSm]: size === 'sm',
              [styles.CheckMd]: size === 'md',
              [styles.CheckEnabled]: !disabled,
              [styles.CheckDisabled]: disabled,
            })}
          />
        )}
      </div>
    );
  }
}
