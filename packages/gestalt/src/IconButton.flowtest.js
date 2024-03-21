// @flow strict
import IconButton from './IconButton';

const ValidDefaultIconButton = <IconButton accessibilityLabel="Add" icon="add" />;

// $FlowExpectedError[prop-missing]
const MissingProp = <IconButton />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <IconButton nonexisting={33} />;
