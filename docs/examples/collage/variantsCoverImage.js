// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Collage, Flex, Image, Mask } from 'gestalt';

const coverImage = {
  color: '#000',
  naturalHeight: 806,
  naturalWidth: 564,
  src: 'https://i.ibb.co/jVR29XV/stock5.jpg',
};
const nonCoverImages = [
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
];

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box color="secondary" width={300} height={300}>
        <Collage
          columns={3}
          cover
          height={300}
          gutter={8}
          renderImage={({ index, width, height }) => {
            const image = index === 0 ? coverImage : nonCoverImages[index - 1];
            return (
              <Mask width={width} height={height}>
                <Image
                  alt="cover image"
                  src={image.src}
                  color={image.color}
                  naturalHeight={image.naturalHeight}
                  naturalWidth={image.naturalWidth}
                  fit="cover"
                />
              </Mask>
            );
          }}
          width={300}
        />
      </Box>
    </Flex>
  );
}
