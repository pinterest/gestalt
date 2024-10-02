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
import styles from './TagArea.css';
import Box from '../Box';
import boxStyles from '../Box.css';
import Flex from '../Flex';
import FormErrorMessage from '../sharedSubcomponents/FormErrorMessage';
import FormHelperText from '../sharedSubcomponents/FormHelperText';
import { MaxLength } from '../TextField';
import TextUI from '../TextUI';
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
  iconButton?: ReactElement;
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
  readOnlyNoIconButton?: boolean;
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
    iconButton,
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
    readOnlyNoIconButton,
    size,
    tags,
    value,
  }: Props,
  ref,
) {
  const innerRef = useRef<null | HTMLDivElement>(null);
  const labelRef = useRef<null | HTMLDivElement>(null);

  // @ts-expect-error - TS2322 - Type 'HTMLDivElement | HTMLTextAreaElement | null' is not assignable to type 'HTMLTextAreaElement'.
  useImperativeHandle(ref, () => innerRef.current);

  // ==== STATE ====
  const [currentLength, setCurrentLength] = useState(value?.length ?? 0);
  const [ellipsisActive, setEllipsisActive] = useState(false);
  const {
    handleOnBlur,
    handleOnFocus,
    handleOnMouseEnter,
    handleOnMouseLeave,
    isHovered,
    isFocused,
  } = useInteractiveStates();

  const isEllipsisActive = (element: HTMLElement) =>
    element.offsetHeight < element.scrollHeight || element.offsetWidth < element.scrollWidth;

  const checkEllipsisActive = useCallback(() => {
    if (labelRef.current && !ellipsisActive && isEllipsisActive(labelRef?.current)) {
      setEllipsisActive(true);
    } else if (labelRef.current && ellipsisActive && !isEllipsisActive(labelRef?.current)) {
      setEllipsisActive(false);
    }
  }, [ellipsisActive]);

  // ==== VARIABLES ====

  const hasErrorMessage = Boolean(errorMessage);
  const isLabelVisible = labelDisplay === 'visible';
  const isSM = size === 'sm';
  const isMD = size === 'md';
  const isLG = size === 'lg';

  let ariaDescribedby;

  if (hasErrorMessage) {
    ariaDescribedby = `${id}-error`;
  }

  if (helperText || maxLength) {
    ariaDescribedby = `${id}-helperText`;
  }

  useEffect(() => {
    if (!label) return () => {};

    checkEllipsisActive();

    if (typeof window !== 'undefined') window.addEventListener('resize', checkEllipsisActive);

    return () => {
      if (typeof window !== 'undefined') window?.removeEventListener('resize', checkEllipsisActive);
    };
  }, [label, checkEllipsisActive]);

  return (
    <Fragment>
      <div ref={innerRef} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
        <div
          className={classnames(
            styles.inputParent,

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
              // sm
              [styles.sm_input]: isSM,
              [styles.sm_inputHorizontalPadding]: isSM,
              [styles.sm_visibleLabel]: isSM && label && isLabelVisible,
              [styles.sm_noLabel]: (isSM && !label) || (label && !isLabelVisible),
              [styles.sm_actionButton]: isSM && iconButton,

              // md
              [styles.md_input]: isMD,
              [styles.md_inputHorizontalPadding]: isMD,
              [styles.md_visibleLabel]: isMD && label && isLabelVisible,
              [styles.md_noLabel]: (isMD && !label) || (label && !isLabelVisible),
              [styles.md_actionButton]: isMD && iconButton,

              // lg
              [styles.lg_input]: isLG,
              [styles.lg_inputHorizontalPadding]: isLG,
              [styles.lg_visibleLabel]: isLG && label && isLabelVisible,
              [styles.lg_noLabel]: (isLG && !label) || (label && !isLabelVisible),
              [styles.lg_actionButton]: isLG && iconButton,
            },
          )}
        >
          {label && (
            <label
              className={classnames(styles.label, {
                // sm
                [styles.sm_label]: isSM,
                [styles.sm_labelPos]: isSM,
                // md
                [styles.md_label]: isMD,
                [styles.md_labelPos]: isMD,
                // lg
                [styles.lg_label]: isLG,
                [styles.lg_labelPos]: isLG,
                [boxStyles.visuallyHidden]: !isLabelVisible,
              })}
              htmlFor={id}
            >
              <TextUI
                ref={labelRef}
                color={disabled ? 'disabled' : 'default'}
                lineClamp={1}
                size="xs"
                title={ellipsisActive ? label : ''}
              >
                {label}
              </TextUI>
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
                  {cloneElement(tag, {
                    size: size === 'lg' ? 'md' : 'sm',
                    disabled: disabled || readOnly,
                  })}
                </Box>
              ))}
              <Flex.Item flex="grow">
                <input
                  aria-activedescendant={accessibilityActiveDescendant}
                  aria-controls={accessibilityControls}
                  // checking for "focused" is not required by screenreaders but it prevents a11y integration tests to complain about missing label, as aria-describedby seems to shadow label in tests though it's a W3 accepeted pattern https://www.w3.org/TR/WCAG20-TECHS/ARIA1.html
                  aria-describedby={isFocused ? ariaDescribedby : undefined}
                  aria-invalid={hasErrorMessage || hasError ? 'true' : 'false'}
                  className={classnames(styles.input, {
                    // sm
                    [styles.sm_input_text]: isSM,
                    // md
                    [styles.md_input_text]: isMD,
                    // lg
                    [styles.lg_input_text]: isLG,
                  })}
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
          {!disabled && !readOnlyNoIconButton && iconButton}
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
