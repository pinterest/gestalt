import { ReactNode } from 'react';
import { Button, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex
      alignItems="center"
      gap={{ column: 0, row: 2 }}
      height="100%"
      justifyContent="center"
      width="100%"
    >
      <Button color="gray" size="lg" text="Kontoeinst..." />
      <Button color="red" size="lg" text="Neues We..." />
    </Flex>
  );
}
