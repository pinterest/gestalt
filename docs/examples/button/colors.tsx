import { ReactNode } from 'react';
import { Box, Button, Flex, Text } from 'gestalt';

export default function Example() {
  return (
    <Box padding={4}>
      <Flex gap={6} height="100%" width="100%" wrap>
        {['gray', 'red', 'blue', 'transparent'].map((color) => (
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
              {/* @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"gray" | "red" | "white" | "transparent" | "blue" | "semiTransparentWhite" | "transparentWhiteText" | undefined'. */}
              <Button color={color} size="lg" text="Save" />
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
