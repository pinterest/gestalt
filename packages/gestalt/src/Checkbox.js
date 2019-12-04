// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import colors from './Colors.css';
import styles from './Checkbox.css';
import Box from './Box.js';
import Icon from './Icon.js';

type Props = {|
  checked?: boolean,
  disabled?: boolean,
  hasError?: boolean,
  id: string,
  indeterminate?: boolean,
  name?: string,
  onChange: ({ event: SyntheticInputEvent<>, checked: boolean }) => void,
  onClick?: ({
    event: SyntheticInputEvent<HTMLInputElement>,
    checked: boolean,
  }) => void,
  size?: 'sm' | 'md',
|};

export default function Checkbox({
  checked = false,
  disabled = false,
  hasError = false,
  id,
  indeterminate = false,
  name,
  onChange,
  onClick,
  size = 'md',
}: Props) {
  const inputElement = React.useRef<?HTMLInputElement>(null);
  const [focused, setFocused] = React.useState(false);

  React.useEffect(() => {
    if (inputElement && inputElement.current) {
      inputElement.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleChange = (event: SyntheticInputEvent<>) => {
    if (onChange) {
      onChange({ event, checked: event.target.checked });
    }
  };

  const handleClick = (event: SyntheticInputEvent<HTMLInputElement>) => {
    if (onClick) {
      onClick({ event, checked: event.currentTarget.checked });
    }
  };

  let borderStyle = styles.border;
  if (!disabled && (checked || indeterminate)) {
    borderStyle = styles.borderDark;
  } else if (hasError) {
    borderStyle = styles.borderError;
  }

  return (
    <Box position="relative">
      <input
        checked={checked}
        className={classnames(styles.input, {
          [styles.inputEnabled]: !disabled,
          [styles.indeterminate]: indeterminate,
          [styles.inputSm]: size === 'sm',
          [styles.inputMd]: size === 'md',
        })}
        disabled={disabled}
        id={id}
        name={name}
        onBlur={() => setFocused(false)}
        onChange={handleChange}
        onClick={handleClick}
        onFocus={() => setFocused(true)}
        ref={inputElement}
        type="checkbox"
      />
      <div
        className={classnames(
          borderStyle,
          styles.check,
          // eslint-disable-next-line no-nested-ternary
          disabled
            ? checked || indeterminate
              ? colors.grayBg
              : colors.lightGrayBg
            : checked || indeterminate
            ? colors.darkGrayBg
            : colors.whiteBg,
          {
            [styles.checkEnabled]: !disabled,
            [styles.checkFocused]: focused,
            [styles.checkMd]: size === 'md',
            [styles.checkSm]: size === 'sm',
          }
        )}
      >
        {(checked || indeterminate) && (
          <Icon
            accessibilityLabel=""
            color="white"
            icon={indeterminate ? 'dash' : 'check'}
            size={size === 'sm' ? 8 : 12}
          />
        )}
      </div>
    </Box>
  );
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  hasError: PropTypes.bool,
  id: PropTypes.string.isRequired,
  indeterminate: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'md']),
};
