// @flow strict
import { type Node, useState } from 'react';
import { Box, Checkbox, Fieldset, Flex, Label, Link, Text } from 'gestalt';

export default function Example(): Node {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Fieldset legend="Data personalization">
        <Flex direction="column" gap={{ column: 2, row: 0 }}>
          <Flex gap={2} alignItems="center">
            <Checkbox
              checked={checked1}
              id="sites2"
              onChange={({ checked }) => setChecked1(checked)}
            />
            <Text inline>
              <Label htmlFor="sites2">
                Use sites you visit to improve which recommendations and ads you see on Pinterest.
              </Label>
              <Link href="#" display="inline">
                Learn more
              </Link>
            </Text>
          </Flex>

          <Flex gap={2} alignItems="center">
            <Checkbox
              checked={checked2}
              id="partner2"
              onChange={({ checked }) => setChecked2(checked)}
            />
            <Text inline>
              <Label htmlFor="partner2">
                Use partner info to improve which recommendations and ads you see on Pinterest.
              </Label>
              <Link href="#" display="inline">
                Learn more
              </Link>
            </Text>
          </Flex>

          <Flex gap={2} alignItems="center">
            <Checkbox
              checked={checked3}
              id="activity2"
              onChange={({ checked }) => setChecked3(checked)}
            />
            <Text inline>
              <Label htmlFor="activity2">
                Use your activity to improve ads you see about Pinterest on other sites or apps you
                may visit.
              </Label>
              <Link href="#" display="inline">
                Learn more
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Fieldset>
    </Box>
  );
}
