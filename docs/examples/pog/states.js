// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, Pog, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex gap={4}>
        <Flex gap={4} direction="column">
          <Text>bgColor=red</Text>
          <Flex gap={2} alignItems="center">
            <Pog icon="saved" bgColor="red" />
          </Flex>
          <Flex gap={2} alignItems="center">
            <Pog icon="saved" bgColor="red" hovered /> <Text size="100">hovered</Text>
          </Flex>
          <Flex gap={2} alignItems="center">
            <Pog icon="saved" bgColor="red" focused /> <Text size="100">focused</Text>
          </Flex>
          <Flex gap={2} alignItems="center">
            <Pog icon="saved" bgColor="red" active /> <Text size="100">active</Text>
          </Flex>
          <Flex gap={2} alignItems="center">
            <Pog icon="saved" bgColor="red" selected /> <Text size="100">selected</Text>
          </Flex>
        </Flex>
        <Flex gap={4} direction="column">
          <Text>bgColor=lightGray</Text>
          <Flex gap={2} alignItems="center">
            <Pog icon="visit" bgColor="lightGray" />
          </Flex>
          <Flex gap={2} alignItems="center">
            <Pog icon="visit" bgColor="lightGray" hovered /> <Text size="100">hovered</Text>
          </Flex>
          <Flex gap={2} alignItems="center">
            <Pog icon="visit" bgColor="lightGray" focused /> <Text size="100">focused</Text>
          </Flex>
          <Flex gap={2} alignItems="center">
            <Pog icon="visit" bgColor="lightGray" active /> <Text size="100">active</Text>
          </Flex>
          <Flex gap={2} alignItems="center">
            <Pog icon="visit" bgColor="lightGray" selected /> <Text size="100">selected</Text>
          </Flex>
        </Flex>
        <Flex gap={4} direction="column">
          <Text>bgColor=gray</Text>
          <Flex gap={2} alignItems="center">
            <Pog icon="saved" bgColor="gray" />
          </Flex>
          <Flex gap={2} alignItems="center">
            <Pog icon="saved" bgColor="gray" hovered /> <Text size="100">hovered</Text>
          </Flex>
          <Flex gap={2} alignItems="center">
            <Pog icon="saved" bgColor="gray" focused /> <Text size="100">focused</Text>
          </Flex>
          <Flex gap={2} alignItems="center">
            <Pog icon="saved" bgColor="gray" active /> <Text size="100">active</Text>
          </Flex>
          <Flex gap={2} alignItems="center">
            <Pog icon="saved" bgColor="gray" selected /> <Text size="100">selected</Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
