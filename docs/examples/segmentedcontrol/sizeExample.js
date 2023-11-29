// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex, Heading, Icon, SegmentedControl, Switch, Text } from 'gestalt';

export default function SegmentedControlExample(): Node {
  const [showIcons, setShowIcons] = useState(false);
  const [item1Index, setItem1Index] = useState(0);
  const [item2Index, setItem2Index] = useState(0);
  const [item3Index, setItem3Index] = useState(0);
  const textItems = ['All', 'Published', 'Drafts'];

  const iconItems = ['music-on', 'video-camera'].map((p) => (
    <Icon key="icon" icon={p} accessibilityLabel={p} color="default" />
  ));
  const items = showIcons ? iconItems : textItems;

  return (
    <Box padding={8} width="60%">
      <Flex alignItems="center" height={48} gap={2}>
        <Text> Show Icons</Text>
        <Switch
          name="showIcons"
          switched={showIcons}
          onChange={({ value }) => setShowIcons(value)}
          id="showIcons"
        />
      </Flex>
      <Flex direction="column" gap={{ column: 6, row: 0 }}>
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Heading size="300">sm</Heading>
          <SegmentedControl
            items={items}
            onChange={({ activeIndex }) => {
              setItem1Index(activeIndex);
            }}
            size="sm"
            selectedItemIndex={item1Index}
          />
        </Flex>

        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Heading size="300">md</Heading>
          <SegmentedControl
            items={items}
            onChange={({ activeIndex }) => {
              setItem2Index(activeIndex);
            }}
            size="md"
            responsive
            selectedItemIndex={item2Index}
          />
        </Flex>
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Heading size="300">lg</Heading>
          <SegmentedControl
            items={items}
            onChange={({ activeIndex }) => {
              setItem3Index(activeIndex);
            }}
            size="lg"
            responsive
            selectedItemIndex={item3Index}
          />
        </Flex>
      </Flex>
    </Box>
  );
}
