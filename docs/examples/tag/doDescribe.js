// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Divider, Flex, Tag, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box
      alignItems="center"
      display="flex"
      height="100%"
      justifyContent="center"
      padding={6}
      width="100%"
    >
      <Flex direction="column" justifyContent="center" maxWidth={525} width="100%">
        <Box padding={2}>
          <Flex width="100%">
            <Flex.Item flexBasis={275}>
              <Text weight="bold">Pin</Text>
            </Flex.Item>
            <Text weight="bold">Topics</Text>
          </Flex>
        </Box>

        <Box paddingY={2}>
          <Divider />
        </Box>

        <Box padding={2}>
          <Flex>
            <Flex.Item flexBasis={275}>
              <Flex alignItems="center" gap={3}>
                <Box color="brand" height={30} rounding={2} width={30} />
                <Text>Color token demo</Text>
              </Flex>
            </Flex.Item>

            <Flex gap={1} wrap>
              {['Color', 'Tokens', 'Design systems'].map((item) => (
                <Tag key={item} disabled onRemove={() => {}} text={item} />
              ))}
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
