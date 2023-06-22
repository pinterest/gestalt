// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex, Heading, Label, Switch, Tabs, Text } from 'gestalt';

export default function Example(): Node {
  const [activeIndex, setActiveIndex] = useState(1);
  const [switched, setSwitched] = useState(true);

  return (
    <Box padding={4}>
      <Flex width="100%" minWidth="100%" alignItems="center" direction="column" gap={4} flex="grow">
        <Flex gap={{ column: 4, row: 0 }} direction="column">
          <Heading size="200">Tune your home feed</Heading>
        </Flex>

        <Box paddingY={2}>
          <Tabs
            activeTabIndex={activeIndex}
            onChange={({ activeTabIndex, event }) => {
              event.preventDefault();
              setActiveIndex(activeTabIndex);
            }}
            tabs={[
              { href: 'https://pinterest.com', text: 'History' },
              { href: 'https://pinterest.com', text: 'Boards' },
              { href: 'https://pinterest.com', text: 'Topics' },
              { href: 'https://pinterest.com', text: 'Profiles' },
            ]}
          />
        </Box>

        {activeIndex === 1 ? (
          <Flex.Item flex="grow" minWidth="100%">
            <Flex flex="grow" justifyContent="between">
              <Text>Board name</Text>
              <Text>Recommendations</Text>
            </Flex>
          </Flex.Item>
        ) : undefined}

        {activeIndex === 1 ? (
          <Flex.Item flex="grow" minWidth="100%">
            <Flex flex="grow" justifyContent="between">
              <Label htmlFor="interiorDesignBoard">
                <Text weight="bold">Interior Design - 19 Pins</Text>
              </Label>
              <Switch
                onChange={() => setSwitched(!switched)}
                id="interiorDesignBoard"
                switched={switched}
              />
            </Flex>
          </Flex.Item>
        ) : undefined}
      </Flex>
    </Box>
  );
}
