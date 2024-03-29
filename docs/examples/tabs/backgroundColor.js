// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, Flex, Label, Switch, Tabs, Text } from 'gestalt';

export default function Example(): ReactNode {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransparent, setIsTransparent] = useState(false);

  return (
    <Flex
      alignItems="center"
      direction="column"
      gap={4}
      height="100%"
      justifyContent="center"
      width="100%"
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
