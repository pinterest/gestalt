import { Box as RenamedBox } from 'gestalt';
export default function TestElement() {
  return (
    <RenamedBox>
      <RenamedBox onBlur={() => {}}>
        <RenamedBox />
      </RenamedBox>
    </RenamedBox>
  );
}
