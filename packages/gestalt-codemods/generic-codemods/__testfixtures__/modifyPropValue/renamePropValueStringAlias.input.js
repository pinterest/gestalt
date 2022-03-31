import { Box as RenamedBox, Flex } from 'gestalt';

export default function TestComp() {
  return (
    <RenamedBox width={400} color="red">
      <RenamedBox color="red"/>
      <Flex width={400} color="red"/>
    </RenamedBox>
  );
}
