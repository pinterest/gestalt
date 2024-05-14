import { Fragment, useRef, useState } from 'react';
import { Box, Button, Flex, Popover, Text } from 'gestalt';

export default function Example() {
  const [open, setOpen] = useState(false);

  const anchorRef = useRef<null | HTMLElement>(null);

  return (
    <Fragment>
      <Flex
        alignItems="center"
        direction="column"
        gap={6}
        height="100%"
        justifyContent="center"
        width="100%"
      >
        <Button
          color="red"
          onClick={() => setOpen((prevVal) => !prevVal)}
          text={open ? 'Close Popover' : 'Anchor a Popover to Box'}
        />
        {/* @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLElement | null>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'. */}
        <Box ref={anchorRef} borderStyle="sm" padding={3} rounding={1}>
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
