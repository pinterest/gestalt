import { Box as RenamedBox, Flex } from 'gestalt';

export default function TestComp() {
  return (
    <RenamedBox renameHeight={200}>
      <RenamedBox/>
      <Flex height={200} />
    </RenamedBox>
  );
}
