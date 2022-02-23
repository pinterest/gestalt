// @flow strict
import { type Node } from 'react';
import { Flex, Checkbox, Box } from 'gestalt';

export default function AvatarGroupSpec(): Node {
  return (
    <Box color="white" display="inlineBlock" padding={1}>
      <Flex direction="column" gap={2}>
        <Checkbox
          checked
          id="english-info"
          label="English"
          subtext="USA, India, and Pakistan have the top number of English speakers "
          onChange={() => {}}
        />
        <Checkbox
          checked={false}
          id="spanish-info"
          label="Spanish"
          subtext="Mexico, Colombia, and Spain are the top three Spanish-speaking countries"
          onChange={() => {}}
        />
      </Flex>
    </Box>
  );
}
