// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import docgen, { type DocGen } from '../../docs-components/docgen.js';
import Example from '../../docs-components/Example.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';

export default function CollagePage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description} />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />
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
      />
      <AccessibilitySection name={generatedDocGen?.displayName} />

      <MainSection name="Variants">
        <Example
          id="columns"
          name="Different columns"
          description="2 - 4 columns"
          defaultCode={`
<Flex wrap>
  {[2, 3, 4].map((columns) => (
    <Box key={columns} padding={2}>
      <Box>
        <Text>
          columns = {columns}
        </Text>
      </Box>

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
              {image.src ? (
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
</Flex>
`}
        />
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
        />
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
        />
        <Example
          name="Different columns with cover image"
          description="2 - 4 columns with cover image"
          defaultCode={`
<Flex wrap>
  {[2, 3, 4].map((columns) => (
    <Box key={columns} padding={2}>
      <Box>
        <Text>
          columns = {columns}
        </Text>
      </Box>

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
              {image.src ? (
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
</Flex>
`}
        />
        <Example
          id="layoutKey"
          name="Layout key"
          description="
      You can pick a layout using the layout key (layout key is 0 by default).
      Depending on the number of columns of the collage, there may be multiple layouts available.
      If there are N layouts available, (layoutKey % N) will determine which layout is used.
      "
          defaultCode={`
<Flex wrap>
  {[0, 1, 2, 3].map((layoutKey) => (
    <Box key={layoutKey} padding={2}>
      <Box>
        <Text>
          layoutKey = {layoutKey}
        </Text>
      </Box>

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
</Flex>
`}
        />
      </MainSection>
      <QualityChecklist component={generatedDocGen?.displayName} />
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'Collage' }) },
  };
}
