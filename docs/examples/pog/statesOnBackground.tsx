import { Box, Flex, Pog, Text } from 'gestalt';

export default function Example() {
  return (
    <Box
      alignItems="center"
      dangerouslySetInlineStyle={{
        __style: { backgroundImage: 'url("https://i.ibb.co/7bQQYkX/stock2.jpg")' },
      }}
      display="flex"
      justifyContent="center"
      overflow="scroll"
      padding={2}
    >
      <Flex gap={12}>
        <Flex direction="column" gap={2}>
          <Box color="default" padding={1}>
            <Text>bgColor=transparentDarkGray</Text>
          </Box>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="transparentDarkGray" icon="saved" />
            <Box color="default" padding={1}>
              <Text size="100">default</Text>
            </Box>
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
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="transparentDarkGray" disabled icon="saved" />
            <Box color="default" padding={1}>
              <Text size="100">disabled</Text>
            </Box>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="transparentDarkGray" disabled icon="saved" selected />
            <Box color="default" padding={1}>
              <Text size="100">disabled selected</Text>
            </Box>
          </Flex>
          <Box color="default" padding={1}>
            <Text>bgColor=white</Text>
          </Box>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="white" icon="visit" />
            <Box color="default" padding={1}>
              <Text size="100">default</Text>
            </Box>
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
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="white" disabled icon="saved" />
            <Box color="default" padding={1}>
              <Text size="100">disabled</Text>
            </Box>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="white" disabled icon="saved" selected />
            <Box color="default" padding={1}>
              <Text size="100">disabled selected</Text>
            </Box>
          </Flex>
        </Flex>
        <Flex direction="column" gap={2}>
          <Box color="default" padding={1}>
            <Text>bgColor=washLight</Text>
          </Box>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="washLight" icon="saved" />
            <Box color="default" padding={1}>
              <Text size="100">default</Text>
            </Box>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="washLight" hovered icon="saved" />
            <Box color="default" padding={1}>
              <Text size="100">hovered</Text>
            </Box>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="washLight" focused icon="saved" />
            <Box color="default" padding={1}>
              <Text size="100">focused</Text>
            </Box>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Pog active bgColor="washLight" icon="saved" />
            <Box color="default" padding={1}>
              <Text size="100">active</Text>
            </Box>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="washLight" icon="saved" selected />
            <Box color="default" padding={1}>
              <Text size="100">selected</Text>
            </Box>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="washLight" disabled icon="saved" />
            <Box color="default" padding={1}>
              <Text size="100">disabled</Text>
            </Box>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="washLight" disabled icon="saved" selected />
            <Box color="default" padding={1}>
              <Text size="100">disabled selected</Text>
            </Box>
          </Flex>
          <Box color="default" padding={1}>
            <Text>bgColor=transparent</Text>
          </Box>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="transparent" icon="saved" />
            <Box color="default" padding={1}>
              <Text size="100">default</Text>
            </Box>
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
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="transparent" disabled icon="saved" />
            <Box color="default" padding={1}>
              <Text size="100">disabled</Text>
            </Box>
          </Flex>
          <Flex alignItems="center" gap={2}>
            <Pog bgColor="transparent" disabled icon="saved" selected />
            <Box color="default" padding={1}>
              <Text size="100">disabled selected</Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
