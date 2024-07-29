import { forwardRef, ReactElement, ReactNode, useEffect, useImperativeHandle, useRef } from 'react';
import classnames from 'classnames';
import styles from './InternalCheckbox.css';
import Box from '../Box';
import focusStyles from '../Focus.css';
import Icon from '../Icon';
import Label from '../Label';
import FormErrorMessage from '../sharedSubcomponents/FormErrorMessage';
import FormHelperText from '../sharedSubcomponents/FormHelperText';
import Text from '../Text';
import useFocusVisible from '../useFocusVisible';
import useInExperiment from '../useInExperiment';
import useInteractiveStates from '../utils/useInteractiveStates';

type Props = {
  checked?: boolean;
  disabled?: boolean;
  errorMessage?: string;
  helperText?: string;
  id: string;
  image?: ReactNode;
  indeterminate?: boolean;
  label?: string;
  labelDisplay?: 'visible' | 'hidden';
  name?: string;
  onChange?: (arg1: { event: React.ChangeEvent<HTMLInputElement>; checked: boolean }) => void;
  onClick?: (arg1: { event: React.ChangeEvent<HTMLInputElement>; checked: boolean }) => void;
  /**
   * Make the checkbox readonly. Interactivity is disabled, but it can be used as a visual indicator. Click handler events are also disabled
   */
  readOnly?: boolean;
  ref?: ReactElement; // eslint-disable-line react/no-unused-prop-types,
  size?: 'sm' | 'md';
  style?: {
    borderColor?: string;
    backgroundColor?: string;
  };
};

