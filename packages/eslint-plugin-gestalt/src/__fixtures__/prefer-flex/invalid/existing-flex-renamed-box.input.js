import { Box as GestaltBox, Flex } from 'gestalt';

export default function TestElement() {
  return (
    <Flex>
      <GestaltBox marginBottom={3} rounding={2} />
      <GestaltBox display="flex" alignItems="center" />
    </Flex>
  );
}
