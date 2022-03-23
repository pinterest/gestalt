// @flow strict
import { Fragment } from 'react';
import { Text } from 'gestalt';

export default function TestComponent() {
  return (
    <Fragment>
      <Text size="100" />
      <Text size="200" />
      <Text size="300" />
      <Text size="400" />
      <Text size="500" />
      <Text size="600" />
    </Fragment>
  );
}
