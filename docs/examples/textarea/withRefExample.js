// @flow strict
import { type Node, useState } from "react";
import { Box, TextArea, Popover, Text } from "gestalt";

export default function TextAreaPopoverExample(): Node {
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef();
  return (
    <Box
      padding={8}
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"><Box marginBottom={12} width="100%">
        <TextArea
          ref={anchorRef}
          label="Focus the TextArea to show the Popover"
          id="my-example"
          onChange={() => {}}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
        />
        {open && (
          <Popover
            anchor={anchorRef.current}
            idealDirection="down"
            onDismiss={() => setOpen(false)}
            shouldFocus={false}
            size="md"
          >
            <Box padding={3}>
              <Text weight="bold">Example with Popover</Text>
            </Box>
          </Popover>
        )}
      </Box></Box>
  );
}
