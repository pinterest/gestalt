// @flow strict
import React, { type Node } from 'react';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader name="ScrollableContainer" description="ScrollableContainer allows users to ..." />,
);

card(
  <Example
    name="Basic Example"
    defaultCode={`
<ScrollableContainer>

</ScrollableContainer>
`}
  />,
);

card(
  <PropTable
    props={[
      {
        name: 'accessibilityLabel',
        type: 'string',
        description: 'String that clients such as VoiceOver will read to describe the element.',
      },
    ]}
  />,
);

export default cards;
