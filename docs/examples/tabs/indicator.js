// @flow strict
import { type Node, useState } from 'react';
import { Flex, Tabs } from 'gestalt';

export default function Example(): Node {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Flex height="100%" width="100%" alignItems="center" justifyContent="center">
      <Tabs
        activeTabIndex={activeIndex}
        onChange={({ activeTabIndex, event }) => {
          event.preventDefault();
          setActiveIndex(activeTabIndex);
        }}
        tabs={[
          { href: 'https://pinterest.com', text: 'Boards for You' },
          { href: 'https://pinterest.com', text: 'Pins for You', indicator: 'dot' },
          { href: 'https://pinterest.com', text: 'Following', indicator: 3 },
          { href: 'https://pinterest.com', text: 'People to Follow', indicator: 112 },
        ]}
        wrap
      />
    </Flex>
  );
}
