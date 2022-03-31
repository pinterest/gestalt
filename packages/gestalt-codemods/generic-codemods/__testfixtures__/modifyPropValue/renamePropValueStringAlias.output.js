import { Box as RenamedBox, Flex } from 'gestalt';

export default function TestComp() {
  return (
    <RenamedBox width={400} variant="error">
      <RenamedBox variant="error"/>
      <Flex width={400} color="red"/>
    </RenamedBox>
  );
}
