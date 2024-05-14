import { Box, Flex, Pog, Text } from 'gestalt';

export default function Example() {
  return (
    <Box
      alignItems="center"
      dangerouslySetInlineStyle={{
        __style: { backgroundImage: 'url("https://i.ibb.co/7bQQYkX/stock2.jpg")' },
      }}
      display="flex"
      height="100%"
      justifyContent="center"
      padding={8}
    >
      <Flex gap={4}>
        <Flex direction="column" gap={4}>
          <Box color="default" padding={1}>
            <Text>bgColor=transparentDarkGray</Text>
          </Box>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="transparentDarkGray" icon="saved" />
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="transparentDarkGray" hovered icon="saved" />
            <Box color="default" padding={1}>
              <Text size="100">hovered</Text>
            </Box>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="transparentDarkGray" focused icon="saved" />
            <Box color="default" padding={1}>
              <Text size="100">focused</Text>
            </Box>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Pog active bgColor="transparentDarkGray" icon="saved" />
            <Box color="default" padding={1}>
              <Text size="100">active</Text>
            </Box>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="transparentDarkGray" icon="saved" selected />
            <Box color="default" padding={1}>
              <Text size="100">selected</Text>
            </Box>
          </Flex>
        </Flex>
        <Flex direction="column" gap={4}>
          <Box color="default" padding={1}>
            <Text>bgColor=white</Text>
          </Box>

          <Flex alignItems="center" gap={2}>
            <Pog bgColor="white" icon="visit" />
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="white" hovered icon="visit" />
            <Box color="default" padding={1}>
              <Text size="100">hovered</Text>
            </Box>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="white" focused icon="visit" />
            <Box color="default" padding={1}>
              <Text size="100">focused</Text>
            </Box>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Pog active bgColor="white" icon="visit" />
            <Box color="default" padding={1}>
              <Text size="100">active</Text>
            </Box>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="white" icon="visit" selected />
            <Box color="default" padding={1}>
              <Text size="100">selected</Text>
            </Box>
          </Flex>
        </Flex>
        <Flex direction="column" gap={4}>
          <Box color="default" padding={1}>
            <Text>bgColor=transparent</Text>
          </Box>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="transparent" icon="saved" />
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="transparent" hovered icon="saved" />
            <Box color="default" padding={1}>
              <Text size="100">hovered</Text>
            </Box>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="transparent" focused icon="saved" />
            <Box color="default" padding={1}>
              <Text size="100">focused</Text>
            </Box>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Pog active bgColor="transparent" icon="saved" />
            <Box color="default" padding={1}>
              <Text size="100">active</Text>
            </Box>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="transparent" icon="saved" selected />
            <Box color="default" padding={1}>
              <Text size="100">selected</Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
