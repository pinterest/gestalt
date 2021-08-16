import { Fragment } from 'react';
import { Box as GestaltBox, Flex } from 'gestalt';

export default function TestElement() {
  return (
    <Fragment>
      <GestaltBox marginBottom={3} rounding={2} />
      <Flex alignItems="center" justifyContent="start" />
    </Fragment>
  );
}
