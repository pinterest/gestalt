// @flow strict
import { type Element } from 'react';

type Props = {
  /**
   * Used to disable the option.
   */
  disabled?: boolean,
  /**
   * The visible label for the option. Don't forget to localize!
   */
  label: string,
  /**
   * The underlying value of the option.
   */
  value: string,
};

/**
 * Use [SelectList.Option](https://gestalt.pinterest.systems/selectlist#SelectList.Option) to define the available options within SelectList.
 */
export default function SelectListOption({ disabled, label, value }: Props): Element<'option'> {
  return (
    <option disabled={disabled} value={value}>
      {label}
    </option>
  );
}

SelectListOption.displayName = 'SelectList.Option';
