import { Fragment, useState } from 'react';
import { Box, Button, Flex, Spinner } from 'gestalt';

export default function Example() {
  const [show, setShow] = useState(true);
  const [hasDelay, setHasDelay] = useState(true);

  return (
    <Fragment>
      <Box padding={2}>
        <Flex direction="column" gap={2}>
          <Button
            onClick={() => setShow((currVal) => !currVal)}
            size="md"
            text={show ? 'Hide spinner' : 'Show spinner'}
          />

          <Button
            onClick={() => setHasDelay((currVal) => !currVal)}
            size="md"
            text={hasDelay ? 'Disable delay' : 'Enable delay'}
          />
        </Flex>
      </Box>

      <Spinner accessibilityLabel="Example spinner" delay={hasDelay} show={show} />
    </Fragment>
  );
}
