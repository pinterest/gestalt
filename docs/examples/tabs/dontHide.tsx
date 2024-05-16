import {ReactNode, useState} from 'react';
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
        tabs={[{ href: 'https://pinterest.com', text: 'Saved' }]}
      />
    </Flex>
  );
}
