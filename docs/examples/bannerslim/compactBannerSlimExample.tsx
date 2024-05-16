import { ReactNode } from 'react';
import { BannerSlim, Box, Flex } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={{ column: 5, row: 0 }} width="100%">
        {['infoBare', 'successBare', 'warningBare', 'errorBare', 'recommendationBare'].map(
          (type) => (
            <BannerSlim
              key={type}
              iconAccessibilityLabel={type}
              message="This is a compact BannerSlim."
// @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"warning" | "info" | "error" | "success" | "recommendation" | "neutral" | "warningBare" | "errorBare" | "infoBare" | "successBare" | "recommendationBare" | undefined'.
              type={type}
            />
          ),
        )}
      </Flex>
    </Box>
  );
}
