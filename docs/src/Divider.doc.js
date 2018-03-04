// @flow
import * as React from 'react';
import { Box, Text, Divider } from 'gestalt';
import Example from './components/Example';
import PropTable from './components/PropTable';
import PageHeader from './components/PageHeader';
import CardPage from './components/CardPage';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Divider"
    description="If you have two things that need to be separated, put a `Divider` between them."
  />
);

card(<PropTable props={[]} heading={false} />);

card(
  <Example
    description="
    You can use this component for a visual divider between two elements.
  "
    name="Example"
    defaultCode={`
<Box color="white">
<Box padding={2}>
  <Text>Some content</Text>
</Box>
<Divider />
<Box padding={2}>
  <Text>Other content</Text>
</Box>
</Box>
`}
    scope={{ Box, Divider, Text }}
  />
);

export default () => <CardPage cards={cards} />;
