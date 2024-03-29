// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, Checkbox, Fieldset, Flex, Text } from 'gestalt';

export default function Example(): ReactNode {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={{ column: 4, row: 0 }}>
        <Text size="400" weight="bold">
          Which one?
        </Text>
        <Fieldset legend="Which one?" legendDisplay="hidden">
          <Flex direction="column" gap={{ column: 2, row: 0 }}>
            <Checkbox
              checked={checked1}
              id="Overeasy2"
              label="Overeasy with a touch of salt and maybe a slice of bacon on top that isn't fully cooked and has no pepper."
              onChange={({ checked }) => setChecked1(checked)}
            />
            <Checkbox
              checked={checked2}
              id="Sunny2"
              label="Sunny side up"
              onChange={({ checked }) => setChecked2(checked)}
            />
            <Checkbox
              checked={checked3}
              id="Scramboiled3"
              label="Scramboiled--this is when you boil an egg, then you scrambled it in the pan along with the shells."
              onChange={({ checked }) => setChecked3(checked)}
            />
          </Flex>
        </Fieldset>
      </Flex>
    </Box>
  );
}
