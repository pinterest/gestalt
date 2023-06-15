// @flow strict
import { type Node } from 'react';
import { Flex, Image, Mask } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex height="100%" width="100%" alignItems="center" justifyContent="center">
      <Mask rounding={3} width={150} height={150}>
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
