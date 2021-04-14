// @flow strict
import { Column, Column as RenamedColumn } from 'gestalt';

export default function TestBox() {
  const a = true
  return (
    <Column span={12}>
      <RenamedColumn span={a ? 12 : 6} mdSpan={12} />
    </Column>
  );
}
