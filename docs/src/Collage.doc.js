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
        name: 'columns',
        type: 'number',
        description: 'Number of columns',
        required: true,
      },
      {
        name: 'cover',
        type: 'boolean',
        description: `Whether or not the first image is a cover image`,
        defaultValue: false,
      },
      {
        name: 'gutter',
        type: 'number',
        description: 'The amount of vertical & horizontal space between images',
        defaultValue: 0,
      },
      {
        name: 'height',
        type: 'number',
        description: 'Height of the collage',
        required: true,
      },
      {
        name: 'layoutKey',
        type: 'number',
        description: 'Key for the collage layout.',
        defaultValue: 0,
      },
      {
        name: 'renderImage',
        type:
          '({ width: number, height: number, index: number }) => React.Node',
        description: 'Render prop for the collage images',
        required: true,
      },
      {
        name: 'width',
        type: 'number',
        description: 'Width of the collage',
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
  columns={3}
  height={300}
  width={300}
  renderImage={({ index, width, height }) => {
    const images = [
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
    ];
    const image = images[index];
    return (
      <Mask wash width={width} height={height}>
        <Image
          alt="collage image"
          color={image.color || '#EFEFEF'}
          fit="cover"
          naturalHeight={image.naturalHeight}
          naturalWidth={image.naturalWidth}
          src={image.src}
        />
      </Mask>
    );
  }}
/>
`}
  />
);

card(
  <Example
    name="Layout key"
    description="Use a non-zero layout key for a different layout. For example, you can deterministically randomize layouts by passing `layoutKey` a hash of the collage content."
    defaultCode={`
<Box display="flex" wrap>
  {[0, 1, 2, 3].map((layoutKey) => (
    <Box key={layoutKey} padding={2}>
      <Box><Text>layoutKey = {layoutKey}</Text></Box>
      <Collage
        columns={3}
        height={150}
        width={150}
        layoutKey={layoutKey}
        renderImage={({ index, width, height }) => {
          const images = [
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
          ];
          const image = images[index];
          return (
            <Mask wash width={width} height={height}>
              <Image
                alt="collage image"
                color={image.color || '#EFEFEF'}
                fit="cover"
                naturalHeight={image.naturalHeight}
                naturalWidth={image.naturalWidth}
                src={image.src}
              />
            </Mask>
          );
        }}
      />
    </Box>
  ))}
</Box>
`}
  />
);

card(
  <Example
    name="Gutter"
    defaultCode={`
<Box color="gray" width={300} height={300}>
  <Collage
    columns={3}
    gutter={8}
    height={300}
    width={300}
    renderImage={({ index, width, height }) => {
      const images = [
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
      ];
      const image = images[index];
      return (
        <Mask wash width={width} height={height}>
          <Image
            alt="collage image"
            color={image.color || '#EFEFEF'}
            fit="cover"
            naturalHeight={image.naturalHeight}
            naturalWidth={image.naturalWidth}
            src={image.src}
          />
        </Mask>
      );
    }}
  />
</Box>
`}
  />
);

card(
  <Example
    name="Cover image"
    defaultCode={`
<Box color="gray" width={300} height={300}>
  <Collage
    columns={3}
    cover
    height={300}
    gutter={8}
    renderImage={({ index, width, height }) => {
      const coverImage = {
        color: '#000',
        naturalHeight: 806,
        naturalWidth: 564,
        src: '${stock5}',
      };
      const nonCoverImages = [
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
      ];
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
`}
  />
);

export default cards;
