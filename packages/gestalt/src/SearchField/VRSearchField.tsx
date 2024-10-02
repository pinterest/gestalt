import {
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import classnames from 'classnames';
import styles from './VRSearchField.css';
import Box from '../Box';
import boxStyles from '../Box.css';
import Icon from '../Icon';
import Pog from '../Pog';
import FormErrorMessage from '../sharedSubcomponents/FormErrorMessage';
import TapArea from '../TapArea';
import { autoCompleteType } from '../TextField/InternalTextField';
import TextUI from '../TextUI';
import typographyStyle from '../Typography.css';

const ENTER: number = 13;
const SPACE: number = 32;
const TAB: number = 9;

type SizeType = 'sm' | 'md' | 'lg';

type Props = {
  // REQUIRED
  id: string;
  onChange: (arg1: { event: React.ChangeEvent<HTMLInputElement>; value: string }) => void;
  // OPTIONAL
  autoComplete?: autoCompleteType;
  dataTestId?: string;
  errorMessage?: ReactNode;
  hasError?: boolean;
  label?: string;
  labelDisplay?: 'visible' | 'hidden';
  onBlur?: (arg1: { event: React.FocusEvent<HTMLInputElement>; value: string }) => void;
  onClick?: (arg1: { event: React.MouseEvent<HTMLInputElement>; value: string }) => void;
  onFocus?: (arg1: { event: React.FocusEvent<HTMLInputElement>; value: string }) => void;
  onKeyDown?: (arg1: { event: React.KeyboardEvent<HTMLInputElement>; value: string }) => void;
  placeholder?: string;
  size?: SizeType;
  value?: string;
};

const SearchFieldWithForwardRef = forwardRef<HTMLInputElement, Props>(function TextField(
  {
    autoComplete,
    dataTestId,
    errorMessage,
    hasError = false,
    id,
    label,
    labelDisplay,
    onBlur,
    onChange,
    onClick,
    onFocus,
    onKeyDown,
    placeholder,
    size = 'md',
    value,
  }: Props,
  ref,
) {
  const innerRef = useRef<null | HTMLInputElement>(null);
  const labelRef = useRef<null | HTMLDivElement>(null);

  // @ts-expect-error - TS2322 - Type 'HTMLDivElement | HTMLInputElement | null' is not assignable to type 'HTMLInputElement'.
  useImperativeHandle(ref, () => innerRef.current);

  const hasErrorMessage = Boolean(errorMessage);

  const isLabelVisible = labelDisplay === 'visible';
  const isClearIconButtonVisible = !!value;

  const isMD = size === 'md';
  const isLG = size === 'lg';

  // ==== STATE ====
  const [focused, setFocused] = useState(false);
  const [ellipsisActive, setEllipsisActive] = useState(false);
  const [iconFocused, setIconFocused] = useState(false);

  // ==== A11Y ====

  const ariaDescribedby = hasErrorMessage ? `${id}-error` : undefined;

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

  return (
    <div>
      <div className={classnames(styles.inputParent)}>
        {label && (
          <label
            className={classnames(styles.label, {
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
              color="default"
              lineClamp={1}
              size="xs"
              title={ellipsisActive ? label : ''}
            >
              {label}
            </TextUI>
          </label>
        )}

        <div
          aria-hidden
          className={classnames(styles.searchIconWrapper, {
            [styles.mdSearchIcon]: isMD,
            [styles.lgSearchIcon]: isLG,
            [styles.searchIconVisibleLabel]: label && isLabelVisible,
            [styles.searchIconNoLabel]: !label || (label && !isLabelVisible),
          })}
        >
          <Icon accessibilityLabel="" color="default" icon="search" size={16} />
        </div>

        <input
          ref={innerRef}
          aria-describedby={focused ? ariaDescribedby : undefined}
          aria-invalid={hasErrorMessage || hasError ? 'true' : 'false'}
          autoComplete={autoComplete}
          className={classnames(
            styles.input,
            typographyStyle.truncate,
            typographyStyle.lineClamp,
            styles.enabled,
            styles.enabledText,
            {
              [styles.enabledBorder]: !hasErrorMessage,
              [styles.errorBorder]: hasErrorMessage,
              [styles.inputHorizontalPaddingNoLabel]: !label || (label && !isLabelVisible),
              [styles.inputHorizontalPaddingVisibleLabel]: label && isLabelVisible,
              // md
              [styles.md_input]: isMD,
              [styles.md_visibleLabel]: isMD && label && isLabelVisible,
              [styles.md_noLabel]: isMD && (!label || (label && !isLabelVisible)),
              [styles.md_actionButton]: isMD && isClearIconButtonVisible,
              // lg
              [styles.lg_input]: isLG,
              [styles.lg_visibleLabel]: isLG && label && isLabelVisible,
              [styles.lg_noLabel]: isLG && (!label || (label && !isLabelVisible)),
              [styles.lg_actionButton]: isLG && isClearIconButtonVisible,
            },
          )}
          data-test-id={dataTestId}
          enterKeyHint="search"
          id={id}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.({ event, value: event.currentTarget.value });
          }}
          onChange={(event) => {
            onChange({ event, value: event.currentTarget.value });
          }}
          onClick={(event) => onClick?.({ event, value: event.currentTarget.value })}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.({ event, value: event.currentTarget.value });
          }}
          onKeyDown={(event) => onKeyDown?.({ event, value: event.currentTarget.value })}
          placeholder={placeholder}
          role="searchbox"
          value={value}
        />
        {isClearIconButtonVisible ? (
          <div className={classnames(styles.actionButtonWrapper)}>
            <Box alignItems="center" display="flex" height="100%" marginEnd={2} rounding={1}>
              <TapArea
                accessibilityLabel="Clear date"
                onBlur={() => setIconFocused(false)}
                onFocus={() => setIconFocused(true)}
                onKeyDown={({ event }) => {
                  if ([ENTER, SPACE].includes(event.keyCode)) {
                    innerRef?.current?.focus();
                    // @ts-expect-error - TS2322 - Type 'KeyboardEvent<HTMLDivElement>' is not assignable to type 'ChangeEvent<HTMLInputElement>'.
                    onChange({ value: '', event });
                  }
                  if (event.keyCode !== TAB) event.preventDefault();
                }}
                onMouseEnter={() => setIconFocused(true)}
                onMouseLeave={() => setIconFocused(false)}
                onTap={({ event }) => {
                  innerRef?.current?.focus();
                  // @ts-expect-error - TS2322 - Type 'KeyboardEvent<HTMLDivElement>' is not assignable to type 'ChangeEvent<HTMLInputElement>'.
                  onChange({ value: '', event });
                }}
                rounding={1}
                tapStyle="compress"
              >
                <Pog
                  accessibilityLabel=""
                  bgColor={iconFocused ? 'lightGray' : 'transparent'}
                  icon="cancel"
                  iconColor="darkGray"
                  size="xs"
                />
              </TapArea>
            </Box>
          </div>
        ) : null}
      </div>

      {hasErrorMessage ? (
        <FormErrorMessage id={`${id}-error`} size={size} text={errorMessage} />
      ) : null}
    </div>
  );
});

SearchFieldWithForwardRef.displayName = 'SearchField';

export default SearchFieldWithForwardRef;
