import { Box } from 'gestalt';

export default function TestElement() {
  return (
    <Box
      width="100%"
      dangerouslySetInlineStyle={{
        __style: {
          backgroundColor: 'white',
          top: 0,
          marginLeft: '8px',
        },
      }}
    >
      <Box />
    </Box>
  );
}
