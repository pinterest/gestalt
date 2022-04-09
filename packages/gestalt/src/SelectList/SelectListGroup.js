// @flow strict
import { type Element, type Node } from 'react';

type Props = {|
  /**
   * One or more SelectList.Option components.
   */
  children: Node,
  /**
   * Used to disable the entire group of options.
   */
  disabled?: boolean,
  /**
   * The label for the group. Don't forget to localize!
   */
  label: string,
|};

export default function SelectListGroup({ children, disabled, label }: Props): Element<'optgroup'> {
  return (
    <optgroup disabled={disabled} label={label}>
      {children}
    </optgroup>
  );
}
