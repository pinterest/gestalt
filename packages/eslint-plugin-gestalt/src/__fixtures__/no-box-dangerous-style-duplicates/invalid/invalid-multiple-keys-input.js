import { Box } from 'gestalt';

export default function TestElement() {
  return (
    <Box
      bottom
      dangerouslySetInlineStyle={{
        __style: {
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          top: 0,
          'z-index': 1,
        },
      }}
    />
  );
}
