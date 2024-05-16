import {ReactNode} from 'react';
import { Avatar, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Avatar
        accessibilityLabel="Shanice, Verified account"
        name="Shanice"
        size="lg"
        src="https://i.ibb.co/7tGKGvb/shanice.jpg"
        verified
      />
    </Flex>
  );
}
