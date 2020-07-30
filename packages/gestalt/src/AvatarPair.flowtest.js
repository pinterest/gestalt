// @flow strict
import React from 'react';
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

// $FlowExpectedError[prop-missing] Cannot create `AvatarPair` element because property `nonexisting` is missing in props.
const NonExistingProp = <AvatarPair nonexisting={33} />;

// $FlowExpectedError[prop-missing] Cannot create `AvatarPair` element because property `collaborators` is missing in props
const MissingProp = <AvatarPair />;
