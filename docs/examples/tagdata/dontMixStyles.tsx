import { ReactNode } from 'react';
import { Flex, TagData } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" gap={2} height="100%" justifyContent="center" width="100%" wrap>
{ /* @ts-expect-error - TS2741 - Property 'onRemove' is missing in type '{ showCheckbox: true; size: "lg"; text: string; }' but required in type 'TagDataProps'. */}
      <TagData showCheckbox size="lg" text="Impressions" />
      <TagData onRemove={() => {}} size="sm" text="CPM" />
{ /* @ts-expect-error - TS2741 - Property 'onRemove' is missing in type '{ size: "md"; text: string; }' but required in type 'TagDataProps'. */}
      <TagData size="md" text="Spend" />
    </Flex>
  );
}
