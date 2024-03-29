// @flow strict
import AccordionTitle from './Title';
import IconButton from '../IconButton';

const Valid = (
  <AccordionTitle
    badge={{ text: 'badge-text' }}
    icon="lock"
    iconAccessibilityLabel="test label"
    iconButton={
      <IconButton
        accessibilityLabel="Get help"
        bgColor="lightGray"
        icon="question-mark"
        iconColor="darkGray"
        onClick={() => {}}
        size="xs"
      />
    }
    title="test title"
    type="info"
  />
);

// $FlowExpectedError[prop-missing]
const MissingProp = <AccordionTitle />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <AccordionTitle nonexisting={33} />;

// $FlowExpectedError[incompatible-type]
const InvalidTypeProp = <AccordionTitle size="xxl" title="" />;
