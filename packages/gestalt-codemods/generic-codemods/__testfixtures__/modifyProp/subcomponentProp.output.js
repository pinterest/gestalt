import { Dropdown, Box, Flex } from 'gestalt';

export default function TestComp() {
  return (
    <Dropdown.Item renameHeight={200}>
      <Box/>
      <Flex height={200}/>
    </Dropdown.Item>
  );
}
