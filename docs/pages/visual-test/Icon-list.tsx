import { ReactNode } from 'react';
import { Box, ColorSchemeProvider, Flex, Icon } from 'gestalt';

export default function Snapshot() {
// @ts-expect-error - TS2339 - Property 'icons' does not exist on type 'FunctionComponent<IconProps>'.
  const { icons } = Icon;

  return (
    <ColorSchemeProvider colorScheme="light">
      <Box color="default" height={600} width={575}>
        <Flex
          gap={{
            row: 1,
            column: 0,
          }}
          wrap
        >
{ /* @ts-expect-error - TS7006 - Parameter 'name' implicitly has an 'any' type. */}
          {icons.map((name) => (
            <Box key={name} padding={2}>
              <Icon accessibilityLabel="" color="default" icon={name} />
            </Box>
          ))}
        </Flex>
      </Box>
    </ColorSchemeProvider>
  );
}
