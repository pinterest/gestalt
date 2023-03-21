// @flow strict
import ModalAlert from './ModalAlert.js';
import Text from './Text.js';

const Valid = (
  <ModalAlert
    heading="Delete Pin?"
    accessibilityModalLabel="Modal"
    onDismiss={() => {}}
    primaryAction={{
      accessibilityLabel: 'Acknowledge expired card',
      label: 'Got it',
      onClick: () => {},
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
    onDismiss={() => {}}
    // $FlowExpectedError[incompatible-type]
    heading={<Text>Heading</Text>}
    primaryAction={{
      accessibilityLabel: 'Acknowledge expired card',
      label: 'Got it',
      onClick: () => {},
    }}
  >
    <Text>Hello</Text>
  </ModalAlert>
);
