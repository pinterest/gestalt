import { Context, createContext, ReactNode, useContext } from 'react';

/**
 * To add new labels:
 * - Create a type for the component's labels (these types need to be flat, *not* nested)
 * - Add component labels type to DefaultLabelContextType keyed by component name
 * - Add fallback labels to fallbackLabels below
 * - Update these files with the new labels:
 *   - Test file for this Provider
 *      packages/gestalt/src/contexts/DefaultLabelProvider.jsdom.test.tsx
 *   - Docs example for this Provider
 *      docs/examples/defaultlabelprovider/translations.tsx
 */

export type DefaultLabelContextType = {
  Accordion: {
    accessibilityCollapseLabel: string;
    accessibilityExpandLabel: string;
  };
  ActivationCard: {
    accessibilityDismissButtonLabel: string;
  };
  BannerOverlay: {
    accessibilityDismissButtonLabel: string;
  };
  BannerCallout: {
    accessibilityDismissButtonLabel: string;
    iconAccessibilityLabelError: string;
    iconAccessibilityLabelInfo: string;
    iconAccessibilityLabelRecommendation: string;
    iconAccessibilityLabelWarning: string;
    iconAccessibilityLabelSuccess: string;
  };
  ButtonSocial: {
    textLoginEmail: string;
    textLoginFacebook: string;
    textLoginGoogle: string;
    textLoginApple: string;
    textLoginLine: string;
    textContinueEmail: string;
    textContinueFacebook: string;
    textContinueGoogle: string;
    textContinueApple: string;
    textContinueLine: string;
    textSignupEmail: string;
    textSignupFacebook: string;
    textSignupGoogle: string;
    textSignupApple: string;
    textSignupLine: string;
  };
  ChartGraph: {
    accessibilityLabelPrefixText: string;
    defaultViewText: string;
    accessibleViewText: string;
    tabularData: string;
    accessibilityLabelDismissModal: string;
    tableSeriesText: string;
    tableXAxisText: string;
    tableYAxisText: string;
    downloadCsvButtonText: string;
    cancelButtonText: string;
  };
  ComboBox: {
    noResultText: string;
    accessibilityClearButtonLabel: string;
  };
  DatePicker: {
    accessibilityDismissButtonLabel: string;
    dismissButton: string;
    openCalendar: string;
    previousMonth: string;
    nextMonth: string;
  };
  DateRange: {
    cancelText: string;
    applyText: string;
  };
  Link: {
    accessibilityNewTabLabel: string;
    accessibilityDownloadLabel: string;
  };
  Modal: {
    accessibilityDismissButtonLabel: string;
  };
  Popover: {
    accessibilityDismissButtonLabel: string;
  };
  OverlayPanel: {
    accessibilityDismissButtonLabel: string;
    dismissConfirmationMessage: string;
    dismissConfirmationSubtext: string;
    dismissConfirmationPrimaryActionText: string;
    dismissConfirmationPrimaryActionTextLabel: string;
    dismissConfirmationSecondaryActionText: string;
    dismissConfirmationSecondaryActionTextLabel: string;
  };
  SheetMobile: {
    accessibilityDismissButtonLabel: string;
    accessibilityGrabberLabel: string;
    accessibilityLabel: string;
  };
  SideNavigation: {
    accessibilityDismissButtonLabel: string;
    accessibilityCollapseButtonLabel: string;
    accessibilityExpandButtonLabel: string;
    accessibilityEllipsisLabel: string;
  };
  BannerSlim: {
    accessibilityDismissButtonLabel: string;
    iconAccessibilityLabelError: string;
    iconAccessibilityLabelInfo: string;
    iconAccessibilityLabelRecommendation: string;
    iconAccessibilityLabelWarning: string;
    iconAccessibilityLabelSuccess: string;
  };
  SearchField: {
    accessibilityClearButtonLabel: string;
  };
  Spinner: {
    accessibilityLabel: string;
  };
  Tabs: {
    accessibilityNotificationLabel: string;
  };
  TableOfContents: {
    accessibilityLabel: string;
  };
  Tag: {
    accessibilityErrorIconLabel: string;
    accessibilityRemoveIconLabel: string;
    accessibilityWarningIconLabel: string;
  };
  TagData: {
    accessibilityRemoveIconLabel: string;
  };
  TextField: {
    accessibilityHidePasswordLabel: string;
    accessibilityShowPasswordLabel: string;
  };
  BannerUpsell: {
    accessibilityDismissButtonLabel: string;
  };
  Video: {
    accessibilityMaximizeLabel: string;
    accessibilityMinimizeLabel: string;
    accessibilityMuteLabel: string;
    accessibilityPauseLabel: string;
    accessibilityPlayLabel: string;
    accessibilityProgressLabel: string;
    accessibilityUnmuteLabel: string;
    accessibilityHideCaptionsLabel: string;
    accessibilityShowCaptionsLabel: string;
  };
  HelpButton: {
    tooltipMessage: string;
  };
  Toast: {
    accessibilityDismissButtonLabel: string;
    accessibilityIconSuccessLabel: string;
    accessibilityIconErrorLabel: string;
    accessibilityProcessingLabel: string;
  };
};

