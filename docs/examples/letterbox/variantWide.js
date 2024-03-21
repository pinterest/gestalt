// @flow strict
import { type Node as ReactNode } from 'react';
import { Flex, Image, Letterbox } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Letterbox contentAspectRatio={564 / 517} height={200} width={200}>
        <Image
          alt="Example image"
          naturalHeight={517}
          naturalWidth={564}
          src="https://i.ibb.co/SB0pXgS/stock4.jpg"
        />
      </Letterbox>
    </Flex>
  );
}
