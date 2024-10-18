import React from 'react';
import { Flex, IconButtonLink } from 'gestalt';

export default function Example() {
  const reactRouterPath = '/iconbuttonlink';

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <IconButtonLink
        accessibilityLabel=""
        disabled
        href="https://gestalt.pinterest.systems/web/iconbuttonlink#Active-item"
        icon="visit"
        onClick={({ event, dangerouslyDisableOnNavigation }) => {
          event.preventDefault();
          dangerouslyDisableOnNavigation();
        }}
        target="blank"
      />
      <IconButtonLink
        accessibilityLabel=""
        active={reactRouterPath === '/iconbuttonlink' ? 'page' : undefined}
        disabled
        href="https://gestalt.pinterest.systems/web/iconbuttonlink#Active-item"
        icon="visit"
        onClick={({ event, dangerouslyDisableOnNavigation }) => {
          event.preventDefault();
          dangerouslyDisableOnNavigation();
        }}
        target="blank"
      />
    </Flex>
  );
}
