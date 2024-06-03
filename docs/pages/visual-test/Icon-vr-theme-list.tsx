import { Box, ColorSchemeProvider, Flex, Icon, Text } from 'gestalt';
import icons from 'gestalt/src/icons';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="light">
      <Box color="default" height={2000} width={2000}>
        <Flex
          gap={{
            row: 1,
            column: 0,
          }}
          wrap
        >
          {Object.keys(icons).map((name, idk) => (
            <Box key={name} padding={2} width={100}>
              <Text size="100">{idk}</Text>
              {/* @ts-expect-error - TS2322 */}
              <Icon accessibilityLabel="" color="default" icon={name} />
              <Text size="100">{name}</Text>
            </Box>
          ))}
        </Flex>
      </Box>
    </ColorSchemeProvider>
  );
}
