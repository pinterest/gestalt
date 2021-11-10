// @flow strict
import type { Node } from 'react';
import PropTable from '../components/PropTable.js';
import PageHeader from '../components/PageHeader.js';
import CardPage from '../components/CardPage.js';
import MainSection from '../components/MainSection';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Divider"
    description="If you have two things that need to be separated, put a `Divider` between them."
  />,
);

card(<PropTable props={[]} />);

card(
  <MainSection name="Variants">
    <MainSection.Subsection
      title="Orientation"
      columns={2}
      description="You can use this component for a visual divider between two elements. Placing it within a [Flex](/flex) layout with a direction of `row` will cause the Divider to become vertical.
      "
    >
      <MainSection.Card
        cardSize="md"
        title="Horizontal"
        defaultCode={`
<Box color="white" width="100%">
  <Box padding={2}>
    <Text>Some content</Text>
  </Box>
  <Divider />
  <Box padding={2}>
    <Text>Other content</Text>
  </Box>
</Box>
`}
      />
      <MainSection.Card
        cardSize="md"
        title="Vertical"
        defaultCode={`
<Flex>
  <Box padding={2}>
    <Text>Some content</Text>
  </Box>
  <Divider />
  <Box padding={2}>
    <Text>Other content</Text>
  </Box>
</Flex>
`}
      />
    </MainSection.Subsection>
  </MainSection>,
);

export default function DividerPage(): Node {
  return <CardPage cards={cards} page="Divider" />;
}
