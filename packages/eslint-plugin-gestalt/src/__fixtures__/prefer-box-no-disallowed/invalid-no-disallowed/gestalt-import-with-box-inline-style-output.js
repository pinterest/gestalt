import { Box } from 'gestalt';
export default function TestElement() {
  return (
    <Box>
      <Box onBlur={() => {}} dangerouslySetInlineStyle={{ __style: { marginTop: 200 } }}>
        <Box />
      </Box>
    </Box>
  );
}
