// @flow
import * as React from 'react';
import Box from '../Box/Box';
import Container from './Container';
import { ns, card, md, PropTable } from '../../.corkboard/cards';

ns(
  'Container',
  'Containers are useful in responsively laying out content on different screens.'
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

    ~~~html
    <Box color="gray" padding={3}>
      <Container>
        <Box color="white" padding={3}>
          Centered content
        </Box>
      </Container>
    </Box>
    ~~~
  `,
  <Box color="gray" padding={3}>
    <Container>
      <Box color="white" padding={3}>
        Centered content
      </Box>
    </Container>
  </Box>,
  { stacked: true }
);
