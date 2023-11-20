// @flow strict
import { type Node as ReactNode, useId } from 'react';
import classnames from 'classnames';
import borderStyles from './Borders.css';
import Box from './Box';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider';
import { useDeviceType } from './contexts/DeviceTypeProvider';
import { SideNavigationProvider } from './contexts/SideNavigationProvider';
import Divider from './Divider';
import Flex from './Flex';
import ScrollBoundaryContainer from './ScrollBoundaryContainer';
import styles from './SideNavigation.css';
import getChildrenToArray from './SideNavigation/getChildrenToArray';
import SideNavigationMobile from './SideNavigation/Mobile';
import SideNavigationGroup from './SideNavigationGroup';
import SideNavigationNestedGroup from './SideNavigationNestedGroup';
import SideNavigationNestedItem from './SideNavigationNestedItem';
import SideNavigationSection from './SideNavigationSection';
import SideNavigationTopItem from './SideNavigationTopItem';

export type Props = {
  /**
   * String that clients such as VoiceOver will read to describe the element.
   */
  accessibilityLabel: string,
  /**
   * The content shown in SideNavigation. See [subcomponents](https://gestalt.pinterest.systems/web/sidenavigation#Subcomponents).
   */
  children: ReactNode,
  /**
   * Content to display at the bottom of SideNavigation. Open slot available to display other functionality required in the page. See the [Footer variant](https://gestalt.pinterest.systems/web/sidenavigation#Header) to learn more.
   */
  footer?: ReactNode,
  /**
   * Content to display at the top of SideNavigation. Open slot used for controlling the display of navigation items. See the [Header variant](https://gestalt.pinterest.systems/web/sidenavigation#Header) to learn more.
   */
  header?: ReactNode,
  /**
   * Callback fired when SideNavigation requests to be closed in mobile devices. Must be used to control SideNavigation´s on/off display state. The accessibilityLabel should follow the Accessibility guidelines.
   */
  dismissButton?: { accessibilityLabel?: string, onDismiss: () => void },
  /**
  /**
   * Displays a border in SideNavigation. See the [Border](https://gestalt.pinterest.systems/web/sidenavigation#Border) variant for more info.
   */
  showBorder?: boolean,
  /**
   * Title for mobile navigation.
   */
  mobileTitle?: string,
};

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
  mobileTitle,
}: Props): ReactNode {
  const navigationChildren = getChildrenToArray({
    children,
    filterLevel: 'main',
  });
  const { accessibilityDismissButtonLabel } = useDefaultLabelContext('SideNavigation');
  const id = useId();
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';

  if (isMobile) {
    return (
      <SideNavigationProvider
        dismissButton={{
          accessibilityLabel: dismissButton?.accessibilityLabel ?? accessibilityDismissButtonLabel,
          onDismiss: dismissButton?.onDismiss ?? (() => {}),
          id,
        }}
      >
        <ScrollBoundaryContainer>
          <SideNavigationMobile
            accessibilityLabel={accessibilityLabel}
            footer={footer}
            header={header}
            dismissButton={
              dismissButton && {
                onDismiss: dismissButton.onDismiss,
                accessibilityLabel:
                  dismissButton.accessibilityLabel ?? accessibilityDismissButtonLabel,
              }
            }
            showBorder={showBorder}
            mobileTitle={mobileTitle}
            id={id}
          >
            {navigationChildren}
          </SideNavigationMobile>
        </ScrollBoundaryContainer>
      </SideNavigationProvider>
    );
  }

  return (
    <SideNavigationProvider>
      <ScrollBoundaryContainer>
        <Box minWidth={280} width={280} height="100%" as="nav" aria-label={accessibilityLabel}>
          <div
            className={
              showBorder ? classnames(borderStyles.borderRight, styles.fullHeight) : undefined
            }
          >
            <Box
              padding={2}
              color="default"
              dangerouslySetInlineStyle={{ __style: { paddingBottom: 24 } }}
              height="100%"
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
      </ScrollBoundaryContainer>
    </SideNavigationProvider>
  );
}

SideNavigation.Section = SideNavigationSection;

SideNavigation.TopItem = SideNavigationTopItem;
SideNavigation.NestedItem = SideNavigationNestedItem;

SideNavigation.Group = SideNavigationGroup;
SideNavigation.NestedGroup = SideNavigationNestedGroup;
