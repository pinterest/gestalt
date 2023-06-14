// @flow strict
import { type Node } from 'react';
import { Box, Checkbox, Fieldset, Flex } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <Box padding={1}>
      <Fieldset legend="What languages would you like to learn?" id="fieldset-error-message">
        <Flex
          direction="column"
          gap={{
            row: 0,
            column: 2,
          }}
        >
          <Checkbox
            id="english-info"
            label="English"
            helperText="USA has the top number of English speakers "
            name="languages"
            onChange={() => {}}
          />
          <Checkbox
            id="spanish-info"
            label="Spanish"
            helperText="Mexico is the top Spanish speaking country"
            name="languages"
            onChange={() => {}}
          />
        </Flex>
      </Fieldset>
    </Box>
  );
}
