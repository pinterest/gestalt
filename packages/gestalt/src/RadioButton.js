// @flow strict
import React, { forwardRef, useState, type Node, type Ref } from 'react';
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
  forwardedRef?: Ref<'input'>,
  id: string,
  label?: string,
  name?: string,
  onChange: AbstractEventHandler<
    SyntheticInputEvent<HTMLInputElement>,
    {| checked: boolean |}
  >,
  value: string,
  size?: 'sm' | 'md',
|};

function RadioButton(props: Props): Node {
  const {
    checked = false,
    disabled = false,
    id,
    forwardedRef,
    label,
    name,
    onChange,
    value,
    size = 'md',
  } = props;

  const [focused, setFocused] = useState(false);
  const [hovered, setHover] = useState(false);

  const handleChange: (
    event: SyntheticInputEvent<HTMLInputElement>
  ) => mixed = event => onChange({ checked: event.target.checked, event });

  const handleBlur: () => void = () => setFocused(false);

  const handleFocus: () => void = () => setFocused(true);

  const handleHover: (isHovered: boolean) => void = (isHovered: boolean) =>
    setHover(isHovered);

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
      alignItems="center"
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
                [focusStyles.accessibilityOutlineFocus]:
                  focused && isFocusVisible,
              }
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
              ref={forwardedRef}
              type="radio"
              value={value}
            />
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
  );
}

RadioButton.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any,
    }),
  ]),
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['sm', 'md']),
};

function RadioButtonWithRef(props, ref) {
  return <RadioButton {...props} forwardedRef={ref} />;
}

const RadioButtonWithForwardRef: React$AbstractComponent<
  Props,
  HTMLInputElement
> = forwardRef<Props, HTMLInputElement>(RadioButtonWithRef);

RadioButtonWithForwardRef.displayName = 'RadioButton';

export default RadioButtonWithForwardRef;
