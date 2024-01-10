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
   * Nested directories can be static or expandable.  See the [group display variant](https://gestalt.pinterest.systems/web/sidenavigation#Group-display) to learn more.
   */
  display?: 'expandable' | 'static',
  /**
   * When passed SideNavigation.Group becomes a controlled component. If not passed, it stays uncontrolled. See the [controlled group display variant](https://gestalt.pinterest.systems/web/sidenavigation#Group-display) to learn more. This functionality is not supported in mobile.
   */
  expanded?: boolean,
  /**
   * Label for the group. See [nested directory](#Nested-directory) variant for more information.
   */
  label: string,
  /**
   * Callback fired when the expand button component is clicked and the component is controlled. This functionality is not supported in mobile.
   */
  onExpand?: ({ label: string, expanded: boolean }) => void,
};

/**
 * Use [SideNavigation.NestedGroup](https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.NestedGroup) to hold SideNavigation.NestedItem in the second nested level of Pageheader.
 */
export default function SideNavigationNestedGroup({
  children,
  counter,
  display = 'expandable',
  expanded,
  label,
  onExpand,
}: Props): ReactNode {
  return (
    <SideNavigationGroup
      counter={counter}
      label={label}
      display={display}
      expanded={expanded}
      onExpand={onExpand}
    >
      {children}
    </SideNavigationGroup>
  );
}

SideNavigationNestedGroup.displayName = 'SideNavigation.NestedGroup';
