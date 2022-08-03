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
   * When supplied, the  group will render expanded to show an active item  child.See the [Accessibility](https://gestalt.pinterest.systems/SideNavigation#Accessibility) guidelines to learn more.
   */
  hasActiveChild?: boolean,
  /**
   * Label for the group. See [nested directory](#Nested-directory) variant for more information.
   */
  label: string,
|};

/**
 * Use [SideNavigation.NestedGroup](https://gestalt.pinterest.systems/sidenavigation#SideNavigation.NestedGroup) to hold SideNavigation.NestedItem in the second nested level of Pageheader.
 */
export default function SideNavigationNestedGroup({
  children,
  display = 'expandable',
  hasActiveChild,
  label,
}: Props): Node {
  return (
    <SideNavigationGroup label={label} display={display} hasActiveChild={hasActiveChild}>
      {children}
    </SideNavigationGroup>
  );
}

SideNavigationNestedGroup.displayName = 'SideNavigation.NestedGroup';
