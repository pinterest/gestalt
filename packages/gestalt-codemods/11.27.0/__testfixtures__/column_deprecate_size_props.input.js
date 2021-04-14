// @flow strict
import { Column, Column as RenamedColumn } from 'gestalt';

export default function TestBox() {
  const a = true
  return (
    <Column xs={12}>
      <RenamedColumn xs={a ? 12 : 6} md={12} />
    </Column>
  );
}
