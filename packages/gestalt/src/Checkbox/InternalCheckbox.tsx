import {
  forwardRef,
  ReactElement,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
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

type Props = {
  checked?: boolean;
  dataTestId?: string;
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
    dataTestId,
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

  const [focused, setFocused] = useState(false);
  const [hovered, setHover] = useState(false);

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

  const handleHover = () => {
    setHover(!hovered);
  };

  let bgStyle = styles.enabled;
  if (disabled) {
    bgStyle = styles.disabled;
  } else if (checked || indeterminate) {
    bgStyle = styles.checked;
  }

  let borderStyle = styles.border;
  if (disabled) {
    borderStyle = styles.borderDisabled;
  } else if (!disabled && (checked || indeterminate)) {
    borderStyle = styles.borderSelected;
  } else if (errorMessage) {
    borderStyle = styles.borderError;
  } else if (!disabled && hovered) {
    borderStyle = styles.borderHovered;
  }

  const borderRadiusStyle = size === 'sm' ? styles.borderRadiusSm : styles.borderRadiusMd;

  const styleSize = size === 'sm' ? styles.sizeSm : styles.sizeMd;

  const { isFocusVisible } = useFocusVisible();

  let ariaDescribedby;

  if (errorMessage) {
    ariaDescribedby = `${id}-error`;
  }

  if (label && helperText) {
    ariaDescribedby = `${id}-helperText`;
  }

  return (
    <Box>
      <Box alignItems="start" display="flex" justifyContent="start" marginEnd={-1} marginStart={-1}>
        <Box data-test-id={dataTestId} paddingX={1} position="relative" >
          <input
            // checking for "focused" is not required by screenreaders but it prevents a11y integration tests to complain about missing label, as aria-describedby seems to shadow label in tests though it's a W3 accepeted pattern https://www.w3.org/TR/WCAG20-TECHS/ARIA1.html
            ref={innerRef}
            aria-describedby={focused ? ariaDescribedby : undefined}
            aria-hidden={readOnly ? true : undefined}
            aria-invalid={errorMessage ? 'true' : 'false'}
            checked={checked}
            className={classnames(styles.input, styleSize, {
              [styles.inputEnabled]: !disabled,
              [styles.readOnly]: readOnly,
            })}
            disabled={readOnly || disabled}
            id={id}
            name={name}
            onBlur={() => setFocused(false)}
            onChange={handleChange}
            // @ts-expect-error - TS2322 - Type '(event: React.ChangeEvent<HTMLInputElement>) => void' is not assignable to type 'MouseEventHandler<HTMLInputElement>'.
            onClick={handleClick}
            onFocus={() => setFocused(true)}
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            type="checkbox"
          />
          <div
            className={classnames(
              bgStyle,
              borderStyle,
              borderRadiusStyle,
              styleSize,
              styles.check,
              {
                [focusStyles.accessibilityOutlineFocus]: focused && isFocusVisible,
              },
            )}
            style={style}
          >
            {(checked || indeterminate) && (
              <Icon
                accessibilityLabel=""
                color="inverse"
                icon={indeterminate ? 'dash' : 'check'}
                size={size === 'sm' ? 8 : 12}
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
                <Text color={disabled ? 'subtle' : undefined} size={size === 'sm' ? '200' : '300'}>
                  {label}
                </Text>
              </Box>
            </Label>
            <Box paddingX={1}>
              {helperText && !errorMessage ? (
                <FormHelperText id={`${id}-helperText`} size={size} text={helperText} />
              ) : null}
              {errorMessage ? (
                <FormErrorMessage id={`${id}-error`} size={size} text={errorMessage} />
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
