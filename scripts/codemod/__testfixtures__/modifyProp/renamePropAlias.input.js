import { Box as RenamedBox } from 'gestalt';

export default function TestComp() {
  return (
    <RenamedBox height={200}>
      <RenamedBox/>
    </RenamedBox>
  );
}
