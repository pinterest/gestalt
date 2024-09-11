import { Box, Collage, Flex, Image, Mask } from 'gestalt';

const coverImage = {
  color: '#000',
  naturalHeight: 806,
  naturalWidth: 564,
  src: 'https://i.ibb.co/jVR29XV/stock5.jpg',
} as const;
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

export default function Example() {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Box color="secondary" height={300} width={300}>
        <Collage
          columns={3}
          cover
          gutter={8}
          height={300}
          renderImage={({ index, width, height }) => {
            const image = index === 0 ? coverImage : nonCoverImages[index - 1];
            return (
              <Mask height={height} width={width}>
                {image ? (
                  <Image
                    alt="cover image"
                    color={image.color}
                    fit="cover"
                    naturalHeight={image.naturalHeight}
                    naturalWidth={image.naturalWidth}
                    src={image.src}
                  />
                ) : (
                  <Box color="secondary" height={height} width={width} />
                )}
              </Mask>
            );
          }}
          width={300}
        />
      </Box>
    </Flex>
  );
}
