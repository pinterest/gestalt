import { ComponentProps, forwardRef, ReactNode, useState } from 'react';
import classnames from 'classnames';
import Badge from './Badge';
import borderStyles from './Borders.css';
import Box from './Box';
import boxStyles from './Box.css';
import Flex from './Flex';
import Label from './Label';
import layoutStyles from './Layout.css';
import styles from './RadioButton.css';
import controlStyles from './RadioButtonCheckbox.css';
import { useRadioGroupContext } from './RadioGroup/Context';
import FormHelperText from './sharedSubcomponents/FormHelperText';
import Text from './Text';
import useFocusVisible from './useFocusVisible';
import useTapScaleAnimation from './utils/useTapScaleAnimation';

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

  const [focused, setFocused] = useState(false);
  const [hovered, setHover] = useState(false);

  const tapScaleAnimation = useTapScaleAnimation();

  const { parentName } = useRadioGroupContext();

  if (parentName !== 'RadioGroup') {
    throw new Error(
      `RadioGroup.RadioButton must be used within a [RadioGroup](https://gestalt.pinterest.systems/web/radiogroup).`,
    );
  }

  let borderColor = styles.Border;
  if (disabled && checked) {
    borderColor = styles.BorderDisabledChecked;
  } else if (!disabled && checked) {
    borderColor = styles.BorderSelected;
  }

  let borderWidth = styles.BorderUncheckedVR;

  if (disabled && !checked) {
    borderWidth = styles.BorderDisabled;
  } else if (checked && size === 'sm') {
    borderWidth = styles.BorderCheckedSm;
  } else if (checked && size === 'md') {
    borderWidth = styles.BorderCheckedMd;
  }

  let uncheckedBorderWidth = styles.BorderDisabled;

  if (!disabled && !hovered && !focused) {
    uncheckedBorderWidth = styles.BorderUncheckedVR;
  } else if (!disabled && hovered && !focused) {
    uncheckedBorderWidth = styles.BorderUncheckedVR;
  }

  const styleSize = size === 'sm' ? controlStyles.sizeSm : controlStyles.sizeMd;

  let bgStyle = disabled && !checked ? styles.BgDisabled : styles.BgEnabled;
  bgStyle = !checked ? styles.BgDisabledVR : bgStyle;

  const radioButtonStyles = classnames(
    styleSize,
    layoutStyles.relative,
    borderStyles.circle,
    tapScaleAnimation.classes,
    {
      [styles.outerFocusedOutline]: !disabled && focused && isFocusVisible,
      [styles.innerBorderFocused]: checked && !disabled && focused && isFocusVisible,
      [styles.innerBorderDisabled]: disabled,
      [styles.innerBorderChecked]: checked && !disabled && !focused,
      [styles.innerBorderUnchecked]: !checked && !disabled && !focused,
    },
  );

  const sharedBorderStyles = classnames(styles.VRRadioButton, borderColor, bgStyle, styleSize);

  const checkedBorderStyles = classnames(sharedBorderStyles, styles.checked, borderWidth, {
    [styles.noTransitionDelay]: checked,
  });

  const uncheckedBorderStyles = classnames(
    sharedBorderStyles,
    styles.unchecked,
    uncheckedBorderWidth,
    {
      [boxStyles.opacity0]: checked || disabled,
      [styles.noTransition]: checked,
    },
  );


  return (
    <Box alignItems="start" display="flex" justifyContent="start" marginEnd={-1} marginStart={-1}>
      <Box paddingX={1}>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div
          ref={tapScaleAnimation.elementRef}
          className={radioButtonStyles}
          onMouseDown={() => tapScaleAnimation.handleMouseDown()}
          onMouseUp={() => tapScaleAnimation.handleMouseUp()}
        >
          <div className={checkedBorderStyles} />
          <div className={uncheckedBorderStyles} />
          <input
            // checking for "focused" is not required by screenreaders but it prevents a11y integration tests to complain about missing label, as aria-describedby seems to shadow label in tests though it's a W3 accepeted pattern https://www.w3.org/TR/WCAG20-TECHS/ARIA1.html
            ref={ref}
            aria-describedby={helperText && focused ? `${id}-helperText` : undefined}
            checked={checked}
            className={classnames(controlStyles.input, styleSize, {
              [styles.InputEnabled]: !disabled,
            })}
            disabled={disabled}
            id={id}
            name={name}
            onBlur={() => setFocused(false)}
            onChange={(event) => onChange({ checked: event.target.checked, event })}
            onFocus={() => setFocused(true)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            type="radio"
            value={value}
          />
        </div>
      </Box>
      {Boolean(image) && <Box paddingX={1}>{image}</Box>}
      <Flex direction="column">
        <Flex direction="row">
          {label && (
            <Label htmlFor={id}>
              <Box marginTop={size === 'sm' ? 0 : 0.5} paddingX={1}>
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
        {label && helperText ? (
          <Box paddingX={1}>
            <FormHelperText id={`${id}-helperText`} text={helperText} />
          </Box>
        ) : null}
      </Flex>
    </Box>
  );
});

RadioGroupButtonWithForwardRef.displayName = 'RadioGroup.RadioButton';

export default RadioGroupButtonWithForwardRef;
