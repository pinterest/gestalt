import { ReactNode } from 'react';
import { Flex, TagData } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" gap={2} height="100%" justifyContent="center" width="100%" wrap>
      <TagData onRemove={() => {}} text="Impressions" />
      <TagData onRemove={() => {}} text="Spend" />
    </Flex>
  );
}
