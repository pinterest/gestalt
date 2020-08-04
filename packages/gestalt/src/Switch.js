// @flow strict
import React, { forwardRef, useState, type Node } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import useFocusVisible from './useFocusVisible.js';
import focusStyles from './Focus.css';
import styles from './Switch.css';
import Label from './Label.js';
import Row from './Row.js';
import Text from './Text.js';

type Props = {|
  disabled?: boolean,
  id: string,
  label?: string,
  name?: string,
  onChange: ({| event: SyntheticInputEvent<>, value: boolean |}) => void,
  switched?: boolean,
|};

const SwitchWithForwardRef: React$AbstractComponent<
  Props,
  HTMLInputElement
> = forwardRef<Props, HTMLInputElement>(function Switch(props, ref): Node {
  const {
    disabled = false,
    id,
    name,
    label,
    onChange,
    switched = false,
  } = props;

  const [focused, setFocused] = useState(false);

  const handleChange: (event: SyntheticInputEvent<>) => void = (
    event: SyntheticInputEvent<>
  ) => {
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
      : styles.switchWhite
  );

  const sliderStyles = classnames(
    styles.slider,
    switched ? styles.sliderRight : styles.sliderLeft,
    switched && !disabled ? styles.sliderDark : styles.sliderLight
  );

  const inputStyles = classnames(styles.checkbox, {
    [styles.checkboxEnabled]: !disabled,
  });

  return (
    <Row gap={1}>
      <Label htmlFor={id}>
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
            ref={ref}
            type="checkbox"
          />
          <div className={sliderStyles} />
        </div>
      </Label>
      {label && (
        <Label htmlFor={id}>
          <Text color={disabled ? 'gray' : undefined}>{label}</Text>
        </Label>
      )}
    </Row>
  );
});

// $FlowFixMe Flow(InferError)
SwitchWithForwardRef.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  switched: PropTypes.bool,
};

SwitchWithForwardRef.displayName = 'Switch';

export default SwitchWithForwardRef;
