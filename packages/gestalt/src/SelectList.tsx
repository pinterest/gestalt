import { ReactNode, useState } from 'react';
import classnames from 'classnames';
import { TOKEN_COLOR_BACKGROUND_FORMFIELD_PRIMARY } from 'gestalt-design-tokens';
import Box from './Box';
import Icon from './Icon';
import layout from './Layout.css';
import styles from './SelectList.css';
import SelectListGroup from './SelectList/SelectListGroup';
import SelectListOption from './SelectList/SelectListOption';
import VRSelectList from './SelectList/VRSelectList';
import formElement from './sharedSubcomponents/FormElement.css';
import FormErrorMessage from './sharedSubcomponents/FormErrorMessage';
import FormHelperText from './sharedSubcomponents/FormHelperText';
import FormLabel from './sharedSubcomponents/FormLabel';
import useInExperiment from './useInExperiment';

type Props = {
  /**
   * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
   */
  dataTestId?: string;
  /**
   * One or more SelectList.Option components, which may be grouped using SelectList.Group.
   */
  children: ReactNode;
  /**
   * Used to disable the entire SelectList.
   */
  disabled?: boolean;
  /**
   * Used to communicate error information to the user. Be sure to localize the text. See the [error message](https://gestalt.pinterest.systems/web/selectlist#Error-message) variant to learn more.
   */
  errorMessage?: string;
  /**
   * Used to provide more information about the form field. Be sure to localize the text. See the [helper text](https://gestalt.pinterest.systems/web/selectlist#Helper-text) variant to learn more.
   */
  helperText?: string;
  /**
   * A unique identifier to connect the underlying `<select>` with the associated label.
   */
  id: string;
  /**
   * The label shown above the input. Be sure to localize the label.
   */
  label?: string;
  /**
   * Whether the legend should be visible or not. If `hidden`, the legend is still available for screen reader users, but does not appear visually. See the [label visibility variant](https://gestalt.pinterest.systems#Label-visibility) for more info.
   */
  labelDisplay?: 'visible' | 'hidden';
  /**
   * Used to specify the name of the control.
   */
  name?: string;
  /**
   * Callback triggered when the user blurs the input.
   */
  onBlur?: (arg1: { event: React.FocusEvent<HTMLSelectElement>; value: string }) => void;
  /**
  /**
   * Callback triggered when the user selects a new option.  See the [controlled component](https://gestalt.pinterest.systems/web/selectlist#Controlled-component) variant to learn more.
   */
  onChange: (arg1: { event: React.ChangeEvent<HTMLSelectElement>; value: string }) => void;
  /**
   * Callback triggered when the user focuses the input.
   */
  onFocus?: (arg1: { event: React.FocusEvent<HTMLSelectElement>; value: string }) => void;
  /**
   * If not provided, the first item in the list will be shown. Be sure to localize the text. See the [controlled component](https://gestalt.pinterest.systems/web/selectlist#Controlled-component) variant to learn more.
   */
  placeholder?: string;
  /**
   * Indicate if the input is readOnly. See the [readOnly example](https://gestalt.pinterest.systems/web/textfield#Read-only) for more details.
   */
  readOnly?: boolean;
  /**
   * md: 40px, lg: 48px. See the [size](https://gestalt.pinterest.systems/web/selectlist#Size) variant to learn more.
   */
  size?: 'md' | 'lg';
  /**
   * The currently-selected value. See the [controlled component](https://gestalt.pinterest.systems/web/selectlist#Controlled-component) variant to learn more.
   */
  value?: string | null | undefined;
};

/**
 * [SelectList](https://gestalt.pinterest.systems/web/selectlist) displays a list of actions or options using the browser’s native select.
 *
 * ![SelectList light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/SelectList.spec.ts-snapshots/SelectList-chromium-darwin.png)
 * ![SelectList dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/SelectList-dark.spec.ts-snapshots/SelectList-dark-chromium-darwin.png)
 *
 */
