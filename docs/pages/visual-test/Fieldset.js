// @flow strict
import { type Node } from 'react';
import { Box, Fieldset, Flex, Checkbox } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <Box padding={1}>
      <Fieldset legend="What languages would you like to learn?" id="fieldset-error-message">
        <Flex direction="column" gap={2}>
          <Checkbox
            id="english-info"
            label="English"
            subtext="USA has the top number of English speakers "
            name="languages"
            onChange={() => {}}
          />
          <Checkbox
            id="spanish-info"
            label="Spanish"
            subtext="Mexico is the top Spanish speaking country"
            name="languages"
            onChange={() => {}}
          />
        </Flex>
      </Fieldset>
    </Box>
  );
}
