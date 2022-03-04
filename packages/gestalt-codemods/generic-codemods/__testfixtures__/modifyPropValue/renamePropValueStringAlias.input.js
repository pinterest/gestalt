import { Box as RenamedBox } from 'gestalt';

export default function TestComp() {
  return (
    <RenamedBox width={400} color="red">
      <RenamedBox color="red"/>
    </RenamedBox>
  );
}
