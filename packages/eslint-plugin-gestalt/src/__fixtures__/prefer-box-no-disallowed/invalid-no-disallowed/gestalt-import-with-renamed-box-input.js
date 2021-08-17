import { Box as RenamedBox } from 'gestalt';
export default function TestElement() {
  return (
    <RenamedBox>
      <div role="button">
        <RenamedBox />
      </div>
    </RenamedBox>
  );
}
