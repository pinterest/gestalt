import { Box, Flex, Pog, Text } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex gap={4}>
        <Flex direction="column" gap={4}>
          <Text>bgColor=red</Text>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="red" icon="saved" /> <Text size="100">default</Text>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="red" hovered icon="saved" /> <Text size="100">hovered</Text>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="red" focused icon="saved" /> <Text size="100">focused</Text>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Pog active bgColor="red" icon="saved" /> <Text size="100">active</Text>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="red" icon="saved" selected /> <Text size="100">selected</Text>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="red" disabled icon="saved" /> <Text size="100">disabled</Text>
          </Flex>
        </Flex>
        <Flex direction="column" gap={4}>
          <Text>bgColor=lightGray</Text>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="lightGray" icon="visit" /> <Text size="100">default</Text>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="lightGray" hovered icon="visit" /> <Text size="100">hovered</Text>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="lightGray" focused icon="visit" /> <Text size="100">focused</Text>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Pog active bgColor="lightGray" icon="visit" /> <Text size="100">active</Text>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="lightGray" icon="visit" selected /> <Text size="100">selected</Text>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="lightGray" disabled icon="saved" /> <Text size="100">disabled</Text>
          </Flex>
        </Flex>
        <Flex direction="column" gap={4}>
          <Text>bgColor=gray</Text>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="gray" icon="saved" /> <Text size="100">default</Text>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="gray" hovered icon="saved" /> <Text size="100">hovered</Text>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="gray" focused icon="saved" /> <Text size="100">focused</Text>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Pog active bgColor="gray" icon="saved" /> <Text size="100">active</Text>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="gray" icon="saved" selected /> <Text size="100">selected</Text>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="gray" disabled icon="saved" /> <Text size="100">disabled</Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
