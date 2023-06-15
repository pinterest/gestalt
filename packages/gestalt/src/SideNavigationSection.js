// @flow strict
import { type Node } from 'react';
import classnames from 'classnames';
import Box from './Box.js';
import styles from './SideNavigation.css';
import getChildrenToArray from './SideNavigation/getChildrenToArray.js';
import Text from './Text.js';

type Props = {|
  /**
   * Any [SideNavigation.TopItem](https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.TopItem) to be rendered
   */
  children: Node,
  /**
   * Label for the section. See the [Sections](https://gestalt.pinterest.systems/web/sidenavigation#Sections) variant for more info.
   */
  label: string,
|};

/**
 * Use [SideNavigation.Section](https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.Section) to categorize navigation menu items into groups and also avoid redundant language in labels.
 */
export default function SideNavigationSection({ children, label }: Props): Node {
  const navigationChildren = getChildrenToArray({
    children,
    filterLevel: 'main',
  });
  return (
    <li className={classnames(styles.liItem, styles.section)}>
      <Box paddingX={4} display="flex" role="presentation" marginBottom={2}>
        <Text size="300" weight="bold" lineClamp={2}>
          {label}
        </Text>
      </Box>
      <ul className={classnames(styles.ulItem)}>{navigationChildren}</ul>
    </li>
  );
}

SideNavigationSection.displayName = 'SideNavigation.Section';
