import { ReactNode } from 'react';
import { Flex, IconButtonLink } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <IconButtonLink
        accessibilityLabel=""
        href="#"
        icon="visit"
        onClick={({ event, dangerouslyDisableOnNavigation }) => {
          event.preventDefault();
          // @ts-expect-error - TS2722 - Cannot invoke an object which is possibly 'undefined'.
          dangerouslyDisableOnNavigation();
        }}
        target="blank"
        tooltip={{ text: 'Besuchen Sie Pinterest' }}
      />
    </Flex>
  );
}
