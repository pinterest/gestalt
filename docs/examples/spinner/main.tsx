import { Fragment, useState } from 'react';
import { Box, Button, Spinner } from 'gestalt';

export default function Example() {
  const [show, setShow] = useState(true);

  return (
    <Fragment>
      <Box padding={2}>
        <Button
          onClick={() => setShow((currVal) => !currVal)}
          size="md"
          text={show ? 'Hide spinner' : 'Show spinner'}
        />
      </Box>

      <Spinner accessibilityLabel="Example spinner" show={show} />
    </Fragment>
  );
}
