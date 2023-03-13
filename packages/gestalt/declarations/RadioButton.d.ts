import type { Node, AbstractComponent } from 'react';
declare type Props = {
  /**
   * Indicates if the input is checked. See the [combinations example](https://gestalt.pinterest.systems/web/radiobutton#radio-state-combos) for more details.
   */
  checked?: boolean;
  /**
   * Indicates if the input is disabled. See the [combinations example](https://gestalt.pinterest.systems/web/radiobutton#radio-state-combos) for more details.
   */
  disabled?: boolean;
  /**
   * A unique identifier for the input.
   */
  id: string;
  /**
   * An optional [Image](https://gestalt.pinterest.systems/web/image) component can be supplied to add an image to each radio button. Spacing is already accounted for — simply specify the width and height. See the [images example](https://gestalt.pinterest.systems/web/radiobutton#images) for more details.
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
   * Ref forwarded to the underlying input element. See [ref example](https://gestalt.pinterest.systems/web/radiobutton#ref) for more details.
   */
  ref?: HTMLInputElement;
  /**
   * sm: 16px, md: 24px
   */
  size?: 'sm' | 'md';
  /**
   * Optional description for the input, used to provide more detail about an option. See the [subtext example](https://gestalt.pinterest.systems/web/radiobutton#subtext) for more details.
   */
  subtext?: string;
  /**
   * The value of the input.
   */
  value: string;
};
/**
 * **NOTE** The standalone RadioButton is soon to be deprecated, use [RadioGroup](https://gestalt.pinterest.systems/web/radiogroup) and RadioGroup.RadioButton instead.**NOTE**
 */
declare const RadioButtonWithForwardRef: AbstractComponent<Props, HTMLInputElement>;
export default RadioButtonWithForwardRef;
