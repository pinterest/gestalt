// @ts-nocheck
import { Box } from 'gestalt';

export default function TestElement() {
  const getTableInlineStyle = () => `
.CustomColor tbody tr td > button[aria-label="collapse"] {
  background-color: var(--color-background-default);
}
`;

  return <div />;
}
