import { Box, Flex as GestaltFlex } from 'gestalt';

export default function TestElement() {
  return (
    <GestaltFlex>
      <Box marginBottom={3} rounding={2} />
      <GestaltFlex alignItems="center" justifyContent="start" />
    </GestaltFlex>
  );
}
