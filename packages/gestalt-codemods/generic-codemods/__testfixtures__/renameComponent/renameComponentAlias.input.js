import { ScrollableContainer as CustomContainer, Box } from 'gestalt';

export default function TestComp() {
  return (
    <CustomContainer height={200} overflow="scrollY">
      <Box/>
    </CustomContainer>
  );
}
