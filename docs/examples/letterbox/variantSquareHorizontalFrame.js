// @flow strict
import { type Node } from 'react';
import { Flex, Image, Letterbox } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Letterbox width={300} height={200} contentAspectRatio={1}>
        <Image
          alt="Example image"
          src="https://i.ibb.co/d0pQsJz/stock3.jpg"
          naturalWidth={1}
          naturalHeight={1}
        />
      </Letterbox>
    </Flex>
  );
}
