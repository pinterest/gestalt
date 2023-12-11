// @flow strict
import Accordion from './Accordion';
import IconButton from './IconButton';

const ValidWithMinimumProps = <Accordion id="accordion-id" />;

const ValidWithBaseProps = (
  <Accordion
    id="accordion-id"
    iconAccessibilityLabel="There is an error"
    title="Accordion Title"
    type="error"
  >
    <hr />
  </Accordion>
);

const ValidWithBadgeTextProps = (
  <Accordion
    badge={{ text: 'badge-text' }}
    iconAccessibilityLabel="There is an error"
    id="accordion-id"
    title="Accordion Title"
    type="error"
  >
    <hr />
  </Accordion>
);

const ValidWithIconProps = (
  <Accordion
    icon="lock"
    iconAccessibilityLabel="Accordion is Locked"
    id="accordion-id"
    title="Accordion Title"
    type="error"
  >
    <hr />
  </Accordion>
);

const ValidWithIconButtonProps = (
  <Accordion
    iconAccessibilityLabel="There is an error"
    iconButton={
      <IconButton
        bgColor="lightGray"
        icon="question-mark"
        iconColor="darkGray"
        accessibilityLabel="Get help"
        size="xs"
        onClick={() => {}}
      />
    }
    id="accordion-id"
    title="Accordion Title"
    type="error"
  >
    <hr />
  </Accordion>
);

// $FlowExpectedError[prop-missing]
const InvalidWithMissingProps = <Accordion />;

// $FlowExpectedError[prop-missing]
const InvalidWithNonExistingProp = <Accordion id="accordion-id" nonexisting={33} />;

const InvalidTypeProp = (
  // $FlowExpectedError[incompatible-type]
  <Accordion id="accordion-id" title={<h1>Accordion Title</h1>} />
);
