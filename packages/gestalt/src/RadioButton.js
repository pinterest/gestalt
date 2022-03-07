// @flow strict
import { forwardRef, type Node, useState } from 'react';
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
  /**
   * Indicates if the input is checked. See the [combinations example](https://gestalt.pinterest.systems/radiobutton#radio-state-combos) for more details.
   */
  checked?: boolean,
  /**
   * Indicates if the input is disabled. See the [combinations example](https://gestalt.pinterest.systems/radiobutton#radio-state-combos) for more details.
   */
  disabled?: boolean,
  /**
   * A unique identifier for the input.
   */
  id: string,
  /**
   * An optional [Image](https://gestalt.pinterest.systems/image) component can be supplied to add an image to each radio button. Spacing is already accounted for — simply specify the width and height. See the [images example](https://gestalt.pinterest.systems/radiobutton#images) for more details.
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
  onChange: AbstractEventHandler<SyntheticInputEvent<HTMLInputElement>, {| checked: boolean |}>,
  /**
   * Ref forwarded to the underlying input element. See [ref example](https://gestalt.pinterest.systems/radiobutton#ref) for more details.
   */
  ref?: HTMLInputElement, // eslint-disable-line react/no-unused-prop-types
  /**
   * sm: 16px, md: 24px
   */
  size?: 'sm' | 'md',
  /**
   * Optional description for the input, used to provide more detail about an option. See the [subtext example](https://gestalt.pinterest.systems/radiobutton#subtext) for more details.
   */
  subtext?: string,
  /**
   * The value of the input.
   */
  value: string,
|};

/**
 *  Use [RadioButtons](https://gestalt.pinterest.systems/radiobutton) when you have a few options that a user can choose from. Never use radio buttons if the user can select more than one option from a list.
 *
 * ![RadioButton light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/RadioButton%20%230.png)
 * ![RadioButton dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/cypress/integration/visual-test/__image_snapshots__/RadioButton-dark%20%230.png)
 *

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
  );
});

RadioButtonWithForwardRef.displayName = 'RadioButton';

export default RadioButtonWithForwardRef;
