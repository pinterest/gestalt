// @flow strict
import React, { type Node } from 'react';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';
import Card from './components/Card.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Image"
    description={`
This component is the workhorse of Pinterest. If you define Pinterest to be all
about collecting ideas, then images is how we choose to represent those ideas.
In response, we've added a few extra superpowers to the regular <code>img</code> tag to
make it even more awesome.
`}
  />,
);

card(
  <PropTable
    props={[
      {
        name: 'children',
        type: 'React.Node',
      },
      {
        name: 'alt',
        type: 'string',
        required: true,
      },
      {
        name: 'color',
        type: 'string',
        required: true,
        href: 'placeholders',
      },
      {
        name: 'elementTiming',
        type: 'string',
        description: `HTML attribute For performance profiling (see https://developer.mozilla.org/en-US/docs/Web/API/Element_timing_API). Note that it only works if the ‘fit‘ prop is not set to ‘cover‘ or ‘contain‘.`,
      },
      {
        name: 'fit',
        type: `"cover" | "contain" | "none"`,
        defaultValue: 'none',
        description: `Doesn't work with srcSet or sizes.`,
        href: 'fit',
      },
      {
        name: 'importance',
        type: `"high" | "low" | "auto"`,
        defaultValue: 'auto',
        description: `Priority Hints provide developers a way to indicate a resource's relative importance to the browser, allowing more control over the order resources are loaded (only available via Chrome Origin Trial). ‘high‘ the developer considers the resource as being high priority. ‘low‘ the developer considers the resource as being low priority. ‘auto‘ the developer does not indicate a preference. This also serves as the attribute's invalid value default and missing value default.`,
        href: 'fit',
      },
      {
        name: 'loading',
        type: `"eager" | "lazy" | "auto"`,
        defaultValue: 'auto',
        description: `
        Controls if loading the image should be deferred when it's off-screen. ‘lazy’ to defer the load until the image or iframe reaches a distance threshold from the viewport. ‘eager’ to load the resource immediately. ‘auto’ the default behavior, which is to eagerly load the resource.
        `,
        href: 'fit',
      },
      {
        name: 'naturalHeight',
        type: 'number',
        required: true,
        description: 'Exact height of source image',
        href: 'fit',
      },
      {
        name: 'naturalWidth',
        type: 'number',
        required: true,
        description: 'Exact width of source image',
        href: 'fit',
      },
      {
        name: 'onError',
        type: '() => void',
      },
      {
        name: 'onLoad',
        type: '() => void',
      },
      {
        name: 'sizes',
        type: 'string',
        description:
          'A list of one or more strings separated by commas indicating a set of source sizes',
      },
      {
        name: 'src',
        type: 'string',
        required: true,
        href: 'placeholders',
      },
      {
        name: 'srcSet',
        type: 'string',
        description:
          'A list of one or more strings separated by commas indicating a set of possible image sources for the user agent to use.',
      },
    ]}
  />,
);

card(
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
  />,
);

card(
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
  />,
);

card(
  <Example
    description="
    You can overlay content on an Image by passing it children.
  "
    name="Overlay"
    defaultCode={`
<Box column={6} paddingX={2}>
  <Image
    alt="Tropic greens: The taste of Petrol and Porcelain | Interior design, Vintage Sets and Unique Pieces agave"
    color="rgb(231, 186, 176)"
    naturalHeight={751}
    naturalWidth={564}
    src="https://i.ibb.co/7bQQYkX/stock2.jpg"
  >
    <Box padding={3}>
      <Text color="white">
        Tropic greens: The taste of Petrol and Porcelain
      </Text>
    </Box>
  </Image>
</Box>
`}
  />,
);

