// @flow strict
import Accordion from './Accordion';
import IconButton from './IconButton';

const ValidWithMinimumProps = <Accordion id="module-id" />;

const ValidWithBaseProps = (
  <Accordion
    id="module-id"
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
    id="module-id"
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
    id="module-id"
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
    id="module-id"
    title="Accordion Title"
    type="error"
  >
    <hr />
  </Accordion>
);

// $FlowExpectedError[prop-missing]
const InvalidWithMissingProps = <Accordion />;

// $FlowExpectedError[prop-missing]
const InvalidWithNonExistingProp = <Accordion id="module-id" nonexisting={33} />;

const InvalidTypeProp = (
  // $FlowExpectedError[incompatible-type]
  <Accordion id="module-id" title={<h1>Accordion Title</h1>} />
);
