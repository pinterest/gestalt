// @flow strict
import { type Node } from 'react';
import classnames from 'classnames';
import Box from './Box.js';
import Flex from './Flex.js';
import Divider from './Divider.js';
import styles from './SideNavigation.css';
import borderStyles from './Borders.css';
import SideNavigationMobile from './SideNavigationMobile.js';
import SideNavigationSection from './SideNavigationSection.js';
import SideNavigationTopItem from './SideNavigationTopItem.js';
import SideNavigationGroup from './SideNavigationGroup.js';
import SideNavigationNestedItem from './SideNavigationNestedItem.js';
import SideNavigationNestedGroup from './SideNavigationNestedGroup.js';
import getChildrenToArray from './getChildrenToArray.js';
import { SideNavigationProvider } from './contexts/SideNavigationProvider.js';
import { type Indexable } from './zIndex.js';
import { useDeviceType } from './contexts/DeviceTypeProvider.js';

type TooltipProps = {|
  accessibilityLabel?: string,
  inline?: boolean,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  text: string,
  zIndex?: Indexable,
|};

export type Props = {|
  /**
   * String that clients such as VoiceOver will read to describe the element.
   */
  accessibilityLabel: string,
  /**
   * The content shown in SideNavigation. See [subcomponents](https://gestalt.pinterest.systems/web/sidenavigation#Subcomponents).
   */
  children: Node,
  /**
   * Content to display at the bottom of SideNavigation. Open slot available to display other functionality required in the page. See the [Footer variant](https://gestalt.pinterest.systems/web/sidenavigation#Header) to learn more.
   */
  footer?: Node,
  /**
   * Content to display at the top of SideNavigation. Open slot used for controlling the display of navigation items. See the [Header variant](https://gestalt.pinterest.systems/web/sidenavigation#Header) to learn more.
   */
  header?: Node,
  /**
   * Callback fired when SideNavigation requests to be closed in mobile devices. Must be used to control SideNavigation´s on/off display state. The accessibilityLabel should follow the Accessibility guidelines.
   */
  dismissButton?: {| accessibilityLabel?: string, onDismiss: () => void, tooltip: TooltipProps |},
  /**
  /**
   * Displays a border in SideNavigation. See the [Border](https://gestalt.pinterest.systems/web/sidenavigation#Border) variant for more info.
   */
  showBorder?: boolean,
  /**
   * Title for mobile navigation.
   */
  title?: string,
|};

/**
 * [SideNavigation](https://gestalt.pinterest.systems/web/sidenavigation) is start-aligned and arranged vertically. It is used to navigate between page urls or sections when you have too many menu items to fit in horizontal [Tabs](https://gestalt.pinterest.systems/web/tabs).
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
  dismissButton,
  footer,
  header,
  showBorder,
  title,
}: Props): Node {
  const navigationChildren = getChildrenToArray({ children, filterLevel: 'main' });

  const deviceType = useDeviceType();
  const isMobile = deviceType === 'phone';

  if (isMobile) {
    return (
      <SideNavigationProvider dismissButton={dismissButton}>
        <SideNavigationMobile
          accessibilityLabel={accessibilityLabel}
          footer={footer}
          header={header}
          dismissButton={dismissButton}
          title={title}
        >
          {navigationChildren}
        </SideNavigationMobile>
      </SideNavigationProvider>
    );
  }

  return (
    <SideNavigationProvider>
      <Box minWidth={280} width={280} height="100%">
        <div className={showBorder ? classnames(borderStyles.borderRight) : undefined}>
          <Box
            as="nav"
            aria-label={accessibilityLabel}
            padding={2}
            color="default"
            dangerouslySetInlineStyle={{ __style: { paddingBottom: 24 } }}
          >
            <Flex direction="column" gap={{ column: 4, row: 0 }}>
              {header ? (
                <Flex direction="column" gap={{ column: 4, row: 0 }}>
                  <Box paddingX={4}>{header}</Box>
                  <Divider />
                </Flex>
              ) : null}
              <ul className={classnames(styles.ulItem)}>{navigationChildren}</ul>
              {footer ? (
                <Flex direction="column" gap={{ column: 4, row: 0 }}>
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
