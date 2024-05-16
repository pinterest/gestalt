import { ReactNode } from 'react';
import { Flex, Image, Letterbox } from 'gestalt';

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Letterbox contentAspectRatio={1} height={200} width={300}>
        <Image
          alt="Example image"
          naturalHeight={1}
          naturalWidth={1}
          src="https://i.ibb.co/d0pQsJz/stock3.jpg"
        />
      </Letterbox>
    </Flex>
  );
}
