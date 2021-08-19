import { Box as RenamedBox } from 'gestalt';
export default function TestElement() {
  return (
    <RenamedBox>
      <div onBlur={() => {}}>
        <RenamedBox />
      </div>
    </RenamedBox>
  );
}
