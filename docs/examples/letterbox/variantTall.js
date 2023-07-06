// @flow strict
import { type Node } from 'react';
import { Flex, Image, Letterbox } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Letterbox width={200} height={200} contentAspectRatio={564 / 806}>
        <Image
          alt="Example image"
          src="https://i.ibb.co/jVR29XV/stock5.jpg"
          naturalWidth={564}
          naturalHeight={806}
        />
      </Letterbox>
    </Flex>
  );
}
