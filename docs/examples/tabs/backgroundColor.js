// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex, Label, Switch, Tabs, Text } from 'gestalt';

export default function Example(): Node {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransparent, setIsTransparent] = useState(false);

  return (
    <Flex
      gap={4}
      direction="column"
      height="100%"
      width="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Flex gap={{ row: 4, column: 0 }}>
        <Label htmlFor="color">
          <Text>Transparent background</Text>
        </Label>
        <Switch
          id="color"
          onChange={() => setIsTransparent((value) => !value)}
          switched={isTransparent}
        />
      </Flex>

      <Box borderStyle="sm" color="secondary" paddingX={3} paddingY={1}>
        <Tabs
          activeTabIndex={activeIndex}
          bgColor={isTransparent ? 'transparent' : 'default'}
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
          wrap
        />
      </Box>
    </Flex>
  );
}
