// @flow strict
import React, { type Node } from 'react';
import { Datapoint } from 'gestalt';
import PropTable from './components/PropTable.js';
import PageHeader from './components/PageHeader.js';
import MainSection from './components/MainSection.js';
import FeedbackCallout from './components/FeedbackCallout.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(<FeedbackCallout componentName="Datapoint" />);

card(
  <PageHeader
    name="Datapoint"
    description="Datapoint displays at-a-glance data for a user to quickly view key metrics."
    defaultCode={`
<Datapoint size="lg" infoText="The number of times your ads were seen, including earned impressions" title="Total impressions" value="1.23M" trend={{value: 30, accessibilityLabel: "Trending up"}} />
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
        name: 'trend',
        type: '{| accessibilityLabel: string, value: string |}',
        description: `Object detailing the trend value (change in time - e.g., +30%), and accessibilityLabel to describe the trend's icon (e.g., "Trending up")`,
      },
      {
        name: 'trendSignal',
        type: `'good' | 'bad' | 'neutral' | 'auto'`,
        defaultValue: 'auto',
        description: `A visual indicator whether the trend is considered "good", "bad" or "neutral". By setting \`trendSignal\` to \`auto\`, a positive trend will be considered "good", a negative trend will be considered "bad" and a trend of zero will be considered "neutral"`,
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
    description={`Be sure to localize the \`title\`, \`infoText\` and \`trendAccessibilityLabel\` props. Note that localization can lengthen text by 20 to 30 percent.`}
  />,
);

card(
  <MainSection name="Variants">
    <MainSection.Subsection columns={2} title="Size">
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
      description={`Use \`trend\` to display the delta in the value of a Datapoint over time. Make sure to provide an \`accessibilityLabel\` when the trend is above or below zero.`}
      title="Trend"
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
<Flex direction="column" gap={4}>
  <Datapoint title="Pin clicks" value="1.23k" trend={{value: 12, accessibilityLabel: "Trending up"}} />
  <Datapoint title="Saves" value="123" trend={{value: 0, accessibilityLabel: ""}} />
  <Datapoint title="Total impressions" value="1.23M" trend={{value: -5, accessibilityLabel: "Trending down"}}  />
</Flex>
`}
      />
    </MainSection.Subsection>

    <MainSection.Subsection
      description={`Use \`trendSignal\` to explicitly the whether the \`trend\` is considered "good", "bad" or "neutral". By default, a positive trend will be considered "good", a negative trend "bad" and a trend of 0 "neutral".`}
      title="Trend signal"
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
<Flex direction="column" gap={4}>
  <Datapoint title="Bounce rate" value="86.3%" trend={{value: 29, accessibilityLabel: "Trending up"}} trendSignal="bad" />
  <Datapoint title="Conversion falloffs" value="92" trend={{value: -10, accessibilityLabel: "Tending down"}} trendSignal="good" />
  <Datapoint title="Spend" value="$19.3k" trend={{value: -4, accessibilityLabel: "Trending down"}} trendSignal="neutral"  />
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
<Datapoint title="Spend" value="$5.7k" infoText="Total ad spend in the selected time period" />
    `}
      />
    </MainSection.Subsection>
  </MainSection>,
);

export default cards;
