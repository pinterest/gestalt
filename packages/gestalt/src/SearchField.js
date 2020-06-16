// @flow strict

import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import layout from './Layout.css';
import styles from './SearchField.css';
import Box from './Box.js';
import Icon from './Icon.js';

type Props = {|
  accessibilityLabel: string,
  autoComplete?: 'on' | 'off' | 'username' | 'name',
  id: string,
  onBlur?: ({ event: SyntheticEvent<HTMLInputElement> }) => void,
  onChange: ({
    value: string,
    syntheticEvent: SyntheticEvent<HTMLInputElement>,
  }) => void,
  onFocus?: ({
    value: string,
    syntheticEvent: SyntheticEvent<HTMLInputElement>,
  }) => void,
  placeholder?: string,
  size?: 'md' | 'lg',
  value?: string,
  forwardedRef?: React.Ref<'input'>,
|};

const SearchField = ({
  accessibilityLabel,
  autoComplete,
  id,
  onBlur,
  onChange,
  onFocus,
  placeholder,
  size = 'md',
  value,
  forwardedRef,
}: Props) => {
  const [hovered, setHovered] = React.useState<boolean>(false);
  const [focused, setFocused] = React.useState<boolean>(false);

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

  const handleBlur = (event: SyntheticEvent<HTMLInputElement>) => {
    setFocused(false);
    if (onBlur) {
      onBlur({ event });
    }
  };

  const hasValue = value && value.length > 0;
  const hideSearchIcon = focused || hasValue;

  const className = classnames(styles.input, {
    [layout.medium]: size === 'md',
    [layout.large]: size === 'lg',
    [styles.inputActive]: focused || hasValue,
    [styles.inputHovered]: hovered,
  });

  const clearButtonSize = size === 'lg' ? 24 : 20;
  const clearIconSize = size === 'lg' ? 12 : 10;

  return (
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
          paddingX={4}
          position="absolute"
        >
          <Icon icon="search" accessibilityLabel="" />
        </Box>
      )}
      <input
        ref={forwardedRef}
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
        <button
          className={styles.clear}
          onClick={handleClear}
          tabIndex={-1}
          type="button"
        >
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
  );
};

SearchField.propTypes = {
  accessibilityLabel: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['md', 'lg']),
  value: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any,
    }),
  ]),
};

function forwardRefSearchField(props, ref) {
  return <SearchField {...props} forwardedRef={ref} />;
}
forwardRefSearchField.displayName = 'SearchField';

export default React.forwardRef<Props, HTMLInputElement>(forwardRefSearchField);
