// @flow strict
import { type Node, useEffect, useRef, useState } from 'react';
import { Box, Button, DefaultLabelProvider, Flex, Layer, Popover, Text } from 'gestalt';

export default function Example(): Node {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLButtonElement | HTMLAnchorElement>(null);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <DefaultLabelProvider
      // $FlowExpectedError[incompatible-type] For demostration purposes
      labels={{
        Popover: {
          accessibilityDismissButtonLabel: 'Popover verwerfen.',
        },
      }}
    >
      <Flex height="100%" width="100%">
        <Box width="100%" display="flex" alignItems="start" justifyContent="center" padding={2}>
          <Button
            color="red"
            size="lg"
            text="Sparen"
            ref={anchorRef}
            onClick={() => setOpen((value) => !value)}
          />
        </Box>
        {open && (
          <Layer>
            <Popover
              accessibilityLabel="An Bord speichern."
              anchor={anchorRef.current}
              idealDirection="down"
              onDismiss={() => {}}
              positionRelativeToAnchor
              size={240}
              showDismissButton
            >
              <Box
                height={200}
                width={240}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text align="center">Inhalt</Text>
              </Box>
            </Popover>
          </Layer>
        )}
      </Flex>
    </DefaultLabelProvider>
  );
}
