// @flow strict
import ModuleTitle from './Title';
import IconButton from '../IconButton';

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

// $FlowExpectedError[incompatible-type]
const InvalidTypeProp = <ModuleTitle title="" size="xxl" />;
