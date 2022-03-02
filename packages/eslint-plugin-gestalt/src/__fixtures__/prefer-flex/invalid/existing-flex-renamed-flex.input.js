import { Box, Flex as GestaltFlex } from 'gestalt';

export default function TestElement() {
  return (
    <GestaltFlex>
      <Box marginBottom={3} rounding={2} />
      <Box display="flex" alignItems="center" />
    </GestaltFlex>
  );
}
