// @flow strict
import { type Node as ReactNode } from 'react';
import SideNavigationGroup from './SideNavigationGroup';

type Props = {
  /**
   * Content of the group. See [nested directory](#Nested-directory) variant for more information.
   */
  children: ReactNode,
  /**
   * When supplied, will display a counter. See the [Counter](https://gestalt.pinterest.systems/web/sidenavigation#Counter) variant to learn more.
   */
  counter?: { number: string, accessibilityLabel: string },
  /**
   * Nested directories can be static or expandable. See [nested directory](#Nested-directory) variant for more information.
   */
  display?: 'expandable' | 'expandableExpanded' | 'static',
  /**
   * Label for the group. See [nested directory](#Nested-directory) variant for more information.
   */
  label: string,
};

/**
 * Use [SideNavigation.NestedGroup](https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.NestedGroup) to hold SideNavigation.NestedItem in the second nested level of Pageheader.
 */
export default function SideNavigationNestedGroup({
  children,
  counter,
  display = 'expandable',
  label,
}: Props): ReactNode {
  return (
    <SideNavigationGroup counter={counter} label={label} display={display}>
      {children}
    </SideNavigationGroup>
  );
}

SideNavigationNestedGroup.displayName = 'SideNavigation.NestedGroup';
