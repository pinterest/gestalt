import { Box, ButtonLink, Flex, Text } from 'gestalt';

export default function Example() {
  return (
    <Box padding={4}>
      <Flex gap={6} height="100%" width="100%" wrap>
        {['gray', 'red', 'transparent'].map((color) => {
          const colorCopy: 'gray' | 'red' | 'transparent' = color as 'gray' | 'red' | 'transparent';

          return (
            <Flex key={color} direction="column" gap={2}>
              <Box
                alignItems="center"
                borderStyle="sm"
                display="flex"
                height={200}
                justifyContent="center"
                rounding={4}
                width={200}
              >
                <ButtonLink
                  color={colorCopy}
                  href="https://pinterest.com"
                  iconEnd="visit"
                  onClick={({ event }) => event.preventDefault()}
                  size="lg"
                  text="Visit"
                />
              </Box>
              <Text size="200" weight="bold">
                {/* color=&quot;{color}&quot; */}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Box>
  );
}
