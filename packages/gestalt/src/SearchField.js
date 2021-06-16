// @flow strict
import type { Node } from 'react';

import { forwardRef, useState, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import layout from './Layout.css';
import styles from './SearchField.css';
import formElement from './FormElement.css';
import Box from './Box.js';
import Icon from './Icon.js';
import FormErrorMessage from './FormErrorMessage.js';
import FormLabel from './FormLabel.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';

type Props = {|
  accessibilityLabel: string,
  accessibilityClearButtonLabel?: string,
  autoComplete?: 'on' | 'off' | 'username' | 'name',
  id: string,
  label?: string,
  onBlur?: AbstractEventHandler<SyntheticEvent<HTMLInputElement>>,
  onChange: ({|
    value: string,
    syntheticEvent: SyntheticEvent<HTMLInputElement>,
  |}) => void,
  onFocus?: ({|
    value: string,
    syntheticEvent: SyntheticEvent<HTMLInputElement>,
  |}) => void,
  onKeyDown?: ({|
    event: SyntheticKeyboardEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  placeholder?: string,
  size?: 'md' | 'lg',
  value?: string,
  errorMessage?: string,
|};

/**
 * https://gestalt.pinterest.systems/SearchField
 */
const SearchFieldWithForwardRef: React$AbstractComponent<Props, HTMLInputElement> = forwardRef<
  Props,
  HTMLInputElement,
>(function SearchField(props, ref): Node {
  const {
    accessibilityLabel,
    accessibilityClearButtonLabel,
    autoComplete,
    id,
    label,
    onBlur,
    onChange,
    onFocus,
    onKeyDown,
    placeholder,
    size = 'md',
    value,
    errorMessage,
  } = props;

  const [hovered, setHovered] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);

  // Ref to the input
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => inputRef.current);

  const handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    onChange({
      value: event.currentTarget.value,
      syntheticEvent: event,
    });
  };

  const handleMouseEnter = () => setHovered(true);

  const handleMouseLeave = () => setHovered(false);

  const handleFocus = (event: SyntheticEvent<HTMLInputElement>) => {
    setFocused(true);
    if (onFocus) {
      onFocus({
        value: event.currentTarget.value,
        syntheticEvent: event,
      });
    }
  };

  const handleClear = (event: SyntheticEvent<HTMLInputElement>) => {
    inputRef?.current?.focus();
    onChange({ value: '', syntheticEvent: event });
  };

  const handleBlur = (event) => {
    setFocused(false);
    if (onBlur) {
      onBlur({ event });
    }
  };

  const handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    if (onKeyDown) {
      onKeyDown({ event, value: event.currentTarget.value });
    }
  };

  const hasValue = value && value.length > 0;
  const hideSearchIcon = focused || hasValue;

  const className = classnames(
    styles.input,
    {
      [layout.medium]: size === 'md',
      [layout.large]: size === 'lg',
      [styles.inputActive]: focused || hasValue,
      [styles.inputHovered]: hovered,
    },
    errorMessage ? formElement.errored : formElement.normal,
  );

  const clearButtonSize = size === 'lg' ? 24 : 20;
  const clearIconSize = size === 'lg' ? 12 : 10;

  return (
    <span>
      {label && <FormLabel id={id} label={label} />}
      <Box
        alignItems="center"
        display="flex"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        position="relative"
      >
        {!hideSearchIcon && (
          <Box
            dangerouslySetInlineStyle={{
              __style: {
                pointerEvents: 'none',
                // Added the following lines for Safari support
                top: '50%',
                transform: 'translateY(-50%)',
              },
            }}
            left
            right
            paddingX={4}
            position="absolute"
          >
            <Icon icon="search" accessibilityLabel="" />
          </Box>
        )}
        <input
          aria-describedby={errorMessage && focused ? `${id}-error` : null}
          aria-invalid={errorMessage ? 'true' : 'false'}
          ref={inputRef}
          aria-label={accessibilityLabel}
          autoComplete={autoComplete}
          className={className}
          id={id}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          role="searchbox"
          type="search"
          value={value}
        />

        {hasValue && (
          <button className={styles.clear} onClick={handleClear} type="button">
            <Box
              alignItems="center"
              color={focused ? 'darkGray' : 'transparent'}
              display="flex"
              height={clearButtonSize}
              justifyContent="center"
              rounding="circle"
              width={clearButtonSize}
            >
              <Icon
                accessibilityLabel={accessibilityClearButtonLabel || ''}
                color={focused ? 'white' : 'darkGray'}
                icon="cancel"
                size={clearIconSize}
              />
            </Box>
          </button>
        )}
      </Box>
      {errorMessage && <FormErrorMessage id={id} text={errorMessage} />}
    </span>
  );
});

SearchFieldWithForwardRef.propTypes = {
  accessibilityLabel: PropTypes.string.isRequired,
  accessibilityClearButtonLabel: PropTypes.string,
  autoComplete: PropTypes.oneOf(['on', 'off', 'username', 'name']),
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['md', 'lg']),
  value: PropTypes.string,
  errorMessage: PropTypes.string,
};

SearchFieldWithForwardRef.displayName = 'SearchField';

export default SearchFieldWithForwardRef;
