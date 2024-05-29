// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Box as RenamedBox } from 'gestalt';

export default function TestComp() {
  return (
    <RenamedBox>
      <RenamedBox>
        <RenamedBox/>
      </RenamedBox>
    </RenamedBox>
  );
}
