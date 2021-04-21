// @flow strict
import React, { type Node } from 'react';
import { Datapoint } from 'gestalt';
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
    Component={Datapoint}
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

card(
  <MainSection
    name="Localization"
    description={`Be sure to localize the \`title\`, \`infoText\` and \`percentChangeIconAccessibilityLabel\` props. Note that localization can lengthen text by 20 to 30 percent.`}
  />,
);

card(
  <MainSection name="Variants">
    <MainSection.Subsection title="Size">
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
      description={`Use \`percentChange\` to display the delta in the value of a Datapoint over time.`}
      title="Percent change"
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
<Flex direction="column" gap={4}>
  <Datapoint title="Datapoint title" value="1.23M" percentChange={30} percentChangeIconAccessibilityLabel="Downward arrow" />
  <Datapoint title="Datapoint title" value="1.23M" percentChange={0} />
  <Datapoint title="Datapoint title" value="1.23M" percentChange={-30} percentChangeIconAccessibilityLabel="Upward arrow"  />
</Flex>
`}
      />
    </MainSection.Subsection>

    <MainSection.Subsection
      description={`The \`infoText\` prop is intended to provide the user context, detail and/or framing for a Datapoint.`}
      title="Info text"
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
<Datapoint title="Datapoint title" value="1.23M" infoText="Datapoint contextual information" />
    `}
      />
    </MainSection.Subsection>
  </MainSection>,
);

export default cards;
