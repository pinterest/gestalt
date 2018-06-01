// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ErrorFlyout from '../ErrorFlyout/ErrorFlyout';
import styles from './TextArea.css';

type State = {
  focused: boolean,
  errorIsOpen: boolean,
  errorMessage?: string,
};

type Props = {|
  errorMessage?: string,
  disabled?: boolean,
  id: string,
  idealErrorDirection?: 'up' | 'right' | 'down' | 'left' /* default: right */,
  name?: string,
  onBlur?: ({ event: SyntheticFocusEvent<>, value: string }) => void,
  onChange: ({ event: SyntheticInputEvent<>, value: string }) => void,
  onFocus?: ({ event: SyntheticFocusEvent<>, value: string }) => void,
  placeholder?: string,
  rows?: number /* default: 3 */,
  value?: string,
|};

export default class TextArea extends React.Component<Props, State> {
  static propTypes = {
    disabled: PropTypes.bool,
    errorMessage: PropTypes.string,
    id: PropTypes.string.isRequired,
    idealErrorDirection: PropTypes.string,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    placeholder: PropTypes.string,
    rows: PropTypes.number,
    value: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
    idealErrorDirection: 'right',
    rows: 3,
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

  state = {
    focused: false,
    errorIsOpen: false,
  };

  textarea: ?HTMLElement;

  handleChange = (event: SyntheticInputEvent<>) => {
    if (event.target instanceof HTMLTextAreaElement) {
      this.props.onChange({
        event,
        value: event.target.value,
      });

      if (this.props.errorMessage) {
        this.setState({ errorIsOpen: true });
      }
    }
  };

  handleBlur = (event: SyntheticFocusEvent<>) => {
    if (this.props.errorMessage) {
      this.setState({ errorIsOpen: false });
    }
    if (event.target instanceof HTMLTextAreaElement && this.props.onBlur) {
      this.props.onBlur({
        event,
        value: event.target.value,
      });
    }
  };

  handleFocus = (event: SyntheticFocusEvent<>) => {
    if (this.props.errorMessage) {
      this.setState({ errorIsOpen: true });
    }
    if (event.target instanceof HTMLTextAreaElement && this.props.onFocus) {
      this.props.onFocus({
        event,
        value: event.target.value,
      });
    }
  };

  render() {
    const {
      disabled,
      errorMessage,
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
      errorMessage ? styles.errored : styles.normal
    );

    return (
      <span>
        <textarea
          aria-describedby={
            errorMessage && this.state.focused ? `${id}-gestalt-error` : null
          }
          aria-invalid={errorMessage ? 'true' : 'false'}
          className={classes}
          disabled={disabled}
          id={id}
          name={name}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          placeholder={placeholder}
          ref={c => {
            this.textarea = c;
          }}
          rows={rows}
          value={value}
        />
        {errorMessage && this.state.errorIsOpen ? (
          <ErrorFlyout
            anchor={this.textarea}
            id={`${id}-gestalt-error`}
            idealDirection={idealErrorDirection}
            message={errorMessage}
            onDismiss={() => this.setState({ errorIsOpen: false })}
            size="sm"
          />
        ) : null}
      </span>
    );
  }
}