card(
  <Example
    id="fit"
    description={`
    In some cases, you may want to scale an image to fit into its container.
    To achieve that, you can set \`fit\` to either \`cover\` or \`contain\`, depending on the effect you wish to achieve.

    Contain: This makes it so that the image is "contained" within its container. This means that the image is resized appropriately
    such that the entire image can fit in the container, while maintaining its aspect ratio (think letterbox);

    ~~~jsx
    <Image alt="..." color="#000" fit="contain" src="..." />
    ~~~

    Cover: This does the opposite of contain and tries to scale the image as large as possible so that the entire container is occupied,
    while maintaining the aspect ratio of the image.

    ~~~jsx
    <Image alt="..." color="#000" fit="cover" src="..." />
    ~~~

    Notes:

    * When using cover/contain, \`naturalHeight\` and \`naturalWidth\` are ignored since the aspect ratio is handled by the browser.
    * In order for cover/contain to work properly, the container must have some sort of implicit height.
  `}
    name="Fit"
    defaultCode={`
<Box display="flex" direction="row" wrap>
  <Box>
    <h3>Square content: contain vs cover</h3>
    <Box display="flex" direction="row" justifyContent="around">
      <Box
        color="darkGray"
        height={200}
        width={200}
        marginStart={4}
        marginEnd={4}
      >
        <Image
          alt="square"
          color="#000"
          fit="contain"
          naturalHeight={1}
          naturalWidth={1}
          src="https://i.ibb.co/d0pQsJz/stock3.jpg"
        />
      </Box>
      <Box
        color="darkGray"
        height={200}
        width={200}
        marginStart={4}
        marginEnd={4}
      >
        <Image
          alt="square"
          color="#000"
          fit="cover"
          naturalHeight={1}
          naturalWidth={1}
          src="https://i.ibb.co/d0pQsJz/stock3.jpg"
        />
      </Box>
    </Box>
  </Box>
  <Box>
    <h3>Wide content: contain vs cover</h3>
    <Box display="flex" direction="row" justifyContent="around">
      <Box
        color="darkGray"
        height={200}
        width={200}
        marginStart={4}
        marginEnd={4}
      >
        <Image
          alt="wide"
          color="#000"
          fit="contain"
          naturalHeight={1}
          naturalWidth={1}
          src="https://i.ibb.co/SB0pXgS/stock4.jpg"
        />
      </Box>
      <Box
        color="darkGray"
        height={200}
        width={200}
        marginStart={4}
        marginEnd={4}
      >
        <Image
          alt="wide"
          color="#000"
          fit="cover"
          naturalHeight={1}
          naturalWidth={1}
          src="https://i.ibb.co/SB0pXgS/stock4.jpg"
        />
      </Box>
    </Box>
  </Box>
  <Box>
    <h3>Tall content: contain vs cover</h3>
    <Box display="flex" direction="row" justifyContent="around">
      <Box
        color="darkGray"
        height={200}
        width={200}
        marginStart={4}
        marginEnd={4}
      >
        <Image
          alt="tall"
          color="#000"
          fit="contain"
          naturalHeight={1}
          naturalWidth={1}
          src="https://i.ibb.co/jVR29XV/stock5.jpg"
        />
      </Box>
      <Box
        color="darkGray"
        height={200}
        width={200}
        marginStart={4}
        marginEnd={4}
      >
        <Image
          alt="tall"
          color="#000"
          fit="cover"
          naturalHeight={1}
          naturalWidth={1}
          src="https://i.ibb.co/jVR29XV/stock5.jpg"
        />
      </Box>
    </Box>
  </Box>
</Box>
`}
  />,
);

card(
  <Example
    description="
    You can delay loading images that are off-screen with the loading attribute.
  "
    name="Lazy"
    defaultCode={`
<Box column={6} paddingX={2}>
  <Image
    alt="Tropic greens: The taste of Petrol and Porcelain | Interior design, Vintage Sets and Unique Pieces agave"
    color="rgb(231, 186, 176)"
    naturalHeight={496}
    naturalWidth={496}
    src="https://i.ibb.co/FY2MKr5/stock6.jpg"
    loading="lazy"
  />
</Box>
`}
  />,
);

export default cards;
