// @flow strict
import { render, screen } from '@testing-library/react';
import AccessibilityLabelProvider, {
  useAccessibilityLabelContext,
} from './AccessibilityLabelProvider.js';

// AccessibilityLabelProvider is a rename of the React Context.Provider, so no tests required

describe('useAccessibilityLabelContext', () => {
  it('returns provided string values for a supported component', () => {
    function TestComponent() {
      const { accessibilityHidePasswordLabel, accessibilityShowPasswordLabel } =
        useAccessibilityLabelContext('TextField');

      return <div>{[accessibilityHidePasswordLabel, accessibilityShowPasswordLabel]}</div>;
    }

    render(
      <AccessibilityLabelProvider
        value={{
          ComboBox: {
            accessibilityClearButtonLabel: 'Clear input',
          },
          TextField: {
            accessibilityHidePasswordLabel: 'Hide password',
            accessibilityShowPasswordLabel: 'Show password',
          },
        }}
      >
        <TestComponent />
      </AccessibilityLabelProvider>,
    );

    // This is a bit roundabout — we don't really care that these strings are in the document, but that they were returned from the Hook correctly
    expect(screen.getByText(/Hide password/)).toBeInTheDocument();
    expect(screen.getByText(/Show password/)).toBeInTheDocument();
  });

  it('throws on unsupported component', () => {
    const consoleMock = jest.spyOn(console, 'error').mockImplementation(jest.fn());

    function TestComponent() {
      // $FlowExpectedError[prop-missing]
      const { foo } = useAccessibilityLabelContext('Foo');

      return <div>{foo}</div>;
    }

    expect(() => {
      render(<TestComponent />);
    }).toThrow();

    expect(consoleMock).toHaveBeenCalledTimes(3);
    expect(consoleMock.mock.calls[0][0].message).toEqual(
      expect.stringContaining(
        'Foo translations not available — please add translations to AccessibilityLabelProvider',
      ),
    );
  });
});
