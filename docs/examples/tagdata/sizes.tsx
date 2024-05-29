import { Flex, TagData } from 'gestalt';

export default function Example() {
  return (
    <Flex
      alignItems="center"
      direction="column"
      gap={2}
      height="100%"
      justifyContent="center"
      width="100%"
    >
      <TagData showCheckbox size="sm" text="Small TagData" />
      <TagData showCheckbox size="md" text="Medium TagData" />
      <TagData showCheckbox size="lg" text="Large Tagdata" />
    </Flex>
  );
}
