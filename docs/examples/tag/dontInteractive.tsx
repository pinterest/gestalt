import { ReactNode } from 'react';
import { Flex, Tag, TapArea } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <TapArea fullWidth={false}>
        <Tag disabled onRemove={() => {}} text="Visit Pinterest" />
      </TapArea>
    </Flex>
  );
}
