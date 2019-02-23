// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ErrorMessage from './ErrorMessage.js';
import formatErrorId from './formatErrorId.js';
import styles from './TextArea.css';

type State = {
  errorMessage?: string,
  focused: boolean,
};

type Props = {|
  errorMessage?: string,
  disabled?: boolean,
  hasError?: boolean,
  id: string,
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
    rows: 3,
  };

  state = {
    focused: false,
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.errorMessage !== state.errorMessage) {
      return {
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
  };

  handleBlur = (event: SyntheticFocusEvent<HTMLTextAreaElement>) => {
    if (this.props.onBlur) {
      this.props.onBlur({
        event,
        value: event.currentTarget.value,
      });
    }
  };

  handleFocus = (event: SyntheticFocusEvent<HTMLTextAreaElement>) => {
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
            errorMessage && this.state.focused ? formatErrorId(id) : null
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
        {errorMessage && <ErrorMessage errorMessage={errorMessage} id={id} />}
      </span>
    );
  }
}
