// @flow strict
import { Fragment, type Node as ReactNode, useState } from 'react';
import { Box, Button, Spinner } from 'gestalt';

export default function Example(): ReactNode {
  const [show, setShow] = useState(true);

  return (
    <Fragment>
      <Box padding={2}>
        <Button
          text={show ? 'Hide spinner' : 'Show spinner'}
          onClick={() => setShow((currVal) => !currVal)}
          size="md"
        />
      </Box>

      <Spinner show={show} accessibilityLabel="Example spinner" />
    </Fragment>
  );
}
