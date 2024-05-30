import { useEffect, useRef, useState } from 'react';
import { Box, Flex, IconButton, PopoverEducational, Pulsar } from 'gestalt';

export default function Example() {
  const [showEducation, setShowEducation] = useState(false);
  const anchorRef = useRef<null | HTMLElement>(null);

  useEffect(() => {
    setShowEducation(true);
  }, []);

  return (
    <Flex height="100%" justifyContent="center" width="100%">
      <Box dangerouslySetInlineStyle={{ __style: { marginTop: 80 } }} position="relative">
        <IconButton accessibilityLabel="Example icon button" icon="flashlight" />

        <Box ref={anchorRef} margin={-5} position="absolute" top>
          <Pulsar size={88} />
        </Box>
        {showEducation && (
          <PopoverEducational
            anchor={anchorRef.current}
            idealDirection="down"
            message="Want to find more Pins that look like this? Find more ideas with visual search"
            onDismiss={() => {}}
            primaryAction={{
              text: 'Dismiss',
              onClick: () => {},
              role: 'button',
            }}
          />
        )}
      </Box>
    </Flex>
  );
}
