// @flow strict
import { type Node, useState } from 'react';
import classnames from 'classnames';
import focusStyles from './Focus.css';
import styles from './Switch.css';
import useFocusVisible from './useFocusVisible.js';

type Props = {
  /**
   * Indicates if the input is currently disabled. See [Switch combinations](https://gestalt.pinterest.systems/web/switch#Disabled-and-switched-combinations) for more details.
   */
  disabled?: boolean,
  /**
   * A unique identifier for the element.
   */
  id: string,
  /**
   * A unique name for the element.
   */
  name?: string,
  /**
   * Callback triggered when the user interacts with the input.
   */
  onChange: ({ event: SyntheticInputEvent<>, value: boolean }) => void,
  /**
   * Indicates the current value of the input. See [Switch combinations](https://gestalt.pinterest.systems/web/switch#Disabled-and-switched-combinations) for more details.
   */
  switched?: boolean,
};

/**
 * Use [Switch](https://gestalt.pinterest.systems/web/switch) for single cell options that can be turned on and off only. If you have a cell with multiple options that can activated, consider using [Checkbox](https://gestalt.pinterest.systems/web/checkbox).
 *
 * Switch supports right-to-left(RTL) language locales layout (auto flip on RTL locales like Arabic).
 *
 * ![Switch light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Switch.spec.mjs-snapshots/Switch-chromium-darwin.png)
 * ![Switch dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Switch-dark.spec.mjs-snapshots/Switch-dark-chromium-darwin.png)
 *
 */
export default function Switch({
  disabled = false,
  id,
  name,
  onChange,
  switched = false,
}: Props): Node {
  const [focused, setFocused] = useState(false);

  const handleChange: (event: SyntheticInputEvent<>) => void = (event: SyntheticInputEvent<>) => {
    const { checked } = event.target;
    onChange({ event, value: checked });
  };

  const { isFocusVisible } = useFocusVisible();

  const switchStyles = classnames(
    styles.switch,
    {
      [focusStyles.accessibilityOutlineFocus]: focused && isFocusVisible,
    },
    // eslint-disable-next-line no-nested-ternary
    disabled
      ? switched
        ? styles.switchGray
        : styles.switchLightGray
      : switched
      ? styles.switchDarkGray
      : styles.switchWhite,
  );

  const sliderStyles = classnames(
    styles.slider,
    switched ? styles.sliderRight : styles.sliderLeft,
    !disabled ? styles.sliderDark : styles.sliderLight,
  );

  const inputStyles = classnames(styles.checkbox, {
    [styles.checkboxEnabled]: !disabled,
  });

  return (
    <div className={switchStyles}>
      <input
        checked={switched}
        className={inputStyles}
        disabled={disabled}
        id={id}
        name={name}
        onBlur={() => setFocused(false)}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        type="checkbox"
      />
      <div className={sliderStyles} />
    </div>
  );
}
