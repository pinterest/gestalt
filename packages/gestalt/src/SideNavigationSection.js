// @flow strict
import { type Node } from 'react';
import classnames from 'classnames';
import styles from './SideNavigation.css';
import boxStyles from './boxWhitespace.css';
import Box from './Box.js';
import Text from './Text.js';

type Props = {|
  /**
   * Any [SideNavigation.TopItem](https://gestalt.pinterest.systems/sidenavigation#SideNavigation.TopItem) to be rendered
   */
  children: Node,
  /**
   * Label for the section. See the [Sections](https://gestalt.pinterest.systems/sidenavigation#Sections) variant for more info.
   */
  label: string,
  /**
   * Private prop.
   */
  _hasMarginTop?: string,
|};

/**
 * Use [SideNavigation.Section](https://gestalt.pinterest.systems/sidenavigation#SideNavigation.Section) to categorize navigation menu items into groups and also avoid redundant language in labels.
 */
export default function SideNavigationSection({ _hasMarginTop, children, label }: Props): Node {
  return (
    <li className={classnames(styles.liItem, _hasMarginTop ? boxStyles.marginTop6 : {})}>
      <Box paddingX={4} display="flex" role="presentation" marginBottom={2}>
        <Text size="300" weight="bold" lineClamp={2}>
          {label}
        </Text>
      </Box>
      <ul className={classnames(styles.ulItem)}>{children}</ul>
    </li>
  );
}

SideNavigationSection.displayName = 'SideNavigation.Section';
