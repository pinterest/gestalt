// @flow
import * as React from 'react';
import { Container } from 'gestalt';
import PropTable from './components/PropTable';
import Example from './components/Example';
import PageHeader from './components/PageHeader';
import CardPage from './components/CardPage';

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
    ]}
    heading={false}
  />
);

card(
  <Example
    description="
    On small screens, the container is the width of the screen. On large screens, it centers the content with a max-width of 800px.
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
    scope={{ Container }}
    stacked
  />
);

export default () => <CardPage cards={cards} />;
