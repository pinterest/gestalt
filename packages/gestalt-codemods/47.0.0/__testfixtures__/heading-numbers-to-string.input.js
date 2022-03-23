// @flow strict
import { Fragment } from 'react';
import { Heading } from 'gestalt';

export default function TestComponent() {
  return (
    <Fragment>
      <Heading size={100} />
      <Heading size={200} />
      <Heading size={300} />
      <Heading size={400} />
      <Heading size={500} />
      <Heading size={600} />
    </Fragment>
  );
}
