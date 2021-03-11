// @flow strict
import { Flex } from "gestalt";

export default function TestComp() {
  return (
    <div>
      <Flex alignItems="center" justifyContent="start">
        <div/>
      </Flex>

      <Flex alignItems="center" gap={4} justifyContent="start">
        <div/>
        <div/>
      </Flex>

      <Flex alignItems="end" justifyContent="start">
        <div/>
      </Flex>

      <Flex alignItems="center" justifyContent="between">
        <div/>
      </Flex>
    </div>
  );
}
