// @flow strict
import type { Node } from 'react';
import PropTable from '../components/PropTable.js';
import Example from '../components/Example.js';
import PageHeader from '../components/PageHeader.js';
import CardPage from '../components/CardPage.js';
import MainSection from '../components/MainSection.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Card"
    description="
The Card component is meant to highlight content in grids. It visually shows that items belong together and highlights the items on hover.
"
  />,
);

card(
  <PropTable
    props={[
      {
        name: 'active',
        type: '?boolean',
        defaultValue: false,
      },
      {
        name: 'children',
        type: 'React.Node',
      },
      {
        name: 'image',
        type: 'React.Node',
      },
      {
        name: 'onMouseEnter',
        type: '({ event: SyntheticMouseEvent<HTMLDivElement> })',
      },
      {
        name: 'onMouseLeave',
        type: '({ event: SyntheticMouseEvent<HTMLDivElement> })',
      },
    ]}
  />,
);

card(
  <MainSection name="Usage guidelines">
    <MainSection.Subsection columns={2}>
      <MainSection.Card
        cardSize="md"
        type="do"
        title="When to Use"
        description={`
          - Highlighting content in a grid format.
          - Displaying related content in a way that is easy to scan, read, and act upon.
        `}
      />
      <MainSection.Card
        cardSize="md"
        type="don't"
        title="When Not to Use"
        description={`
          - Displaying an unrelated group of information.
        `}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <Example
    description={`
    Using \`Card\` is as easy as it can be, simply wrap your component(s) with it. Ideally all of the children should be clickable and cover 100% of the area
  `}
    name="Example"
    defaultCode={`
function CardExample() {
  return (
    <Box maxWidth={236} padding={2} column={12}>
      <Card image={<Avatar name="James Jones" src="https://i.ibb.co/2Fc00R3/james.jpg" />}>
        <Text align="center" weight="bold">
          <Link href="https://pinterest.com">
            <Box paddingX={3} paddingY={2}>
              James Jones
            </Box>
          </Link>
        </Text>
        <Button
          accessibilityLabel="Follow James Jones"
          color="red"
          text="Follow"
        />
      </Card>
    </Box>
  );
}
`}
  />,
);

export default function Card(): Node {
  return <CardPage cards={cards} page="Card" />;
}
