// @flow strict
import {
  type AbstractComponent,
  forwardRef,
  type Node,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import classnames from 'classnames';
import styles from './InternalCheckbox.css';
import Box from '../Box.js';
import colors from '../Colors.css';
import focusStyles from '../Focus.css';
import Icon from '../Icon.js';
import Label from '../Label.js';
import FormErrorMessage from '../shared/FormErrorMessage.js';
import FormHelperText from '../shared/FormHelperText.js';
import Text from '../Text.js';
import useFocusVisible from '../useFocusVisible.js';

type Props = {|
  checked?: boolean,
  disabled?: boolean,
  errorMessage?: string,
  helperText?: string,
  id: string,
  image?: Node,
  indeterminate?: boolean,
  label?: string,
  labelDisplay?: 'visible' | 'hidden',
  name?: string,
  onChange?: ({| event: SyntheticInputEvent<HTMLInputElement>, checked: boolean |}) => void,
  onClick?: ({| event: SyntheticInputEvent<HTMLInputElement>, checked: boolean |}) => void,
  /**
   * Make the checkbox readonly. Interactivity is disabled, but it can be used as a visual indicator. Click handler events are also disabled
   */
  readOnly?: boolean,
  ref?: Element<'input'>, // eslint-disable-line react/no-unused-prop-types
  size?: 'sm' | 'md',
  style?: {| borderColor?: string, backgroundColor?: string |},
|};

const InternalCheckboxWithForwardRef: AbstractComponent<Props, HTMLInputElement> = forwardRef<
  Props,
  HTMLInputElement,
>(function Checkbox(
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
): Node {
  const innerRef = useRef<null | HTMLInputElement>(null);
  // When using both forwardRef and innerRef, React.useimperativehandle() allows a parent component
  // that renders <Checkbox ref={inputRef} /> to call inputRef.current.focus()
  useImperativeHandle(ref, () => innerRef.current);

  const [focused, setFocused] = useState(false);
  const [hovered, setHover] = useState(false);

  useEffect(() => {
    if (innerRef && innerRef.current) {
      innerRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange({ event, checked: event.target.checked });
    }
  };

  const handleClick = (event: SyntheticInputEvent<HTMLInputElement>) => {
    if (onClick) {
      onClick({ event, checked: event.currentTarget.checked });
    }
  };

  const handleHover = () => {
    setHover(!hovered);
  };

  let bgStyle = colors.whiteBg;
  if (disabled) {
    bgStyle = colors.lightGrayBg;
  } else if (checked || indeterminate) {
    bgStyle = colors.darkGrayBg;
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
      <Box alignItems="start" display="flex" justifyContent="start" marginStart={-1} marginEnd={-1}>
        <Box paddingX={1} position="relative">
          <input
            // checking for "focused" is not required by screenreaders but it prevents a11y integration tests to complain about missing label, as aria-describedby seems to shadow label in tests though it's a W3 accepeted pattern https://www.w3.org/TR/WCAG20-TECHS/ARIA1.html
            aria-describedby={focused ? ariaDescribedby : undefined}
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
            onClick={handleClick}
            onFocus={() => setFocused(true)}
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            ref={innerRef}
            type="checkbox"
            aria-hidden={readOnly ? true : undefined}
          />
          <div
            style={style}
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
            display={labelDisplay === 'hidden' ? 'visuallyHidden' : 'block'}
            //  marginTop: '-1px'/'2px' is needed to  visually align the label text & radiobutton input
            dangerouslySetInlineStyle={{ __style: { marginTop: size === 'md' ? '2px' : '-1px' } }}
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
                <FormHelperText id={`${id}-helperText`} text={helperText} />
              ) : null}
              {errorMessage ? <FormErrorMessage id={`${id}-error`} text={errorMessage} /> : null}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
});

InternalCheckboxWithForwardRef.displayName = 'InternalCheckbox';

export default InternalCheckboxWithForwardRef;
