import type { Element } from 'react';
import 'react';
type Props = {
  /**
   * Used to disable the option.
   */
  disabled?: boolean;
  /**
   * The visible label for the option. Don't forget to localize!
   */
  label: string;
  /**
   * The underlying value of the option.
   */
  value: string;
};
/**
 * Use [SelectList.Option](https://gestalt.pinterest.systems/selectlist#SelectList.Option) to define the available options within SelectList.
 */
declare function SelectListOption({ disabled, label, value }: Props): Element<'option'>;
declare namespace SelectListOption {
  var displayName: string;
}
export default SelectListOption;
