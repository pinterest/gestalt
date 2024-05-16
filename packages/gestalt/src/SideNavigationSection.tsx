import { ReactNode } from 'react';
import classnames from 'classnames';
import Box from './Box';
import { useSideNavigation } from './contexts/SideNavigationProvider';
import Divider from './Divider';
import styles from './SideNavigation.css';
import ItemsEllipsis from './SideNavigation/ItemsEllipsis';
import {
  countItemsWithIcon,
  getChildrenActiveProp,
  validateChildren,
} from './SideNavigation/navigationChildrenUtils';
import Text from './Text';
import { flattenChildrenWithKeys } from './utils/flattenChildren';

type Props = {
  /**
   * Any [SideNavigation.TopItem](https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.TopItem) to be rendered
   */
  children: ReactNode;
  /**
   * Label for the section. See the [Sections](https://gestalt.pinterest.systems/web/sidenavigation#Sections) variant for more info.
   */
  label: string;
};

/**
 * Use [SideNavigation.Section](https://gestalt.pinterest.systems/web/sidenavigation#SideNavigation.Section) to categorize navigation menu items into groups and also avoid redundant language in labels.
 */
export default function SideNavigationSection({ children, label }: Props) {
  const { collapsed: sideNavigationCollapsed, overlayPreview } = useSideNavigation();
  const navigationChildren = flattenChildrenWithKeys(children);

  validateChildren({ children: navigationChildren, filterLevel: 'main' });

  const collapsed = sideNavigationCollapsed && !overlayPreview;

  const shouldCollapseAsEllipsis =
    collapsed && countItemsWithIcon(navigationChildren) !== navigationChildren.length;

  const ellipsisActiveProp = shouldCollapseAsEllipsis
    ? getChildrenActiveProp(navigationChildren)
    : undefined;

  const itemWithNotification = shouldCollapseAsEllipsis
// @ts-expect-error - TS2339 - Property 'props' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal'.
    ? navigationChildren.find((child) => !!child.props.notificationAccessibilityLabel)
    : null;

  return (
    <li className={classnames(styles.liItem, styles.section)}>
      {collapsed ? (
        <div className={styles.sectionStartDivider}>
          <Divider />
        </div>
      ) : (
        <Box marginBottom={2} paddingX={4} role="presentation">
          <Text lineClamp={2} size="300" weight="bold">
            {label}
          </Text>
        </Box>
      )}

      {shouldCollapseAsEllipsis ? (
        <ItemsEllipsis
          accessibilityLabel={`Collapsed ${label}. Expand for more options`}
          active={ellipsisActiveProp}
          notificationAccessibilityLabel={
// @ts-expect-error - TS2339 - Property 'props' does not exist on type 'string | number | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode>'.
            itemWithNotification?.props.notificationAccessibilityLabel
          }
        />
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

SideNavigationSection.displayName = 'SideNavigation.Section';
