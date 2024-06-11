import { ReactElement, ReactNode } from 'react';
import SideNavigationGroup from './SideNavigationGroup';
import { Indexable } from './zIndex';

type Props = {
  /**
   * Content of the group. See [nested directory](#Nested-directory) variant for more information.
   */
  children: ReactNode;
  /**
   * When supplied, will display a counter. See the [Counter](https://gestalt.pinterest.systems/web/sidenavigation#Counter) variant to learn more.
   */
  counter?: {
    number: string;
    accessibilityLabel: string;
  };
  /**
   * Nested directories can be static or expandable.  See the [group display variant](https://gestalt.pinterest.systems/web/sidenavigation#Group-display) to learn more.
   */
  display?: 'expandable' | 'static';
  /**
   * When passed SideNavigation.Group becomes a controlled component. If not passed, it stays uncontrolled. See the [controlled group display variant](https://gestalt.pinterest.systems/web/sidenavigation#Group-display) to learn more. This functionality is not supported in mobile.
   */
  expanded?: boolean;
  /**
   * Label for the group. See [nested directory](#Nested-directory) variant for more information.
   */
  label: string;
  /**
   * Callback fired when the expand button component is clicked and the component is controlled. This functionality is not supported in mobile.
   */
  onExpand?: (arg1: { expanded: boolean }) => void;
  /**
   * The primary action for each item. See the [primary action variant](https://gestalt.pinterest.systems/web/sidenavigation#Primary-action) to learn more.
   */
  primaryAction?: {
    icon?: 'ellipsis' | 'edit' | 'trash-can';
    onClick?: (arg1: {
      event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>;
    }) => void;
    tooltip: {
      accessibilityLabel?: string;
      text: string;
      zIndex?: Indexable;
    };
    dropdownItems?: ReadonlyArray<ReactElement>;
  };
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
  primaryAction,
  onExpand,
}: Props) {
  return (
    <SideNavigationGroup
      counter={counter}
      display={display}
      expanded={expanded}
      label={label}
      onExpand={onExpand}
      primaryAction={primaryAction}
    >
      {children}
    </SideNavigationGroup>
  );
}

SideNavigationNestedGroup.displayName = 'SideNavigation.NestedGroup';
