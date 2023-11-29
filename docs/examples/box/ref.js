// @flow strict
import { Fragment, type Node as ReactNode, useRef, useState } from 'react';
import { Box, Button, Flex, Popover, Text } from 'gestalt';

export default function Example(): ReactNode {
  const [open, setOpen] = useState(false);

  const anchorRef = useRef<null | HTMLElement>(null);

  return (
    <Fragment>
      <Flex
        direction="column"
        gap={6}
        height="100%"
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Button
          color="red"
          onClick={() => setOpen((prevVal) => !prevVal)}
          text={open ? 'Close Popover' : 'Anchor a Popover to Box'}
        />
        <Box borderStyle="sm" padding={3} ref={anchorRef} rounding={1}>
          <Text>I&apos;m a Box</Text>
        </Box>
      </Flex>
      {open && (
        <Popover
          anchor={anchorRef.current}
          idealDirection="down"
          onDismiss={() => {}}
          shouldFocus={false}
        >
          <Box padding={3}>
            <Text weight="bold">I&apos;m a Popover anchored to a Box</Text>
          </Box>
        </Popover>
      )}
    </Fragment>
  );
}
