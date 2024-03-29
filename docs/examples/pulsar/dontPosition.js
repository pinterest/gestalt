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
      <Box dangerouslySetInlineStyle={{ __style: { marginTop: 140 } }} position="relative">
        <Button onClick={() => {}} text="Switch to 3-step ad creation" />

        <Box
          ref={anchorRef}
          dangerouslySetInlineStyle={{
            __style: {
              marginTop: -130,
              marginLeft: -30,
            },
          }}
          position="absolute"
          top
        >
          <Pulsar size={300} />
        </Box>

        {showEducation && (
          <PopoverEducational
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
