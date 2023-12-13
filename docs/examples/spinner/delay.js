// @flow strict
import { Fragment, type Node as ReactNode, useState } from 'react';
import { Box, Button, Flex, Spinner } from 'gestalt';

export default function Example(): ReactNode {
  const [show, setShow] = useState(true);
  const [hasDelay, setHasDelay] = useState(true);

  return (
    <Fragment>
      <Box padding={2}>
        <Flex direction="column" gap={2}>
          <Button
            text={show ? 'Hide spinner' : 'Show spinner'}
            onClick={() => setShow((currVal) => !currVal)}
            size="md"
          />

          <Button
            text={hasDelay ? 'Disable delay' : 'Enable delay'}
            onClick={() => setHasDelay((currVal) => !currVal)}
            size="md"
          />
        </Flex>
      </Box>

      <Spinner show={show} accessibilityLabel="Example spinner" delay={hasDelay} />
    </Fragment>
  );
}
