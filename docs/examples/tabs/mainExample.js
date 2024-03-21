// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Flex, Tabs } from 'gestalt';

export default function Example(): ReactNode {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Flex alignContent="center" height="100%" justifyContent="center">
      <Tabs
        activeTabIndex={activeIndex}
        onChange={({ activeTabIndex }) => setActiveIndex(activeTabIndex)}
        tabs={[
          { href: '#', text: 'Explore' },
          { href: '#', text: 'Shop', indicator: 'dot' },
          { href: '#', text: 'Profiles' },
        ]}
        wrap
      />
    </Flex>
  );
}
