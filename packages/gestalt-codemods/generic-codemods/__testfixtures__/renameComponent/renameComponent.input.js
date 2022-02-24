import { ScrollableContainer, Box } from 'gestalt';

export default function TestComp() {
  return (
    <ScrollableContainer height={200} overflow="scrollY">
      <Box/>
    </ScrollableContainer>
  );
}
