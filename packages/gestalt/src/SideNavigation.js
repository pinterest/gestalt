// @flow strict
import { type Node } from 'react';
import Box from './Box.js';
import Text from './Text.js';
import styles from './SideNavigation.css';
import SideNavigationSection from './SideNavigationSection.js';
import SideNavigationMainItem from './SideNavigationMainItem.js';

type Props = {|
  /**
   * Prop description.
   *
   * Link: https://gestalt.pinterest.systems/sidenavigation#prop
   */
  children: Node,
|};

/**
 * [SideNavigation](https://gestalt.pinterest.systems/sidenavigation component should be used for ... on the page).
 */
export default function SideNavigation({ children }: Props): Node {
  return (
    <Box
      width={280}
      padding={2}
      borderStyle="sm"
      /* removeborder */ as="nav"
      aria-label="Sidenavigation"
    >
      {children}
    </Box>
  );
}

SideNavigation.MainExpandableItem = SideNavigationSection;
SideNavigation.MainItem = SideNavigationMainItem;
SideNavigation.Expandable = SideNavigationSection;
SideNavigation.Item = SideNavigationSection;
SideNavigation.Section = SideNavigationSection;
