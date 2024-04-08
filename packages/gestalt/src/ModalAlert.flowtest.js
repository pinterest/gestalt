// @flow strict
import ModalAlert from './ModalAlert';
import Text from './Text';

const Valid = (
  <ModalAlert
    accessibilityModalLabel="Modal"
    heading="Delete Pin?"
    onDismiss={() => {}}
    primaryAction={{
      accessibilityLabel: 'Acknowledge expired card',
      label: 'Got it',
      onClick: () => {},
      role: 'button',
    }}
  >
    <Text>Hello</Text>
  </ModalAlert>
);

// $FlowExpectedError[prop-missing]
const MissingProp = <ModalAlert />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <ModalAlert nonexisting={33} />;

const InvalidProp = (
  <ModalAlert
    accessibilityModalLabel="Modal"
    // $FlowExpectedError[incompatible-type]
    heading={<Text>Heading</Text>}
    onDismiss={() => {}}
    primaryAction={{
      accessibilityLabel: 'Acknowledge expired card',
      label: 'Got it',
      onClick: () => {},
      role: 'button',
    }}
  >
    <Text>Hello</Text>
  </ModalAlert>
);
