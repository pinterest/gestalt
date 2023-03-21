import type { Node, AbstractComponent } from 'react';
type Props = {
  /**
   * Indicates if the input is checked. See the [state example](https://gestalt.pinterest.systems/web/radiogroup#States) for more details.
   */
  checked?: boolean;
  /**
   * Indicates if the input is disabled. See the [state example](https://gestalt.pinterest.systems/web/radiogroup#States) for more details.
   */
  disabled?: boolean;
  /**
   * A unique identifier for the input.
   */
  id: string;
  /**
   * An optional [Image](https://gestalt.pinterest.systems/web/image) component can be supplied to add an image to each radio button. Spacing is already accounted for — simply specify the width and height. See the [images example](https://gestalt.pinterest.systems/web/radiogroup#With-Image) for more details.
   */
  image?: Node;
  /**
   * The displayed label for the input.
   */
  label?: string;
  /**
   * The name given for all radio buttons in a single group.
   */
  name?: string;
  /**
   * Callback triggered when the user interacts with the input.
   */
  onChange: (arg0: { event: React.SyntheticEvent<HTMLInputElement>; checked: boolean }) => void;
  /**
   * Ref forwarded to the underlying input element. See [ref example](https://gestalt.pinterest.systems/web/radiogroup#Using-ref) for more details.
   */
  ref?: HTMLInputElement;
  /**
   * sm: 16px, md: 24px
   */
  size?: 'sm' | 'md';
  /**
   * Optional description for the input, used to provide more detail about an option. See the [helperText example](https://gestalt.pinterest.systems/web/radiogroup#With-helperText) for more details.
   */
  helperText?: string;
  /**
   * The value of the input.
   */
  value: string;
};
/**
 *  Use [RadioGroup.RadioButtons](https://gestalt.pinterest.systems/web/radiogroup#RadioGroup.RadioButton) to present an option for selection to the user within a RadioGroup. They should not be used outside of RadioGroup or when the user can select more than one option from a list.
 *
 * ![RadioGroup light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/RadioGroup.spec.mjs-snapshots/RadioGroup-chromium-darwin.png)
 * ![RadioGroup dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/RadioGroup-dark.spec.mjs-snapshots/RadioGroup-dark-chromium-darwin.png)
 *
 */
declare const RadioGroupButtonWithForwardRef: AbstractComponent<Props, HTMLInputElement>;
export default RadioGroupButtonWithForwardRef;
