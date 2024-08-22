import { Box, Button, Flex, Text } from 'gestalt';

export default function Example() {
  const bgColors: { [key: string]: 'default' | 'tertiary' } = {
    gray: 'default',
    red: 'default',
    blue: 'default',
    transparent: 'default',
    transparentWhiteText: 'tertiary',
  };

  return (
    <Box padding={4}>
      <Flex gap={6} height="100%" width="100%" wrap>
        {['gray', 'red', 'blue', 'transparent', 'transparentWhiteText'].map((color) => (
          <Flex key={color} direction="column" gap={2}>
            <Box
              alignItems="center"
              borderStyle="sm"
              color={bgColors[color]}
              display="flex"
              height={200}
              justifyContent="center"
              rounding={4}
              width={200}
            >
              <Button
                backgroundContext={color === 'transparentWhiteText' ? 'dark' : 'light'}
                // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"gray" | "red" | "white" | "transparent" | "blue" | "semiTransparentWhite" | "transparentWhiteText" | undefined'
                color={color}
                size="lg"
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
