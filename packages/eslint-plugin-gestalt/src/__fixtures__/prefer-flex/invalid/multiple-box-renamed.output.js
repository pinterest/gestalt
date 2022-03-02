import { Fragment } from 'react';
import { Box as GestaltBox, Flex as GestaltFlex } from 'gestalt';

export default function TestElement() {
  return (
    <Fragment>
      <GestaltBox marginBottom={3} rounding={2} />
      <GestaltFlex alignItems="center" justifyContent="start" />
    </Fragment>
  );
}
