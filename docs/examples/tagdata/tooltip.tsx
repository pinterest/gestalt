import { Flex, TagData } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" gap={2} height="100%" justifyContent="center" width="100%">
      <TagData
        onRemove={() => {}}
        showCheckbox
        size="lg"
        text="CPM"
        // @ts-expect-error - TS2741 - Property 'children' is missing in type '{ text: string; }' but required in type 'ExtendedTooltipProps'.
        tooltip={{ text: 'Average cost per 1K paid impressions' }}
      />
      <TagData
        onRemove={() => {}}
        selected
        showCheckbox
        size="lg"
        text="MAU"
        // @ts-expect-error - TS2741 - Property 'children' is missing in type '{ text: string[]; }' but required in type 'ExtendedTooltipProps'.
        tooltip={{
          text: ['Monthly Active Users', 'The total monthly users over the last 30 days'],
        }}
      />
    </Flex>
  );
}
