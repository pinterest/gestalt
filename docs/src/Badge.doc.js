// @flow
import * as React from 'react';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

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
      },
      {
        name: 'position',
        type: `"middle" | "top"`,
        defaultValue: 'middle',
        description: 'Badge position relative to its parent element.',
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
<Text>Some text that uses Badge component as its child <Badge text="new" /></Text>
`}
  />
);

card(
  <Example
    description="
    Larger text looks better with a superscript `Badge`."
    name="Example"
    defaultCode={`
  <Heading>Heading <Badge text="new" position="top" /></Heading>
`}
  />
);

export default cards;
