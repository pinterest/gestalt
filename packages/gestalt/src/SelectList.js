// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ErrorMessage from './ErrorMessage.js';
import formatErrorId from './formatErrorId.js';
import Box from './Box.js';
import Icon from './Icon.js';
import styles from './SelectList.css';

type State = {
  errorMessage?: string,
  focused: boolean,
};

type Props = {|
  errorMessage?: string,
  disabled?: boolean,
  id: string,
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
    options: [],
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

  handleOnChange = (event: SyntheticInputEvent<>) => {
    if (
      event.target instanceof HTMLSelectElement &&
      this.props.value !== event.target.value
    ) {
      this.props.onChange({ event, value: event.target.value });
    }
  };

  select: ?HTMLSelectElement;

  render() {
    const {
      disabled,
      errorMessage,
      id,
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
      <Box>
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
              errorMessage && this.state.focused ? formatErrorId(id) : null
            }
            aria-invalid={errorMessage ? 'true' : 'false'}
            className={classes}
            disabled={disabled}
            id={id}
            name={name}
            onBlur={this.handleOnChange}
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
        </Box>

        {errorMessage && <ErrorMessage errorMessage={errorMessage} id={id} />}
      </Box>
    );
  }
}
