// @flow strict
import { type Node as ReactNode, useId } from 'react';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider';
import { useDeviceType } from './contexts/DeviceTypeProvider';
import { SideNavigationProvider } from './contexts/SideNavigationProvider';
import ScrollBoundaryContainer from './ScrollBoundaryContainer';
import SideNavigationMobile from './SideNavigation/Mobile';
import SideNavigationContent from './SideNavigation/NavigationContent';
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
   * Adds a collapser button
   */
  collapsible?: boolean,
  /**
   * Displays a border in SideNavigation. See the [Border](https://gestalt.pinterest.systems/web/sidenavigation#Border) variant for more info.
   */
  showBorder?: boolean,
  /**
   * Title for mobile navigation.
   */
  mobileTitle?: string,
  collapsed?: boolean,
  onCollapse?: (boolean) => void,
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
  collapsible,
  showBorder,
  mobileTitle,
  collapsed,
  onCollapse,
}: Props): ReactNode {
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
            {children}
          </SideNavigationMobile>
        </ScrollBoundaryContainer>
      </SideNavigationProvider>
    );
  }

  return (
    <SideNavigationProvider collapsed={collapsed} onCollapse={onCollapse}>
      <ScrollBoundaryContainer>
        <SideNavigationContent
          accessibilityLabel={accessibilityLabel}
          footer={footer}
          header={header}
          collapsible={collapsible}
          showBorder={showBorder}
        >
          {children}
        </SideNavigationContent>
      </ScrollBoundaryContainer>
    </SideNavigationProvider>
  );
}

SideNavigation.Section = SideNavigationSection;

SideNavigation.TopItem = SideNavigationTopItem;
SideNavigation.NestedItem = SideNavigationNestedItem;

SideNavigation.Group = SideNavigationGroup;
SideNavigation.NestedGroup = SideNavigationNestedGroup;

SideNavigation.displayName = 'SideNavigation';
