// @flow
import * as React from 'react';
import { Container } from 'gestalt';
import { card, md, PropTable, Example } from './cards';

import { ns } from 'corkboard';
import PageHeader from './components/PageHeader';

ns('Container');

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
        type: 'any',
      },
    ]}
  />,
  { heading: false }
);

card(
  'Responsive content',
  md`
    On small screens, the container is the width of the screen. On large screens, it centers the content with a max-width of 800px.
  `,
  <Example
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
  />,
  { stacked: true }
);
