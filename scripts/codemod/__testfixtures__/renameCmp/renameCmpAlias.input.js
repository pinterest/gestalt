import { ScrollableContainer as CustomContainer, Box } from 'gestalt';

export default function TestComp() {
  return (
    <CustomContainer overflow="scrollY" height={200}>
      <Box/>
    </CustomContainer>
  );
}
