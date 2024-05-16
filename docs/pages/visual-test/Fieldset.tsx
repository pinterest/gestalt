import { ReactNode } from 'react';
import { Box, Checkbox, Fieldset, Flex } from 'gestalt';

export default function Snapshot() {
  return (
    <Box padding={1}>
      <Fieldset id="fieldset-error-message" legend="What languages would you like to learn?">
        <Flex
          direction="column"
          gap={{
            row: 0,
            column: 2,
          }}
        >
          <Checkbox
            helperText="USA has the top number of English speakers "
            id="english-info"
            label="English"
            name="languages"
            onChange={() => {}}
          />
          <Checkbox
            helperText="Mexico is the top Spanish speaking country"
            id="spanish-info"
            label="Spanish"
            name="languages"
            onChange={() => {}}
          />
        </Flex>
      </Fieldset>
    </Box>
  );
}
