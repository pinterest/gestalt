import { Flex } from "gestalt";

export default function TestComp() {
  return (
    <div>
      <Flex alignItems="start" direction="column" justifyContent="center">
        <div/>
      </Flex>

      <Flex alignItems="start" direction="column" gap={6} justifyContent="center">
        <div/>
        <div/>
      </Flex>

      <Flex alignItems="end" direction="column" justifyContent="center">
        <div/>
      </Flex>

      <Flex alignItems="start" direction="column" justifyContent="between">
        <div/>
      </Flex>
    </div>
  );
}
