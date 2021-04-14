// @flow strict
import { Fragment } from 'react';
import { GroupAvatar } from 'gestalt';

export default function Example() {
  return (
    <Fragment>
      <GroupAvatar
        collaborators={[
          {
            name: 'Keerthi',
            src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
          },
          {
            name: 'Shanice',
            src: 'https://i.ibb.co/7tGKGvb/shanice.jpg',
          },
        ]}
        size="xs"
      />
      <GroupAvatar
        collaborators={[
          {
            name: 'Keerthi',
            src: 'https://i.ibb.co/ZfCZrY8/keerthi.jpg',
          },
          {
            name: 'Shanice',
            src: 'https://i.ibb.co/7tGKGvb/shanice.jpg',
          },
        ]}
        size="sm"
      />
    </Fragment>
  );
}
