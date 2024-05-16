import { ReactNode } from 'react';
import { Flex, TagData } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" gap={2} height="100%" justifyContent="center" width="100%" wrap>
{ /* @ts-expect-error - TS2741 - Property 'onRemove' is missing in type '{ showCheckbox: true; text: string; }' but required in type 'TagDataProps'. */}
      <TagData showCheckbox text="Impressions" />
{ /* @ts-expect-error - TS2741 - Property 'onRemove' is missing in type '{ showCheckbox: true; text: string; }' but required in type 'TagDataProps'. */}
      <TagData showCheckbox text="CPM" />
{ /* @ts-expect-error - TS2741 - Property 'onRemove' is missing in type '{ showCheckbox: true; text: string; }' but required in type 'TagDataProps'. */}
      <TagData showCheckbox text="Spend" />
    </Flex>
  );
}
