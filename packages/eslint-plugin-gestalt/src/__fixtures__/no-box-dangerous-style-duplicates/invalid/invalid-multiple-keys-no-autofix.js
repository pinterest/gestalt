import { Box } from 'gestalt';

export default function TestElement() {
  return (
    <Box
      dangerouslySetInlineStyle={{
        __style: {
          transform: true && 'translate(-50%, -50%)',
          backgroundColor: 'white',
          top: 0,
          'z-index': 1,
        },
      }}
    />
  );
}
