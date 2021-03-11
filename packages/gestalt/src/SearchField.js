// @flow strict
import type { Node } from 'react';

import { forwardRef, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import layout from './Layout.css';
import styles from './SearchField.css';
import formElement from './FormElement.css';
import Box from './Box.js';
import Icon from './Icon.js';
import FormErrorMessage from './FormErrorMessage.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';

type Props = {|
  accessibilityLabel: string,
  autoComplete?: 'on' | 'off' | 'username' | 'name',
  id: string,
  onBlur?: AbstractEventHandler<SyntheticEvent<HTMLInputElement>>,
  onChange: ({|
    value: string,
    syntheticEvent: SyntheticEvent<HTMLInputElement>,
  |}) => void,
  onFocus?: ({|
    value: string,
    syntheticEvent: SyntheticEvent<HTMLInputElement>,
  |}) => void,
  placeholder?: string,
  size?: 'md' | 'lg',
  value?: string,
  errorMessage?: string,
|};

const SearchFieldWithForwardRef: React$AbstractComponent<Props, HTMLInputElement> = forwardRef<
  Props,
  HTMLInputElement,
>(function SearchField(props, ref): Node {
  const {
    accessibilityLabel,
    autoComplete,
    id,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    size = 'md',
    value,
    errorMessage,
  } = props;

  const [hovered, setHovered] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);

  const handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    onChange({
      value: event.currentTarget.value,
      syntheticEvent: event,
    });
  };

  const handleClear = (event: SyntheticEvent<HTMLInputElement>) => {
    onChange({ value: '', syntheticEvent: event });
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

  const handleBlur = (event) => {
    setFocused(false);
    if (onBlur) {
      onBlur({ event });
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
    <Fragment>
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
          ref={ref}
          aria-label={accessibilityLabel}
          autoComplete={autoComplete}
          className={className}
          id={id}
          onChange={handleChange}
          placeholder={placeholder}
          role="searchbox"
          type="search"
          value={value}
        />

        {hasValue && (
          <button className={styles.clear} onClick={handleClear} tabIndex={-1} type="button">
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
                accessibilityLabel=""
                color={focused ? 'white' : 'darkGray'}
                icon="cancel"
                size={clearIconSize}
              />
            </Box>
          </button>
        )}
      </Box>
      {errorMessage && <FormErrorMessage id={id} text={errorMessage} />}
    </Fragment>
  );
});

// $FlowFixMe[prop-missing] flow 0.135.0 upgrade
SearchFieldWithForwardRef.propTypes = {
  accessibilityLabel: PropTypes.string.isRequired,
  autoComplete: PropTypes.oneOf(['on', 'off', 'username', 'name']),
  id: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['md', 'lg']),
  value: PropTypes.string,
  errorMessage: PropTypes.string,
};

SearchFieldWithForwardRef.displayName = 'SearchField';

export default SearchFieldWithForwardRef;
