import { Box, FixedZIndex } from 'gestalt';

export default function TestElement() {
  return <Box zIndex={new FixedZIndex(1000)} />;
}
