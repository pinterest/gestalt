// @flow strict
import React, { type Node } from 'react';
import { Box } from 'gestalt';
import PropTable from './components/PropTable.js';
import PageHeader from './components/PageHeader.js';
import MainSection from './components/MainSection.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Datapoint"
    description="Datapoint displays at-a-glance data for a user to quickly view key metrics."
    defaultCode={`
<Datapoint size="lg" infoText="Contextual information for this Datapoint" title="Datapoint title" value="1.23M" percentChange={30} percentChangeIconAccessibilityLabel="Arrow up" helperText="Datapoint helper text" infoIconAccessibilityLabel="Info icon" />
`}
    pilot
  />,
);

// Specifying Component gives auto warnings about missing props
card(
  <PropTable
    Component={Box}
    props={[
      {
        name: 'percentChangeIconAccessibilityLabel',
        type: 'string',
        description: ' ',
        required: true,
      },
      {
        name: 'title',
        type: 'string',
        description: 'The header for the component',
        required: true,
      },
      {
        name: 'value',
        type: 'string',
        description: 'The main datapoint value (e.g., 1.23M)',
        required: true,
      },
      {
        name: 'percentChange',
        type: 'number',
        description: 'The change in value over time (e.g., +30%)',
      },
      {
        name: 'infoText',
        type: 'string',
        description: 'Contextual information displayed in a tooltip to describe the Datapoint',
      },
      {
        name: 'size',
        type: `'md' | 'lg'`,
        defaultValue: 'md',
        description: 'Used to set the size of the datapoint',
      },
    ]}
  />,
);

card(<MainSection name="Accessibility" description="" />);

card(
  <MainSection
    name="Localization"
    description={`Be sure to localize the \`title\`, \`infoText\` and \`percentChangeIconAccessibilityLabel\` props. Note that localization can lengthen text by 20 to 30 percent.`}
  />,
);

card(
  <MainSection name="Variants">
    <MainSection.Subsection
      description={`Description of this \`variant\`. Using backticks instead of quotes allows you to use [Markdown](https://www.markdownguide.org/)`}
      title="Size"
    >
      <MainSection.Card
        cardSize="md"
        title="size=md"
        defaultCode={`
        <Datapoint size="md" title="Datapoint title" value="1.23M" />
`}
      />
      <MainSection.Card
        cardSize="md"
        title="size=lg"
        defaultCode={`
        <Datapoint size="lg" title="Datapoint title" value="1.23M" />
`}
      />
    </MainSection.Subsection>

    <MainSection.Subsection
      description={`To showcase repetitive examples (colors, borders, etc.), use the \`CombinationNew\` component as a child of \`MainSection.Subsection\` to render cards in the new style. Using backticks instead of quotes allows you to use [Markdown](https://www.markdownguide.org/)`}
      title="Percent change"
    />

    <MainSection.Subsection
      description={`Description of this \`variant\`. Using backticks instead of quotes allows you to use [Markdown](https://www.markdownguide.org/)`}
      title="Info text"
    >
      <MainSection.Card
        cardSize="md"
        title="Example title (optional)"
        defaultCode={`
    Code for this example goes here
    `}
      />
    </MainSection.Subsection>
  </MainSection>,
);

export default cards;
