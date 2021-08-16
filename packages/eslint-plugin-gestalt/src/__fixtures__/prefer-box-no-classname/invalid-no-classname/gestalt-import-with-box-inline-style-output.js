import { Box } from 'gestalt';
export default function TestElement() {
  return (
    <Box>
      <Box role="button" dangerouslySetInlineStyle={{ __style: { marginTop: 200 } }}>
        <Box />
      </Box>
    </Box>
  );
}
