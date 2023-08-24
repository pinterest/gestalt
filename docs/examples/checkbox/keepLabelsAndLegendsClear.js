// @flow strict
import { type Node, useState } from 'react';
import { Box, Checkbox, Fieldset, Flex, Icon, Text, Tooltip } from 'gestalt';

export default function Example(): Node {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex direction="column" gap={{ column: 4, row: 0 }}>
        <Text size="400" weight="bold">
          How do you like your eggs?
        </Text>
        <Text>Select all the options that apply</Text>
        <Fieldset
          legendDisplay="hidden"
          legend="How do you like your eggs? Select all the options that apply"
        >
          <Flex direction="column" gap={{ column: 2, row: 0 }}>
            <Checkbox
              checked={checked1}
              id="Overeasy"
              label="Overeasy"
              onChange={({ checked }) => setChecked1(checked)}
            />
            <Checkbox
              checked={checked2}
              id="Sunny"
              label="Sunny side up"
              onChange={({ checked }) => setChecked2(checked)}
            />
            <Flex gap={{ row: 2, column: 0 }} alignItems="center">
              <Checkbox
                checked={checked3}
                id="Scramboiled"
                label="Scramboiled"
                onChange={({ checked }) => setChecked3(checked)}
              />
              <Tooltip text="A hardboiled egg that is then scrambled" idealDirection="up">
                <Icon icon="info-circle" accessibilityLabel="" size={14} color="default" />
              </Tooltip>
            </Flex>
          </Flex>
        </Fieldset>
      </Flex>
    </Box>
  );
}
