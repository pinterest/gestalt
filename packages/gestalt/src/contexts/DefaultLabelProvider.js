// @flow strict
import { type Context, createContext, type Node, useContext } from 'react';

/**
 * To add new labels:
 * - Create a type for the component's labels (these types need to be flat, *not* nested)
 * - Add component labels type to DefaultLabelContextType keyed by component name
 * - Add fallback labels to fallbackLabels below
 * - Update these files with the new labels:
 *   - Test file for this Provider
 *      packages/gestalt/src/contexts/DefaultLabelProvider.jsdom.test.js
 *   - Docs example for this Provider
 *      docs/examples/defaultlabelprovider/translations.js
 */

export type DefaultLabelContextType = {|
  ActivationCard: {|
    accessibilityDismissButtonLabel: string,
  |},
  Callout: {|
    accessibilityDismissButtonLabel: string,
    iconAccessibilityLabelError: string,
    iconAccessibilityLabelInfo: string,
    iconAccessibilityLabelRecommendation: string,
    iconAccessibilityLabelWarning: string,
    iconAccessibilityLabelSuccess: string,
  |},
  ComboBox: {|
    noResultText: string,
    accessibilityClearButtonLabel: string,
  |},
  Link: {|
    accessibilityNewTabLabel: string,
  |},
  Modal: {|
    accessibilityDismissButtonLabel: string,
  |},
  Popover: {|
    accessibilityDismissButtonLabel: string,
  |},
  OverlayPanel: {|
    accessibilityDismissButtonLabel: string,
    dismissConfirmationMessage: string,
    dismissConfirmationSubtext: string,
    dismissConfirmationPrimaryActionText: string,
    dismissConfirmationPrimaryActionTextLabel: string,
    dismissConfirmationSecondaryActionText: string,
    dismissConfirmationSecondaryActionTextLabel: string,
  |},
  SheetMobile: {|
    accessibilityDismissButtonLabel: string,
    accessibilityGrabberLabel: string,
    accessibilityLabel: string,
  |},
  SideNavigation: {|
    accessibilityDismissButtonLabel: string,
  |},
  SlimBanner: {|
    accessibilityDismissButtonLabel: string,
    iconAccessibilityLabelError: string,
    iconAccessibilityLabelInfo: string,
    iconAccessibilityLabelRecommendation: string,
    iconAccessibilityLabelWarning: string,
    iconAccessibilityLabelSuccess: string,
  |},
  Spinner: {|
    accessibilityLabel: string,
  |},
  Tag: {|
    accessibilityErrorIconLabel: string,
    accessibilityRemoveIconLabel: string,
    accessibilityWarningIconLabel: string,
  |},
  TagData: {|
    accessibilityRemoveIconLabel: string,
  |},
  TextField: {|
    accessibilityHidePasswordLabel: string,
    accessibilityShowPasswordLabel: string,
  |},
  Upsell: {|
    accessibilityDismissButtonLabel: string,
  |},
  Video: {|
    accessibilityMaximizeLabel: string,
    accessibilityMinimizeLabel: string,
    accessibilityMuteLabel: string,
    accessibilityPauseLabel: string,
    accessibilityPlayLabel: string,
    accessibilityProgressLabel: string,
    accessibilityUnmuteLabel: string,
    accessibilityHideCaptionsLabel: string,
    accessibilityShowCaptionsLabel: string,
  |},
  HelpButton: {|
    tooltipMessage: string,
  |},
  Toast: {|
    accessibilityDismissButtonLabel: string,
    accessibilityIconSuccessLabel: string,
    accessibilityIconErrorLabel: string,
    accessibilityProcessingLabel: string,
  |},
|};

