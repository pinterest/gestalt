import { Fragment } from 'react';
import { Button, IconButton, TapArea } from 'gestalt';

export default function TestElement() {
  return (
    <Fragment>
      <TapArea role="button" />
      <IconButton role="button" size="md" />
      <Button />
    </Fragment>
  );
}
