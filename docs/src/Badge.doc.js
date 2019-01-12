// @flow
import * as React from 'react';
import { Badge } from 'gestalt';
import Combination from './components/Combination.js';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Badge"
    description={`The \`Badge\` component helps to bring focus to an element.
`}
  />
);

card(
  <PropTable
    props={[
      {
        name: 'size',
        type: `"sm" | "md" | "lg"`,
        defaultValue: 'sm',
        description: 'sm: 12px, md: 14px, lg: 16px',
      },
      {
        name: 'text',
        type: `string`,
        required: true,
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
<Text>Some text that uses Badge component as its child <Badge text="Badge" /></Text>
`}
  />
);

card(
  <Combination name="Sizes" size={['sm', 'md', 'lg']}>
    {(props, i) => (
      <Badge id={`example-${i}`} {...props} color="red" text="Badge" />
    )}
  </Combination>
);

export default cards;
