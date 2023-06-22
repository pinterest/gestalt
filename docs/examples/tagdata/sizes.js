// @flow strict
import { type Node } from 'react';
import { Flex, TagData } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
      direction="column"
      gap={2}
    >
      <TagData text="Small TagData" size="sm" showCheckbox />
      <TagData text="Medium TagData" size="md" showCheckbox />
      <TagData text="Large Tagdata" size="lg" showCheckbox />
    </Flex>
  );
}
