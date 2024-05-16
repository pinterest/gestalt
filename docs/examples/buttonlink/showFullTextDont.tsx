import {ReactNode} from 'react';
import { ButtonLink, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex
      alignItems="center"
      gap={{ column: 0, row: 2 }}
      height="100%"
      justifyContent="center"
      width="100%"
    >
      <ButtonLink color="gray" href="https://www.pinterest.com/" size="lg" text="Kontoeinst..." />
      <ButtonLink color="red" href="https://www.pinterest.com/" size="lg" text="Neues We..." />
    </Flex>
  );
}
