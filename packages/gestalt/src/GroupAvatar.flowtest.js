// @flow strict
import GroupAvatar from './GroupAvatar.js';

const Valid = <GroupAvatar collaborators={[{ name: '💩 astral' }]} size="md" />;

// $FlowExpectedError[prop-missing]
const MissingProp = <GroupAvatar />;

// $FlowExpectedError[prop-missing]
const NonExistingProp = <GroupAvatar nonexisting={33} />;
