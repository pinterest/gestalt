import { Flex, TagData } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      {/* @ts-expect-error - TS2741 - Property 'onRemove' is missing in type '{ showCheckbox: true; text: string; }' but required in type 'TagDataProps'. */}
      <TagData showCheckbox text="The last 24 hours of activity in your account" />
    </Flex>
  );
}
