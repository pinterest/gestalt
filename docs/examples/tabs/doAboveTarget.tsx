import { useState } from 'react';
import { Box, Flex, Heading, Label, Switch, Tabs, Text } from 'gestalt';

export default function Example() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [switched, setSwitched] = useState(true);

  return (
    <Box padding={4}>
      <Flex alignItems="center" direction="column" flex="grow" gap={4} minWidth="100%" width="100%">
        <Flex direction="column" gap={{ column: 4, row: 0 }}>
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
                id="interiorDesignBoard"
                onChange={() => setSwitched(!switched)}
                switched={switched}
              />
            </Flex>
          </Flex.Item>
        ) : undefined}
      </Flex>
    </Box>
  );
}