function SelectList({
  dataTestId,
  children,
  disabled = false,
  errorMessage,
  helperText,
  id,
  label,
  labelDisplay = 'visible',
  name,
  onBlur,
  onChange,
  onFocus,
  placeholder,
  readOnly,
  size = 'md',
  value,
}: Props) {
  const [focused, setFocused] = useState(false);

  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  const handleOnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void = (event) => {
    if (value !== event.target.value) {
      onChange({ event, value: event.target.value });
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLSelectElement>) => {
    const { value: eventValue } = event.target;
    onBlur?.({ event, value: eventValue });
    handleOnChange(event);
    setFocused(false);
  };

  const handleFocus = (event: React.FocusEvent<HTMLSelectElement>) => {
    const { value: eventValue } = event.target;
    onFocus?.({ event, value: eventValue });
    setFocused(true);
  };

  const classes = classnames(
    styles.select,
    formElement.base,
    size === 'md' ? layout.medium : layout.large,
    {
      [formElement.md]: size === 'md',
      [formElement.lg]: size === 'lg',
      [formElement.normal]: !errorMessage,
      [formElement.enabledTransparent]: !disabled,
      [formElement.disabled]: disabled,
      [formElement.errored]: !disabled && !!errorMessage,
    },
  );

  const showPlaceholder = placeholder && !value;

  let ariaDescribedby;

  if (errorMessage) {
    ariaDescribedby = `${id}-error`;
  }

  if (label && helperText) {
    ariaDescribedby = `${id}-helperText`;
  }

  if (isInVRExperiment) {
    return (
      <VRSelectList
        dataTestId={dataTestId}
        disabled={disabled}
        errorMessage={errorMessage}
        helperText={helperText}
        id={id}
        label={label}
        labelDisplay={labelDisplay}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholder}
        readOnly={readOnly}
        size={size}
        value={value}
      >
        {children}
      </VRSelectList>
    );
  }

  return (
    <Box>
      {label && <FormLabel id={id} label={label} labelDisplay={labelDisplay} size={size} />}
      <Box
        dangerouslySetInlineStyle={{
          __style: { backgroundColor: TOKEN_COLOR_BACKGROUND_FORMFIELD_PRIMARY },
        }}
        display="flex"
        position="relative"
        rounding={4}
        width="100%"
      >
        <Box
          alignItems="center"
          bottom
          dangerouslySetInlineStyle={{
            __style: { paddingRight: 14, paddingTop: 2 },
          }}
          display="flex"
          position="absolute"
          right
          top
        >
          <Icon
            accessibilityLabel=""
            color={disabled ? 'subtle' : 'default'}
            icon="arrow-down"
            size={12}
          />
        </Box>
        <select
          // checking for "focused" is not required by screenreaders but it prevents a11y integration tests to complain about missing label, as aria-describedby seems to shadow label in tests though it's a W3 accepeted pattern https://www.w3.org/TR/WCAG20-TECHS/ARIA1.html
          aria-describedby={focused ? ariaDescribedby : undefined}
          aria-invalid={errorMessage ? 'true' : 'false'}
          className={classes}
          data-test-id={dataTestId}
          disabled={disabled}
          id={id}
          name={name}
          onBlur={handleBlur}
          onChange={handleOnChange}
          onFocus={handleFocus}
          readOnly={readOnly}
          // @ts-expect-error - TS2322 - Type 'string | null | undefined' is not assignable to type 'string | number | readonly string[] | undefined'.
          value={showPlaceholder ? placeholder : value}
        >
          {showPlaceholder && (
            <option disabled hidden value={placeholder}>
              {placeholder}
            </option>
          )}
          {children}
        </select>
      </Box>
      {helperText && !errorMessage ? (
        <FormHelperText id={`${id}-helperText`} text={helperText} />
      ) : null}
      {errorMessage && <FormErrorMessage id={`${id}-error`} text={errorMessage} />}
    </Box>
  );
}

SelectList.Option = SelectListOption;
SelectList.Group = SelectListGroup;

SelectList.displayName = 'SelectList';

export default SelectList;
