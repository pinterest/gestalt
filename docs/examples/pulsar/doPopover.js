// @flow strict
import { type Node as ReactNode, useEffect, useRef, useState } from 'react';
import { Box, Button, Flex, PopoverEducational, Pulsar } from 'gestalt';

export default function Example(): ReactNode {
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
          text="Promote"
        />

        <Box ref={anchorRef} marginStart={-3} marginTop={-9} position="absolute" top>
          <Pulsar paused={!showEducation} size={110} />
        </Box>

        {showEducation && (
          <PopoverEducational
            anchor={anchorRef.current}
            idealDirection="down"
            message="Promote your newly created Pin"
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
