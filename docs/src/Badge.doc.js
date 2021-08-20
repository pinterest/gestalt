// @flow strict
import type { Node } from 'react';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';
import MainSection from './components/MainSection.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Badge"
    description={`
      The \`Badge\` component helps to label text.
    `}
    defaultCode={`
      <Text>Update your pronouns in your profile settings <Badge text="New" /></Text>
    `}
  />,
);

card(
  <PropTable
    props={[
      {
        name: 'text',
        type: `string`,
        required: true,
        description: 'Text displayed inside of the Badge. Sentence case is best.',
      },
      {
        name: 'position',
        type: `"middle" | "top"`,
        defaultValue: 'middle',
        description: 'Badge position relative to its parent element.',
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
          - Labeling and bringing awareness to a specific element or feature (e.g., something is new or required).
        `}
      />
      <MainSection.Card
        cardSize="md"
        type="don't"
        title="When Not to Use"
        description={`
          - Providing feedback at the element level (e.g., displaying error messages). Use inline text instead.
          - Requiring interaction from users since Badges are always static and non-interactive.
        `}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <Example
    description="
    The `Badge` component is rendered inline within parent element."
    name="Example"
    defaultCode={`
<Text>Some text that uses Badge component as its child <Badge text="New" /></Text>
`}
  />,
);

card(
  <Example
    description="
    Larger text example rendered with a top positioned `Badge`."
    name="Example: positioning"
    defaultCode={`
  <Heading>Heading <Badge text="Beta" position="top"/></Heading>
`}
  />,
);

card(
  <Example
    description={`
    Components like [Module](/Module) and [Dropdown](/Dropdown) support Badges within the component.`}
    name="Example: within other components"
    defaultCode={`
function ModuleExample() {
  return (
    <Box column={12} maxWidth={800} padding={2}>
      <Module
        badgeText="Try it out!"
        id="ModuleExample - badge"
        title="Title"
        >
        <Text size="md">This is example content.</Text>
      </Module>
    </Box>
  );
}
`}
  />,
);

export default cards;
