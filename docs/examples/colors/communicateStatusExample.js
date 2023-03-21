// @flow strict
import { type Node } from 'react';
import { Badge, Flex } from 'gestalt';

export default function CommunicateStatusExample(): Node {
  return (
    <Flex
      direction="column"
      gap={{
        row: 0,
        column: 3,
      }}
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Badge type="info" text="Info" />
      <Badge type="recommendation" text="Recommendation" />
      <Badge type="success" text="Success" />
      <Badge type="warning" text="Warning" />
      <Badge type="error" text="Error" />
      <Badge type="neutral" text="Neutral" />
    </Flex>
  );
}
