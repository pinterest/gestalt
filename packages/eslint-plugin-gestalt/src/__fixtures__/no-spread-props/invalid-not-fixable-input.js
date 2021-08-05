import { Box, Box as RenamedBox } from 'gestalt';

export default function TestElement(props) {

  return (
    <Box {...props} width={20}>
      <RenamedBox {...props} width={20} />
    </Box>
  );
}
