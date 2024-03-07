// @flow strict
import { type Node as ReactNode } from 'react';
import classnames from 'classnames';
import Box from './Box';
import { useSideNavigation } from './contexts/SideNavigationProvider';
import Divider from './Divider';
import styles from './SideNavigation.css';
import {
  ChildrenDataContextProvider,
  useChildrenDataContext,
} from './SideNavigation/ChildrenDataContext';
import getChildrenToArray from './SideNavigation/getChildrenToArray';
import ItemsEllipsis from './SideNavigation/ItemsEllipsis';
import Text from './Text';

type Props = {
  /**
   * Any [SideNavigation.TopItem](https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.TopItem) to be rendered
   */
  children: ReactNode,
  /**
   * Label for the section. See the [Sections](https://gestalt.pinterest.systems/web/sidenavigation#Sections) variant for more info.
   */
  label: string,
};

function SectionContent({ children, label }: Props): ReactNode {
  const navigationChildren = getChildrenToArray({
    children,
    filterLevel: 'main',
  });
  const { collapsed } = useSideNavigation();
  const { shouldCollapseAsEllipsis } = useChildrenDataContext();
  // const shouldCollapseAsEllipsis =
  //   collapsed && navigationChildren.some((child) => !child.props.icon);
  // const hasActiveItem = navigationChildren.some((child) => child.props.active);
  // collapsed && console.log(shouldCollapseAsEllipsis);
  return (
    <li className={classnames(styles.liItem, styles.section)}>
      {collapsed ? (
        <div className={styles.sectionStartDivider}>
          <Divider />
        </div>
      ) : (
        <Box paddingX={4} role="presentation" marginBottom={2}>
          <Text size="300" weight="bold" lineClamp={2}>
            {label}
          </Text>
        </Box>
      )}

      {collapsed && shouldCollapseAsEllipsis ? (
        <ItemsEllipsis />
      ) : (
        <ul className={classnames(styles.ulItem)}>{navigationChildren}</ul>
      )}

      {collapsed && (
        <div className={styles.sectionEndDivider}>
          <Divider />
        </div>
      )}
    </li>
  );
}

/**
 * Use [SideNavigation.Section](https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.Section) to categorize navigation menu items into groups and also avoid redundant language in labels.
 */
export default function SideNavigationSection({ children, label }: Props): ReactNode {
  return (
    <ChildrenDataContextProvider>
      <SectionContent label={label}>{children}</SectionContent>
    </ChildrenDataContextProvider>
  );
}

SideNavigationSection.displayName = 'SideNavigation.Section';
