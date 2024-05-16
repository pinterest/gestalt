import {ReactNode} from 'react';
import { ActivationCard, Box, Flex } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
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
