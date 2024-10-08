import { Box, Flex, SearchGuideLink, Text } from 'gestalt';

export default function Example() {
  return (
    <Box padding={4}>
      <Flex gap={6} height="100%" width="100%" wrap>
        {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'].map((color) => (
          <Flex key={color} direction="column" gap={2}>
            <Box
              alignItems="center"
              borderStyle="sm"
              color="default"
              display="flex"
              height={200}
              justifyContent="center"
              rounding={4}
              width={200}
            >
              <SearchGuideLink
                backgroundContext={color === 'transparentWhiteText' ? 'dark' : 'light'}
                // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"gray" | "red" | "white" | "transparent" | "blue" | "semiTransparentWhite" | "transparentWhiteText" | undefined'
                color={color}
                href="https://pinterest.com"
                text="Save"
              />
            </Box>
            <Text size="200" weight="bold">
              color=&quot;{color}&quot;
            </Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
}
