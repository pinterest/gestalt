// @flow strict
import { type Node } from 'react';
import { Box, Flex, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" width="100%">
      <Box column={12}>
        <Box role="feed" color="infoBase" width="100%" padding={2}>
          <Text color="light" weight="bold">
            Container: role=&quot;feed&quot;
          </Text>
          <Box column={8} display="inlineBlock">
            <Box
              role="article"
              title="Article 1"
              color="successBase"
              height={50}
              width="100%"
              padding={2}
            >
              <Text color="light" weight="bold">
                Content: role=&quot;article&quot;
              </Text>
            </Box>
          </Box>
          <Box column={4} display="inlineBlock">
            <Box role="form" color="warningBase" height={50} width="100%" padding={2}>
              <Text color="light" weight="bold">
                Contact Form: role=&quot;form&quot;
              </Text>
            </Box>
          </Box>
        </Box>
        <Box
          role="navigation"
          title="Site Map"
          color="successBase"
          height={50}
          width="100%"
          padding={2}
        >
          <Text color="light" weight="bold">
            Site Map: role=&quot;navigation&quot;
          </Text>
        </Box>
        <Text>{'Everything above will render as a <div>'}</Text>
      </Box>
    </Flex>
  );
}
