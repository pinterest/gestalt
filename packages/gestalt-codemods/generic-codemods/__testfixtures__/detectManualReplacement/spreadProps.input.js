import { Box } from 'gestalt';

export default function TestComp() {
  const props = { color: 'red' };
  return (
    <Box {...props} />
  );
}
