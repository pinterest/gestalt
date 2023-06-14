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
          { href: 'https://pinterest.com', text: 'Explore' },
          { href: 'https://pinterest.com', text: 'Shop' },
          { href: 'https://pinterest.com', text: 'Profiles' },
        ]}
      />
    </Flex>
  );
}
