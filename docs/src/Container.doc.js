// @flow
import * as React from 'react';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Container"
    description="Containers are useful in responsively laying out content on different screens."
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
        name: 'maxWidth',
        type: 'number',
        defaultValue: 800,
      },
    ]}
  />
);

card(
  <Example
    description="
    On small screens, the container is the width of the screen. On large screens, it centers the content with a default max-width of 800px.
  "
    name="Responsive content"
    defaultCode={`
<Box color="gray" padding={3}>
  <Container>
    <Box color="white" padding={3}>
      <Text>Centered content</Text>
    </Box>
  </Container>
</Box>
`}
  />
);

export default cards;
