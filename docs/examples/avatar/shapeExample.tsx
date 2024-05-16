import {ReactNode} from 'react';
import { Flex, Image, Mask } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Mask height={150} rounding={3} width={150}>
        <Image
          alt="Keerthi Avatar"
          color="#000"
          fit="contain"
          naturalHeight={1}
          naturalWidth={1}
          src="https://i.ibb.co/ZfCZrY8/keerthi.jpg"
        />
      </Mask>
    </Flex>
  );
}
