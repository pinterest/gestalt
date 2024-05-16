import { Box, Column, Text } from 'gestalt';

export default function Example() {
  return (
    <Box color="dark" height="100%" paddingY={2} width="100%">
      <Box marginBottom={2} paddingX={2}>
        <Text color="inverse">Content</Text>
      </Box>

      <Box
        color="tertiary"
        direction="row"
        display="flex"
        marginEnd={-2}
        marginStart={-2}
        paddingY={12}
        wrap
      >
        <Column span={12}>
          <Box marginBottom={4} paddingX={2}>
            <Text color="inverse">Row</Text>
          </Box>
        </Column>
        <Column span={6}>
          <Box paddingX={2}>
            <Box color="default" padding={4}>
              <Text color="dark">Column A</Text>
            </Box>
          </Box>
        </Column>
        <Column span={6}>
          <Box paddingX={2}>
            <Box color="default" padding={4}>
              <Text color="dark">Column B</Text>
            </Box>
          </Box>
        </Column>
      </Box>
    </Box>
  );
}
