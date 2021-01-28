// @flow strict
import React, { type Node } from 'react';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(<PageHeader name="ButtonGroup" description="Group a series of buttons." />);

card(
  <PropTable
    props={[
      {
        name: 'children',
        type: 'Node',
        description: `List of Button's or IconButton's`,
        href: 'accessibilityLabel',
      },
    ]}
  />,
);

card(
  <Example
    name="Example"
    id="example"
    defaultCode={`
<ButtonGroup>
  <Button text="Button 1" />
  <Button text="Button 2" />
</ButtonGroup>
`}
  />,
);

card(
  <Example
    name="Wrap"
    id="wrap"
    description={`When buttons don't fit within the container, they will automatically wrap to the next line.`}
    defaultCode={`
<Box width={150} borderStyle="sm">
  <ButtonGroup>
    <Button text="Button 1" />
    <Button text="Button 2" />
    <Button text="Button 3" />
  </ButtonGroup>
</Box>
`}
  />,
);

export default cards;
