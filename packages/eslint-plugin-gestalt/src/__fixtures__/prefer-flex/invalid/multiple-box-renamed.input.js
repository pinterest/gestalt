import { Fragment } from 'react';
import { Box as GestaltBox } from 'gestalt';

export default function TestElement() {
  return (
    <Fragment>
      <GestaltBox marginBottom={3} rounding={2} />
      <GestaltBox display="flex" alignItems="center" />
    </Fragment>
  );
}
