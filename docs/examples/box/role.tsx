import {ReactNode} from 'react';
import { Box, Flex, Text } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" width="100%">
      <Box column={12}>
        <Box color="infoBase" padding={2} role="feed" width="100%">
          <Text color="light" weight="bold">
            Container: role=&quot;feed&quot;
          </Text>
          <Box column={8} display="inlineBlock">
            <Box
              color="successBase"
              height={50}
              padding={2}
              role="article"
              title="Article 1"
              width="100%"
            >
              <Text color="light" weight="bold">
                Content: role=&quot;article&quot;
              </Text>
            </Box>
          </Box>
          <Box column={4} display="inlineBlock">
            <Box color="warningBase" height={50} padding={2} role="form" width="100%">
              <Text color="light" weight="bold">
                Contact Form: role=&quot;form&quot;
              </Text>
            </Box>
          </Box>
        </Box>
        <Box
          color="successBase"
          height={50}
          padding={2}
          role="navigation"
          title="Site Map"
          width="100%"
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
