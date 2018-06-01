// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Box from '../Box/Box';
import ErrorFlyout from '../ErrorFlyout/ErrorFlyout';
import Icon from '../Icon/Icon';
import styles from './SelectList.css';

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
  onChange: ({ event: SyntheticInputEvent<>, value: string }) => void,
  options: Array<{
    label: string,
    value: string,
  }>,
  placeholder?: string,
  value?: ?string,
|};

export default class SelectList extends React.Component<Props, State> {
  static propTypes = {
    disabled: PropTypes.bool,
    errorMessage: PropTypes.string,
    id: PropTypes.string.isRequired,
    idealErrorDirection: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.exact({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ),
    placeholder: PropTypes.string,
    value: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
    idealErrorDirection: 'right',
    options: [],
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

  select: ?HTMLSelectElement;

  handleOnChange = (event: SyntheticInputEvent<>) => {
    if (
      event.target instanceof HTMLSelectElement &&
      this.props.value !== event.target.value
    ) {
      this.props.onChange({ event, value: event.target.value });

      if (this.props.errorMessage) {
        this.setState({ errorIsOpen: false });
      }
    }
  };

  handleBlur = () => {
    if (this.props.errorMessage) {
      this.setState({ errorIsOpen: false });
    }
  };

  handleFocus = () => {
    if (this.props.errorMessage) {
      this.setState({ errorIsOpen: true });
    }
  };

  render() {
    const {
      disabled,
      errorMessage,
      id,
      idealErrorDirection,
      name,
      options,
      placeholder,
      value,
    } = this.props;

    const classes = classnames(
      styles.select,
      disabled ? styles.disabled : styles.enabled,
      errorMessage ? styles.errored : styles.normal
    );

    return (
      <Box
        color={disabled ? 'lightGray' : 'white'}
        dangerouslySetInlineStyle={{ __style: { borderRadius: 4 } }}
        display="flex"
        position="relative"
        width="100%"
      >
        <Box
          alignItems="center"
          bottom
          dangerouslySetInlineStyle={{
            __style: { paddingRight: 14, paddingTop: 2 },
          }}
          display="flex"
          position="absolute"
          right
          top
        >
          <Icon
            icon="arrow-down"
            size={12}
            color={disabled ? 'gray' : 'darkGray'}
            accessibilityLabel=""
          />
        </Box>
        <select
          aria-describedby={
            errorMessage && this.state.focused ? `${id}-gestalt-error` : null
          }
          aria-invalid={errorMessage ? 'true' : 'false'}
          className={classes}
          disabled={disabled}
          id={id}
          name={name}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onChange={this.handleOnChange}
          ref={c => {
            this.select = c;
          }}
          value={value}
        >
          {placeholder &&
            !value && (
              <option selected disabled value hidden>
                {placeholder}
              </option>
            )}
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errorMessage &&
          this.state.errorIsOpen && (
            <ErrorFlyout
              anchor={this.select}
              id={`${id}-gestalt-error`}
              idealDirection={idealErrorDirection}
              message={errorMessage}
              onDismiss={() => this.setState({ errorIsOpen: false })}
              size="sm"
            />
          )}
      </Box>
    );
  }
}
