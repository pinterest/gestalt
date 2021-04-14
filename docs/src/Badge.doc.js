// @flow strict
import type { Node } from 'react';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Badge"
    description={`The \`Badge\` component helps to label text.
`}
  />,
);

card(
  <PropTable
    props={[
      {
        name: 'text',
        type: `string`,
        required: true,
        description: 'Text displayed inside of the Badge. Sentence case is best.',
      },
      {
        name: 'position',
        type: `"middle" | "top"`,
        defaultValue: 'middle',
        description: 'Badge position relative to its parent element.',
      },
    ]}
  />,
);

card(
  <Example
    description="
    The `Badge` component is rendered inline within parent element."
    name="Example"
    defaultCode={`
<Text>Some text that uses Badge component as its child <Badge text="New" /></Text>
`}
  />,
);

card(
  <Example
    description="
    Larger text example rendered with a top positioned `Badge`."
    name="Example: positioning"
    defaultCode={`
  <Heading>Heading <Badge text="Beta" position="top"/></Heading>
`}
  />,
);

export default cards;
