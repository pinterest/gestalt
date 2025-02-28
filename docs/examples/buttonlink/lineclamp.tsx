import { Box, ButtonLink, Flex } from 'gestalt';

export default function Example() {
  return (
    <Box padding={2}>
      <Flex direction="column" gap={2} height="100%">
        <Box width="100%">
          <ButtonLink
            accessibilityLabel="Visit Pinterest's Academy"
            fullWidth
            href="https://www.pinterest.com/"
            iconEnd="visit"
            size="lg"
            text="https://www.pinterestacademy.com/student/catalog"
          />
        </Box>
        <Box width={250}>
          <ButtonLink
            accessibilityLabel="Visit Pinterest's Academy"
            fullWidth
            href="https://www.pinterest.com/"
            iconEnd="visit"
            lineClamp={1}
            size="lg"
            text="https://www.pinterestacademy.com/student/catalog"
          />
        </Box>
        <Box width="100%">
          <ButtonLink
            accessibilityLabel="Visit Pinterest's Academy"
            fullWidth
            href="https://www.pinterest.com/"
            iconEnd="visit"
            size="sm"
            text="https://www.pinterestacademy.com/student/catalog"
          />
        </Box>
        <Box width={250}>
          <ButtonLink
            accessibilityLabel="Visit Pinterest's Academy"
            fullWidth
            href="https://www.pinterest.com/"
            iconEnd="visit"
            lineClamp={1}
            size="sm"
            text="https://www.pinterestacademy.com/student/catalog"
          />
        </Box>
      </Flex>
    </Box>
  );
}
