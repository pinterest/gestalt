// // @flow
import * as React from 'react';
import { create } from 'react-test-renderer';
import { Box, Image } from 'gestalt';
import Collage from './Collage.js';

describe('<Collage />', () => {
  const collageProps = {
    height: 200,
    imageAlt: 'collage',
    images: [],
    numCols: 2,
    width: 300,
  };

  const image = {
    color: '#FCDB9B',
    naturalHeight: 170,
    naturalWidth: 170,
    src: 'foo.png',
  };

  const brokenImage = {
    color: '#A8A8A8',
    naturalHeight: 0,
    naturalWidth: 170,
    src: 'foo.png',
  };

  it('should match the snapshot for 0 images', () => {
    expect(create(<Collage {...collageProps} />).toJSON()).toMatchSnapshot();
  });

  it('should match the snapshot for 1 image', () => {
    const images = [image];
    expect(
      create(<Collage {...collageProps} images={images} />).toJSON()
    ).toMatchSnapshot();
  });

  it('should match the snapshot for 2 images', () => {
    const images = [image, image];
    expect(
      create(<Collage {...collageProps} images={images} />).toJSON()
    ).toMatchSnapshot();
  });

  it('should match the snapshot for 100 images and 4 columns', () => {
    const images = new Array(10).fill(image);
    expect(
      create(<Collage {...collageProps} images={images} numCols={4} />).toJSON()
    ).toMatchSnapshot();
  });

  it('should match the snapshot when spacing (around)', () => {
    const images = new Array(10).fill(image);
    expect(
      create(
        <Collage
          {...collageProps}
          images={images}
          imagesAreRounded
          space={{ type: 'around', value: 2 }}
        />
      ).toJSON()
    ).toMatchSnapshot();
  });

  it('should match the snapshot when spacing (between)', () => {
    const images = new Array(10).fill(image);
    expect(
      create(
        <Collage
          {...collageProps}
          images={images}
          imagesAreRounded
          space={{ type: 'between', value: 2 }}
        />
      ).toJSON()
    ).toMatchSnapshot();
  });

  it('should match the snapshot when imagesAreRounded is true', () => {
    const images = new Array(10).fill(image);
    expect(
      create(
        <Collage {...collageProps} images={images} imagesAreRounded />
      ).toJSON()
    ).toMatchSnapshot();
  });

  it('should match the snapshot when one of the images has width=0 and height=0', () => {
    const images = [...new Array(10).fill(image), brokenImage];
    expect(
      create(<Collage {...collageProps} images={images} />).toJSON()
    ).toMatchSnapshot();
  });

  it('should match the snapshot when cover image is used', () => {
    const images = [...new Array(10).fill(image), brokenImage];
    expect(
      create(
        <Collage
          {...collageProps}
          images={images}
          renderCoverImage={({ width, height }) => (
            <Box width={width} height={height}>
              <Image
                alt="cover image"
                color="#000"
                fit="contain"
                naturalHeight={1}
                naturalWidth={1}
                src={image.src}
              />
            </Box>
          )}
        />
      ).toJSON()
    ).toMatchSnapshot();
  });
});
