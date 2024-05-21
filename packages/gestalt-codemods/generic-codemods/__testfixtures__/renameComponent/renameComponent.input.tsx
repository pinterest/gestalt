// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Box,ScrollableContainer } from 'gestalt';

export default function TestComp() {
  return (
    <ScrollableContainer height={200} overflow="scrollY">
      <ScrollableContainer>
        <Box />
      </ScrollableContainer>
    </ScrollableContainer>
  );
}
