import {ReactNode, useState} from 'react';
import { Flex, Heading, Label, Switch, Text } from 'gestalt';

export default function SwitchExample() {
  const [switched1, setSwitched1] = useState(false);
  const [switched2, setSwitched2] = useState(true);
  const [switched3, setSwitched3] = useState(true);

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Flex direction="column" gap={2} maxWidth={300} width="100%">
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
            <Switch id="boardfood" onChange={() => setSwitched1(!switched1)} switched={switched1} />
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
              id="boardoutfits"
              onChange={() => setSwitched2(!switched2)}
              switched={switched2}
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
              id="boardhomedecor"
              onChange={() => setSwitched3(!switched3)}
              switched={switched3}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
