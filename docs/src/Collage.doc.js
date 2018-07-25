// @flow
import * as React from 'react';
import stock1 from './images/stock1.jpg';
import stock2 from './images/stock2.jpg';
import stock3 from './images/stock3.jpg';
import stock4 from './images/stock4.jpg';
import stock5 from './images/stock5.jpg';
import stock6 from './images/stock6.jpg';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Collage"
    description="
Like Masonry, Collage creates a deterministic grid layout that can absolutely position and virtualize images.
"
  />
);

card(
  <PropTable
    props={[
      {
        name: 'height',
        type: 'number',
        description: 'Height of the collage',
        required: true,
      },
      {
        name: 'imageAlt',
        type: 'string',
        description: 'Accessibility label for every image',
      },
      {
        name: 'images',
        type:
          'Array<{| color?: string, naturalHeight: number, naturalWidth: number, src: string |}>',
        description: 'Images to show in the collage',
        required: true,
      },
      {
        name: 'imagesAreRounded',
        type: 'boolean',
        description: 'Use rounded corner for every image',
      },
      {
        name: 'numCols',
        type: 'number',
        description: 'Number of columns',
        required: true,
      },
      {
        name: 'renderCoverImage',
        type: '({ width: number, height: number }) => React.Node',
        description: `Render prop for rendering the first image (a.k.a cover image).`,
      },
      {
        name: 'space',
        type: '{| type: "around" | "between", value: number |}',
        description:
          'The type of spacing (similar to flexbox space-around and space-between) and the amount of vertical & horizontal padding around/between images',
      },
      {
        name: 'width',
        type: 'number',
        description: 'The URL of the captions track for the video (.vtt file)',
        required: true,
      },
    ]}
  />
);

card(
  <Example
    name="Basic example"
    defaultCode={`
<Collage
  height={300}
  images={[
    {
      color: 'rgb(111, 91, 77)',
      naturalHeight: 751,
      naturalWidth: 564,
      src: '${stock1}',
    },
    {
      color: 'rgb(231, 186, 176)',
      naturalHeight: 200,
      naturalWidth: 98,
      src: '${stock2}',
    },
    {
      color: '#000',
      naturalHeight: 300,
      naturalWidth: 200,
      src: '${stock3}',
    },
    {
      color: '#000',
      naturalHeight: 517,
      naturalWidth: 564,
      src: '${stock4}',
    },
    {
      color: '#000',
      naturalHeight: 806,
      naturalWidth: 564,
      src: '${stock5}',
    },
    {
      color: '#000',
      naturalHeight: 200,
      naturalWidth: 200,
      src: '${stock6}',
    },
  ]}
  numCols={3}
  width={300}
/>
`}
  />
);

card(
  <Example
    name="Space"
    description="
    You can add space between images.
    There are two types of spacing: space around and space between,
    which are similar to flexbox's space-around and space-between respectively.
"
    defaultCode={`
<Box display="flex" direction="row" wrap>
  {['around', 'between'].map((type) => (
    <Box key={type} paddingX={4}>
      <h3>Space type = {type}</h3>
      <Box color="gray" width={300} height={300}>
        <Collage
          height={300}
          images={[
            {
              color: 'rgb(111, 91, 77)',
              naturalHeight: 751,
              naturalWidth: 564,
              src: '${stock1}',
            },
            {
              color: 'rgb(231, 186, 176)',
              naturalHeight: 200,
              naturalWidth: 98,
              src: '${stock2}',
            },
            {
              color: '#000',
              naturalHeight: 300,
              naturalWidth: 200,
              src: '${stock3}',
            },
            {
              color: '#000',
              naturalHeight: 517,
              naturalWidth: 564,
              src: '${stock4}',
            },
            {
              color: '#000',
              naturalHeight: 806,
              naturalWidth: 564,
              src: '${stock5}',
            },
            {
              color: '#000',
              naturalHeight: 200,
              naturalWidth: 200,
              src: '${stock6}',
            },
          ]}
          numCols={3}
          space={{ type, value: 8 }}
          width={300}
        />
      </Box>
    </Box>
  ))}
</Box>
`}
  />
);

card(
  <Example
    name="Cover image and rounded corners"
    defaultCode={`
<Box color="gray" width={300} height={300}>
  <Collage
    height={300}
    images={[
      {
        color: 'rgb(111, 91, 77)',
        naturalHeight: 751,
        naturalWidth: 564,
        src: '${stock1}',
      },
      {
        color: 'rgb(231, 186, 176)',
        naturalHeight: 200,
        naturalWidth: 98,
        src: '${stock2}',
      },
    ]}
    imagesAreRounded
    numCols={3}
    renderCoverImage={({ width, height }) => (
      <Mask width={width} height={height} shape="rounded">
        <Image
          alt="cover image"
          src="${stock5}"
          color="#000"
          naturalHeight={806}
          naturalWidth={564}
          fit="cover"
        />
      </Mask>
    )}
    space={{ type: 'around', value: 8 }}
    width={300}
  />
</Box>
`}
  />
);

card(
  <Example
    name="Placeholders"
    description="Placeholders are used when there are not enough images."
    defaultCode={`
<Box color="gray" width={300} height={300}>
  <Collage
    height={300}
    images={[
      {
        color: 'rgb(111, 91, 77)',
        naturalHeight: 751,
        naturalWidth: 564,
        src: '${stock1}',
      },
      {
        color: 'rgb(231, 186, 176)',
        naturalHeight: 200,
        naturalWidth: 98,
        src: '${stock2}',
      },
    ]}
    imagesAreRounded
    numCols={3}
    space={{ type: 'around', value: 8 }}
    width={300}
  />
</Box>
`}
  />
);

export default cards;
