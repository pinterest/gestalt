import { ComponentProps, forwardRef, Fragment, ReactNode, useState } from 'react';
import classnames from 'classnames';
import Badge from './Badge';
import borderStyles from './Borders.css';
import Box from './Box';
import boxStyles from './Box.css';
import Flex from './Flex';
import focusStyles from './Focus.css';
import Label from './Label';
import layoutStyles from './Layout.css';
import styles from './RadioButton.css';
import controlStyles from './RadioButtonCheckbox.css';
import { useRadioGroupContext } from './RadioGroup/Context';
import FormHelperText from './sharedSubcomponents/FormHelperText';
import Text from './Text';
import useFocusVisible from './useFocusVisible';
import useInExperiment from './useInExperiment';
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
  /**
   * An optional [Badge](https://gestalt.pinterest.systems/web/badge) component can be supplied to add a badge to each radio button. See the [badges example](https://gestalt.pinterest.systems/web/radiogroup#With-Badge) for more details.
   */
  badge?: BadgeType;
  /**
   * Indicates if the input is checked. See the [state example](https://gestalt.pinterest.systems/web/radiogroup#States) for more details.
   */
  checked?: boolean;
  /**
   * Indicates if the input is disabled. See the [state example](https://gestalt.pinterest.systems/web/radiogroup#States) for more details.
   */
  disabled?: boolean;
  /**
   * A unique identifier for the input.
   */
  id: string;
  /**
   * An optional [Image](https://gestalt.pinterest.systems/web/image) component can be supplied to add an image to each radio button. Spacing is already accounted for — simply specify the width and height. See the [images example](https://gestalt.pinterest.systems/web/radiogroup#With-Image) for more details.
   */
  image?: ReactNode;
  /**
   * The displayed label for the input.
   */
  label?: string;
  /**
   * The name given for all radio buttons in a single group.
   */
  name?: string;
  /**
   * Callback triggered when the user interacts with the input.
   */
  onChange: (arg1: { event: React.ChangeEvent<HTMLInputElement>; checked: boolean }) => void;
  /**
   * Ref forwarded to the underlying input element. See [ref example](https://gestalt.pinterest.systems/web/radiogroup#Using-ref) for more details.
   */
  ref?: HTMLInputElement; // eslint-disable-line react/no-unused-prop-types,
  /**
   * sm: 16px, md: 24px
   */
  size?: 'sm' | 'md';
  /**
   * Optional description for the input, used to provide more detail about an option. See the [helperText example](https://gestalt.pinterest.systems/web/radiogroup#With-helperText) for more details.
   */
  helperText?: string;
  /**
   * The value of the input.
   */
  value: string;
};

/**
 *  Use [RadioGroup.RadioButtons](https://gestalt.pinterest.systems/web/radiogroup#RadioGroup.RadioButton) to present an option for selection to the user within a RadioGroup. They should not be used outside of RadioGroup or when the user can select more than one option from a list.
 *
 * ![RadioGroup light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/RadioGroup.spec.ts-snapshots/RadioGroup-chromium-darwin.png)
 * ![RadioGroup dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/RadioGroup-dark.spec.ts-snapshots/RadioGroup-dark-chromium-darwin.png)
 *
 */

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
  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualrefresh',
    mwebExperimentName: 'web_gestalt_visualrefresh',
  });

  const [focused, setFocused] = useState(false);
  const [hovered, setHover] = useState(false);

  const handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (event) =>
    onChange({ checked: event.target.checked, event });

  const handleBlur: () => void = () => setFocused(false);

  const handleFocus: () => void = () => setFocused(true);

  const handleHover: (isHovered: boolean) => void = (isHovered: boolean) => setHover(isHovered);

  let borderColor = styles.Border;
  if (disabled && checked) {
    borderColor = styles.BorderDisabledChecked;
  } else if (!disabled && checked) {
    borderColor = styles.BorderSelected;
  } else if (!disabled && hovered && !isInVRExperiment) {
    borderColor = styles.BorderHovered;
  }

  let borderWidth = isInVRExperiment ? styles.BorderUncheckedVR : styles.BorderUnchecked;
  if (disabled && !checked) {
    borderWidth = styles.BorderDisabled;
  } else if (checked && size === 'sm') {
    borderWidth = styles.BorderCheckedSm;
  } else if (checked && size === 'md') {
    borderWidth = styles.BorderCheckedMd;
  }

  let uncheckedBorderWidth = styles.BorderDisabled;

  if (!isInVRExperiment) {
    uncheckedBorderWidth = disabled ? styles.BorderDisabled : styles.BorderUnchecked;
  } else {
    uncheckedBorderWidth = !disabled ? styles.BorderUncheckedVR : uncheckedBorderWidth;
    uncheckedBorderWidth =
      hovered && !disabled ? styles.BorderUncheckedHoverVR : styles.BorderUncheckedVR;
  }

  const styleSize = size === 'sm' ? controlStyles.sizeSm : controlStyles.sizeMd;

  let bgStyle = disabled && !checked ? styles.BgDisabled : styles.BgEnabled;
  bgStyle = isInVRExperiment && !checked ? styles.BgDisabledVR : bgStyle;

  const { isFocusVisible } = useFocusVisible();

  const { parentName } = useRadioGroupContext();

  const tapScaleAnimation = useTapScaleAnimation();

  if (parentName !== 'RadioGroup') {
    throw new Error(
      `RadioGroup.RadioButton must be used within a [RadioGroup](https://gestalt.pinterest.systems/web/radiogroup).`,
    );
  }

  const radioButtonStyles = isInVRExperiment
    ? classnames(styleSize, layoutStyles.relative, borderStyles.circle, tapScaleAnimation.classes, {
        [focusStyles.accessibilityOutlineFocus]: focused && isFocusVisible,
      })
    : classnames(bgStyle, borderColor, borderWidth, styleSize, styles.RadioButton, {
        [focusStyles.accessibilityOutlineFocus]: focused && isFocusVisible,
      });

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

  let margin: ComponentProps<typeof Box>['marginTop'] = size === 'md' ? 0.5 : -0.25;
  if (isInVRExperiment) {
    margin = size === 'sm' ? 0 : 0.25;
  }

  return (
    <Box alignItems="start" display="flex" justifyContent="start" marginEnd={-1} marginStart={-1}>
      <Box marginTop={isInVRExperiment && size === 'sm' ? 0.5 : undefined} paddingX={1}>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div
          ref={tapScaleAnimation.elementRef}
          className={radioButtonStyles}
          onMouseDown={() => {
            if (isInVRExperiment) tapScaleAnimation.handleMouseDown();
          }}
          onMouseUp={() => {
            if (isInVRExperiment) tapScaleAnimation.handleMouseUp();
          }}
        >
          {isInVRExperiment && (
            <Fragment>
              <div className={checkedBorderStyles} />
              <div className={uncheckedBorderStyles} />
            </Fragment>
          )}

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
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
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
              <Box marginTop={margin} paddingX={1}>
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
