import { forwardRef, ReactNode } from 'react';
import classnames from 'classnames';
import { useRadioGroupContext } from './Context';
import styles from './RadioButton.css';
import Badge from '../Badge';
import Box from '../Box';
import Flex from '../Flex';
import Label from '../Label';
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
  { checked, disabled, id, image, label, name, onChange, helperText, value, badge, size }: Props,
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
    <div className={classnames(styles.container)}>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        ref={tapScaleAnimation.elementRef}
        className={classnames(styles.outerContainer, tapScaleAnimation.classes, {
          [styles.outerContainerSm]: size === 'sm',
          [styles.outerContainerMd]: size === 'md',

          [styles.disabledBorder]: disabled,

          [styles.focusedOutline]: !disabled && isFocused && isFocusVisible,
          [styles.focusedCheckedBorder]: !disabled && checked && isFocused && isFocusVisible,
          [styles.checkedBorder]: !disabled && checked && !isFocused,

          [styles.uncheckedBorder]: !disabled && !checked && !isFocused,
          [styles.uncheckedBorderHovered]: !disabled && !checked && isHovered && !isFocused,
          [styles.uncheckedBorderActive]: !disabled && !checked && isPressed,

          [styles.focusedUncheckedBorderVisible]:
            !disabled && !checked && isFocused && isFocusVisible,
          [styles.focusedUncheckedBorder]: !disabled && !checked && isFocused && !isFocusVisible,
        })}
        onMouseDown={() => tapScaleAnimation.handleMouseDown()}
        onMouseUp={() => tapScaleAnimation.handleMouseUp()}
      >
        {/* checked */}
        <div
          className={classnames(styles.radio, {
            [styles.checkedTransitionAnimation]: checked,
            [styles.noTransitionAnimationDelay]: checked,

            [styles.borderRadioSm]: checked && size === 'sm',
            [styles.borderRadioMd]: checked && size === 'md',

            [styles.disabledUncheckedRadio]: disabled && !checked,
            [styles.disabledRadio]: disabled && checked,

            [styles.uncheckedRadio]: !disabled && !checked,
            [styles.checkedRadio]: !disabled && checked,
            [styles.focusedBorderRadioSm]:
              !disabled && checked && size === 'sm' && isFocused && isFocusVisible,
            [styles.focusedBorderRadioMd]:
              !disabled && checked && size === 'md' && isFocused && isFocusVisible,
          })}
        />
        <input
          ref={ref}
          checked={checked}
          className={classnames(styles.input, {
            [styles.disabledInput]: disabled,
            [styles.inputSm]: size === 'sm',
            [styles.inputMd]: size === 'md',
          })}
          disabled={disabled}
          id={id}
          name={name}
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
      {Boolean(image) && <Box marginEnd={2}>{image}</Box>}
      <Flex direction="column">
        <Flex direction="row" gap={1}>
          {label && (
            <Label htmlFor={id}>
              <Box marginTop={size === 'sm' ? 0 : 0.25}>
                <Text color={disabled ? 'subtle' : undefined} size={size === 'sm' ? '200' : '300'}>
                  {label}
                </Text>
              </Box>
            </Label>
          )}
          {badge && (
            <Flex.Item alignSelf="end" minWidth={0}>
              <Box dangerouslySetInlineStyle={{ __style: { top: '1px' } }} position="relative">
                <Badge text={badge.text} type={badge.type || 'info'} />
              </Box>
            </Flex.Item>
          )}
        </Flex>
        {label && helperText ? <FormHelperText id={`${id}-helperText`} text={helperText} /> : null}
      </Flex>
    </div>
  );
});

RadioGroupButtonWithForwardRef.displayName = 'RadioGroup.RadioButton';

export default RadioGroupButtonWithForwardRef;
