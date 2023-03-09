// @flow strict
import { type Node, useState } from 'react';
import { Flex, Heading, Label, Switch, Text } from 'gestalt';

export default function SwitchExample(): Node {
  const [switched1, setSwitched1] = useState(false);
  const [switched2, setSwitched2] = useState(true);
  const [switched3, setSwitched3] = useState(true);

  return (
    <Flex alignItems="center" justifyContent="center" height="100%" width="100%">
      <Flex direction="column" gap={2} width="100%" maxWidth={300}>
        <Heading size="300">Tune your home feed</Heading>
        <Text>
          Turn off any boards that you don&apos;t want us to use for your home feed recommendations
        </Text>
        <Flex direction="column" gap={4}>
          <Flex alignItems="center">
            <Flex.Item flex="grow">
              <Label htmlFor="boardfood">
                <Flex direction="column" gap={1}>
                  <Text>Food</Text>
                  <Text size="100">55 pins · 1 section</Text>
                </Flex>
              </Label>
            </Flex.Item>
            <Switch switched={switched1} onChange={() => setSwitched1(!switched1)} id="boardfood" />
          </Flex>

          <Flex alignItems="center">
            <Flex.Item flex="grow">
              <Label htmlFor="boardoutfits">
                <Flex direction="column" gap={1}>
                  <Text>Outfits</Text>
                  <Text size="100">138 pins · 5 sections</Text>
                </Flex>
              </Label>
            </Flex.Item>
            <Switch
              switched={switched2}
              onChange={() => setSwitched2(!switched2)}
              id="boardoutfits"
            />
          </Flex>

          <Flex alignItems="center">
            <Flex.Item flex="grow">
              <Label htmlFor="boardhomedecor">
                <Flex direction="column" gap={1}>
                  <Text>Home Decor</Text>
                  <Text size="100">33 pins · 2 sections</Text>
                </Flex>
              </Label>
            </Flex.Item>
            <Switch
              onChange={() => setSwitched3(!switched3)}
              id="boardhomedecor"
              switched={switched3}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
