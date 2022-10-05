// @flow strict
import { type Node, useState } from 'react';
import classnames from 'classnames';
import formElement from './shared/FormElement.css';
import layout from './Layout.css';
import styles from './SelectList.css';
import Box from './Box.js';
import FormErrorMessage from './shared/FormErrorMessage.js';
import FormHelperText from './shared/FormHelperText.js';
import FormLabel from './shared/FormLabel.js';
import Icon from './Icon.js';
import SelectListGroup from './SelectList/SelectListGroup.js';
import SelectListOption from './SelectList/SelectListOption.js';

type Props = {|
  /**
   * One or more SelectList.Option components, which may be grouped using SelectList.Group.
   */
  children: Node,
  /**
   * Used to disable the entire SelectList.
   */
  disabled?: boolean,
  /**
   * Used to communicate error information to the user. Be sure to localize the text. See the [error message](https://gestalt.pinterest.systems/web/selectlist#Error-message) variant to learn more.
   */
  errorMessage?: string,
  /**
   * Used to provide more information about the form field. Be sure to localize the text. See the [helper text](https://gestalt.pinterest.systems/web/selectlist#Helper-text) variant to learn more.
   */
  helperText?: string,
  /**
   * A unique identifier to connect the underlying `<select>` with the associated label.
   */
  id: string,
  /**
   * The label shown above the input. Be sure to localize the label.
   */
  label?: string,
  /**
   * Whether the legend should be visible or not. If `hidden`, the legend is still available for screen reader users, but does not appear visually. See the [label visibility variant](https://gestalt.pinterest.systems#Label-visibility) for more info.
   */
  labelDisplay?: 'visible' | 'hidden',
  /**
   * Used to specify the name of the control.
   */
  name?: string,
  /**
   * Callback triggered when the user selects a new option.  See the [controlled component](https://gestalt.pinterest.systems/web/selectlist#Controlled-component) variant to learn more.
   */
  onChange: ({| event: SyntheticInputEvent<HTMLSelectElement>, value: string |}) => void,
  /**
   * If not provided, the first item in the list will be shown. Be sure to localize the text. See the [controlled component](https://gestalt.pinterest.systems/web/selectlist#Controlled-component) variant to learn more.
   */
  placeholder?: string,
  /**
   * md: 40px, lg: 48px. See the [size](https://gestalt.pinterest.systems/web/selectlist#Size) variant to learn more.
   */
  size?: 'md' | 'lg',
  /**
   * The currently-selected value. See the [controlled component](https://gestalt.pinterest.systems/web/selectlist#Controlled-component) variant to learn more.
   */
  value?: ?string,
|};

/**
 * [SelectList](https://gestalt.pinterest.systems/web/selectlist) displays a list of actions or options using the browser’s native select.
 *
 * ![SelectList light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/SelectList.spec.mjs-snapshots/SelectList-chromium-darwin.png)
 * ![SelectList dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/SelectList-dark.spec.mjs-snapshots/SelectList-dark-chromium-darwin.png)
 *
 */
function SelectList({
  children,
  disabled = false,
  errorMessage,
  helperText,
  id,
  label,
  labelDisplay = 'visible',
  name,
  onChange,
  placeholder,
  size = 'md',
  value,
}: Props): Node {
  const [focused, setFocused] = useState(false);

  const handleOnChange: (event: SyntheticInputEvent<HTMLSelectElement>) => void = (event) => {
    if (value !== event.target.value) {
      onChange({ event, value: event.target.value });
    }
  };

  const handleBlur: (event: SyntheticInputEvent<HTMLSelectElement>) => void = (event) => {
    setFocused(false);
    handleOnChange(event);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const classes = classnames(
    styles.select,
    formElement.base,
    disabled ? formElement.disabled : formElement.enabled,
    errorMessage ? formElement.errored : formElement.normal,
    size === 'md' ? layout.medium : layout.large,
  );

  const showPlaceholder = placeholder && !value;

  return (
    <Box>
      {label && <FormLabel id={id} label={label} labelDisplay={labelDisplay} />}
      <Box
        color={disabled ? 'secondary' : 'default'}
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
            icon="arrow-down"
            size={12}
            color={disabled ? 'subtle' : 'default'}
            accessibilityLabel=""
          />
        </Box>
        <select
          aria-describedby={errorMessage && focused ? `${id}-error` : null}
          aria-invalid={errorMessage ? 'true' : 'false'}
          className={classes}
          disabled={disabled}
          id={id}
          name={name}
          onBlur={handleBlur}
          onChange={handleOnChange}
          onFocus={handleFocus}
          value={showPlaceholder ? placeholder : value}
        >
          {showPlaceholder && (
            <option disabled value={placeholder} hidden>
              {placeholder}
            </option>
          )}
          {children}
        </select>
      </Box>
      {helperText && !errorMessage ? <FormHelperText text={helperText} /> : null}
      {errorMessage && <FormErrorMessage id={id} text={errorMessage} />}
    </Box>
  );
}

SelectList.Option = SelectListOption;
SelectList.Group = SelectListGroup;

export default SelectList;
