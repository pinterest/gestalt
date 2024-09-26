import { Box, Flex, Pog, Text } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={6}>
        <Flex direction="column" gap={4}>
          <Text size="100">Rounding prop</Text>

          <Flex direction="row" gap={4} wrap>
            <Flex alignItems="center" gap={1}>
              <Pog bgColor="gray" icon="saved" rounding="0" /> <Text size="100">Rounding 0</Text>
            </Flex>
            <Flex alignItems="center" gap={1}>
              <Pog bgColor="gray" icon="saved" rounding="100" />{' '}
              <Text size="100">Rounding 100</Text>
            </Flex>
            <Flex alignItems="center" gap={1}>
              <Pog bgColor="gray" icon="saved" rounding="200" />{' '}
              <Text size="100">Rounding 200</Text>
            </Flex>
            <Flex alignItems="center" gap={1}>
              <Pog bgColor="gray" icon="saved" rounding="300" />{' '}
              <Text size="100">Rounding 300</Text>
            </Flex>
            <Flex alignItems="center" gap={1}>
              <Pog bgColor="gray" icon="saved" rounding="400" />{' '}
              <Text size="100">Rounding 400</Text>
            </Flex>
            <Flex alignItems="center" gap={1}>
              <Pog bgColor="gray" icon="saved" rounding="circle" />
              <Text size="100"> Rounding Circle</Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex direction="column" gap={4}>
          <Text size="100">Internally managed rounding via size prop</Text>

          <Flex direction="row" gap={4} wrap>
            <Flex alignItems="center" gap={1}>
              <Pog bgColor="gray" icon="saved" size="xs" /> <Text size="100">Size xs</Text>
            </Flex>
            <Flex alignItems="center" gap={1}>
              <Pog bgColor="gray" icon="saved" size="sm" /> <Text size="100">Size sm</Text>
            </Flex>
            <Flex alignItems="center" gap={1}>
              <Pog bgColor="gray" icon="saved" size="md" /> <Text size="100">Size md</Text>
            </Flex>
            <Flex alignItems="center" gap={1}>
              <Pog bgColor="gray" icon="saved" size="lg" /> <Text size="100">Size lg</Text>
            </Flex>
            <Flex alignItems="center" gap={1}>
              <Pog bgColor="gray" icon="saved" size="xl" /> <Text size="100">Size xl</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
