// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Flyout from './Flyout.js';
import Box from './Box.js';
import Text from './Text.js';
import styles from './TextArea.css';

type State = {
  focused: boolean,
  errorIsOpen: boolean,
  errorMessage?: string,
};

type Props = {|
  errorMessage?: string,
  disabled?: boolean,
  hasError?: boolean,
  id: string,
  idealErrorDirection?: 'up' | 'right' | 'down' | 'left' /* default: right */,
  name?: string,
  onBlur?: ({
    event: SyntheticFocusEvent<HTMLTextAreaElement>,
    value: string,
  }) => void,
  onChange: ({
    event: SyntheticInputEvent<HTMLTextAreaElement>,
    value: string,
  }) => void,
  onFocus?: ({
    event: SyntheticFocusEvent<HTMLTextAreaElement>,
    value: string,
  }) => void,
  onKeyDown?: ({
    event: SyntheticKeyboardEvent<HTMLTextAreaElement>,
    value: string,
  }) => void,
  placeholder?: string,
  rows?: number /* default: 3 */,
  value?: string,
|};

export default class TextArea extends React.Component<Props, State> {
  static propTypes = {
    disabled: PropTypes.bool,
    errorMessage: PropTypes.string,
    hasError: PropTypes.bool,
    id: PropTypes.string.isRequired,
    idealErrorDirection: PropTypes.string,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    placeholder: PropTypes.string,
    rows: PropTypes.number,
    value: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
    hasError: false,
    idealErrorDirection: 'right',
    rows: 3,
  };

  state = {
    focused: false,
    errorIsOpen: false,
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.errorMessage !== state.errorMessage) {
      return {
        errorIsOpen: !!props.errorMessage,
        errorMessage: props.errorMessage,
      };
    }

    return null;
  }

  handleChange = (event: SyntheticInputEvent<HTMLTextAreaElement>) => {
    this.props.onChange({
      event,
      value: event.currentTarget.value,
    });

    if (this.props.errorMessage) {
      this.setState({ errorIsOpen: true });
    }
  };

  handleBlur = (event: SyntheticFocusEvent<HTMLTextAreaElement>) => {
    if (this.props.errorMessage) {
      this.setState({ errorIsOpen: false });
    }
    if (this.props.onBlur) {
      this.props.onBlur({
        event,
        value: event.currentTarget.value,
      });
    }
  };

  handleFocus = (event: SyntheticFocusEvent<HTMLTextAreaElement>) => {
    if (this.props.errorMessage) {
      this.setState({ errorIsOpen: true });
    }
    if (this.props.onFocus) {
      this.props.onFocus({
        event,
        value: event.currentTarget.value,
      });
    }
  };

  handleKeyDown = (event: SyntheticKeyboardEvent<HTMLTextAreaElement>) => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown({
        event,
        value: event.currentTarget.value,
      });
    }
  };

  textarea: ?HTMLElement;

  render() {
    const {
      disabled,
      errorMessage,
      hasError,
      id,
      idealErrorDirection,
      name,
      placeholder,
      rows,
      value,
    } = this.props;

    const classes = classnames(
      styles.textArea,
      disabled ? styles.disabled : styles.enabled,
      hasError || errorMessage ? styles.errored : styles.normal
    );

    return (
      <span>
        <textarea
          aria-describedby={
            errorMessage && this.state.focused ? `${id}-gestalt-error` : null
          }
          aria-invalid={errorMessage || hasError ? 'true' : 'false'}
          className={classes}
          disabled={disabled}
          id={id}
          name={name}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onKeyDown={this.handleKeyDown}
          placeholder={placeholder}
          ref={c => {
            this.textarea = c;
          }}
          rows={rows}
          value={value}
        />
        {errorMessage && this.state.errorIsOpen ? (
          <Flyout
            anchor={this.textarea}
            color="orange"
            idealDirection={idealErrorDirection}
            onDismiss={() => this.setState({ errorIsOpen: false })}
            shouldFocus={false}
            size="sm"
          >
            <Box padding={3}>
              <Text bold color="white">
                <span id={`${id}-gestalt-error`}>{errorMessage}</span>
              </Text>
            </Box>
          </Flyout>
        ) : null}
      </span>
    );
  }
}
