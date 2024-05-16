import { forwardRef, ReactNode, useImperativeHandle, useRef, useState } from 'react';
import classnames from 'classnames';
import Box from './Box';
import Icon from './Icon';
import IconButton from './IconButton';
import layout from './Layout.css';
import styles from './SearchField.css';
import formElement from './shared/FormElement.css';
import FormErrorMessage from './shared/FormErrorMessage';
import FormLabel from './shared/FormLabel';

type UnionRefs = HTMLDivElement | HTMLAnchorElement;

type Props = {
  /**
   * String that clients such as VoiceOver will read to describe the element. Always localize the label. See the [Accessibility section](https://gestalt.pinterest.systems/web/searchfield#Accessibility) for more info.
   */
  accessibilityLabel: string;
  /**
   * String that clients such as VoiceOver will read to describe the clear button element. Always localize the label. See the [Accessibility section](https://gestalt.pinterest.systems/web/searchfield#Accessibility) for more info.
   */
  accessibilityClearButtonLabel?: string;
  /**
   * The type of autocomplete used, if any. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) for more info.
   */
  autoComplete?: 'on' | 'off' | 'username' | 'name';
  /**
   * Error text displayed below the input field.
   */
  errorMessage?: string;
  /**
   * Must be unique!
   */
  id: string;
  /**
   * Text used to label the input. Be sure to localize the text. See the [Visible label variant](https://gestalt.pinterest.systems/web/searchfield#Visible-label) for more info.
   */
  label?: string;
  /**
   *
   */
  onBlur?: (arg1: { event: React.KeyboardEvent<HTMLInputElement>; value: string }) => void;
  /**
   * Primary callback to handle keyboard input.
   */
  onChange: (arg1: {
    value: string;
    event: React.SyntheticEvent<HTMLInputElement | HTMLButtonElement>;
  }) => void;
  /**
   *
   */
  onFocus?: (arg1: { value: string; event: React.SyntheticEvent<HTMLInputElement> }) => void;
  /**
   * Secondary callback for keyboard events. Possible uses include validation, form submission, etc.
   */
  onKeyDown?: (arg1: { event: React.KeyboardEvent<HTMLInputElement>; value: string }) => void;
  /**
   * Text displayed before the user has entered anything.
   */
  placeholder?: string;
  /**
   * Ref that is forwarded to the underlying input element.
   */
  ref?: UnionRefs; // eslint-disable-line react/no-unused-prop-types,
  /**
   * md: 40px, lg: 48px
   */
  size?: 'md' | 'lg';
  /**
   * The current value of the input.
   */
  value?: string;
};

/**
 * [SearchField](https://gestalt.pinterest.systems/web/searchfield) allows users to search for free-form content.
 *
 * ![SearchField light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/SearchField.spec.mjs-snapshots/SearchField-chromium-darwin.png)
 * ![SearchField dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/SearchField-dark.spec.mjs-snapshots/SearchField-dark-chromium-darwin.png)
 *
 */
// @ts-expect-error - TS2345 - Argument of type '({ accessibilityLabel, accessibilityClearButtonLabel, autoComplete, id, label, onBlur, onChange, onFocus, onKeyDown, placeholder, size, value, errorMessage, }: Props, ref: ForwardedRef<HTMLInputElement>) => ReactNode' is not assignable to parameter of type 'ForwardRefRenderFunction<HTMLInputElement, Props>'.
const SearchFieldWithForwardRef = forwardRef<HTMLInputElement, Props>(function SearchField(
  {
    accessibilityLabel,
    accessibilityClearButtonLabel,
    autoComplete,
    id,
    label,
    onBlur,
    onChange,
    onFocus,
    onKeyDown,
    placeholder,
    size = 'md',
    value,
    errorMessage,
  }: Props,
  ref,
): ReactNode {
  const [hovered, setHovered] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);

  // Ref to the input
  const inputRef = useRef<null | HTMLInputElement>(null);
// @ts-expect-error - TS2322 - Type 'HTMLInputElement | null' is not assignable to type 'HTMLInputElement'.
  useImperativeHandle(ref, () => inputRef.current);

  const handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    onChange({
      value: event.currentTarget.value,
      event,
    });
  };

  const handleMouseEnter = () => setHovered(true);

  const handleMouseLeave = () => setHovered(false);

  const handleFocus = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setFocused(true);
    if (onFocus) {
      onFocus({
        value: event.currentTarget.value,
        event,
      });
    }
  };

  const handleBlur = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setFocused(false);
    if (onBlur) {
      onBlur({ value: event.currentTarget.value, event });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (onKeyDown) {
      onKeyDown({ event, value: event.currentTarget.value });
    }
  };

  const hasValue = value && value.length > 0;
  const hideSearchIcon = focused || hasValue;

  const className = classnames(
    styles.input,
    {
      [layout.medium]: size === 'md',
      [layout.large]: size === 'lg',
      [styles.inputActive]: focused || hasValue,
      [styles.inputHovered]: hovered,
    },
    errorMessage ? formElement.errored : formElement.normal,
  );

  return (
    <span>
      {label && <FormLabel id={id} label={label} />}
      <Box
        alignItems="center"
        display="flex"
// @ts-expect-error - TS2322 - Type '{ children: (false | "" | Element | undefined)[]; alignItems: "center"; display: "flex"; onBlur: (event: KeyboardEvent<HTMLInputElement>) => void; onFocus: (event: SyntheticEvent<...>) => void; onMouseEnter: () => void; onMouseLeave: () => void; position: "relative"; }' is not assignable to type 'IntrinsicAttributes & Omit<Props, "ref"> & RefAttributes<HTMLElement>'.
        onBlur={handleBlur}
        onFocus={handleFocus}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        position="relative"
      >
        {!hideSearchIcon && (
          <Box
            dangerouslySetInlineStyle={{
              __style: {
                pointerEvents: 'none',
                // Added the following lines for Safari support
                top: '50%',
                transform: 'translateY(-50%)',
              },
            }}
            left
            paddingX={4}
            position="absolute"
            right
          >
            <Icon accessibilityLabel="" icon="search" />
          </Box>
        )}
{ /* @ts-expect-error - TS2322 - Type '{ ref: MutableRefObject<HTMLInputElement | null>; "aria-describedby": string | null; "aria-invalid": "true" | "false"; "aria-label": string; autoComplete: "name" | ... 3 more ... | undefined; ... 7 more ...; value: string | undefined; }' is not assignable to type 'DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>'. */}
        <input
          ref={inputRef}
          aria-describedby={errorMessage ? `${id}-error` : null}
          aria-invalid={errorMessage ? 'true' : 'false'}
          aria-label={accessibilityLabel}
          autoComplete={autoComplete}
          className={className}
          id={id}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          role="searchbox"
          type="search"
          value={value}
        />

        {hasValue && (
          <div className={styles.clear}>
            <IconButton
              accessibilityLabel={accessibilityClearButtonLabel || ''}
              bgColor="transparent"
              icon="cancel"
              onClick={({ event }) => {
                inputRef?.current?.focus();
                onChange({ value: '', event });
              }}
              padding={size === 'md' ? 1 : undefined}
              selected={focused}
              size="xs"
            />
          </div>
        )}
      </Box>
      {errorMessage && <FormErrorMessage id={`${id}-error`} text={errorMessage} />}
    </span>
  );
});

SearchFieldWithForwardRef.displayName = 'SearchField';

export default SearchFieldWithForwardRef;
