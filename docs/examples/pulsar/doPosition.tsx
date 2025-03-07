import { useEffect, useRef, useState } from 'react';
import { Box, Button, Flex, PopoveMessage, Pulsar } from 'gestalt';

export default function Example() {
  const [showEducation, setShowEducation] = useState(false);
  const anchorRef = useRef<null | HTMLElement>(null);

  useEffect(() => {
    setShowEducation(true);
  }, []);

  return (
    <Flex height="100%" justifyContent="center" width="100%">
      <Box dangerouslySetInlineStyle={{ __style: { marginTop: 80 } }} position="relative">
        <Button onClick={() => {}} text="Switch to 3-step ad creation" />

        <Box
          ref={anchorRef}
          dangerouslySetInlineStyle={{
            __style: {
              marginTop: 25,
              marginLeft: 105,
            },
          }}
          position="absolute"
          top
        >
          <Pulsar size={30} />
        </Box>
        {showEducation && (
          <PopoveMessage
            anchor={anchorRef.current}
            idealDirection="down"
            message="Our 3-step ad creation tool makes setting up an ad even faster"
            onDismiss={() => {}}
            primaryAction={{
              text: 'Got it',
              onClick: () => {},
              role: 'button',
            }}
          />
        )}
      </Box>
    </Flex>
  );
}
