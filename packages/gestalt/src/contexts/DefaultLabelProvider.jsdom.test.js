// @flow strict
import { render, screen } from '@testing-library/react';
import DefaultLabelProvider, { useDefaultLabelContext } from './DefaultLabelProvider.js';

// DefaultLabelProvider is basically a passthrough to the React Context.Provider, so no tests required

describe('useDefaultLabelContext', () => {
  it('returns provided string values for a supported component', () => {
    function TestComponent() {
      const { accessibilityHidePasswordLabel, accessibilityShowPasswordLabel } =
        useDefaultLabelContext('TextField');

      return <div>{[accessibilityHidePasswordLabel, accessibilityShowPasswordLabel]}</div>;
    }

    render(
      <DefaultLabelProvider
        labels={{
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
            dismissConfirmationSubtext: 'You will lose all of your changes. This cannot be undone.',
            dismissConfirmationPrimaryActionText: 'Yes, dismiss',
            dismissConfirmationPrimaryActionTextLabel: 'Yes, dismiss the overlay panel.',
            dismissConfirmationSecondaryActionText: 'No, go back',
            dismissConfirmationSecondaryActionTextLabel: 'No, go back to the overlay panel.',
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
            accessibilityDismissButtonLabel: 'Dismiss Banner',
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
        }}
      >
        <TestComponent />
      </DefaultLabelProvider>,
    );

    // This is a bit roundabout — we don't really care that these strings are in the document, but that they were returned from the Hook correctly
    expect(screen.getByText(/Hide password/)).toBeInTheDocument();
    expect(screen.getByText(/Show password/)).toBeInTheDocument();
  });
});
