// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%">
      <Box column={12}>
        <Box column={12}>
          <Box color="infoBase" height={50} width="100%">
            <Text color="light" weight="bold">
              Header
            </Text>
          </Box>
          <Box column={6} display="inlineBlock">
            <Box color="successBase" height={50} width="100%">
              <Text color="light" weight="bold">
                Body 50% Content
              </Text>
            </Box>
          </Box>
          <Box column={6} display="inlineBlock">
            <Box color="warningBase" height={50} width="100%">
              <Text color="light" weight="bold">
                Body 50% Content
              </Text>
            </Box>
          </Box>
          <Box color="infoBase" height={50} width="100%">
            <Text color="light" weight="bold">
              Footer
            </Text>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
