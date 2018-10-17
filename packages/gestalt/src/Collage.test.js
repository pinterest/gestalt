// // @flow
import * as React from 'react';
import { create } from 'react-test-renderer';
import Collage from './Collage.js';

type CollageImageProps = {
  width: number,
  height: number,
  idx: number,
};

describe('<Collage />', () => {
  function CollageImage({ width, height, idx }: CollageImageProps) {
    return <div style={{ width, height }}>{idx}</div>;
  }

  const collageProps = {
    columns: 2,
    gutter: 2,
    height: 200,
    width: 300,
    Item: CollageImage,
  };

  it('should match the snapshot', () => {
    expect(create(<Collage {...collageProps} />).toJSON()).toMatchSnapshot();
  });

  it('should match the snapshot for 3 columns', () => {
    expect(
      create(<Collage {...collageProps} columns={3} />).toJSON()
    ).toMatchSnapshot();
  });

  it('should match the snapshot for 4 columns', () => {
    expect(
      create(<Collage {...collageProps} columns={4} />).toJSON()
    ).toMatchSnapshot();
  });

  it('should match the snapshot for 4 columns with a custom layout key', () => {
    expect(
      create(<Collage {...collageProps} columns={4} layoutKey={1} />).toJSON()
    ).toMatchSnapshot();
  });

  it('should match the snapshot when cover image is used', () => {
    expect(
      create(<Collage {...collageProps} cover />).toJSON()
    ).toMatchSnapshot();
  });
});
