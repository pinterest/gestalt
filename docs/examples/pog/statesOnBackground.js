// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, Pog, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box
      padding={8}
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      dangerouslySetInlineStyle={{
        __style: { backgroundImage: 'url("https://i.ibb.co/7bQQYkX/stock2.jpg")' },
      }}
    >
      <Flex gap={4}>
        <Flex gap={4} direction="column">
          <Box padding={1} color="default">
            <Text>bgColor=transparentDarkGray</Text>
          </Box>
          <Flex gap={2} alignItems="center">
            <Pog icon="saved" bgColor="transparentDarkGray" />
          </Flex>
          <Flex gap={2} alignItems="center">
            <Pog icon="saved" bgColor="transparentDarkGray" hovered />
            <Box padding={1} color="default">
              <Text size="100">hovered</Text>
            </Box>
          </Flex>
          <Flex gap={2} alignItems="center">
            <Pog icon="saved" bgColor="transparentDarkGray" focused />
            <Box padding={1} color="default">
              <Text size="100">focused</Text>
            </Box>
          </Flex>
          <Flex gap={2} alignItems="center">
            <Pog icon="saved" bgColor="transparentDarkGray" active />
            <Box padding={1} color="default">
              <Text size="100">active</Text>
            </Box>
          </Flex>
          <Flex gap={2} alignItems="center">
            <Pog icon="saved" bgColor="transparentDarkGray" selected />
            <Box padding={1} color="default">
              <Text size="100">selected</Text>
            </Box>
          </Flex>
        </Flex>
        <Flex gap={4} direction="column">
          <Box padding={1} color="default">
            <Text>bgColor=white</Text>
          </Box>

          <Flex gap={2} alignItems="center">
            <Pog icon="visit" bgColor="white" />
          </Flex>
          <Flex gap={2} alignItems="center">
            <Pog icon="visit" bgColor="white" hovered />
            <Box padding={1} color="default">
              <Text size="100">hovered</Text>
            </Box>
          </Flex>
          <Flex gap={2} alignItems="center">
            <Pog icon="visit" bgColor="white" focused />
            <Box padding={1} color="default">
              <Text size="100">focused</Text>
            </Box>
          </Flex>
          <Flex gap={2} alignItems="center">
            <Pog icon="visit" bgColor="white" active />
            <Box padding={1} color="default">
              <Text size="100">active</Text>
            </Box>
          </Flex>
          <Flex gap={2} alignItems="center">
            <Pog icon="visit" bgColor="white" selected />
            <Box padding={1} color="default">
              <Text size="100">selected</Text>
            </Box>
          </Flex>
        </Flex>
        <Flex gap={4} direction="column">
          <Box padding={1} color="default">
            <Text>bgColor=transparent</Text>
          </Box>
          <Flex gap={2} alignItems="center">
            <Pog icon="saved" bgColor="transparent" />
          </Flex>
          <Flex gap={2} alignItems="center">
            <Pog icon="saved" bgColor="transparent" hovered />
            <Box padding={1} color="default">
              <Text size="100">hovered</Text>
            </Box>
          </Flex>
          <Flex gap={2} alignItems="center">
            <Pog icon="saved" bgColor="transparent" focused />
            <Box padding={1} color="default">
              <Text size="100">focused</Text>
            </Box>
          </Flex>
          <Flex gap={2} alignItems="center">
            <Pog icon="saved" bgColor="transparent" active />
            <Box padding={1} color="default">
              <Text size="100">active</Text>
            </Box>
          </Flex>
          <Flex gap={2} alignItems="center">
            <Pog icon="saved" bgColor="transparent" selected />
            <Box padding={1} color="default">
              <Text size="100">selected</Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
