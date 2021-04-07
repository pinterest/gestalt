// @flow strict
import React from 'react';
import AvatarGroup from './AvatarGroup.js';

const Valid = (
  <AvatarGroup
    accessibilityLabel="AvatarGroup"
    collaborators={[
      {
        name: 'Keerthi',
        src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
      },
    ]}
  />
);

// $FlowExpectedError[prop-missing]
const InvalidProps = <AvatarGroup nonexisting={33} />;
