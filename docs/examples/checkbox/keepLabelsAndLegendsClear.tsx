import {ReactNode, useState} from 'react';
import { Box, Checkbox, Fieldset, Flex, Icon, Text, Tooltip } from 'gestalt';

export default function Example() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={{ column: 4, row: 0 }}>
        <Text size="400" weight="bold">
          How do you like your eggs?
        </Text>
        <Text>Select all the options that apply</Text>
        <Fieldset
          legend="How do you like your eggs? Select all the options that apply"
          legendDisplay="hidden"
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
            <Flex alignItems="center" gap={{ row: 2, column: 0 }}>
              <Checkbox
                checked={checked3}
                id="Scramboiled"
                label="Scramboiled"
                onChange={({ checked }) => setChecked3(checked)}
              />
              <Tooltip idealDirection="up" text="A hardboiled egg that is then scrambled">
                <Icon accessibilityLabel="" color="default" icon="info-circle" size={14} />
              </Tooltip>
            </Flex>
          </Flex>
        </Fieldset>
      </Flex>
    </Box>
  );
}
