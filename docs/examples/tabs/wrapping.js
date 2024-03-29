// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, Flex, Label, Switch, Tabs, Text } from 'gestalt';

export default function Example(): ReactNode {
  const [activeIndex, setActiveIndex] = useState(0);
  const [wrap, setWrap] = useState(false);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex alignItems="start" direction="column" gap={{ column: 4, row: 0 }}>
        <Flex gap={{ row: 4, column: 0 }}>
          <Label htmlFor="wrap">
            <Text>Wrap</Text>
          </Label>
          <Switch id="wrap" onChange={() => setWrap(!wrap)} switched={wrap} />
        </Flex>

        <Box borderStyle="sm" maxWidth={500} overflow="auto" padding={1}>
          <Tabs
            activeTabIndex={activeIndex}
            onChange={({ activeTabIndex, event }) => {
              event.preventDefault();
              setActiveIndex(activeTabIndex);
            }}
            tabs={[
              { href: 'https://pinterest.com', text: 'Boards for You' },
              { href: 'https://pinterest.com', text: 'Pins for You' },
              { href: 'https://pinterest.com', text: 'Following' },
              { href: 'https://pinterest.com', text: 'People to Follow' },
            ]}
            wrap={wrap}
          />
        </Box>
      </Flex>
    </Flex>
  );
}
