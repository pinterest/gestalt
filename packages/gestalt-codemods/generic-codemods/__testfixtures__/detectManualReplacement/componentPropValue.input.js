import { Dropdown, Flex } from 'gestalt';

export default function TestComp() {
  return (
    <Dropdown.Item color="red">
      <Dropdown.Item color="blue">
        <Dropdown.Item color="red"/>
        <Flex color="red"/>
      </Dropdown.Item>
    </Dropdown.Item>
  );
}
