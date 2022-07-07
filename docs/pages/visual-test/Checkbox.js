// @flow strict
import { type Node } from 'react';
import { Flex, Checkbox, Box } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <Box color="default" display="inlineBlock" padding={1}>
      <Flex direction="column" gap={2}>
        <Checkbox
          checked
          id="english-info"
          label="English"
          subtext="USA and India have the top number of English speakers"
          onChange={() => {}}
        />
        <Checkbox
          checked={false}
          id="spanish-info"
          label="Spanish"
          subtext="Mexico and Colombia have the top number of Spanish speakers"
          onChange={() => {}}
        />
      </Flex>
    </Box>
  );
}
