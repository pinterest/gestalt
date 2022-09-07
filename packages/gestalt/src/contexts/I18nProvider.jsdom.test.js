// @flow strict
import { render, screen } from '@testing-library/react';
import I18nProvider, { useI18nContext } from './I18nProvider.js';

// I18nProvider is a rename of the React Context.Provider, so no tests required

describe('useI18nContext', () => {
  it('returns provided string values for a supported component', () => {
    function TestComponent() {
      const { accessibilityHidePasswordLabel, accessibilityShowPasswordLabel } =
        useI18nContext('TextField');

      return <div>{[accessibilityHidePasswordLabel, accessibilityShowPasswordLabel]}</div>;
    }

    render(
      <I18nProvider
        value={{
          TextField: {
            accessibilityHidePasswordLabel: 'Hide password',
            accessibilityShowPasswordLabel: 'Show password',
          },
        }}
      >
        <TestComponent />
      </I18nProvider>,
    );

    // This is a bit roundabout — we don't really care that these strings are in the document, but that they were returned from the Hook correctly
    expect(screen.getByText(/Hide password/)).toBeInTheDocument();
    expect(screen.getByText(/Show password/)).toBeInTheDocument();
  });

  it('provides defaults for partial missing translations for supported component', () => {
    function TestComponent() {
      const { accessibilityHidePasswordLabel, accessibilityShowPasswordLabel } =
        useI18nContext('TextField');

      return <div>{[accessibilityHidePasswordLabel, accessibilityShowPasswordLabel]}</div>;
    }

    render(
      <I18nProvider
        value={{
          TextField: {
            accessibilityHidePasswordLabel: 'Hide password',
          },
        }}
      >
        <TestComponent />
      </I18nProvider>,
    );

    // This is a bit roundabout — we don't really care that these strings are in the document, but that they were returned from the Hook correctly
    expect(screen.getByText(/Hide password/)).toBeInTheDocument();
    expect(screen.getByText(/Show password/)).toBeInTheDocument();
  });
});