export const fallbackLabels: DefaultLabelContextType = {
  Accordion: {
    accessibilityCollapseLabel: 'Collapse section',
    accessibilityExpandLabel: 'Expand section',
  },
  BannerOverlay: {
    accessibilityDismissButtonLabel: 'Dismiss Banner',
  },
  ActivationCard: {
    accessibilityDismissButtonLabel: 'Dismiss',
  },
  BannerCallout: {
    accessibilityDismissButtonLabel: 'Dismiss Banner',
    iconAccessibilityLabelError: 'Error',
    iconAccessibilityLabelInfo: 'Information',
    iconAccessibilityLabelRecommendation: 'Recommendation',
    iconAccessibilityLabelWarning: 'Warning',
    iconAccessibilityLabelSuccess: 'Success',
  },
  ButtonSocial: {
    textLoginEmail: 'Login with Email',
    textLoginFacebook: 'Login with Facebook',
    textLoginGoogle: 'Login with Google',
    textLoginApple: 'Login with Apple',
    textLoginLine: 'Login with Line',
    textContinueEmail: 'Continue with Email',
    textContinueFacebook: 'Continue with Facebook',
    textContinueGoogle: 'Continue with Google',
    textContinueApple: 'Continue with Apple',
    textContinueLine: 'Continue with Line',
    textSignupEmail: 'Sign up with Email',
    textSignupFacebook: 'Sign up with Facebook',
    textSignupGoogle: 'Sign up with Google',
    textSignupApple: 'Sign up with Apple',
    textSignupLine: 'Sign up with Line',
  },
  ChartGraph: {
    accessibilityLabelPrefixText: 'ChartGraph',
    defaultViewText: 'Default view mode',
    accessibleViewText: 'Visual pattern view',
    tabularData: 'Tabular representation',
    accessibilityLabelDismissModal: 'Dismiss tabular representation modal',
    tableSeriesText: 'Series',
    tableXAxisText: 'x-axis values',
    tableYAxisText: 'y-axis values',
    downloadCsvButtonText: 'Download as .csv',
    cancelButtonText: 'Cancel',
  },
  ComboBox: {
    noResultText: 'No results',
    accessibilityClearButtonLabel: 'Clear input',
  },
  DatePicker: {
    accessibilityDismissButtonLabel: 'Dismiss date picker',
    dismissButton: 'Close',
    openCalendar: 'Open calendar',
    previousMonth: 'Navigate to previou month',
    nextMonth: 'Navigate to next month',
  },
  DateRange: {
    cancelText: 'Cancel',
    applyText: 'Apply',
  },
  HelpButton: {
    tooltipMessage: 'Click to learn more',
  },
  Link: {
    accessibilityNewTabLabel: 'Opens a new tab',
    accessibilityDownloadLabel: 'Downloads a file',
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
    accessibilityCollapseButtonLabel: 'Navigation expanded. Click button to collapse.',
    accessibilityExpandButtonLabel: 'Navigation collapsed. Click button to expand.',
    accessibilityEllipsisLabel: 'Collapsed navigation items. Expand for more options',
  },
  BannerSlim: {
    accessibilityDismissButtonLabel: 'Dismiss banner',
    iconAccessibilityLabelError: 'Error',
    iconAccessibilityLabelInfo: 'Information',
    iconAccessibilityLabelRecommendation: 'Recommendation',
    iconAccessibilityLabelWarning: 'Warning',
    iconAccessibilityLabelSuccess: 'Success',
  },
  BannerUpsell: {
    accessibilityDismissButtonLabel: 'Dismiss banner',
  },
  SearchField: {
    accessibilityClearButtonLabel: 'Clear input',
  },
  Spinner: {
    accessibilityLabel: 'Loading',
  },
  TableOfContents: {
    accessibilityLabel: 'Table of contents',
  },
  Tabs: {
    accessibilityNotificationLabel: 'This tab is displaying a notification indicator',
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

  Toast: {
    accessibilityDismissButtonLabel: 'Dismiss message',
    accessibilityIconSuccessLabel: 'Success message',
    accessibilityIconErrorLabel: 'Error message',
    accessibilityProcessingLabel: 'Processing message',
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

const DefaultLabelContext: Context<DefaultLabelContextType | null | undefined> = createContext<
  DefaultLabelContextType | null | undefined
>(null);

type Props = {
  children: ReactNode;
  /**
   * An object describing the default strings to be used by supported component labels throughout your app. If your app supports i18n, don't forget to translate your strings!
   *
   * Note that all supported labels for all supported components must be provided if using this Provider. Omit this prop to use default (English) strings for supported labels.
   *
   * See [the source code](https://github.com/pinterest/gestalt/blob/master/packages/gestalt/src/contexts/DefaultLabelProvider.tsx) for the specific shape of this object.
   */
  labels?: null | DefaultLabelContextType;
};

/**
 * [DefaultLabelProvider](https://gestalt.pinterest.systems/web/utilities/defaultlabelprovider) is an optional [React Context provider](https://reactjs.org/docs/context.html#contextprovider) to provide default strings for Gestalt component labels that support it. This allows for faster development by reducing boilerplate props at the callsite.
 */
export default function DefaultLabelProvider({ children, labels }: Props) {
  return <DefaultLabelContext.Provider value={labels}>{children}</DefaultLabelContext.Provider>;
}

type ValidComponent = keyof DefaultLabelContextType;

export function useDefaultLabelContext<C extends ValidComponent>(
  componentName: C,
): DefaultLabelContextType[C] {
  const labels = useContext(DefaultLabelContext);

  // If no Context value provided, return fallback labels
  if (!labels) {
    return fallbackLabels[componentName] ?? {};
  }

  return labels[componentName] ?? {};
}
