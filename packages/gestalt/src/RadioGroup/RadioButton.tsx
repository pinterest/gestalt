import { forwardRef, ReactNode, useState } from 'react';
import classnames from 'classnames';
import { useRadioGroupContext } from './Context';
import styles from './RadioButton.css';
import Badge from '../Badge';
import borderStyles from '../Borders.css';
import Box from '../Box';
import boxStyles from '../Box.css';
import Flex from '../Flex';
import Label from '../Label';
import layoutStyles from '../Layout.css';
import controlStyles from '../RadioButtonCheckbox.css';
import FormHelperText from '../sharedSubcomponents/FormHelperText';
import Text from '../Text';
import useFocusVisible from '../useFocusVisible';
import useInteractiveStates from '../utils/useInteractiveStates';
import useTapScaleAnimation from '../utils/useTapScaleAnimation';

type BadgeType = {
  text: string;
  type?:
    | 'info'
    | 'error'
    | 'warning'
    | 'success'
    | 'neutral'
    | 'recommendation'
    | 'darkWash'
    | 'lightWash';
};

type Props = {
  badge?: BadgeType;
  checked?: boolean;
  disabled?: boolean;
  id: string;
  image?: ReactNode;
  label?: string;
  name?: string;
  onChange: (arg1: { event: React.ChangeEvent<HTMLInputElement>; checked: boolean }) => void;
  ref?: HTMLInputElement; // eslint-disable-line react/no-unused-prop-types,
  size?: 'sm' | 'md';
  helperText?: string;
  value: string;
};

const RadioGroupButtonWithForwardRef = forwardRef<HTMLInputElement, Props>(function RadioButton(
  {
    checked = false,
    disabled = false,
    id,
    image,
    label,
    name,
    onChange,
    helperText,
    value,
    badge,
    size = 'md',
  }: Props,
  ref,
) {
  const { isFocusVisible } = useFocusVisible();

  const tapScaleAnimation = useTapScaleAnimation();

  const {
    handleOnMouseEnter,
    handleOnMouseLeave,
    handleOnBlur,
    handleOnFocus,
    handleOnMouseDown,
    handleOnMouseUp,
    isFocused,
    isHovered,
    isActive: isPressed,
  } = useInteractiveStates();

  const { parentName } = useRadioGroupContext();

  if (parentName !== 'RadioGroup') {
    throw new Error(
      `RadioGroup.RadioButton must be used within a [RadioGroup](https://gestalt.pinterest.systems/web/radiogroup).`,
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      ref={tapScaleAnimation.elementRef}
      className={classnames(styles.outerContainer, {
        [styles.outerContainerSm]: size === 'sm',
        [styles.outerContainerMd]: size === 'md',

        [styles.focusedOutline]: !disabled && isFocused && isFocusVisible,
        [styles.focusedBorder]: !disabled && isFocused && isFocusVisible,

        [styles.disabledBorder]: disabled,
        [styles.checkedBorder]: !disabled && checked,

        [styles.uncheckedBorder]: !disabled && !checked && !isFocused,
      })}
      onMouseDown={() => tapScaleAnimation.handleMouseDown()}
      onMouseUp={() => tapScaleAnimation.handleMouseUp()}
    >
      <input
        ref={ref}
        className={classnames(styles.input)}
        onBlur={handleOnBlur}
        onChange={(event) => onChange({ checked: event.target.checked, event })}
        onFocus={handleOnFocus}
        onMouseDown={handleOnMouseDown}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        onMouseUp={handleOnMouseUp}
        type="radio"
        value={value}
      />
    </div>
  );
});

RadioGroupButtonWithForwardRef.displayName = 'RadioGroup.RadioButton';

export default RadioGroupButtonWithForwardRef;
