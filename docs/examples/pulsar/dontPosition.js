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
      <Box dangerouslySetInlineStyle={{ __style: { marginTop: 140 } }} position="relative">
        <Button onClick={() => {}} text="Switch to 3-step ad creation" />

        <Box
          ref={anchorRef}
          position="absolute"
          top
          dangerouslySetInlineStyle={{
            __style: {
              marginTop: -130,
              marginLeft: -30,
            },
          }}
        >
          <Pulsar size={300} />
        </Box>

        {showEducation && (
          <PopoverEducational
            anchor={anchorRef.current}
            idealDirection="down"
            onDismiss={() => {}}
            message="Our 3-step ad creation tool makes setting up an ad even faster"
            primaryAction={{
              text: 'Got it',
              onClick: () => {},
            }}
          />
        )}
      </Box>
    </Flex>
  );
}
