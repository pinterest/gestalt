import { Box, ScrollBoundaryContainer } from 'gestalt';

export default function TestComp() {
  return (
    <ScrollBoundaryContainer height={200} overflow="scrollY">
      <Box/>
    </ScrollBoundaryContainer>
  );
}
