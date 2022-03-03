import { Box as RenamedBox } from 'gestalt';

export default function TestComp() {
  return (
    <RenamedBox width={400} variant="error">
      <RenamedBox variant="error"/>
    </RenamedBox>
  );
}