const InternalCheckboxWithForwardRef = forwardRef<HTMLInputElement, Props>(function Checkbox(
  {
    checked = false,
    disabled = false,
    errorMessage,
    helperText,
    id,
    image,
    indeterminate = false,
    label,
    labelDisplay = 'visible',
    name,
    onChange,
    onClick,
    readOnly = false,
    size = 'md',
    style,
  }: Props,
  ref,
) {
  const innerRef = useRef<null | HTMLInputElement>(null);
  // When using both forwardRef and innerRef, React.useimperativehandle() allows a parent component
  // that renders <Checkbox ref={inputRef} /> to call inputRef.current.focus()
  // @ts-expect-error - TS2322 - Type 'HTMLInputElement | null' is not assignable to type 'HTMLInputElement'.
  useImperativeHandle(ref, () => innerRef.current);

  useEffect(() => {
    if (innerRef && innerRef.current) {
      innerRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange({ event, checked: event.target.checked });
    }
  };

  const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onClick) {
      onClick({ event, checked: event.currentTarget.checked });
    }
  };

  const {
    handleOnMouseEnter,
    handleOnMouseLeave,
    handleOnBlur,
    handleOnFocus,
    handleOnMouseDown,
    handleOnMouseUp,
    isFocused,
    isHovered,
    isActive,
  } = useInteractiveStates();
  const { isFocusVisible } = useFocusVisible();

  let ariaDescribedby;

  if (errorMessage) {
    ariaDescribedby = `${id}-error`;
  }

  if (label && helperText) {
    ariaDescribedby = `${id}-helperText`;
  }

  const isInVRExperiment =
    useInExperiment({
      webExperimentName: 'web_gestalt_visualRefresh',
      mwebExperimentName: 'web_gestalt_visualRefresh',
    }) && !style;

  const iconSizes = {
    sm: 8,
    md: 12,
  };

  const vrIconSizes = {
    sm: 12,
    md: 16,
  };

  const borderRadiusStyle = size === 'sm' ? styles.borderRadiusSm : styles.borderRadiusMd;
  const styleSize = size === 'sm' ? styles.sizeSm : styles.sizeMd;
  const vrTextColor = disabled ? 'disabled' : undefined;
  const textColor = disabled ? 'subtle' : undefined;
  const vrIconColorEnabled = errorMessage ? 'error' : 'inverse';
  const vrIconColor = disabled ? 'disabled' : vrIconColorEnabled;
  const unchecked = !(checked || indeterminate);

  const bgStyle = classnames({
    [styles.enabled]: !isInVRExperiment && !disabled && unchecked,
    [styles.disabled]: disabled,
    [styles.checked]: !unchecked && !disabled,
    [styles.error]: isInVRExperiment && errorMessage && unchecked,
    [styles.errorChecked]: isInVRExperiment && errorMessage && !unchecked,
    [styles.hovered]:
      isInVRExperiment && !disabled && isHovered && !isActive && !errorMessage && !unchecked,
    [styles.hoveredError]:
      !disabled && isHovered && !isActive && isInVRExperiment && errorMessage && !unchecked,
    [styles.pressed]: isInVRExperiment && isActive && !disabled && !unchecked && !errorMessage,
    [styles.pressedError]: isInVRExperiment && isActive && !disabled && !unchecked && errorMessage,
  });

  const borderStyle = classnames({
    [styles.border]: !disabled && unchecked && !errorMessage && !isHovered,
    [styles.borderDisabled]: disabled,
    [styles.borderSelected]: !disabled && !unchecked,
    [styles.borderErrorUnchecked]: errorMessage && unchecked,
    [styles.borderErrorChecked]: errorMessage && !unchecked && isInVRExperiment,
    [styles.borderHovered]:
      !disabled && isHovered && !isActive && unchecked && (isInVRExperiment || !errorMessage),
    [styles.borderHoveredError]:
      !disabled && isHovered && !isActive && isInVRExperiment && errorMessage && unchecked,
    [styles.borderPressed]: isInVRExperiment && isActive && !disabled && unchecked && !errorMessage,
    [styles.borderPressedError]:
      isInVRExperiment && isActive && !disabled && unchecked && errorMessage,
  });

  const divStyles = classnames(bgStyle, borderStyle, borderRadiusStyle, styleSize, styles.check, {
    [styles.thickBorder]:
      !isInVRExperiment || (errorMessage && unchecked && !(isHovered || isActive)),
    [styles.thinBorder]:
      isInVRExperiment && !((isFocused && isFocusVisible) || isHovered || isActive || errorMessage),
    [focusStyles.accessibilityOutlineFocus]: isFocused && isFocusVisible && !isInVRExperiment,
    [styles.focus]: isFocused && isFocusVisible && isInVRExperiment,
  });

  const inputStyles = classnames(styles.input, styleSize, {
    [styles.inputEnabled]: !disabled,
    [styles.readOnly]: readOnly,
  });

  return (
    <Box>
      <Box alignItems="start" display="flex" justifyContent="start" marginEnd={-1} marginStart={-1}>
        <Box paddingX={1} position="relative">
          <input
            // checking for "focused" is not required by screenreaders but it prevents a11y integration tests to complain about missing label, as aria-describedby seems to shadow label in tests though it's a W3 accepeted pattern https://www.w3.org/TR/WCAG20-TECHS/ARIA1.html
            ref={innerRef}
            aria-describedby={isFocused ? ariaDescribedby : undefined}
            aria-hidden={readOnly ? true : undefined}
            aria-invalid={errorMessage ? 'true' : 'false'}
            checked={checked}
            className={inputStyles}
            disabled={readOnly || disabled}
            id={id}
            name={name}
            onBlur={handleOnBlur}
            onChange={handleChange}
            // @ts-expect-error - TS2322 - Type '(event: React.ChangeEvent<HTMLInputElement>) => void' is not assignable to type 'MouseEventHandler<HTMLInputElement>'.
            onClick={handleClick}
            onFocus={handleOnFocus}
            onMouseDown={handleOnMouseDown}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
            onMouseUp={handleOnMouseUp}
            type="checkbox"
          />
          <div className={divStyles} style={style}>
            {(checked || indeterminate) && (
              <Icon
                accessibilityLabel=""
                color={isInVRExperiment ? vrIconColor : 'inverse'}
                icon={indeterminate ? 'dash' : 'check'}
                size={isInVRExperiment ? vrIconSizes[size] : iconSizes[size]}
              />
            )}
          </div>
        </Box>
        {Boolean(image) && <Box paddingX={1}>{image}</Box>}
        {label && (
          <Box
            dangerouslySetInlineStyle={{
              __style: { marginTop: size === 'md' ? '2px' : '-1px' },
            }}
            //  marginTop: '-1px'/'2px' is needed to  visually align the label text & radiobutton input
            display={labelDisplay === 'hidden' ? 'visuallyHidden' : 'block'}
          >
            <Label htmlFor={id}>
              <Box paddingX={1}>
                <Text
                  color={isInVRExperiment ? vrTextColor : textColor}
                  size={size === 'sm' ? '200' : '300'}
                >
                  {label}
                </Text>
              </Box>
            </Label>
            <Box paddingX={1}>
              {helperText ? (
                <FormHelperText
                  disabled={disabled}
                  id={`${id}-helperText`}
                  noPadding
                  size={size}
                  text={helperText}
                />
              ) : null}
              {errorMessage ? (
                <FormErrorMessage id={`${id}-error`} noPadding size={size} text={errorMessage} />
              ) : null}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
});

InternalCheckboxWithForwardRef.displayName = 'InternalCheckbox';

export default InternalCheckboxWithForwardRef;
