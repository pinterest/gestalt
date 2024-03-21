// @flow strict
import { type Node as ReactNode } from 'react';
import { Badge, Flex } from 'gestalt';

export default function CommunicateStatusExample(): ReactNode {
  return (
    <Flex
      alignItems="center"
      direction="column"
      gap={{
        row: 0,
        column: 3,
      }}
      height="100%"
      justifyContent="center"
    >
      <Badge text="Info" type="info" />
      <Badge text="Recommendation" type="recommendation" />
      <Badge text="Success" type="success" />
      <Badge text="Warning" type="warning" />
      <Badge text="Error" type="error" />
      <Badge text="Neutral" type="neutral" />
    </Flex>
  );
}
