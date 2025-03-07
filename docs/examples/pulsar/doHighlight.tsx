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
        <Button
          onClick={() => {
            setShowEducation(true);
          }}
          text="Set goal"
        />

        <Box ref={anchorRef} marginStart={-3} marginTop={-9} position="absolute" top>
          <Pulsar paused={!showEducation} size={110} />
        </Box>

        {showEducation && (
          <PopoveMessage
            anchor={anchorRef.current}
            idealDirection="down"
            message="Choose a goal metric and value that represent success for this campaign"
            onDismiss={() => {}}
            primaryAction={{
              text: 'Got it',
              onClick: () => {
                setShowEducation(false);
              },
              role: 'button',
            }}
          />
        )}
      </Box>
    </Flex>
  );
}
