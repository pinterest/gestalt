import { ReactNode } from 'react';
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
{ /* @ts-expect-error - TS2741 - Property 'onRemove' is missing in type '{ showCheckbox: true; size: "sm"; text: string; }' but required in type 'TagDataProps'. */}
      <TagData showCheckbox size="sm" text="Small TagData" />
{ /* @ts-expect-error - TS2741 - Property 'onRemove' is missing in type '{ showCheckbox: true; size: "md"; text: string; }' but required in type 'TagDataProps'. */}
      <TagData showCheckbox size="md" text="Medium TagData" />
{ /* @ts-expect-error - TS2741 - Property 'onRemove' is missing in type '{ showCheckbox: true; size: "lg"; text: string; }' but required in type 'TagDataProps'. */}
      <TagData showCheckbox size="lg" text="Large Tagdata" />
    </Flex>
  );
}
