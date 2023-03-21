// @flow strict
import { type Node } from 'react';
import { Button, Flex, IconButton } from 'gestalt';

export default function DistinctionExample(): Node {
  return (
    <Flex
      gap={{
        row: 4,
        column: 0,
      }}
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <IconButton icon="speech" iconColor="darkGray" size="md" accessibilityLabel="Comment" />
      <Button color="gray" text="Visit" />
      <Button color="red" text="Save" />
      <IconButton icon="share" iconColor="darkGray" accessibilityLabel="Share" size="md" />
    </Flex>
  );
}
