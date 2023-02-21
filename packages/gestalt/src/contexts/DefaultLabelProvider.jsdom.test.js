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
          ComboBox: {
            accessibilityClearButtonLabel: 'Clear input',
          },
          Link: {
            accessibilityNewTabLabel: 'Opens a new tab',
          },
          Modal: {
            accessibilityDismissButtonLabel: 'Close modal',
          },
          Popover: {
            accessibilityDismissButtonLabel: 'Close popover',
          },
          OverlayPanel: {
            accessibilityDismissButtonLabel: 'Close overlay panel',
            dismissConfirmationMessage: 'Are you sure you want to dismiss?',
            dismissConfirmationSubtext: 'You will lose all of your changes. This cannot be undone.',
            dismissConfirmationPrimaryActionText: 'Yes, dismiss.',
            dismissConfirmationPrimaryActionTextLabel: 'Yes, dismiss the overlay panel.',
            dismissConfirmationSecondaryActionText: 'No, go back.',
            dismissConfirmationSecondaryActionTextLabel: 'No, go back to the overlay panel.',
          },
          Tag: {
            accessibilityErrorIconLabel: 'Error',
            accessibilityRemoveIconLabel: 'Remove tag',
            accessibilityWarningIconLabel: 'Warning',
          },
          TextField: {
            accessibilityHidePasswordLabel: 'Hide password',
            accessibilityShowPasswordLabel: 'Show password',
          },
          HelpButton: {
            tooltipMessage: 'Click to learn more',
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
