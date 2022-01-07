// @flow strict
import type { Node } from 'react';
import Card from '../components/Card.js';
import Example from '../components/Example.js';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import Page from '../components/Page.js';
import PageHeader from '../components/PageHeader.js';
import docgen, { type DocGen } from '../components/docgen.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Image">
      <PageHeader name="Image" description={generatedDocGen?.description} />

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <Card
        description={`
    One thing that might be unusual is that the \`width\` and the \`height\` of the
    component are required, yet the image will scale to the size of its container.
    This is so that the placeholder's size can be calculated before the image has
    rendered.

    While the exact dimensions supplied aren't used (only the ratio between them is
    considered), you should always try to try to supply the exact dimensions of the
    source image requested.
  `}
        name="Dimensions"
      />

      <Example
        id="placeholders"
        description={`
    The color you pass into \`Image\` will be used to fill the placeholder that shows up
    as an image loads. The example shown has an empty \`src\` prop provided so it remains
    a placeholder.
  `}
        name="Placeholders"
        defaultCode={`
<Column span={6}>
  <Image
    alt="example.com"
    color="rgb(111, 91, 77)"
    naturalHeight={564}
    naturalWidth={564}
    src=""
  />
</Column>
`}
      />

      <Example
        description="
    You can overlay content on an Image by passing it children.
  "
        name="Overlay"
        defaultCode={`
<Box height={500} paddingX={2} width={250}>
  <Image
    alt="Tropic greens: The taste of Petrol and Porcelain | Interior design, Vintage Sets and Unique Pieces agave"
    color="rgb(231, 186, 176)"
    naturalHeight={751}
    naturalWidth={564}
    src="https://i.ibb.co/7bQQYkX/stock2.jpg"
  >
    <Box height="100%" padding={3}>
      <Flex direction="column" height="100%" justifyContent="between">
        <Text color="white" weight="bold">
          Tropic greens: The taste of Petrol and Porcelain
        </Text>

        <Button color="red" onClick={() => alert('Click!')} text="Save this Pin" />
      </Flex>
    </Box>
  </Image>
</Box>
`}
      />

      <Example
        id="fit"
        description={`
    In some cases, you may want to scale an image to fit into its container.
    To achieve that, you can set \`fit\` to either \`"cover"\` or \`"contain"\`, depending on the effect you wish to achieve.

    \`"contain"\`: This makes it so that the image is "contained" within its container. This means that the image is resized appropriately
    such that the entire image can fit in the container, while maintaining its aspect ratio (think letterbox);

    ~~~jsx
    <Image alt="..." color="#000" fit="contain" src="..." />
    ~~~

    \`"cover"\`: This does the opposite of \`"contain"\` and tries to scale the image as large as possible so that the entire container is occupied,
    while maintaining the aspect ratio of the image.

    ~~~jsx
    <Image alt="..." color="#000" fit="cover" src="..." />
    ~~~

    Notes:

    * When using \`"cover"\`/\`"contain"\`, \`naturalHeight\` and \`naturalWidth\` are ignored since the aspect ratio is handled by the browser.
    * In order for \`"cover"\`/\`"contain"\` to work properly, the container must have some sort of implicit height.
  `}
        name="Fit"
        defaultCode={`
<Flex alignItems="start" direction="column" gap={2} wrap>
  <Flex direction="column">
    <h3>Square content: contain vs cover</h3>
    <Box marginStart={4} marginEnd={4}>
      <Flex gap={8} justifyContent="around">
        <Box color="darkGray" height={200} width={200}>
          <Image
            alt="square"
            color="#000"
            fit="contain"
            naturalHeight={1}
            naturalWidth={1}
            src="https://i.ibb.co/d0pQsJz/stock3.jpg"
          />
        </Box>
        <Box color="darkGray" height={200} width={200}>
          <Image
            alt="square"
            color="#000"
            fit="cover"
            naturalHeight={1}
            naturalWidth={1}
            src="https://i.ibb.co/d0pQsJz/stock3.jpg"
          />
        </Box>
      </Flex>
    </Box>
  </Flex>

  <Flex direction="column">
    <h3>Wide content: contain vs cover</h3>
    <Box marginStart={4} marginEnd={4}>
      <Flex gap={8} justifyContent="around">
        <Box color="darkGray" height={200} width={200}>
          <Image
            alt="wide"
            color="#000"
            fit="contain"
            naturalHeight={1}
            naturalWidth={1}
            src="https://i.ibb.co/SB0pXgS/stock4.jpg"
          />
        </Box>
        <Box color="darkGray" height={200} width={200}>
          <Image
            alt="wide"
            color="#000"
            fit="cover"
            naturalHeight={1}
            naturalWidth={1}
            src="https://i.ibb.co/SB0pXgS/stock4.jpg"
          />
        </Box>
      </Flex>
    </Box>
  </Flex>

  <Flex direction="column">
    <h3>Tall content: contain vs cover</h3>
    <Box marginStart={4} marginEnd={4}>
      <Flex gap={8} justifyContent="around">
        <Box color="darkGray" height={200} width={200}>
          <Image
            alt="tall"
            color="#000"
            fit="contain"
            naturalHeight={1}
            naturalWidth={1}
            src="https://i.ibb.co/jVR29XV/stock5.jpg"
          />
        </Box>
        <Box color="darkGray" height={200} width={200}>
          <Image
            alt="tall"
            color="#000"
            fit="cover"
            naturalHeight={1}
            naturalWidth={1}
            src="https://i.ibb.co/jVR29XV/stock5.jpg"
          />
        </Box>
      </Flex>
    </Box>
  </Flex>
</Flex>
`}
      />

      <Example
        description="
    You can delay loading images that are off-screen with the loading attribute. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/loading) for more details.
  "
        name="Lazy"
        defaultCode={`
<Box column={6} paddingX={2}>
  <Image
    alt="Tropic greens: The taste of Petrol and Porcelain | Interior design, Vintage Sets and Unique Pieces agave"
    color="rgb(231, 186, 176)"
    loading="lazy"
    naturalHeight={496}
    naturalWidth={496}
    src="https://i.ibb.co/FY2MKr5/stock6.jpg"
  />
</Box>
`}
      />

      <Example
        description={`
      Sometimes Images are purely presentational. For example, an Image used above an article title may be used to draw people's attention visually, but doesn't add any additional information or context about the article. In this case, the \`role\` should be set to "presentation" in order to inform screen readers and other assistive technology that this image does not need alternative text or any additional label.
    `}
        name="Presentational Images with Role"
        defaultCode={`
<Box
  display="flex"
  alignContent="center"
  justifyContent="between"
  direction="column"
  borderStyle="sm"
  height={300}
  width={300}
>
  <Box height={200} width="100%">
    <Image
      alt=""
      role="presentation"
      color="#000"
      fit="cover"
      naturalHeight={1}
      naturalWidth={1}
      src="https://i.ibb.co/FY2MKr5/stock6.jpg"
    />
  </Box>
  <Heading align="center" size="lg">Article Title</Heading>
</Box>
`}
      />
    </Page>
  );
}

export async function getStaticProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'Image' }) },
  };
}
