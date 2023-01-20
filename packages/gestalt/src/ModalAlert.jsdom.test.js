// @flow strict
import { render } from '@testing-library/react';
import ModalAlert from './ModalAlert.js';
import DeviceTypeProvider from './contexts/DeviceTypeProvider.js';

describe('ModalAlert', () => {
  test('Desktop ModalAlert renders (default)', () => {
    const { baseElement } = render(
      <ModalAlert
        heading="Delete Pin?"
        accessibilityModalLabel="Test ModalAlert"
        onDismiss={() => {}}
        primaryAction={{
          accessibilityLabel: 'Acknowledge expired card',
          label: 'Got it',
          onClick: () => {},
        }}
      >
        Modal content
      </ModalAlert>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  test('Desktop ModalAlert renders (warning)', () => {
    const { baseElement } = render(
      <ModalAlert
        type="warning"
        heading="Delete Pin?"
        accessibilityModalLabel="Test ModalAlert"
        onDismiss={() => {}}
        primaryAction={{
          accessibilityLabel: 'Acknowledge expired card',
          label: 'Got it',
          onClick: () => {},
        }}
      >
        Modal content
      </ModalAlert>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  test('Desktop ModalAlert renders (error)', () => {
    const { baseElement } = render(
      <ModalAlert
        type="error"
        heading="Delete Pin?"
        accessibilityModalLabel="Test ModalAlert"
        onDismiss={() => {}}
        primaryAction={{
          accessibilityLabel: 'Acknowledge expired card',
          label: 'Got it',
          onClick: () => {},
        }}
      >
        Modal content
      </ModalAlert>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  test('Mobile Desktop ModalAlert renders', () => {
    const { baseElement } = render(
      <DeviceTypeProvider deviceType="mobile">
        <ModalAlert
          heading="Delete Pin?"
          accessibilityModalLabel="Test ModalAlert"
          onDismiss={() => {}}
          primaryAction={{
            accessibilityLabel: 'Acknowledge expired card',
            label: 'Got it',
            onClick: () => {},
          }}
        >
          Modal content
        </ModalAlert>{' '}
      </DeviceTypeProvider>,
    );

    expect(baseElement).toMatchSnapshot();
  });
});
