// @flow strict
import type { Node } from 'react';

import { useState } from 'react';
import classnames from 'classnames';
import useFocusVisible from './useFocusVisible.js';
import focusStyles from './Focus.css';
import styles from './Switch.css';

type Props = {|
  disabled?: boolean,
  id: string,
  name?: string,
  onChange: ({| event: SyntheticInputEvent<>, value: boolean |}) => void,
  switched?: boolean,
|};

/**
 * Use [switches](https://gestalt.pinterest.systems/switch) for single cell options that can be turned on and off only. If you have a cell with multiple options that can activated, consider using check marks.
 *
 * Switch supports right-to-left(RTL) language locales layout (auto flip on RTL locales like Arabic).
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
    switched && !disabled ? styles.sliderDark : styles.sliderLight,
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
