// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Dropdown, Flex } from 'gestalt';

export default function TestComp() {
  return (
    <Dropdown.Item width={400} color="red">
      <Dropdown.Item color="red"/>
      <Flex width={400} color="red"/>
    </Dropdown.Item>
  );
}
