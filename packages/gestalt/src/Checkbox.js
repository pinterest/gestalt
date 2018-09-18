// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import colors from './Colors.css';
import styles from './Checkbox.css';
import Box from './Box.js';
import Icon from './Icon.js';

type Props = {|
  checked?: boolean,
  disabled?: boolean,
  hasError?: boolean,
  id: string,
  indeterminate?: boolean,
  name?: string,
  onChange: ({ event: SyntheticInputEvent<>, checked: boolean }) => void,
  onClick?: ({
    event: SyntheticInputEvent<HTMLInputElement>,
    checked: boolean,
  }) => void,
  size?: 'sm' | 'md',
|};

type State = {|
  focused: boolean,
|};

export default class Checkbox extends React.Component<Props, State> {
  static propTypes = {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    hasError: PropTypes.bool,
    id: PropTypes.string.isRequired,
    indeterminate: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    size: PropTypes.oneOf(['sm', 'md']),
  };

  static defaultProps = {
    checked: false,
    disabled: false,
    hasError: false,
    indeterminate: false,
    size: 'md',
  };

  state = {
    focused: false,
  };

  componentDidMount() {
    if (this.props.indeterminate) {
      this.setIndeterminate(!!this.props.indeterminate);
    }
  }

  componentDidUpdate(previousProps: Props) {
    if (previousProps.indeterminate !== this.props.indeterminate) {
      this.setIndeterminate(!!this.props.indeterminate);
    }
  }

  setIndeterminate(indeterminate: boolean) {
    if (this.input) {
      this.input.indeterminate = indeterminate;
    }
  }

  handleChange = (event: SyntheticInputEvent<>) => {
    const { checked } = event.target;
    this.props.onChange({ event, checked });
  };

  handleClick = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { onClick } = this.props;
    if (onClick) {
      const { checked } = event.currentTarget;
      onClick({ event, checked });
    }
  };

  handleBlur = () => this.setState({ focused: false });

  handleFocus = () => this.setState({ focused: true });

  input: ?HTMLInputElement;

  render() {
    const {
      checked,
      disabled,
      hasError,
      id,
      indeterminate,
      name,
      size,
    } = this.props;

    let borderStyle = styles.border;
    if (!disabled && (checked || indeterminate)) {
      borderStyle = styles.borderDark;
    } else if (hasError) {
      borderStyle = styles.borderError;
    }

    return (
      <Box position="relative">
        <input
          checked={checked}
          className={classnames(styles.input, {
            [styles.inputEnabled]: !disabled,
            [styles.indeterminate]: indeterminate,
            [styles.inputSm]: size === 'sm',
            [styles.inputMd]: size === 'md',
          })}
          disabled={disabled}
          id={id}
          name={name}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onClick={this.handleClick}
          onFocus={this.handleFocus}
          ref={el => {
            this.input = el;
          }}
          type="checkbox"
        />
        <div
          className={classnames(
            borderStyle,
            styles.check,
            // eslint-disable-next-line no-nested-ternary
            disabled
              ? checked || indeterminate
                ? colors.grayBg
                : colors.lightGrayBg
              : checked || indeterminate
                ? colors.darkGrayBg
                : colors.whiteBg,
            {
              [styles.checkEnabled]: !disabled,
              [styles.checkFocused]: this.state.focused,
              [styles.checkMd]: size === 'md',
              [styles.checkSm]: size === 'sm',
            }
          )}
        >
          {(checked || indeterminate) && (
            <Icon
              accessibilityLabel=""
              color="white"
              icon={indeterminate ? 'dash' : 'check'}
              size={size === 'sm' ? 8 : 12}
            />
          )}
        </div>
      </Box>
    );
  }
}
