import { Box, Button, Flex } from 'gestalt';

export default function Example() {
  return (
    <Box padding={2}>
      <Flex direction="column" gap={2} height="100%">
        <Box width="100%">
          <Button
            accessibilityLabel="Visit Pinterest's Academy"
            fullWidth
            selected={false}
            size="lg"
            text="https://www.pinterestacademy.com/student/catalog"
          />
        </Box>
        <Box width={250}>
          <Button
            accessibilityLabel="Visit Pinterest's Academy"
            fullWidth
            lineClamp={1}
            selected={false}
            size="lg"
            text="https://www.pinterestacademy.com/student/catalog"
          />
        </Box>
        <Box width="100%">
          <Button
            accessibilityLabel="Visit Pinterest's Academy"
            fullWidth
            selected={false}
            size="sm"
            text="https://www.pinterestacademy.com/student/catalog"
          />
        </Box>
        <Box width={250}>
          <Button
            accessibilityLabel="Visit Pinterest's Academy"
            fullWidth
            lineClamp={1}
            selected={false}
            size="sm"
            text="https://www.pinterestacademy.com/student/catalog"
          />
        </Box>
      </Flex>
    </Box>
  );
}
