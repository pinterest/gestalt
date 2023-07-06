// @flow strict
import { type Node } from 'react';
import { Flex, Image, Letterbox } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Letterbox width={200} height={200} contentAspectRatio={1}>
        <Image
          alt="Example image"
          src="https://i.ibb.co/FY2MKr5/stock6.jpg"
          naturalWidth={1}
          naturalHeight={1}
        />
      </Letterbox>
    </Flex>
  );
}
