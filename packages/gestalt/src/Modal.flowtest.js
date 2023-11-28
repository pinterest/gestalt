// @flow strict
import Modal from './Modal';
import Text from './Text';

const Valid = <Modal accessibilityModalLabel="Modal" onDismiss={() => {}} />;

// $FlowExpectedError[prop-missing]
const MissingProp = <Modal />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <Modal nonexisting={33} />;

const InvalidProp = (
  <Modal
    accessibilityModalLabel="Modal"
    onDismiss={() => {}}
    heading={<Text>Test</Text>}
    subHeading="clever subheading"
  />
);
