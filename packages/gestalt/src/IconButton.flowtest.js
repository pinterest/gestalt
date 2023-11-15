// @flow strict
import IconButton from './IconButton';

const ValidDefaultIconButton = <IconButton icon="add" accessibilityLabel="Add" />;

// $FlowExpectedError[prop-missing]
const MissingProp = <IconButton />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <IconButton nonexisting={33} />;
