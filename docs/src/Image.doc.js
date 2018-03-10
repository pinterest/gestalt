// @flow
import * as React from 'react';
import { Image } from 'gestalt';
import PropTable from './components/PropTable';
import Example from './components/Example';
import PageHeader from './components/PageHeader';
import Card from './components/Card';
import CardPage from './components/CardPage';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Image"
    description={`
This component the workhorse of Pinterest. If you define Pinterest to be all
about collecting ideas, then images is how we choose to represent those ideas.
In response, we've added a few extra super-powers to the regular Image tag to
make it even more awesome.
`}
  />
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
      },
      {
        name: 'fit',
        type: `"cover" | "contain" | "none"`,
        defaultValue: 'none',
        description: `Doesn't work with srcSet or sizes.`,
      },
      {
        name: 'naturalHeight',
        type: 'number',
        required: true,
        description: 'Exact height of source image',
      },
      {
        name: 'naturalWidth',
        type: 'number',
        required: true,
        description: 'Exact width of source image',
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
      },
      {
        name: 'srcSet',
        type: 'string',
        description:
          'A list of one or more strings separated by commas indicating a set of possible image sources for the user agent to use.',
      },
    ]}
    heading={false}
  />
);

card(
  <Card
    description={`
    One thing that might be unusual is that the \`width\` and the \`height\` of the
    component are required, yet the image will scale to the size of its container.
    This is so that the placeholder's size can be calculated before the image has
    rendered.

    While the exact dimensions supplied aren't used, (only the ratio between them is
    considered) you should always try to try to supply the exact dimensions of the
    source image requested.
  `}
    name="Dimensions"
  />
);

card(
  <Example
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
  src="https://i.pinimg.com/474x/b2/55/ed/b255edbf773ffb3985394e6efb9d2a49.jpg"
/>
</Column>
`}
    scope={{ Image }}
  />
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
  src="https://i.pinimg.com/564x/19/f4/87/19f487a680f9fb1ecc8aa139b2afac7f.jpg"
>
  <Box padding={3}>
    <Text color="white">
      Tropic greens: The taste of Petrol and Porcelain
    </Text>
  </Box>
</Image>
</Box>
`}
    scope={{ Image }}
  />
);

card(
  <Example
    description={`
    In some cases, you may want to scale an image to fit into its container.
    To achieve that, you can set \`fit\` to either \`cover\` or \`contain\`, depending on the effect you wish to achieve.

    Contain - This makes it so that the image is "contained" within its container. This means that the image is resized appropriately
    such that the entire image can fit in the container, while maintaining its aspect ratio (think letterbox);

    ~~~jsx
    <Image alt="..." color="#000" fit="contain" src="..." />
    ~~~

    Cover - This does the opposite of contain and tries to scale the image as large as possible so that the entire container is occupied,
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
  <h3>Tall content: cover vs contain</h3>
  <Box display="flex" direction="row" justifyContent="around">
    <Box
      color="darkGray"
      height={200}
      width={200}
      marginLeft={4}
      marginRight={4}
    >
      <Image
        alt="tall"
        color="#000"
        fit="contain"
        naturalHeight={1}
        naturalWidth={1}
        src="https://i.pinimg.com/564x/a9/dd/08/a9dd080b383ba4f336b5e4705cacdfba.jpg"
      />
    </Box>
    <Box
      color="darkGray"
      height={200}
      width={200}
      marginLeft={4}
      marginRight={4}
    >
      <Image
        alt="tall"
        color="#000"
        fit="cover"
        naturalHeight={1}
        naturalWidth={1}
        src="https://i.pinimg.com/564x/a9/dd/08/a9dd080b383ba4f336b5e4705cacdfba.jpg"
      />
    </Box>
  </Box>
</Box>
<Box>
  <h3>Wide content: cover vs contain</h3>
  <Box display="flex" direction="row" justifyContent="around">
    <Box
      color="darkGray"
      height={200}
      width={200}
      marginLeft={4}
      marginRight={4}
    >
      <Image
        alt="tall"
        color="#000"
        fit="contain"
        naturalHeight={1}
        naturalWidth={1}
        src="https://i.pinimg.com/564x/47/b8/ec/47b8ec3948ef1f8eba0b0fe1dde28622.jpg"
      />
    </Box>
    <Box
      color="darkGray"
      height={200}
      width={200}
      marginLeft={4}
      marginRight={4}
    >
      <Image
        alt="tall"
        color="#000"
        fit="cover"
        naturalHeight={1}
        naturalWidth={1}
        src="https://i.pinimg.com/564x/47/b8/ec/47b8ec3948ef1f8eba0b0fe1dde28622.jpg"
      />
    </Box>
  </Box>
</Box>
<Box>
  <h3>Square content: cover vs contain</h3>
  <Box display="flex" direction="row" justifyContent="around">
    <Box
      color="darkGray"
      height={200}
      width={200}
      marginLeft={4}
      marginRight={4}
    >
      <Image
        alt="tall"
        color="#000"
        fit="contain"
        naturalHeight={1}
        naturalWidth={1}
        src="https://i.pinimg.com/564x/10/7d/99/107d993c7818ed41bc0afc27ab2a2f15.jpg"
      />
    </Box>
    <Box
      color="darkGray"
      height={200}
      width={200}
      marginLeft={4}
      marginRight={4}
    >
      <Image
        alt="tall"
        color="#000"
        fit="cover"
        naturalHeight={1}
        naturalWidth={1}
        src="https://i.pinimg.com/564x/10/7d/99/107d993c7818ed41bc0afc27ab2a2f15.jpg"
      />
    </Box>
  </Box>
</Box>
</Box>
`}
    scope={{ Image }}
  />
);

export default () => <CardPage cards={cards} />;
