// @flow strict
import { forwardRef, type Node, useImperativeHandle, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import colors from './Colors.css';
import styles from './Checkbox.css';
import controlStyles from './RadioButtonCheckbox.css';
import Box from './Box.js';
import FormErrorMessage from './FormErrorMessage.js';
import Icon from './Icon.js';
import Label from './Label.js';
import Text from './Text.js';
import useFocusVisible from './useFocusVisible.js';
import focusStyles from './Focus.css';

type Props = {|
  /**
   * Is the element currently checked?
   */
  checked?: boolean,
  /**
   * Is the element currently disabled? Disabled Checkboxes do not respond to mouse events and cannot be reached by the keyboard.
   */
  disabled?: boolean,
  /**
   * Displays an error message and error state. Be sure the error message helps the user resolve the problem.
   */
  errorMessage?: string,
  /**
   * This field is deprecated and will be removed soon. Please do not use.
   */
  hasError?: boolean,
  /**
   * A unique identifier for the input.
   */
  id: string,
  /**
   * An optional Image component can be supplied to add an image to each checkbox. Spacing is already accounted for; simply specify the width and height.
   */
  image?: Node,
  /**
   * Used to indicate a state that is neither checked nor unchecked — e.g. a "Select all" checkbox when not all items are selected or unselected.
   * Indeterminism is purely presentational - the value of a checkbox and its indeterminism are independent.
   */
  indeterminate?: boolean,
  /**
   * The label for the input. Be sure to localize the text.
   */
  label?: string,
  /**
   * A unique name for the input.
   */
  name?: string,
  /**
   * Callback triggered when the state of the input changes.
   */
  onChange: ({| event: SyntheticInputEvent<HTMLInputElement>, checked: boolean |}) => void,
  /**
   * Callback triggered when the user clicks on the input.
   */
  onClick?: ({| event: SyntheticInputEvent<HTMLInputElement>, checked: boolean |}) => void,
  /**
   * Ref that is forwarded to the underlying input element.
   */
  ref?: Element<'input'>, // eslint-disable-line react/no-unused-prop-types
  /**
   * sm: 16px, md: 24px
   */
  size?: 'sm' | 'md',
  /**
   * Optional description for the checkbox, used to provide more detail about an option.
   */
  subtext?: string,
|};

/**
 * Use [Checkbox](https://gestalt.pinterest.systems/checkbox) instead of [Switch](https://gestalt.pinterest.systems/switch) when displaying 3 or more toggle inputs.
 */
const CheckboxWithForwardRef: React$AbstractComponent<Props, HTMLInputElement> = forwardRef<
  Props,
  HTMLInputElement,
>(function Checkbox(
  {
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
  }: Props,
  ref,
): Node {
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
              <Text color={disabled ? 'gray' : undefined} size={size === 'sm' ? '200' : '300'}>
                {label}
              </Text>
              {subtext && (
                <Box paddingY={1}>
                  <Text color="gray" size={size === 'sm' ? '200' : '300'}>
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
          <Text color="red" size="100">
            <FormErrorMessage id={id} text={errorMessage} />
          </Text>
        </Box>
      )}
    </Box>
  );
});

CheckboxWithForwardRef.displayName = 'Checkbox';

export default CheckboxWithForwardRef;
