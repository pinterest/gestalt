import { Box } from 'gestalt';

export default function TestComponent() {
  const displayVar = 'flex';
  return <Box alignContent="start" display={displayVar} />;
}
