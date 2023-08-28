// @flow strict
import { type AbstractComponent, forwardRef, type Node } from 'react';
import InternalButton from './Button/InternalButton.js';
import icons from './icons/index.js';

type Props = {|
  /**
   * Text to render inside the Button to convey the function and purpose of the Button.
   */
  text: string,
  /**
   * A unique id indicating the element or elements whose contents or visibility are controlled by Button.
   * See the [Accessibility guidelines](https://gestalt.pinterest.systems/foundations/accessibility) to learn more.
   */
  accessibilityControls?: string,
  /**
   * Needed if Button controls the visibility of other elements, e.g. Dropdown or Flyout.
   * This is used to indicate if the controlled grouping is currently expanded or collapsed.
   * See the [Accessibility guidelines](https://gestalt.pinterest.systems/foundations/accessibility) to learn more.
   */
  accessibilityExpanded?: boolean,
  /**
   * Set as true if Button controls one or more interactive popup elements, such as a menu or dialog.
   * See the [Accessibility guidelines](https://gestalt.pinterest.systems/foundations/accessibility) to learn more.
   */
  accessibilityHaspopup?: boolean,
  /**
   * Label to provide more context around Button’s function or purpose.
   * See the [Accessibility guidelines](https://gestalt.pinterest.systems/foundations/accessibility) to learn more.
   */
  accessibilityLabel?: string,
  /**
   * The background color of Button.
   */
  color?:
    | 'gray'
    | 'red'
    | 'blue'
    | 'transparent'
    | 'semiTransparentWhite'
    | 'transparentWhiteText'
    | 'white',
  /**
   * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
   */
  dataTestId?: string,
  /**
   * Indicates if Button is disabled. Disabled Buttons are inactive and cannot be interacted with.
   */
  disabled?: boolean,
  /**
   * Default Buttons are sized by the text within the Button whereas full-width Buttons expand to the full width of their container.
   */
  fullWidth?: boolean,
  /**
   * An icon displayed after the text to help clarify the usage of Button. See the [icon variant](https://gestalt.pinterest.systems/web/button#Icons) to learn more.
   */
  iconEnd?: $Keys<typeof icons>,
  /**
   * The name attribute specifies the name of the \<button\> element.
   * The name attribute is used to reference form-data after the form has been submitted.
   */
  name?: string,
  /**
   * Callback invoked when the user clicks (press and release) on Button with the mouse or keyboard. Required with `role="button"` or `type="button"` Buttons.
   * See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.,
   */
  onClick?: ({|
    event: SyntheticMouseEvent<HTMLButtonElement> | SyntheticKeyboardEvent<HTMLButtonElement>,
    dangerouslyDisableOnNavigation: () => void,
  |}) => void,
  /**
   * Indicates if Button is currently selected.
   */
  selected?: boolean,
  /**
   * sm: 32px, md: 40px, lg: 48px
   */
  size?: 'sm' | 'md' | 'lg',
  /**
   * Use "-1" to remove Button from keyboard navigation.
   * See the [Accessibility guidelines](https://gestalt.pinterest.systems/foundations/accessibility) to learn more.
   */
  tabIndex?: -1 | 0,
  /**
   * sm: 32px, md: 40px, lg: 48px
   */
  type?: 'button' | 'submit',
|};

/**
 * [Buttons](https://gestalt.pinterest.systems/web/button) allow users to perform actions within a surface. They can be used alone for immediate action, or as a trigger for another component, like [Dropdown](https://gestalt.pinterest.systems/web/dropdown) or [Popover](https://gestalt.pinterest.systems/web/popover).
 *
 * ![Button light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Button.spec.mjs-snapshots/Button-chromium-darwin.png)
 * ![Button dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Button-dark.spec.mjs-snapshots/Button-dark-chromium-darwin.png)
 *
 */
const ButtonWithForwardRef: AbstractComponent<Props, HTMLButtonElement> = forwardRef<
  Props,
  HTMLButtonElement,
>(function Button(
  {
    text,
    accessibilityControls,
    accessibilityExpanded,
    accessibilityHaspopup,
    accessibilityLabel,
    color = 'gray',
    dataTestId,
    disabled = false,
    fullWidth = false,
    iconEnd,
    name,
    onClick,
    selected = false,
    size = 'md',
    tabIndex = 0,
    type,
  }: Props,
  ref,
): null | Node {
  if (type === 'submit') {
    return (
      <InternalButton
        accessibilityLabel={accessibilityLabel}
        dataTestId={dataTestId}
        disabled={disabled}
        fullWidth={fullWidth}
        name={name}
        // $FlowExpectedError[incompatible-type]
        ref={ref}
        role="button"
        type="submit"
        tabIndex={tabIndex}
        size={size}
        text={text}
        color={color}
        iconEnd={iconEnd}
        onClick={onClick}
      />
    );
  }
  return (
    <InternalButton
      accessibilityControls={accessibilityControls}
      accessibilityExpanded={accessibilityExpanded}
      accessibilityHaspopup={accessibilityHaspopup}
      accessibilityLabel={accessibilityLabel}
      dataTestId={dataTestId}
      disabled={disabled}
      fullWidth={fullWidth}
      name={name}
      // $FlowExpectedError[incompatible-type]
      ref={ref}
      role="button"
      type="button"
      tabIndex={tabIndex}
      selected={selected}
      size={size}
      text={text}
      color={color}
      iconEnd={iconEnd}
      onClick={onClick}
    />
  );
});

ButtonWithForwardRef.displayName = 'Button';

export default ButtonWithForwardRef;
