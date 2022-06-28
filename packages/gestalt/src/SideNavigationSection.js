// @flow strict
import { Fragment, type Node } from 'react';
import Box from './Box.js';
import Text from './Text.js';
import styles from './Dropdown.css';

type Props = {|
  /**
   * Any [Dropdown.Items](https://gestalt.pinterest.systems/dropdown#Dropdown.ItemProps) and/or [Dropdown.Links](https://gestalt.pinterest.systems/dropdown#Dropdown.LinkProps) to be rendered
   */
  children: Node,
  /**
   * Label for the section. See the [Sections](https://gestalt.pinterest.systems/dropdown#Sections) variant for more info.
   */
  label: string,
|};

/**
 * Use [SideNavigation.Section](https://gestalt.pinterest.systems/dropdown#Dropdown.Section) to create hierarchy within a single SideNavigation.
 */
export default function SideNavigationSection({ label, children }: Props): Node {
  return (
    <Fragment>
      <Box display="flex" role="presentation" marginBottom={2}>
        <Text size="300" weight="bold">
          {label}
        </Text>
      </Box>
      {children}
    </Fragment>
  );
}

// displayName is necessary for children identification in Dropdown
SideNavigationSection.displayName = 'SideNavigation.Section';
SideNavigationSection.displayName = 'SideNavigation.MainItem';
SideNavigationSection.displayName = 'SideNavigation.MainExpandableItem';
