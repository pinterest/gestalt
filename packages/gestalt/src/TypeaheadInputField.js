// @flow strict

import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import layout from './Layout.css';
import styles from './SearchField.css';
import typeaheadStyle from './TypeaheadInputField.css';
import Box from './Box.js';
import Icon from './Icon.js';
import FormLabel from './FormLabel.js';

type Props = {|
  id: string,
  onBlur?: ({ event: SyntheticFocusEvent<HTMLInputElement> }) => void,
  onChange: ({
    value: string,
    event: SyntheticInputEvent<HTMLInputElement>,
  }) => void,
  setContainer: boolean => void,
  onClear: () => void,
  onFocus: ({
    value: string,
    event: SyntheticFocusEvent<HTMLInputElement>,
  }) => void,
  placeholder?: string,
  size?: 'md' | 'lg',
  value?: string,
  label?: string,
  forwardedRef?: React.Ref<'input'>,
|};

const InputField = ({
  id,
  label = id,
  onBlur,
  onChange,
  onClear,
  onFocus,
  setContainer,
  placeholder,
  size = 'md',
  value,
  forwardedRef,
}: Props) => {
  const [hovered, setHovered] = React.useState<boolean>(false);

  const handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    onChange({
      value: event.currentTarget.value,
      event,
    });
  };

  const handleClear = (event: SyntheticInputEvent<HTMLInputElement>) => {
    onChange({ value: '', event });

    if (onClear) onClear();
  };
  const handleMouseEnter = () => setHovered(true);

  const handleMouseLeave = () => setHovered(false);

  const handleFocus = (event: SyntheticFocusEvent<HTMLInputElement>) => {
    if (onFocus) {
      onFocus({
        value: event.currentTarget.value,
        event,
      });
    }
  };

  const handleBlur = (event: SyntheticFocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur({ event });
    }
  };

  const handleClick = (event: SyntheticFocusEvent<HTMLInputElement>) => {
    handleFocus(event);
    setContainer(true);
  };

  const hasValue = value && value?.length > 0;

  const className = classnames(styles.input, {
    [layout.medium]: size === 'md',
    [layout.large]: size === 'lg',
    [styles.inputActive]: true,
    [styles.inputHovered]: hovered,
    [typeaheadStyle.inputRadius]: true,
  });

  const clearButtonSize = size === 'lg' ? 24 : 20;
  const clearIconSize = size === 'lg' ? 12 : 10;

  return (
    <>
      {label && <FormLabel id={id} label={label} />}
      <Box
        alignItems="center"
        display="flex"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        position="relative"
      >
        <input
          ref={forwardedRef}
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
          >
            <Icon
              accessibilityLabel="typeahead clear button"
              color="darkGray"
              icon={!hasValue ? 'arrow-down' : 'cancel'}
              size={clearIconSize}
            />
          </Box>
        </button>
      </Box>
    </>
  );
};

InputField.displayName = InputField;

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onClear: PropTypes.func,
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

function forwardRefInputField(props, ref) {
  return <InputField {...props} forwardedRef={ref} />;
}
forwardRefInputField.displayName = 'InputField';

export default React.forwardRef<Props, HTMLInputElement>(forwardRefInputField);
