import { forwardRef, ReactElement, ReactNode, useEffect, useImperativeHandle, useRef } from 'react';
import classnames from 'classnames';
import styles from './InternalCheckbox.css';
import Box from '../Box';
import IconCompact from '../IconCompact';
import Label from '../Label';
import FormErrorMessage from '../sharedSubcomponents/FormErrorMessage';
import FormHelperText from '../sharedSubcomponents/FormHelperText';
import Text from '../Text';
import useFocusVisible from '../useFocusVisible';
import useInteractiveStates from '../utils/useInteractiveStates';
import useTapScaleAnimation from '../utils/useTapScaleAnimation';

type Props = {
  checked: boolean;
  disabled: boolean;
  errorMessage?: string;
  helperText?: string;
  id: string;
  image?: ReactNode;
  indeterminate: boolean;
  label?: string;
  labelDisplay: 'visible' | 'hidden';
  name?: string;
  onChange?: (arg1: { event: React.ChangeEvent<HTMLInputElement>; checked: boolean }) => void;
  onClick?: (arg1: { event: React.ChangeEvent<HTMLInputElement>; checked: boolean }) => void;
  readOnly?: boolean;
  ref?: ReactElement; // eslint-disable-line react/no-unused-prop-types,
  size: 'sm' | 'md';
  style?: {
    borderColor?: string;
    backgroundColor?: string;
  };
};

const InternalCheckboxWithForwardRef = forwardRef<HTMLInputElement, Props>(function Checkbox(
  {
    checked,
    disabled,
    errorMessage,
    helperText,
    id,
    image,
    indeterminate,
    label,
    labelDisplay,
    name,
    onChange,
    onClick,
    readOnly,
    size,
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
    onChange?.({ event, checked: event.target.checked });
  };

  const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    onClick?.({ event, checked: event.currentTarget.checked });
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
  const tapScaleAnimation = useTapScaleAnimation();

  let ariaDescribedby;

  if (errorMessage) {
    ariaDescribedby = `${id}-error`;
  }

  if (label && helperText) {
    ariaDescribedby = `${id}-helperText`;
  }

  const iconSizes = {
    sm: 10,
    md: 12,
  };

  const unchecked = !(checked || indeterminate);

  return (
    <Box display="flex">
      <div
        className={classnames(styles.inputWrapper, {
          [styles.inputWrapperPaddingTop]: size === 'sm',
        })}
      >
        <div
          ref={tapScaleAnimation.elementRef}
          className={classnames(styles.check, tapScaleAnimation.classes, styles.vrCheckBackground, {
            [styles.sizeSm]: size === 'sm',
            [styles.sizeMd]: size === 'md',
            [styles.vrBorderRadiusSm]: size === 'sm',
            [styles.vrBorderRadiusMd]: size === 'md',
            [styles.focus]: isFocused && isFocusVisible,
            // bg
            [styles.enabled]: !disabled && unchecked,
            [styles.disabled]: disabled,
            [styles.checked]: !unchecked && !disabled,
            [styles.error]: errorMessage && unchecked,
            [styles.errorChecked]: errorMessage && !unchecked,
            [styles.hovered]: !disabled && isHovered && !isActive && !errorMessage && !unchecked,
            [styles.hoveredError]:
              !disabled && isHovered && !isActive && errorMessage && !unchecked,
            [styles.pressed]: isActive && !disabled && !unchecked && !errorMessage,
            [styles.pressedError]: isActive && !disabled && !unchecked && errorMessage,
            // border
            [styles.thinBorder]: !isFocused || !isFocusVisible || !errorMessage,
            [styles.thickBorder]: errorMessage && unchecked,
            [styles.border]: !disabled && unchecked && !errorMessage && !isHovered,
            [styles.borderDisabled]: disabled,
            [styles.borderSelected]: !disabled && !unchecked,
            [styles.borderErrorUnchecked]: errorMessage && unchecked,
            [styles.borderErrorChecked]: errorMessage && !unchecked,
            [styles.borderHovered]:
              !disabled && isHovered && !isActive && unchecked && !errorMessage,
            [styles.borderHoveredError]:
              !disabled && isHovered && !isActive && errorMessage && unchecked,
            [styles.borderPressed]: isActive && !disabled && unchecked && !errorMessage,
            [styles.borderPressedError]: isActive && !disabled && unchecked && errorMessage,
          })}
          style={style}
        >
          <div style={{ width: iconSizes[size] }}>
            <div
              className={classnames(styles.vrCheckIconWrapper, {
                [styles.vrCheckIconEnterTransition]: !unchecked,
                [styles.vrCheckIconExitTransition]: unchecked,
              })}
              style={{ width: checked || indeterminate ? iconSizes[size] : 0 }}
            >
              <IconCompact
                accessibilityLabel=""
                color={disabled ? 'disabled' : 'inverse'}
                icon={indeterminate ? 'compact-dash' : 'compact-check'}
                size={iconSizes[size]}
              />
            </div>
          </div>
        </div>
        <input
          // checking for "focused" is not required by screenreaders but it prevents a11y integration tests to complain about missing label, as aria-describedby seems to shadow label in tests though it's a W3 accepeted pattern https://www.w3.org/TR/WCAG20-TECHS/ARIA1.html
          ref={innerRef}
          aria-describedby={isFocused ? ariaDescribedby : undefined}
          aria-hidden={readOnly ? true : undefined}
          aria-invalid={errorMessage ? 'true' : 'false'}
          checked={checked}
          className={classnames(styles.input, {
            [styles.sizeSm]: size === 'sm',
            [styles.sizeMd]: size === 'md',
            [styles.inputEnabled]: !disabled,
            [styles.readOnly]: readOnly,
          })}
          disabled={readOnly || disabled}
          id={id}
          name={name}
          onBlur={handleOnBlur}
          onChange={handleChange}
          // @ts-expect-error - TS2322 - Type '(event: React.ChangeEvent<HTMLInputElement>) => void' is not assignable to type 'MouseEventHandler<HTMLInputElement>'.
          onClick={handleClick}
          onFocus={handleOnFocus}
          onMouseDown={() => {
            handleOnMouseDown();
            tapScaleAnimation.handleMouseDown();
          }}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          onMouseUp={() => {
            handleOnMouseUp();
            tapScaleAnimation.handleMouseUp();
          }}
          type="checkbox"
        />
      </div>
      {Boolean(image) && <div className={classnames(styles.labelWrapper)}>{image}</div>}
      {label && (
        <Box
          //  marginTop: '-1px'/'2px' is needed to  visually align the label text & radiobutton input
          display={labelDisplay === 'hidden' ? 'visuallyHidden' : 'block'}
        >
          <div
            className={classnames(styles.labelWrapper, {
              [styles.labelWrapperPaddingTop]: size === 'md',
            })}
          >
            <Label htmlFor={id}>
              <Text color={disabled ? 'disabled' : undefined} size={size === 'sm' ? '200' : '300'}>
                {label}
              </Text>
            </Label>
          </div>

          <div className={classnames(styles.labelWrapper)}>
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
          </div>
        </Box>
      )}
    </Box>
  );
});

InternalCheckboxWithForwardRef.displayName = 'InternalCheckbox';

export default InternalCheckboxWithForwardRef;
