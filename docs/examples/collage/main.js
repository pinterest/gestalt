// @flow strict
import { type Node as ReactNode } from 'react';
import { Collage, Flex, Image, Mask } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Collage
        columns={3}
        height={300}
        renderImage={({ index, width, height }) => {
          const images = [
            {
              color: 'rgb(111, 91, 77)',
              naturalHeight: 751,
              naturalWidth: 564,
              src: 'https://i.ibb.co/Lx54BCT/stock1.jpg',
            },
            {
              color: 'rgb(231, 186, 176)',
              naturalHeight: 200,
              naturalWidth: 98,
              src: 'https://i.ibb.co/7bQQYkX/stock2.jpg',
            },
            {
              color: '#000',
              naturalHeight: 300,
              naturalWidth: 200,
              src: 'https://i.ibb.co/d0pQsJz/stock3.jpg',
            },
            {
              color: '#000',
              naturalHeight: 517,
              naturalWidth: 564,
              src: 'https://i.ibb.co/SB0pXgS/stock4.jpg',
            },
            {
              color: '#000',
              naturalHeight: 806,
              naturalWidth: 564,
              src: 'https://i.ibb.co/jVR29XV/stock5.jpg',
            },
            {
              color: '#000',
              naturalHeight: 200,
              naturalWidth: 200,
              src: 'https://i.ibb.co/FY2MKr5/stock6.jpg',
            },
          ];
          const image = images[index] || {};
          return (
            <Mask height={height} wash width={width}>
              <Image
                alt="collage image"
                color={image.color}
                fit="cover"
                naturalHeight={image.naturalHeight}
                naturalWidth={image.naturalWidth}
                src={image.src}
              />
            </Mask>
          );
        }}
        width={300}
      />
    </Flex>
  );
}
