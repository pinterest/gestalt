// @flow strict
import { cloneElement, Children, type Node } from 'react';
import classnames from 'classnames';
import Box from './Box.js';
import Flex from './Flex.js';
import Divider from './Divider.js';
import styles from './SideNavigation.css';
import borderStyles from './Borders.css';
import SideNavigationSection from './SideNavigationSection.js';
import SideNavigationItem from './SideNavigationItem.js';

type Props = {|
  /**
   * String that clients such as VoiceOver will read to describe the element.
   */
  accessibilityLabel: string,
  /**
   * The content shown in SideNavigation. See [subcomponents](https://gestalt.pinterest.systems/sidenavigation#Subcomponents).
   */
  children: Node,
  /**
   * Content to display at the bottom of SideNavigation. Open slot available to display other functionality required in the page. See the [Footer variant](https://gestalt.pinterest.systems/sidenavigation#Header) to learn more.
   */
  footer?: Node,
  /**
   * Content to display at the top of SideNavigation. Open slot used for controlling the display of navigation items. See the [Header variant](https://gestalt.pinterest.systems/sidenavigation#Header) to learn more.
   */
  header?: Node,
  /**
   * Displays a border in SideNavigation. See the [Border](https://gestalt.pinterest.systems/sidenavigation#Border) variant for more info.
   */
  showBorder?: boolean,
|};

/**
 * Use [SideNavigation](https://gestalt.pinterest.systems/sidenavigation) for side navigation on a page or section.
 * **NOTE**This component is on alpha phase, still under developoment. The component will support three levels and keyboard navigation. The component will change behavior and the API might also change in future component version releases.**NOTE**
 *
 * ![SideNavigation light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/SideNavigation.spec.mjs-snapshots/SideNavigation-chromium-darwin.png)
 * ![SideNavigation dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/SideNavigation-dark.spec.mjs-snapshots/SideNavigation-dark-chromium-darwin.png)
 *
 */
export default function SideNavigation({
  accessibilityLabel,
  children,
  footer,
  header,
  showBorder,
}: Props): Node {
  let hasFirstNavigationItem = false;

  const navigationChildren = [];

  // TO BE CLEANED UP

  Children.toArray(children).forEach((child) => {
    if (child.type.displayName === 'SideNavigation.Section') {
      if (!hasFirstNavigationItem) {
        hasFirstNavigationItem = true;
        navigationChildren.push(child);
      } else {
        navigationChildren.push(cloneElement(child, { _hasMarginTop: true }));
      }
    } else if (child.type.displayName === 'SideNavigation.Item') {
      if (!hasFirstNavigationItem) {
        hasFirstNavigationItem = true;
      }
      navigationChildren.push(child);
    } else if (!child?.type?.displayName?.startsWith('SideNavigation')) {
      Children.toArray(child.props.children).forEach((subchild) => {
        if (subchild.type.displayName === 'SideNavigation.Section') {
          if (!hasFirstNavigationItem) {
            hasFirstNavigationItem = true;
            navigationChildren.push(subchild);
          } else {
            navigationChildren.push(cloneElement(subchild, { _hasMarginTop: true }));
          }
        } else {
          navigationChildren.push(subchild);
        }
      });
    }
  });

  return (
    <div className={showBorder ? classnames(borderStyles.borderRight) : undefined}>
      <Box
        minWidth={280}
        width={280}
        padding={2}
        color="default"
        dangerouslySetInlineStyle={{ __style: { paddingBottom: 24 } }}
      >
        <Flex direction="column" gap={4}>
          {header ? (
            <Flex direction="column" gap={4}>
              <Box paddingX={4}>{header}</Box>
              <Divider />
            </Flex>
          ) : null}

          <Box as="nav" aria-label={accessibilityLabel}>
            <ul className={classnames(styles.ulItem)}>{navigationChildren}</ul>
          </Box>

          {footer ? (
            <Flex direction="column" gap={4}>
              <Divider />
              <Box paddingX={4}>{footer}</Box>
            </Flex>
          ) : null}
        </Flex>
      </Box>
    </div>
  );
}

SideNavigation.Item = SideNavigationItem;
SideNavigation.Section = SideNavigationSection;
