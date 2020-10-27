// @flow strict

import React, { forwardRef, useState, type Ref, type Node } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import layout from './Layout.css';
import styles from './SearchField.css';
import typeaheadStyle from './TypeaheadInputField.css';
import Box from './Box.js';
import Icon from './Icon.js';
import FormLabel from './FormLabel.js';

type DirectionOptionType = -1 | 0 | 1;

type Props = {|
  forwardedRef?: Ref<'input'>,
  id: string,
  label?: string,
  onBlur: ({|
    event: SyntheticFocusEvent<HTMLInputElement>,
  |}) => void,
  onChange: ({|
    value: string,
    event: SyntheticInputEvent<HTMLInputElement>,
  |}) => void,
  onClear: () => void,
  onFocus: ({|
    value: string,
    event: SyntheticFocusEvent<HTMLInputElement>,
  |}) => void,
  onKeyNavigation: (
    SyntheticKeyboardEvent<HTMLInputElement>,
    DirectionOptionType
  ) => void,
  placeholder?: string,
  setContainer: (boolean) => void,
  size?: 'md' | 'lg',
  value?: string,
|};

const TypeaheadInputFieldWithForwardRef: React$AbstractComponent<
  Props,
  HTMLInputElement
> = forwardRef<Props, HTMLInputElement>(function InputField(props, ref): Node {
  const {
    id,
    label,
    onBlur,
    onChange,
    onClear,
    onKeyNavigation,
    onFocus,
    setContainer,
    placeholder,
    size = 'md',
    value,
  } = props;

  const [hovered, setHovered] = useState<boolean>(false);

  const handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    onChange({
      value: event.currentTarget.value,
      event,
    });
  };

  const handleClear = (event: SyntheticInputEvent<HTMLInputElement>) => {
    onChange({ value: '', event });

    onClear();
  };

  const handleFocus = (event: SyntheticFocusEvent<HTMLInputElement>) => {
    onFocus({
      value: event.currentTarget.value,
      event,
    });
  };

  const handleBlur = (event: SyntheticFocusEvent<HTMLInputElement>) => {
    onBlur({ event });
  };

  const handleClick = (event: SyntheticFocusEvent<HTMLInputElement>) => {
    handleFocus(event);
    setContainer(true);
  };

  const handleKeyNavigation = (
    event: SyntheticKeyboardEvent<HTMLInputElement>
  ) => {
    setContainer(true);
    const KEYS = {
      UP: -1,
      DOWN: 1,
      ENTER: 0,
    };
    // Up Arrow
    if (event.keyCode === 38) {
      onKeyNavigation(event, KEYS.UP);
    }
    // Down Arrow
    else if (event.keyCode === 40) {
      onKeyNavigation(event, KEYS.DOWN);
    }
    // Enter Key
    else if (event.keyCode === 13) {
      onKeyNavigation(event, KEYS.ENTER);
    }
  };

  const hasValue = value && value?.length > 0;

  const className = classnames(
    styles.input,
    styles.inputActive,
    typeaheadStyle.inputRadius,
    {
      [layout.medium]: size === 'md',
      [layout.large]: size === 'lg',
      [styles.inputHovered]: hovered,
    }
  );

  const clearButtonSize = size === 'lg' ? 24 : 20;
  const clearIconSize = size === 'lg' ? 12 : 10;

  return (
    <>
      {label && <FormLabel id={id} label={label} />}
      <Box
        alignItems="center"
        display="flex"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        position="relative"
      >
        <input
          ref={ref}
          autoComplete="off"
          aria-label={label}
          className={className}
          id={id}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClick={() => setContainer(true)}
          onChange={handleChange}
          placeholder={placeholder}
          type="text"
          value={value}
          onKeyDown={handleKeyNavigation}
        />

        <button
          className={hasValue ? styles.clear : typeaheadStyle.icon}
          onClick={!hasValue ? handleClick : handleClear}
          tabIndex={-1}
          type="button"
        >
          <Box
            alignItems="center"
            color="transparent"
            display="flex"
            height={clearButtonSize}
            justifyContent="center"
            rounding="circle"
            width={clearButtonSize}
            left
            right
          >
            <Icon
              accessibilityLabel=""
              color="darkGray"
              icon={!hasValue ? 'arrow-down' : 'cancel'}
              size={clearIconSize}
            />
          </Box>
        </button>
      </Box>
    </>
  );
});

// $FlowFixMe[prop-missing] flow 0.135.0 upgrade
TypeaheadInputFieldWithForwardRef.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onClear: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onKeyNavigation: PropTypes.func,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['md', 'lg']),
  setContainer: PropTypes.func,
  value: PropTypes.string,
};

TypeaheadInputFieldWithForwardRef.displayName = 'TypeaheadInputField';

export default TypeaheadInputFieldWithForwardRef;
