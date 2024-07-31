import {
  cloneElement,
  forwardRef,
  Fragment,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import classnames from 'classnames';
import { TOKEN_SPACE_100 } from 'gestalt-design-tokens';
import styles from './VRTagArea.css';
import Box from '../Box';
import boxStyles from '../Box.css';
import Flex from '../Flex';
import FormErrorMessage from '../sharedSubcomponents/FormErrorMessage';
import FormHelperText from '../sharedSubcomponents/FormHelperText';
import { MaxLength } from '../TextField';
import typographyStyle from '../Typography.css';
import useInteractiveStates from '../utils/useInteractiveStates';

type Props = {
  // REQUIRED
  id: string;
  onChange: (arg1: { event: React.ChangeEvent<HTMLInputElement>; value: string }) => void;
  // OPTIONAL
  accessibilityControls?: string;
  accessibilityActiveDescendant?: string;
  dataTestId?: string;
  disabled?: boolean;
  errorMessage?: ReactNode;
  hasError?: boolean;
  helperText?: string;
  label?: string;
  labelDisplay?: 'visible' | 'hidden';
  maxLength?: MaxLength | null | undefined;
  name?: string;
  onBlur?: (arg1: { event: React.FocusEvent<HTMLInputElement>; value: string }) => void;
  onClick?: (arg1: { event: React.MouseEvent<HTMLInputElement>; value: string }) => void;
  onFocus?: (arg1: { event: React.FocusEvent<HTMLInputElement>; value: string }) => void;
  onKeyDown?: (arg1: { event: React.KeyboardEvent<HTMLInputElement>; value: string }) => void;
  placeholder?: string;
  readOnly?: boolean;
  size: 'sm' | 'md' | 'lg';
  tags: ReadonlyArray<ReactElement>;
  value?: string;
};

const TagAreaWithForwardRef = forwardRef<HTMLTextAreaElement, Props>(function TagArea(
  {
    accessibilityControls,
    accessibilityActiveDescendant,
    dataTestId,
    disabled = false,
    errorMessage,
    hasError = false,
    helperText,
    id,
    label,
    labelDisplay,
    maxLength,
    name,
    onBlur,
    onChange,
    onClick,
    onFocus,
    onKeyDown,
    placeholder,
    readOnly,
    size,
    tags,
    value,
  }: Props,
  ref,
) {
  const innerRef = useRef<null | HTMLDivElement>(null);
  const labelRef = useRef<null | HTMLLabelElement>(null);

  const [ellipsisActive, setEllipsisActive] = useState(false);

  const {
    handleOnBlur,
    handleOnFocus,
    handleOnMouseEnter,
    handleOnMouseLeave,
    isHovered,
    isFocused,
  } = useInteractiveStates();

  // @ts-expect-error - TS2322 - Type 'HTMLDivElement | HTMLTextAreaElement | null' is not assignable to type 'HTMLTextAreaElement'.
  useImperativeHandle(ref, () => innerRef.current);

  const hasErrorMessage = Boolean(errorMessage);

  const isLabelVisible = labelDisplay === 'visible';

  const isEllipsisActive = (element: HTMLElement) =>
    element.offsetHeight < element.scrollHeight || element.offsetWidth < element.scrollWidth;

  const checkEllipsisActive = useCallback(() => {
    if (labelRef.current && !ellipsisActive && isEllipsisActive(labelRef?.current)) {
      setEllipsisActive(true);
    } else if (labelRef.current && ellipsisActive && !isEllipsisActive(labelRef?.current)) {
      setEllipsisActive(false);
    }
  }, [ellipsisActive]);

  useEffect(() => {
    if (!label) return () => {};

    checkEllipsisActive();

    if (typeof window !== 'undefined') window.addEventListener('resize', checkEllipsisActive);

    return () => {
      if (typeof window !== 'undefined') window?.removeEventListener('resize', checkEllipsisActive);
    };
  }, [label, checkEllipsisActive]);

  // ==== STATE ====
  const [currentLength, setCurrentLength] = useState(value?.length ?? 0);

  // ==== A11Y ====

  let ariaDescribedby;

  if (hasErrorMessage) {
    ariaDescribedby = `${id}-error`;
  }

  if (helperText || maxLength) {
    ariaDescribedby = `${id}-helperText`;
  }

  return (
    <Fragment>
      <div ref={innerRef} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
        <div
          className={classnames(
            styles.inputParent,
            styles.md_input,
            styles.md_inputHorizontalPadding,
            {
              [styles.disabled]: disabled,
              [styles.disabledText]: disabled,
              [styles.enabled]: !disabled,
              [styles.enabledText]: !disabled,
              [styles.borderFocus]: !disabled && isFocused && !hasErrorMessage,
              [styles.errorBorderFocus]: !disabled && isFocused && hasErrorMessage,
              [styles.enabledBorder]: !disabled && !isFocused && !hasErrorMessage && !isHovered,
              [styles.enabledBorderHover]: !disabled && !isFocused && !hasErrorMessage && isHovered,
              [styles.errorBorder]: !disabled && !isFocused && hasErrorMessage,
              [styles.errorBorderHover]: !disabled && !isFocused && hasErrorMessage && isHovered,
              // md
              [styles.md_visibleLabel]: label && isLabelVisible,
              [styles.md_noLabel]: !label || (label && !isLabelVisible),
            },
          )}
        >
          {label && (
            <label
              ref={labelRef}
              className={classnames(
                styles.label,
                styles.md_label,
                styles.md_labelPos,
                typographyStyle.truncate,
                {
                  [boxStyles.visuallyHidden]: !isLabelVisible,
                },
              )}
              htmlFor={id}
              title={ellipsisActive ? label : ''}
            >
              {label}
            </label>
          )}
          <Flex gap={1}>
            <Flex wrap>
              {tags.map((tag, tagIndex) => (
                <Box
                  // eslint-disable-next-line react/no-array-index-key
                  key={tagIndex}
                  dangerouslySetInlineStyle={{
                    __style: {
                      marginBottom: size === 'sm' || size === 'md' ? '2px' : TOKEN_SPACE_100,
                    },
                  }}
                  marginEnd={1}
                >
                  {cloneElement(tag, { size: size === 'lg' ? 'md' : 'sm' })}
                </Box>
              ))}
              <Flex.Item flex="grow">
                <input
                  aria-activedescendant={accessibilityActiveDescendant}
                  aria-controls={accessibilityControls}
                  // checking for "focused" is not required by screenreaders but it prevents a11y integration tests to complain about missing label, as aria-describedby seems to shadow label in tests though it's a W3 accepeted pattern https://www.w3.org/TR/WCAG20-TECHS/ARIA1.html
                  aria-describedby={isFocused ? ariaDescribedby : undefined}
                  aria-invalid={hasErrorMessage || hasError ? 'true' : 'false'}
                  className={classnames(styles.input)}
                  data-test-id={dataTestId}
                  disabled={disabled}
                  id={id}
                  maxLength={maxLength?.characterCount}
                  name={name}
                  onBlur={(event) => {
                    handleOnBlur();
                    onBlur?.({ event, value: event.currentTarget.value });
                  }}
                  onChange={(event) => {
                    setCurrentLength(event.currentTarget.value?.length ?? 0);
                    onChange({ event, value: event.currentTarget.value });
                  }}
                  onClick={(event) => onClick?.({ event, value: event.currentTarget.value })}
                  onFocus={(event) => {
                    handleOnFocus();
                    onFocus?.({ event, value: event.currentTarget.value });
                  }}
                  onKeyDown={(event) => onKeyDown?.({ event, value: event.currentTarget.value })}
                  placeholder={placeholder}
                  readOnly={readOnly}
                  value={value}
                />
              </Flex.Item>
            </Flex>
          </Flex>
        </div>
      </div>
      {(helperText || maxLength) && !hasErrorMessage ? (
        <FormHelperText
          currentLength={currentLength}
          disabled={disabled}
          id={`${id}-helperText`}
          maxLength={maxLength}
          size="md"
          text={helperText}
        />
      ) : null}

      {!disabled && hasErrorMessage ? (
        <FormErrorMessage id={`${id}-error`} size="md" text={errorMessage} />
      ) : null}
    </Fragment>
  );
});

TagAreaWithForwardRef.displayName = 'TagArea';

export default TagAreaWithForwardRef;
