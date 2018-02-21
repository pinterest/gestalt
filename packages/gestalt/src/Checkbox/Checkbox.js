// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Checkbox.css';
import Box from '../Box/Box';
import Icon from '../Icon/Icon';

type Props = {|
  checked?: boolean,
  disabled?: boolean,
  id: string,
  indeterminate?: boolean,
  name?: string,
  onChange: ({ event: SyntheticInputEvent<>, checked: boolean }) => void,
  size?: 'sm' | 'md',
|};

type State = {|
  focused: boolean,
|};

export default class Checkbox extends React.Component<Props, State> {
  static propTypes = {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    id: PropTypes.string.isRequired,
    indeterminate: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    size: PropTypes.oneOf(['sm', 'md']),
  };

  static defaultProps = {
    checked: false,
    disabled: false,
    indeterminate: false,
    size: 'md',
  };

  state: State = {
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

  input: ?HTMLInputElement;

  handleChange = (event: SyntheticInputEvent<>) => {
    const { checked } = event.target;
    this.props.onChange({ event, checked });
  };

  handleBlur = () => this.setState({ focused: false });
  handleFocus = () => this.setState({ focused: true });

  render() {
    const { checked, disabled, id, indeterminate, name, size } = this.props;
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
          onFocus={this.handleFocus}
          ref={el => {
            this.input = el;
          }}
          type="checkbox"
        />
        <div
          className={classnames(
            styles.check,
            // eslint-disable-next-line no-nested-ternary
            disabled
              ? checked || indeterminate
                ? styles.checkGray
                : styles.checkLightGray
              : checked || indeterminate
                ? styles.checkDarkGray
                : styles.checkWhite,
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
