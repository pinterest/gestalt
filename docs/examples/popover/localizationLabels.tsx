import { ReactNode, useEffect, useRef, useState } from 'react';
import { Box, Button, DefaultLabelProvider, Flex, Layer, Popover, Text } from 'gestalt';

export default function Example() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<null | HTMLButtonElement | HTMLAnchorElement>(null);

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <DefaultLabelProvider
      labels={{
        Popover: {
          accessibilityDismissButtonLabel: 'Popover verwerfen.',
        },
      }}
    >
      <Flex height="100%" width="100%">
        <Box alignItems="start" display="flex" justifyContent="center" padding={2} width="100%">
          <Button
            ref={anchorRef}
            color="red"
            onClick={() => setOpen((value) => !value)}
            size="lg"
            text="Sparen"
          />
        </Box>
        {open && (
          <Layer>
            <Popover
              accessibilityLabel="An Bord speichern."
              anchor={anchorRef.current}
              idealDirection="down"
              onDismiss={() => setOpen(false)}
              positionRelativeToAnchor
              showDismissButton
              size={240}
            >
              <Box
                alignItems="center"
                display="flex"
                height={200}
                justifyContent="center"
                width={240}
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
