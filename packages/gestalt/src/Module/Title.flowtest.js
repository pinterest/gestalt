// @flow strict
import ModuleTitle from './Title.js';
import IconButton from '../IconButton.js';

const Valid = (
  <ModuleTitle
    badge={{ text: 'badge-text' }}
    icon="lock"
    iconAccessibilityLabel="test label"
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
    title="test title"
    type="info"
  />
);

// $FlowExpectedError[prop-missing]
const MissingProp = <ModuleTitle />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <ModuleTitle nonexisting={33} />;

// $FlowExpectedError[prop-missing]
const InvalidTypeProp = <ModuleTitle size="xxl" />;
