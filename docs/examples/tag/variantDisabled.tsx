import {ReactNode} from 'react';
import { Flex, Tag } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Tag disabled onRemove={() => {}} text="Disabled tag" />
    </Flex>
  );
}
