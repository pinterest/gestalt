// @flow strict

import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import layout from './Layout.css';
import styles from './SearchField.css';
import iconStyle from './TypeaheadInputField.css';
import Box from './Box.js';
import Icon from './Icon.js';
import FormLabel from './FormLabel.js';

type Props = {|
  id: string,
  onBlur?: ({ event: SyntheticEvent<HTMLInputElement> }) => void,
  onChange: ({
    value: string,
    syntheticEvent: SyntheticEvent<HTMLInputElement>,
  }) => void,
  onClear?: () => void,
  onFocus?: ({
    value: string,
    syntheticEvent: SyntheticEvent<HTMLInputElement>,
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
  placeholder,
  size = 'md',
  value,
  forwardedRef,
}: Props) => {
  const [hovered, setHovered] = React.useState<boolean>(false);

  const handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    onChange({
      value: event.currentTarget.value,
      syntheticEvent: event,
    });
  };

  const handleClear = (event: SyntheticEvent<HTMLInputElement>) => {
    onChange({ value: '', syntheticEvent: event });

    if (onClear) onClear();
  };
  const handleMouseEnter = () => setHovered(true);

  const handleMouseLeave = () => setHovered(false);

  const handleFocus = (event: SyntheticEvent<HTMLInputElement>) => {
    if (onFocus) {
      onFocus({
        value: event.currentTarget.value,
        syntheticEvent: event,
      });
    }
  };

  const handleBlur = (event: SyntheticEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur({ event });
    }
  };

  const hasValue = value && value?.length > 0;

  const className = classnames(styles.input, {
    [layout.medium]: size === 'md',
    [layout.large]: size === 'lg',
    [styles.inputActive]: true,
    [styles.inputHovered]: hovered,
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
        onFocus={handleFocus}
        onBlur={handleBlur}
        position="relative"
      >
        <input
          ref={forwardedRef}
          autoComplete="off"
          aria-label={label}
          className={className}
          id={id}
          onChange={handleChange}
          placeholder={placeholder}
          type="text"
          value={value}
        />

        <button
          className={hasValue ? styles.clear : iconStyle.icon}
          onClick={!hasValue ? handleFocus : handleClear}
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
