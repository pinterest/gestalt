// @flow strict
import React, { forwardRef, useState, type Node } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import controlStyles from './RadioButtonCheckbox.css';
import styles from './RadioButton.css';
import Box from './Box.js';
import Label from './Label.js';
import Text from './Text.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';
import useFocusVisible from './useFocusVisible.js';
import focusStyles from './Focus.css';

type Props = {|
  checked?: boolean,
  disabled?: boolean,
  id: string,
  image?: Node,
  label?: string,
  name?: string,
  onChange: AbstractEventHandler<SyntheticInputEvent<HTMLInputElement>, {| checked: boolean |}>,
  subtext?: string,
  value: string,
  size?: 'sm' | 'md',
|};

const RadioButtonWithForwardRef: React$AbstractComponent<Props, HTMLInputElement> = forwardRef<
  Props,
  HTMLInputElement,
>(function RadioButton(props, ref): Node {
  const {
    checked = false,
    disabled = false,
    id,
    image,
    label,
    name,
    onChange,
    subtext,
    value,
    size = 'md',
  } = props;

  const [focused, setFocused] = useState(false);
  const [hovered, setHover] = useState(false);

  const handleChange: (event: SyntheticInputEvent<HTMLInputElement>) => mixed = (event) =>
    onChange({ checked: event.target.checked, event });

  const handleBlur: () => void = () => setFocused(false);

  const handleFocus: () => void = () => setFocused(true);

  const handleHover: (isHovered: boolean) => void = (isHovered: boolean) => setHover(isHovered);

  let borderStyle = styles.Border;
  if (disabled && checked) {
    borderStyle = styles.BorderDisabledChecked;
  } else if (!disabled && checked) {
    borderStyle = styles.BorderDarkGray;
  } else if (!disabled && hovered) {
    borderStyle = styles.BorderHovered;
  }

  let borderWidth = styles.BorderUnchecked;
  if (disabled && !checked) {
    borderWidth = styles.BorderDisabled;
  } else if (checked && size === 'sm') {
    borderWidth = styles.BorderCheckedSm;
  } else if (checked && size === 'md') {
    borderWidth = styles.BorderCheckedMd;
  }

  const styleSize = size === 'sm' ? controlStyles.sizeSm : controlStyles.sizeMd;

  const bgStyle = disabled && !checked ? styles.BgDisabled : styles.BgEnabled;

  const { isFocusVisible } = useFocusVisible();

  return (
    <Box
      alignItems={subtext || image ? 'start' : 'center'}
      display="flex"
      justifyContent="start"
      marginLeft={-1}
      marginRight={-1}
    >
      <Label htmlFor={id}>
        <Box paddingX={1}>
          <div
            className={classnames(
              bgStyle,
              borderStyle,
              borderWidth,
              styleSize,
              styles.RadioButton,
              {
                [focusStyles.accessibilityOutlineFocus]: focused && isFocusVisible,
              },
            )}
          >
            <input
              checked={checked}
              className={classnames(controlStyles.input, styleSize, {
                [styles.InputEnabled]: !disabled,
              })}
              disabled={disabled}
              id={id}
              name={name}
              onBlur={handleBlur}
              onChange={handleChange}
              onFocus={handleFocus}
              onMouseEnter={() => handleHover(true)}
              onMouseLeave={() => handleHover(false)}
              ref={ref}
              type="radio"
              value={value}
            />
          </div>
        </Box>
      </Label>
      {image && <Box paddingX={1}>{image}</Box>}
      {label && (
        <Label htmlFor={id}>
          <Box paddingX={1}>
            <Text color={disabled ? 'gray' : undefined} size={size === 'sm' ? 'md' : 'lg'}>
              {label}
            </Text>
            {subtext && (
              <Box paddingY={1}>
                <Text color="gray" size={size === 'sm' ? 'md' : 'lg'}>
                  <Box display="visuallyHidden">:</Box> {subtext}
                </Text>
              </Box>
            )}
          </Box>
        </Label>
      )}
    </Box>
  );
});

// $FlowFixMe[prop-missing] flow 0.135.0 upgrade
RadioButtonWithForwardRef.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  image: PropTypes.node,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['sm', 'md']),
  subtext: PropTypes.string,
};

RadioButtonWithForwardRef.displayName = 'RadioButton';

export default RadioButtonWithForwardRef;
