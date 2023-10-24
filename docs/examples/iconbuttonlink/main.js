// @flow strict
import { type Node } from 'react';
import { Flex, IconButtonLink } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex width="100%" height="100%" justifyContent="center" alignItems="center">
      <IconButtonLink
        accessibilityLabel=""
        icon="visit"
        target="blank"
        href="#"
        tooltip={{ text: 'Besuchen Sie Pinterest' }}
        onClick={({ event, dangerouslyDisableOnNavigation }) => {
          event.preventDefault();
          dangerouslyDisableOnNavigation();
        }}
      />
    </Flex>
  );
}
