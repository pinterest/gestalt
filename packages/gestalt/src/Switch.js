// @flow strict
import React, { useState, type Node } from 'react';
import PropTypes from 'prop-types';
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

Switch.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  switched: PropTypes.bool,
};
