import {ReactNode} from 'react';
import { Button, Flex, IconButton } from 'gestalt';

export default function DistinctionExample() {
  return (
    <Flex
      alignItems="center"
      gap={{
        row: 4,
        column: 0,
      }}
      height="100%"
      justifyContent="center"
    >
      <IconButton accessibilityLabel="Comment" icon="speech" iconColor="darkGray" size="md" />
      <Button color="gray" text="Visit" />
      <Button color="red" text="Save" />
      <IconButton accessibilityLabel="Share" icon="share" iconColor="darkGray" size="md" />
    </Flex>
  );
}
