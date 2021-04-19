// @flow strict
import AvatarPair from './AvatarPair.js';

const Valid = (
  <AvatarPair
    collaborators={[
      {
        name: 'Jenny',
      },
    ]}
  />
);

// $FlowExpectedError[prop-missing]
const NonExistingProp = <AvatarPair nonexisting={33} />;

// $FlowExpectedError[prop-missing]
const MissingProp = <AvatarPair />;
