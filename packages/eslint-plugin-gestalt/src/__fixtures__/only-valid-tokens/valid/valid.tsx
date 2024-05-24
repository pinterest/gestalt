// @ts-nocheck
import { Box } from 'gestalt'

export default function TestElement() {
  const a = 'var(--color-123)'
  return <ul>
    <li>Gestalt</li>
    <Box dangerouslySetInlineStyle={{ __style: {
      backgroundColor: 'var(--color-123)'
    }}}/>
  </ul>;
}
