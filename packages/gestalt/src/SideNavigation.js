// @flow strict
import { type Node } from 'react';
import classnames from 'classnames';
import Box from './Box.js';
import Flex from './Flex.js';
import Divider from './Divider.js';
import styles from './SideNavigation.css';
import borderStyles from './Borders.css';
import SideNavigationSection from './SideNavigationSection.js';
import SideNavigationTopItem from './SideNavigationTopItem.js';
import SideNavigationGroup from './SideNavigationGroup.js';
import SideNavigationNestedItem from './SideNavigationNestedItem.js';
import SideNavigationNestedGroup from './SideNavigationNestedGroup.js';
import useGetChildrenToArray from './useGetChildrenToArray.js';
import { SideNavigationProvider } from './contexts/SideNavigationProvider.js';
import { useDeviceType } from './contexts/DeviceTypeProvider.js';

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
 * [SideNavigation](https://gestalt.pinterest.systems/sidenavigation) is start-aligned and arranged vertically. It is used to navigate between page urls or sections when you have too many menu items to fit in horizontal [Tabs](https://gestalt.pinterest.systems/tabs).
 *
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
  const navigationChildren = useGetChildrenToArray({ children, filterLevel: 'main' });

  const deviceType = useDeviceType();

  console.log("MACO", deviceType);

  if (deviceType === 'phone') {
    return (
      <SideNavigationProvider>
        <div className={showBorder ? classnames(borderStyles.borderRight) : undefined}>
          <Box
            as="nav"
            aria-label={accessibilityLabel}
            width="100%"
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

              <ul className={classnames(styles.ulItem)}>{navigationChildren}</ul>

              {footer ? (
                <Flex direction="column" gap={4}>
                  <Divider />
                  <Box paddingX={4}>{footer}</Box>
                </Flex>
              ) : null}
            </Flex>
          </Box>
        </div>
      </SideNavigationProvider>
    );
  }

  return (
    <SideNavigationProvider>
      <Box minWidth={280} width={280}>
        <div className={showBorder ? classnames(borderStyles.borderRight) : undefined}>
          <Box
            as="nav"
            aria-label={accessibilityLabel}
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
              <ul className={classnames(styles.ulItem)}>{navigationChildren}</ul>
              {footer ? (
                <Flex direction="column" gap={4}>
                  <Divider />
                  <Box paddingX={4}>{footer}</Box>
                </Flex>
              ) : null}
            </Flex>
          </Box>
        </div>
      </Box>
    </SideNavigationProvider>
  );
}

SideNavigation.Section = SideNavigationSection;

SideNavigation.TopItem = SideNavigationTopItem;
SideNavigation.NestedItem = SideNavigationNestedItem;

SideNavigation.Group = SideNavigationGroup;
SideNavigation.NestedGroup = SideNavigationNestedGroup;
