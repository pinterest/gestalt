// @flow strict
import PopoverEducational from './PopoverEducational';

const Valid = (
  <PopoverEducational
    accessibilityLabel="test"
    anchor={document.createElement('div')}
    onDismiss={() => {}}
  />
);

// $FlowExpectedError[prop-missing]
const NonExistingProp = <PopoverEducational nonexisting={33} />;
