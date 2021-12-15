// @flow strict
import type { Node } from 'react';

import { forwardRef, useState } from 'react';
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

/**
 *  Use [RadioButtons](https://gestalt.pinterest.systems/radiobutton) when you have a few options that a user can choose from. Never use radio buttons if the user can select more than one option from a list.
 */
const RadioButtonWithForwardRef: React$AbstractComponent<Props, HTMLInputElement> = forwardRef<
  Props,
  HTMLInputElement,
>(function RadioButton(
  {
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
  }: Props,
  ref,
): Node {
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
      marginStart={-1}
      marginEnd={-1}
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
      {Boolean(image) && <Box paddingX={1}>{image}</Box>}
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

RadioButtonWithForwardRef.displayName = 'RadioButton';

export default RadioButtonWithForwardRef;
