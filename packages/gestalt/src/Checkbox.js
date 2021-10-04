// @flow strict
import type { Node } from 'react';

import { forwardRef, useImperativeHandle, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import colors from './Colors.css';
import styles from './Checkbox.css';
import controlStyles from './RadioButtonCheckbox.css';
import Box from './Box.js';
import FormErrorMessage from './FormErrorMessage.js';
import Icon from './Icon.js';
import Label from './Label.js';
import Text from './Text.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';
import useFocusVisible from './useFocusVisible.js';
import focusStyles from './Focus.css';

type Props = {|
  checked?: boolean,
  disabled?: boolean,
  errorMessage?: string,
  hasError?: boolean,
  id: string,
  image?: Node,
  indeterminate?: boolean,
  label?: string,
  name?: string,
  onChange: AbstractEventHandler<SyntheticInputEvent<HTMLInputElement>, {| checked: boolean |}>,
  onClick?: AbstractEventHandler<SyntheticInputEvent<HTMLInputElement>, {| checked: boolean |}>,
  size?: 'sm' | 'md',
  subtext?: string,
|};

/**
 * https://gestalt.pinterest.systems/Checkbox
 */
const CheckboxWithForwardRef: React$AbstractComponent<Props, HTMLInputElement> = forwardRef<
  Props,
  HTMLInputElement,
>(function Checkbox(props: Props, ref): Node {
  const {
    checked = false,
    disabled = false,
    errorMessage,
    hasError = false,
    id,
    image,
    indeterminate = false,
    label,
    name,
    onChange,
    onClick,
    size = 'md',
    subtext,
  } = props;

  const innerRef = useRef(null);
  // When using both forwardRef and innerRef, React.useimperativehandle() allows a parent component
  // that renders <Checkbox ref={inputRef} /> to call inputRef.current.focus()
  useImperativeHandle(ref, () => innerRef.current);

  const [focused, setFocused] = useState(false);
  const [hovered, setHover] = useState(false);

  useEffect(() => {
    if (innerRef && innerRef.current) {
      innerRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleChange = (event) => {
    if (onChange) {
      onChange({ event, checked: event.target.checked });
    }
  };

  const handleClick = (event) => {
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

  const borderRadiusStyle = size === 'sm' ? styles.borderRadiusSm : styles.borderRadiusMd;

  const styleSize = size === 'sm' ? controlStyles.sizeSm : controlStyles.sizeMd;

  const { isFocusVisible } = useFocusVisible();

  return (
    <Box>
      <Box
        alignItems={subtext || image ? 'start' : 'center'}
        display="flex"
        justifyContent="start"
        marginStart={-1}
        marginEnd={-1}
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
              ref={innerRef}
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
                  [focusStyles.accessibilityOutlineFocus]: focused && isFocusVisible,
                },
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
      {errorMessage && (
        <Box marginTop={2}>
          <Text color="red" size="sm">
            <FormErrorMessage id={id} text={errorMessage} />
          </Text>
        </Box>
      )}
    </Box>
  );
});

CheckboxWithForwardRef.displayName = 'Checkbox';

export default CheckboxWithForwardRef;
