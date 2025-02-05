import { useState } from 'react';
import { Flex, Tabs } from 'gestalt';

export default function Example() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Tabs
        activeTabIndex={activeIndex}
        onChange={({ activeTabIndex, event }) => {
          event.preventDefault();
          setActiveIndex(activeTabIndex);
        }}
        tabs={[
          { href: 'https://pinterest.com', text: 'Boards for You', icon: 'board' },
          { href: 'https://pinterest.com', text: 'Pins for You', indicator: 'dot', icon: 'pin' },
          { href: 'https://pinterest.com', text: 'Following', indicator: 3, icon: 'people' },
          {
            href: 'https://pinterest.com',
            text: 'People to Follow',
            indicator: 112,
            icon: 'person-add',
          },
        ]}
        wrap
      />
    </Flex>
  );
}
