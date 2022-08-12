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
   * Indicates whether or not Checkbox is checked. See the [state variant](https://gestalt.pinterest.systems/web/checkbox#State) to learn more.
   */
  checked?: boolean,
  /**
   * Indicates whether or not Checkbox is disabled. Disabled Checkboxes do not respond to mouse events and cannot be reached by the keyboard. See the [state variant](https://gestalt.pinterest.systems/web/checkbox#State) to learn more.
   */
  disabled?: boolean,
  /**
   * Displays an error message and error state. See the [accessibility section](https://gestalt.pinterest.systems/web/checkbox#Error-message) to learn more.
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
   * An optional Image can be supplied to add an image to each Checkbox. See the [with Image variant](https://gestalt.pinterest.systems/web/checkbox#With-Image) to learn more.
   */
  image?: Node,
  /**
   * Indicates a state that is neither checked nor unchecked. See the [state variant](https://gestalt.pinterest.systems/web/checkbox#State) to learn more.
   */
  indeterminate?: boolean,
  /**
   * The label for the input. Be sure to localize the text. See the [accessibility section](https://gestalt.pinterest.systems/web/checkbox#Labels) to learn more.
   */
  label?: string,
  /**
   * Whether the label should be visible or not. If `hidden`, the label is still available for screen reader users, but does not appear visually. See the [label visibility variant](https://gestalt.pinterest.systems#Label-visibility) for more info.
   */
  labelDisplay?: 'visible' | 'hidden',
  /**
   * A unique name for the input used to reference form data after it’s submitted. If the name attribute is not specified then the data of the checkbox would not be sent in the form submission.
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
   * Determines the Checkbox size: sm = 16px, md = 24px. See the [size variant](https://gestalt.pinterest.systems/web/checkbox#Size) to learn more.
   */
  size?: 'sm' | 'md',
  /**
   * Optional description for Checkbox, used to provide more detail about an option. See the [with subtext variant](https://gestalt.pinterest.systems/web/checkbox#With-subtext) to learn more.
   */
  subtext?: string,
|};

/**
 * [Checkbox](https://gestalt.pinterest.systems/web/checkbox) is used for multiple choice selection. They are independent of each other in a list, and therefore, different from [RadioButton](https://gestalt.pinterest.systems/web/radiobutton), one selection does not affect other checkboxes in the same list.
 *
 * ![Checkbox light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Checkbox.spec.mjs-snapshots/Checkbox-chromium-darwin.png)
 * ![Checkbox dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Checkbox-dark.spec.mjs-snapshots/Checkbox-dark-chromium-darwin.png)
 *
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
    labelDisplay = 'visible',
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
    borderStyle = styles.borderSelected;
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
                  color="inverse"
                  icon={indeterminate ? 'dash' : 'check'}
                  size={size === 'sm' ? 8 : 12}
                />
              )}
            </div>
          </Box>
        </Label>
        {Boolean(image) && <Box paddingX={1}>{image}</Box>}
        {label && (
          <Box display={labelDisplay === 'hidden' ? 'visuallyHidden' : 'block'}>
            <Label htmlFor={id}>
              <Box paddingX={1}>
                <Text color={disabled ? 'subtle' : undefined} size={size === 'sm' ? '200' : '300'}>
                  {label}
                </Text>
                {subtext && (
                  <Box paddingY={1}>
                    <Text color="subtle" size={size === 'sm' ? '200' : '300'}>
                      <Box display="visuallyHidden">:</Box> {subtext}
                    </Text>
                  </Box>
                )}
              </Box>
            </Label>
          </Box>
        )}
      </Box>
      {errorMessage && (
        <Box marginTop={2}>
          <Text color="error" size="100">
            <FormErrorMessage id={id} text={errorMessage} />
          </Text>
        </Box>
      )}
    </Box>
  );
});

CheckboxWithForwardRef.displayName = 'Checkbox';

export default CheckboxWithForwardRef;
