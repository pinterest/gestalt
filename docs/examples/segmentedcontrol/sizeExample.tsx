import { ReactNode, useState } from 'react';
import { Box, Flex, Heading, Icon, SegmentedControl, Switch, Text } from 'gestalt';

export default function SegmentedControlExample() {
  const [showIcons, setShowIcons] = useState(false);
  const [item1Index, setItem1Index] = useState(0);
  const [item2Index, setItem2Index] = useState(0);
  const [item3Index, setItem3Index] = useState(0);
  const textItems = ['All', 'Published', 'Drafts'];

  const iconItems = ['music-on', 'video-camera'].map((p) => (
    <Icon key="icon" accessibilityLabel={p} color="default" icon={p} />
  ));
  const items = showIcons ? iconItems : textItems;

  return (
    <Box padding={8} width="60%">
      <Flex alignItems="center" gap={2} height={48}>
        <Text> Show Icons</Text>
        <Switch
          id="showIcons"
          name="showIcons"
          onChange={({ value }) => setShowIcons(value)}
          switched={showIcons}
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
            selectedItemIndex={item1Index}
            size="sm"
          />
        </Flex>

        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Heading size="300">md</Heading>
          <SegmentedControl
            items={items}
            onChange={({ activeIndex }) => {
              setItem2Index(activeIndex);
            }}
            responsive
            selectedItemIndex={item2Index}
            size="md"
          />
        </Flex>
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Heading size="300">lg</Heading>
          <SegmentedControl
            items={items}
            onChange={({ activeIndex }) => {
              setItem3Index(activeIndex);
            }}
            responsive
            selectedItemIndex={item3Index}
            size="lg"
          />
        </Flex>
      </Flex>
    </Box>
  );
}
