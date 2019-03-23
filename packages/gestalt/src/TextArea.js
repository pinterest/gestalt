// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Box from './Box.js';
import FormErrorMessage from './FormErrorMessage.js';
import styles from './TextArea.css';

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

type State = {|
  focused: boolean,
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

  setTextAreaRef = (ref: ?HTMLTextAreaElement) => {
    this.textarea = ref;
  };

  handleChange = (event: SyntheticInputEvent<HTMLTextAreaElement>) => {
    const { onChange } = this.props;
    onChange({ event, value: event.currentTarget.value });
  };

  handleBlur = (event: SyntheticFocusEvent<HTMLTextAreaElement>) => {
    const { onBlur } = this.props;
    if (onBlur) {
      onBlur({ event, value: event.currentTarget.value });
    }
  };

  handleFocus = (event: SyntheticFocusEvent<HTMLTextAreaElement>) => {
    const { onFocus } = this.props;
    if (onFocus) {
      onFocus({ event, value: event.currentTarget.value });
    }
  };

  handleKeyDown = (event: SyntheticKeyboardEvent<HTMLTextAreaElement>) => {
    const { onKeyDown } = this.props;
    if (onKeyDown) {
      onKeyDown({ event, value: event.currentTarget.value });
    }
  };

  // NOTE: we cannot move to React createRef until we audit uses of callsites
  // that reach into this component and use this instance variable
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

    const { focused } = this.state;

    const classes = classnames(
      styles.textArea,
      disabled ? styles.disabled : styles.enabled,
      hasError || errorMessage ? styles.errored : styles.normal
    );

    return (
      <span>
        <textarea
          aria-describedby={errorMessage && focused ? `${id}-error` : null}
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
          ref={this.setTextAreaRef}
          rows={rows}
          value={value}
        />
        {errorMessage && (
          <Box marginTop={1}>
            <FormErrorMessage id={id} text={errorMessage} />
          </Box>
        )}
      </span>
    );
  }
}
