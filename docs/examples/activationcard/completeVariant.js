// @flow strict
import { type Node as ReactNode } from 'react';
import { ActivationCard, Box, Flex } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex>
        <ActivationCard
          message="Tag is installed and healthy"
          status="complete"
          statusMessage="Completed"
          title="Nice work"
        />
      </Flex>
    </Box>
  );
}
