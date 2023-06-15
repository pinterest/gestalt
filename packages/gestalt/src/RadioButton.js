// @flow strict
import { type AbstractComponent, forwardRef, type Node, useState } from 'react';
import classnames from 'classnames';
import Box from './Box.js';
import focusStyles from './Focus.css';
import Label from './Label.js';
import styles from './RadioButton.css';
import controlStyles from './RadioButtonCheckbox.css';
import Text from './Text.js';
import useFocusVisible from './useFocusVisible.js';

type Props = {|
  /**
   * Indicates if the input is checked. See the [combinations example](https://gestalt.pinterest.systems/web/radiobutton#radio-state-combos) for more details.
   */
  checked?: boolean,
  /**
   * Indicates if the input is disabled. See the [combinations example](https://gestalt.pinterest.systems/web/radiobutton#radio-state-combos) for more details.
   */
  disabled?: boolean,
  /**
   * A unique identifier for the input.
   */
  id: string,
  /**
   * An optional [Image](https://gestalt.pinterest.systems/web/image) component can be supplied to add an image to each radio button. Spacing is already accounted for — simply specify the width and height. See the [images example](https://gestalt.pinterest.systems/web/radiobutton#images) for more details.
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
  onChange: ({|
    event: SyntheticInputEvent<HTMLInputElement>,
    checked: boolean,
  |}) => void,
  /**
   * Ref forwarded to the underlying input element. See [ref example](https://gestalt.pinterest.systems/web/radiobutton#ref) for more details.
   */
  ref?: HTMLInputElement, // eslint-disable-line react/no-unused-prop-types
  /**
   * sm: 16px, md: 24px
   */
  size?: 'sm' | 'md',
  /**
   * Optional description for the input, used to provide more detail about an option. See the [subtext example](https://gestalt.pinterest.systems/web/radiobutton#subtext) for more details.
   */
  subtext?: string,
  /**
   * The value of the input.
   */
  value: string,
|};

/**
 * **NOTE** The standalone RadioButton is soon to be deprecated, use [RadioGroup](https://gestalt.pinterest.systems/web/radiogroup) and RadioGroup.RadioButton instead.**NOTE**
 */
const RadioButtonWithForwardRef: AbstractComponent<Props, HTMLInputElement> = forwardRef<
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

  return (
    <Box alignItems="start" display="flex" justifyContent="start" marginStart={-1} marginEnd={-1}>
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
              // checking for "focused" is not required by screenreaders but it prevents a11y integration tests to complain about missing label, as aria-describedby seems to shadow label in tests though it's a W3 accepeted pattern https://www.w3.org/TR/WCAG20-TECHS/ARIA1.html
              aria-describedby={subtext && focused ? `${id}-helperText` : undefined}
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
      <Box>
        {label && (
          <Label htmlFor={id}>
            {/* marginTop: '-1px'/'2px' is needed to  visually align the label text & radiobutton input */}
            <Box
              paddingX={1}
              dangerouslySetInlineStyle={{ __style: { marginTop: size === 'md' ? '2px' : '-1px' } }}
            >
              <Text color={disabled ? 'subtle' : undefined} size={size === 'sm' ? '200' : '300'}>
                {label}
              </Text>
            </Box>
          </Label>
        )}
        {label && subtext && (
          <Box padding={1}>
            <Text color="subtle" size={size === 'sm' ? '200' : '300'}>
              {subtext}
            </Text>
          </Box>
        )}
      </Box>
    </Box>
  );
});

RadioButtonWithForwardRef.displayName = 'RadioButton';

export default RadioButtonWithForwardRef;
