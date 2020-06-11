// @flow strict
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
        description:
          'Text displayed inside of the Badge. Sentence case is best.',
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
    Larger text example rendered with a `Badge`."
    name="Example: large text"
    defaultCode={`
  <Heading>Heading <Badge text="Beta"/></Heading>
`}
  />
);

export default cards;
