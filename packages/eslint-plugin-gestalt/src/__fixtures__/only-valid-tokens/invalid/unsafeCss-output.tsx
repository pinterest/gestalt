// @ts-nocheck
import { TOKEN_COLOR_BACKGROUND_DEFAULT } from 'gestalt-design-tokens';
import { Box } from 'gestalt';

export default function TestElement() {
  const getTableInlineStyle = () => `${TOKEN_COLOR_BACKGROUND_DEFAULT}` + `
.CustomColor tbody tr td > button[aria-label="collapse"] {
  background-color: var(--color-background-default);
}
`;

  return <div />;
}
