import { Box,ScrollableContainer } from 'gestalt';

export default function TestComp() {
  return (
    <ScrollableContainer overflow="scrollY" height={200}>
      <Box/>
    </ScrollableContainer>
  );
}
