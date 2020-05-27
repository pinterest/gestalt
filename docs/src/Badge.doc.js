// @flow strict
import * as React from 'react';
import { Box } from 'gestalt';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';
import Combination from './components/Combination.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Badge"
    description={`The \`Badge\` component helps to label text.
`}
  />
);

card(
  <PropTable
    props={[
      {
        name: 'text',
        type: `string`,
        required: true,
        description:
          'Text displayed inside of the Badge. Sentence case is best.',
      },
      {
        name: 'position',
        type: `"middle" | "top"`,
        defaultValue: 'middle',
        description: 'Badge position relative to its parent element.',
      },
      {
        name: 'color',
        type: `"blue" | "darkGray" | "eggplant" | "gray" | "green" | "lightGray" | "maroon" | "midnight" | "navy" | "olive" | "orange" | "orchid" | "pine" | "purple" | "red" | "watermelon" | "white"`,
        defaultValue: 'blue',
        description: 'The background color of the Badge.',
      },
    ]}
  />
);

card(
  <Example
    description="
    The `Badge` component is rendered inline within parent element."
    name="Example"
    defaultCode={`
<Text>Some text that uses Badge component as its child <Badge text="New" /></Text>
`}
  />
);

card(
  <Example
    description="
    The `Badge` component is rendered with alternative background color."
    name="Example: color"
    defaultCode={`
<Text size="lg" weight="bold">Inbox <Badge text="78" color="red"/></Text>
`}
  />
);

card(
  <Example
    description="
    Larger text example rendered with a top positioned `Badge`."
    name="Example: positioning"
    defaultCode={`
  <Heading>Heading <Badge text="Beta" position="top"/></Heading>
`}
  />
);

card(
  <Combination
    id="color"
    name="Colors"
    color={[
      'red',
      'white',
      'lightGray',
      'gray',
      'darkGray',
      'green',
      'pine',
      'olive',
      'blue',
      'navy',
      'midnight',
      'purple',
      'orchid',
      'eggplant',
      'maroon',
      'watermelon',
      'orange',
      'transparent',
      'transparentDarkGray',
      'lightWash',
      'darkWash',
    ]}
  >
    {props => <Box width={60} height={60} rounding="circle" {...props} />}
  </Combination>
);

export default cards;
