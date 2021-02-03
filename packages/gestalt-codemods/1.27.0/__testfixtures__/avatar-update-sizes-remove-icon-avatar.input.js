// @flow strict
import React, { Fragment } from 'react';
import { Avatar } from 'gestalt';

export default function Example() {
  return (
    <Fragment>
      <Avatar
        size="sm"
        src="https://i.ibb.co/ZfCZrY8/keerthi.jpg"
        name="Keerthi"
      />
      <Avatar
        size="md"
        src="https://i.ibb.co/ZfCZrY8/keerthi.jpg"
        name="Keerthi"
      />
    </Fragment>
  );
}
