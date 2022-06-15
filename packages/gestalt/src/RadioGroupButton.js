// @flow strict
import { forwardRef, type Node, useState } from 'react';
import classnames from 'classnames';
import controlStyles from './RadioButtonCheckbox.css';
import styles from './RadioButton.css';
import Box from './Box.js';
import Label from './Label.js';
import Text from './Text.js';
import useFocusVisible from './useFocusVisible.js';
import focusStyles from './Focus.css';
import { useRadioGroupContext } from './RadioGroupContext.js';

type Props = {|
  /**
   * Indicates if the input is checked. See the [state example](https://gestalt.pinterest.systems/radiogroup#States) for more details.
   */
  checked?: boolean,
  /**
   * Indicates if the input is disabled. See the [state example](https://gestalt.pinterest.systems/radiogroup#States) for more details.
   */
  disabled?: boolean,
  /**
   * A unique identifier for the input.
   */
  id: string,
  /**
   * An optional [Image](https://gestalt.pinterest.systems/image) component can be supplied to add an image to each radio button. Spacing is already accounted for — simply specify the width and height. See the [images example](https://gestalt.pinterest.systems/radiogroup#With-Image) for more details.
   */
  image?: Node,
  /**
   * The displayed label for the input.
   */
  label?: string,
  /**
   * The name given for all radio buttons in a single group.
   */
  name?: string,
  /**
   * Callback triggered when the user interacts with the input.
   */
  onChange: ({| event: SyntheticInputEvent<HTMLInputElement>, checked: boolean |}) => void,
  /**
   * Ref forwarded to the underlying input element. See [ref example](https://gestalt.pinterest.systems/radiogroup#Using-ref) for more details.
   */
  ref?: HTMLInputElement, // eslint-disable-line react/no-unused-prop-types
  /**
   * sm: 16px, md: 24px
   */
  size?: 'sm' | 'md',
  /**
   * Optional description for the input, used to provide more detail about an option. See the [subtext example](https://gestalt.pinterest.systems/radiogroup#With-subtext) for more details.
   */
  subtext?: string,
  /**
   * The value of the input.
   */
  value: string,
|};

/**
 *  Use [RadioGroup.RadioButtons](https://gestalt.pinterest.systems/radiogroup#RadioGroup.RadioButton) to present an option for selection to the user within a RadioGroup. They should not be used outside of RadioGroup or when the user can select more than one option from a list.
 *
 * ![RadioGroup light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/RadioGroup.spec.mjs-snapshots/RadioGroup-chromium-darwin.png)
 * ![RadioGroup dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/RadioGroup-dark.spec.mjs-snapshots/RadioGroup-dark-chromium-darwin.png)
 *
 */
const RadioGroupButtonWithForwardRef: React$AbstractComponent<Props, HTMLInputElement> = forwardRef<
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

  const handleChange: (event: SyntheticInputEvent<HTMLInputElement>) => void = (event) =>
    onChange({ checked: event.target.checked, event });

  const handleBlur: () => void = () => setFocused(false);

  const handleFocus: () => void = () => setFocused(true);

  const handleHover: (isHovered: boolean) => void = (isHovered: boolean) => setHover(isHovered);

  let borderStyle = styles.Border;
  if (disabled && checked) {
    borderStyle = styles.BorderDisabledChecked;
  } else if (!disabled && checked) {
    borderStyle = styles.BorderSelected;
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

  const { parentName } = useRadioGroupContext();
  if (parentName !== 'RadioGroup') {
    throw new Error(
      `RadioGroup.RadioButton must be used within a [RadioGroup](https://gestalt.pinterest.systems/radiogroup).`,
    );
  }

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
      )}
    </Box>
  );
});

RadioGroupButtonWithForwardRef.displayName = 'RadioGroup.RadioButton';

export default RadioGroupButtonWithForwardRef;
