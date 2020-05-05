// @flow strict
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import colors from './Colors.css';
import styles from './Checkbox.css';
import controlStyles from './RadioButtonCheckbox.css';
import Box from './Box.js';
import FormErrorMessage from './FormErrorMessage.js';
import Icon from './Icon.js';
import Label from './Label.js';
import Text from './Text.js';

type Props = {|
  checked?: boolean,
  disabled?: boolean,
  errorMessage?: string,
  hasError?: boolean,
  id: string,
  indeterminate?: boolean,
  label?: string,
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
  errorMessage,
  hasError = false,
  id,
  indeterminate = false,
  label,
  name,
  onChange,
  onClick,
  size = 'md',
}: Props) {
  const inputElement = React.useRef<?HTMLInputElement>(null);
  const [focused, setFocused] = React.useState(false);
  const [hovered, setHover] = React.useState(false);

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

  const handleHover = () => {
    setHover(!hovered);
  };

  let bgStyle = colors.whiteBg;
  if (disabled) {
    bgStyle = colors.lightGrayBg;
  } else if (checked || indeterminate) {
    bgStyle = colors.darkGrayBg;
  }

  let borderStyle = styles.border;
  if (disabled) {
    borderStyle = styles.borderDisabled;
  } else if (!disabled && (checked || indeterminate)) {
    borderStyle = styles.borderDarkGray;
  } else if (hasError || errorMessage) {
    borderStyle = styles.borderError;
  } else if (!disabled && hovered) {
    borderStyle = styles.borderHovered;
  }

  const borderRadiusStyle =
    size === 'sm' ? styles.borderRadiusSm : styles.borderRadiusMd;

  const styleSize = size === 'sm' ? controlStyles.sizeSm : controlStyles.sizeMd;

  return (
    <Box>
      <Box
        alignItems="center"
        display="flex"
        justifyContent="start"
        marginLeft={-1}
        marginRight={-1}
      >
        <Label htmlFor={id}>
          <Box paddingX={1} position="relative">
            <input
              checked={checked}
              className={classnames(controlStyles.input, styleSize, {
                [styles.inputEnabled]: !disabled,
              })}
              disabled={disabled}
              id={id}
              name={name}
              onBlur={() => setFocused(false)}
              onChange={handleChange}
              onClick={handleClick}
              onFocus={() => setFocused(true)}
              onMouseEnter={handleHover}
              onMouseLeave={handleHover}
              ref={inputElement}
              type="checkbox"
            />
            <div
              className={classnames(
                bgStyle,
                borderStyle,
                borderRadiusStyle,
                styleSize,
                styles.check,
                {
                  [styles.checkFocused]: focused,
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
        </Label>

        {label && (
          <Label htmlFor={id}>
            <Box paddingX={1}>
              <Text
                color={disabled ? 'gray' : undefined}
                size={size === 'sm' ? 'md' : 'lg'}
              >
                {label}
              </Text>
            </Box>
          </Label>
        )}
      </Box>
      {errorMessage && (
        <Box marginTop={2}>
          <Text color="red" size="sm">
            <FormErrorMessage id={id} text={errorMessage} />
          </Text>
        </Box>
      )}
    </Box>
  );
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  hasError: PropTypes.bool,
  id: PropTypes.string.isRequired,
  indeterminate: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'md']),
};
