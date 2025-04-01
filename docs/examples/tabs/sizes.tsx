import { useState } from 'react';
import { Flex, Tabs } from 'gestalt';

export default function Example() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Flex alignContent="center" direction="column" height="100%" justifyContent="center">
      <Tabs
        activeTabIndex={activeIndex}
        onChange={({ event, activeTabIndex, dangerouslyDisableOnNavigation }) => {
          event?.preventDefault();
          dangerouslyDisableOnNavigation();
          setActiveIndex(activeTabIndex);
        }}
        size="sm"
        tabs={[
          { href: '#', text: 'Explore' },
          { href: '#', text: 'Shop', indicator: 'dot' },
          { href: '#', text: 'Profiles' },
        ]}
        wrap
      />

      <Tabs
        activeTabIndex={activeIndex}
        onChange={({ event, activeTabIndex, dangerouslyDisableOnNavigation }) => {
          event?.preventDefault();
          dangerouslyDisableOnNavigation();
          setActiveIndex(activeTabIndex);
        }}
        size="lg"
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
