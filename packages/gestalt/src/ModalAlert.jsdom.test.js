// @flow strict
import { render } from '@testing-library/react';
import DeviceTypeProvider from './contexts/DeviceTypeProvider';
import ModalAlert from './ModalAlert';

describe('ModalAlert', () => {
  test('Desktop ModalAlert renders (default)', () => {
    const { baseElement } = render(
      <ModalAlert
        accessibilityModalLabel="Test ModalAlert"
        heading="Delete Pin?"
        onDismiss={() => {}}
        primaryAction={{
          accessibilityLabel: 'Acknowledge expired card',
          label: 'Got it',
          onClick: () => {},
          role: 'button',
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
        accessibilityModalLabel="Test ModalAlert"
        heading="Delete Pin?"
        onDismiss={() => {}}
        primaryAction={{
          accessibilityLabel: 'Acknowledge expired card',
          label: 'Got it',
          onClick: () => {},
          role: 'button',
        }}
        type="warning"
      >
        Modal content
      </ModalAlert>,
    );

    expect(baseElement).toMatchSnapshot();
  });

  test('Desktop ModalAlert renders (error)', () => {
    const { baseElement } = render(
      <ModalAlert
        accessibilityModalLabel="Test ModalAlert"
        heading="Delete Pin?"
        onDismiss={() => {}}
        primaryAction={{
          accessibilityLabel: 'Acknowledge expired card',
          label: 'Got it',
          onClick: () => {},
          role: 'button',
        }}
        type="error"
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
          accessibilityModalLabel="Test ModalAlert"
          heading="Delete Pin?"
          onDismiss={() => {}}
          primaryAction={{
            accessibilityLabel: 'Acknowledge expired card',
            label: 'Got it',
            onClick: () => {},
            role: 'button',
          }}
        >
          Modal content
        </ModalAlert>{' '}
      </DeviceTypeProvider>,
    );

    expect(baseElement).toMatchSnapshot();
  });
});
