// @flow strict
import { type Node as ReactNode, useRef, useState } from 'react';
import { Accordion, Box, IconButton, Popover, Text } from 'gestalt';

export default function Example(): ReactNode {
  const [showPopover, setShowPopover] = useState(false);
  const anchorRef = useRef<HTMLElement | null>(null);

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Box column={12} maxWidth={800} padding={2}>
        <Accordion
          iconButton={
            <IconButton
              ref={anchorRef}
              accessibilityLabel="Get help"
              bgColor="lightGray"
              icon="question-mark"
              iconColor="darkGray"
              onClick={() => {
                setShowPopover((currVal) => !currVal);
              }}
              size="xs"
            />
          }
          id="accordionExample - iconButton"
          title="Title"
        >
          <Text size="200">This is example content.</Text>
        </Accordion>

        {showPopover && (
          <Popover
            anchor={anchorRef.current}
            idealDirection="right"
            onDismiss={() => setShowPopover(false)}
            shouldFocus={false}
          >
            <Box padding={3}>
              <Text weight="bold">Help content!</Text>
            </Box>
          </Popover>
        )}
      </Box>
    </Box>
  );
}
