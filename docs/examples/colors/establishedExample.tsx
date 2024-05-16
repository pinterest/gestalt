import {ReactNode} from 'react';
import { Flex, Status } from 'gestalt';

export default function EstablishedExample() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center">
      <Status title="Campaign complete" type="ok" />
    </Flex>
  );
}
