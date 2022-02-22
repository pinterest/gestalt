import { Box as RenamedBox } from 'gestalt';

export default function TestComp() {
  return (
    <RenamedBox renameHeight={200}>
      <RenamedBox/>
    </RenamedBox>
  );
}
