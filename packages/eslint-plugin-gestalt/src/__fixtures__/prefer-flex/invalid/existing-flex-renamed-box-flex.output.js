import { Box as GestaltBox, Flex as RenamedFlex } from 'gestalt';

export default function TestElement() {
  return (
    <RenamedFlex>
      <GestaltBox marginBottom={3} rounding={2} />
      <RenamedFlex alignItems="center" justifyContent="start" />
    </RenamedFlex>
  );
}
