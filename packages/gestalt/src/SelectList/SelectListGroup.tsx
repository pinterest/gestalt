import { ReactNode } from 'react';

type Props = {
  /**
   * One or more SelectList.Option components.
   */
  children: ReactNode;
  /**
   * Used to disable the entire group of options.
   */
  disabled?: boolean;
  /**
   * The label for the group. Don't forget to localize!
   */
  label: string;
};

/**
 * Use [SelectList.Group](https://gestalt.pinterest.systems/selectlist#SelectList.Group) to group a subset of the options within SelectList.
 */
// @ts-expect-error - TS2315 - Type 'Element' is not generic.
export default function SelectListGroup({ children, disabled, label }: Props): Element<'optgroup'> {
  return (
    <optgroup disabled={disabled} label={label}>
      {children}
    </optgroup>
  );
}

SelectListGroup.displayName = 'SelectList.Group';
