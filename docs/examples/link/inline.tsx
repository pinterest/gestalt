import { useState } from 'react';
import { Box, Flex, Link, NumberField, Text } from 'gestalt';

function TextExample({
  linkDisplay,
  maxWidth,
}: {
  linkDisplay: 'inline' | 'inlineBlock';
  maxWidth: number;
}) {
  return (
    <Box borderStyle="sm" maxWidth={maxWidth} padding={2} rounding={2}>
      <Text>
        To stop seeing content from an advertiser,{' '}
        <Text inline>
          <Link display={linkDisplay} href="/">
            learn how to block accounts.
          </Link>
        </Text>{' '}
        Note that you can also unblock accounts.
      </Text>
    </Box>
  );
}

export default function Example() {
  const [containerWidth, setContainerWidth] = useState(250);

  return (
    <Box height="100%" padding={2} width="100%">
      <Flex alignItems="center" direction="column" gap={6} height="100%" width="100%">
        <NumberField
          id="inlineExample"
          label="Container width (px)"
          onChange={({ value }) => {
            setContainerWidth(value ?? 0);
          }}
          value={containerWidth}
        />

        <Flex direction="column" gap={6}>
          <Flex direction="column" gap={2}>
            <Text>Inline</Text>
            <TextExample linkDisplay="inline" maxWidth={containerWidth} />
          </Flex>

          <Flex direction="column" gap={2}>
            <Text>Inline Block</Text>
            <TextExample linkDisplay="inlineBlock" maxWidth={containerWidth} />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
