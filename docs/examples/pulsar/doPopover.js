// @flow strict
import { type Node, useEffect, useRef, useState } from 'react';
import { Box, Button, Flex, PopoverEducational, Pulsar } from 'gestalt';

export default function Example(): Node {
  const [showEducation, setShowEducation] = useState(false);
  const anchorRef = useRef<null | HTMLElement>(null);

  useEffect(() => {
    setShowEducation(true);
  }, []);

  return (
    <Flex justifyContent="center" height="100%" width="100%">
      <Box dangerouslySetInlineStyle={{ __style: { marginTop: 80 } }} position="relative">
        <Button
          onClick={() => {
            setShowEducation(true);
          }}
          text="Promote"
        />

        <Box ref={anchorRef} position="absolute" top marginTop={-9} marginStart={-3}>
          <Pulsar paused={!showEducation} size={110} />
        </Box>

        {showEducation && (
          <PopoverEducational
            anchor={anchorRef.current}
            idealDirection="down"
            onDismiss={() => {}}
            message="Promote your newly created Pin"
            primaryAction={{
              text: 'Got it',
              onClick: () => {
                setShowEducation(false);
              },
            }}
          />
        )}
      </Box>
    </Flex>
  );
}
