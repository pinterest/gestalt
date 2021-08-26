// @flow strict
import type { Node } from 'react';
import PropTable from '../components/PropTable.js';
import Example from '../components/Example.js';
import PageHeader from '../components/PageHeader.js';
import CardPage from '../components/CardPage.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Collage"
    description="
Like Masonry, Collage creates a deterministic grid layout that can absolutely position and virtualize images.
"
  />,
);

card(
  <PropTable
    props={[
      {
        name: 'columns',
        type: 'number',
        description:
          'Number of columns (2 - 4). Note that Collage assumes at least 2 * `columns` images will be provided. If fewer images are provided, care will be needed to avoid TypeErrors.',
        required: true,
        href: 'columns',
      },
      {
        name: 'cover',
        type: 'boolean',
        description: 'Whether or not the first image is a cover image',
        defaultValue: false,
        href: 'coverImage',
      },
      {
        name: 'gutter',
        type: 'number',
        description: 'The amount of vertical & horizontal space between images',
        defaultValue: 0,
        href: 'gutter',
      },
      {
        name: 'height',
        type: 'number',
        description: 'Height of the collage',
        required: true,
        href: 'basicExample',
      },
      {
        name: 'layoutKey',
        type: 'number',
        description: `
        Depending on the number of columns of the collage, there may be multiple layouts available.
        If there are N layouts available, (layoutKey % N) will determine which layout is used.
        `,
        defaultValue: 0,
        href: 'layoutKey',
      },
      {
        name: 'renderImage',
        type: '({ width: number, height: number, index: number }) => React.Node',
        description: 'Render prop for the collage images',
        required: true,
        href: 'basicExample',
      },
      {
        name: 'width',
        type: 'number',
        description: 'Width of the collage',
        required: true,
        href: 'basicExample',
      },
    ]}
  />,
);

card(
  <Example
    id="basicExample"
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
      <Mask wash width={width} height={height}>
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
/>
`}
  />,
);

card(
  <Example
    id="columns"
    name="Different columns"
    description="2 - 4 columns"
    defaultCode={`
<Box display="flex" wrap>
  {[2, 3, 4].map((columns) => (
    <Box key={columns} padding={2}>
      <Box><Text>columns = {columns}</Text></Box>
      <Collage
        columns={columns}
        height={150}
        width={150}
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
            <Mask wash width={width} height={height}>
              {image ? (
                <Image
                  alt="collage image"
                  color={image.color}
                  fit="cover"
                  naturalHeight={image.naturalHeight}
                  naturalWidth={image.naturalWidth}
                  src={image.src}
                />
              ) : (
                <Box
                  color="lightGray"
                  height={height}
                  width={width}
                />
              )}
            </Mask>
          );
        }}
      />
    </Box>
  ))}
</Box>
`}
  />,
);

card(
  <Example
    id="gutter"
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
        <Mask wash width={width} height={height}>
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
  />
</Box>
`}
  />,
);

card(
  <Example
    id="coverImage"
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
  />,
);

card(
  <Example
    name="Different columns with cover image"
    description="2 - 4 columns with cover image"
    defaultCode={`
<Box display="flex" wrap>
  {[2, 3, 4].map((columns) => (
    <Box key={columns} padding={2}>
      <Box><Text>columns = {columns}</Text></Box>
      <Collage
        columns={columns}
        cover
        height={150}
        width={150}
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
            <Mask wash width={width} height={height}>
              {image ? (
                <Image
                  alt="collage image"
                  color={image.color}
                  fit="cover"
                  naturalHeight={image.naturalHeight}
                  naturalWidth={image.naturalWidth}
                  src={image.src}
                />
              ) : (
                <Box
                  color="lightGray"
                  height={height}
                  width={width}
                />
              )}
            </Mask>
          );
        }}
      />
    </Box>
  ))}
</Box>
`}
  />,
);

card(
  <Example
    id="layoutKey"
    name="Layout key"
    description="
      You can pick a layout using the layout key (layout key is 0 by default).
      Depending on the number of columns of the collage, there may be multiple layouts available.
      If there are N layouts available, (layoutKey % N) will determine which layout is used.
      "
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
            <Mask wash width={width} height={height}>
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
      />
    </Box>
  ))}
</Box>
`}
  />,
);

export default function CollagePage(): Node {
  return <CardPage cards={cards} page="Collage" />;
}
