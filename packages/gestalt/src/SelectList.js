// @flow strict
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Box from './Box.js';
import formElement from './FormElement.css';
import layout from './Layout.css';
import FormErrorMessage from './FormErrorMessage.js';
import FormHelperText from './FormHelperText.js';
import FormLabel from './FormLabel.js';
import Icon from './Icon.js';
import styles from './SelectList.css';

type Props = {|
  errorMessage?: string,
  disabled?: boolean,
  helperText?: string,
  id: string,
  label?: string,
  name?: string,
  onChange: ({ event: SyntheticInputEvent<>, value: string }) => void,
  options: Array<{
    label: string,
    value: string,
  }>,
  placeholder?: string,
  size?: 'md' | 'lg',
  value?: ?string,
|};

type State = {|
  focused: boolean,
|};

export default class SelectList extends React.Component<Props, State> {
  select: ?HTMLSelectElement;

  static propTypes = {
    disabled: PropTypes.bool,
    errorMessage: PropTypes.string,
    helperText: PropTypes.string,
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.exact({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ),
    placeholder: PropTypes.string,
    size: PropTypes.oneOf(['md', 'lg']),
    value: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
    size: 'md',
    options: [],
  };

  state = {
    focused: false,
  };

  setSelectListRef = (ref: ?HTMLSelectElement) => {
    this.select = ref;
  };

  handleOnChange = (event: SyntheticInputEvent<>) => {
    const { onChange, value } = this.props;
    if (
      event.target instanceof HTMLSelectElement &&
      value !== event.target.value
    ) {
      onChange({ event, value: event.target.value });
    }
  };

  render() {
    const {
      disabled,
      errorMessage,
      helperText,
      id,
      label,
      name,
      options,
      placeholder,
      size,
      value,
    } = this.props;

    const { focused } = this.state;

    const classes = classnames(
      styles.select,
      formElement.base,
      disabled ? formElement.disabled : formElement.enabled,
      errorMessage ? formElement.errored : formElement.normal,
      size === 'md' ? layout.medium : layout.large
    );

    const showPlaceholder = placeholder && !value;

    return (
      <Box>
        {label && <FormLabel id={id} label={label} />}
        <Box
          color={disabled ? 'lightGray' : 'white'}
          display="flex"
          position="relative"
          rounding={4}
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
            aria-describedby={errorMessage && focused ? `${id}-error` : null}
            aria-invalid={errorMessage ? 'true' : 'false'}
            className={classes}
            disabled={disabled}
            id={id}
            name={name}
            onBlur={this.handleOnChange}
            onChange={this.handleOnChange}
            ref={this.setSelectListRef}
            value={showPlaceholder ? placeholder : value}
          >
            {showPlaceholder && (
              <option disabled value={placeholder} hidden>
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
        {helperText && !errorMessage ? (
          <FormHelperText text={helperText} />
        ) : null}
        {errorMessage && <FormErrorMessage id={id} text={errorMessage} />}
      </Box>
    );
  }
}
