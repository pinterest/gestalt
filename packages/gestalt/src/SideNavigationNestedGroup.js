// @flow strict
import { type Node } from 'react';
import SideNavigationGroup from './SideNavigationGroup.js';

type Props = {|
  /**
   * Content of the group. See [nested directory](#Nested-directory) variant for more information.
   */
  children: Node,
  /**
   * Nested directories can be static or expandable. See [nested directory](#Nested-directory) variant for more information.
   */
  display?: 'expandable' | 'static',
  /**
   * Label for the group. See [nested directory](#Nested-directory) variant for more information.
   */
  label: string,
|};

/**
 * Use [SideNavigation.NestedGroup](https://gestalt.pinterest.systems/sidenavigation#SideNavigation.NestedGroup).
 */
export default function SideNavigationNestedGroup({
  children,
  display = 'expandable',
  label,
}: Props): Node {
  return (
    <SideNavigationGroup label={label} display={display}>
      {children}
    </SideNavigationGroup>
  );
}

SideNavigationNestedGroup.displayName = 'SideNavigation.NestedGroup';
