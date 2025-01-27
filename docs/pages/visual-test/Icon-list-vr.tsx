import { Box, ColorSchemeProvider, ExperimentProvider, Flex, Icon, Text } from 'gestalt';
import icons from '../../../packages/gestalt/src/icons-vr-theme/index';

export default function Snapshot() {
  return (
    <ExperimentProvider
      value={{ 'web_gestalt_visualrefresh': { anyEnabled: true, group: 'enabled' } }}
    >
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
    </ExperimentProvider>
  );
}
