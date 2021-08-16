import { Box as RenamedBox } from 'gestalt';
export default function TestElement() {
  return (
    <RenamedBox>
      <RenamedBox role="button">
        <RenamedBox />
      </RenamedBox>
    </RenamedBox>
  );
}
