import { Dropdown, Flex } from 'gestalt';

export default function TestComp() {
  return (
    <Dropdown.Item width={400} variant="error">
      <Dropdown.Item variant="error"/>
      <Flex width={400} color="red"/>
    </Dropdown.Item>
  );
}