export const fallbackLabels: DefaultLabelContextType = {
  ActivationCard: {
    accessibilityDismissButtonLabel: 'Dismiss',
  },
  Callout: {
    accessibilityDismissButtonLabel: 'Dismiss Banner',
    iconAccessibilityLabelError: 'Error',
    iconAccessibilityLabelInfo: 'Information',
    iconAccessibilityLabelRecommendation: 'Recommendation',
    iconAccessibilityLabelWarning: 'Warning',
    iconAccessibilityLabelSuccess: 'Success',
  },
  ComboBox: {
    noResultText: 'No results',
    accessibilityClearButtonLabel: 'Clear input',
  },
  Link: {
    accessibilityNewTabLabel: 'Opens a new tab',
  },
  Modal: {
    accessibilityDismissButtonLabel: 'Dismiss modal',
  },
  Popover: {
    accessibilityDismissButtonLabel: 'Dismiss popover',
  },
  OverlayPanel: {
    accessibilityDismissButtonLabel: 'Dismiss overlay panel',
    dismissConfirmationMessage: 'Are you sure you want to dismiss?',
    dismissConfirmationSubtext: 'You will lose all of your changes. This cannot be undone',
    dismissConfirmationPrimaryActionText: 'Yes, dismiss',
    dismissConfirmationPrimaryActionTextLabel: 'Yes, dismiss the overlay panel',
    dismissConfirmationSecondaryActionText: 'No, go back',
    dismissConfirmationSecondaryActionTextLabel: 'No, go back to the overlay panel',
  },
  SheetMobile: {
    accessibilityDismissButtonLabel: 'Dismiss bottom sheet',
    accessibilityGrabberLabel: 'Grabber',
    accessibilityLabel: 'Bottom sheet',
  },
  SideNavigation: {
    accessibilityDismissButtonLabel: 'Dismiss side navigation',
  },
  SlimBanner: {
    accessibilityDismissButtonLabel: 'Dismiss banner',
    iconAccessibilityLabelError: 'Error',
    iconAccessibilityLabelInfo: 'Information',
    iconAccessibilityLabelRecommendation: 'Recommendation',
    iconAccessibilityLabelWarning: 'Warning',
    iconAccessibilityLabelSuccess: 'Success',
  },
  Spinner: {
    accessibilityLabel: 'Loading',
  },
  Tag: {
    accessibilityErrorIconLabel: 'Error',
    accessibilityRemoveIconLabel: 'Remove tag',
    accessibilityWarningIconLabel: 'Warning',
  },
  TagData: {
    accessibilityRemoveIconLabel: 'Remove tag',
  },
  TextField: {
    accessibilityHidePasswordLabel: 'Hide password',
    accessibilityShowPasswordLabel: 'Show password',
  },
  HelpButton: {
    tooltipMessage: 'Click to learn more',
  },
  Toast: {
    accessibilityDismissButtonLabel: 'Dismiss toast',
    accessibilityIconSuccessLabel: 'Success message',
    accessibilityIconErrorLabel: 'Error message',
    accessibilityProcessingLabel: 'Processing message',
  },
  Upsell: {
    accessibilityDismissButtonLabel: 'Dismiss banner',
  },
  Video: {
    accessibilityMaximizeLabel: 'Maximize',
    accessibilityMinimizeLabel: 'Minimize',
    accessibilityMuteLabel: 'Mute',
    accessibilityPauseLabel: 'Pause',
    accessibilityPlayLabel: 'Play',
    accessibilityProgressLabel: 'Video progress',
    accessibilityUnmuteLabel: 'Unmute',
    accessibilityHideCaptionsLabel: 'Hide captions',
    accessibilityShowCaptionsLabel: 'Show captions',
  },
};

const DefaultLabelContext: Context<?DefaultLabelContextType> =
  createContext<?DefaultLabelContextType>(null);

type Props = {|
  children: Node,
  /**
   * An object describing the default strings to be used by supported component labels throughout your app. If your app supports i18n, don't forget to translate your strings!
   *
   * Note that all supported labels for all supported components must be provided if using this Provider. Omit this prop to use default (English) strings for supported labels.
   *
   * See [the source code](https://github.com/pinterest/gestalt/blob/master/packages/gestalt/src/contexts/DefaultLabelProvider.js) for the specific shape of this object.
   */
  labels?: null | DefaultLabelContextType,
|};

/**
 * [DefaultLabelProvider](https://gestalt.pinterest.systems/web/utilities/defaultlabelprovider) is an optional [React Context provider](https://reactjs.org/docs/context.html#contextprovider) to provide default strings for Gestalt component labels that support it. This allows for faster development by reducing boilerplate props at the callsite.
 */
export default function DefaultLabelProvider({ children, labels }: Props): Node {
  return <DefaultLabelContext.Provider value={labels}>{children}</DefaultLabelContext.Provider>;
}

type ValidComponent = $Keys<DefaultLabelContextType>;

export function useDefaultLabelContext<C: ValidComponent>(
  componentName: C,
): $ElementType<DefaultLabelContextType, C> {
  const labels = useContext(DefaultLabelContext);

  // If no Context value provided, return fallback labels
  if (!labels) {
    return fallbackLabels[componentName] ?? {};
  }

  return labels[componentName] ?? {};
}
