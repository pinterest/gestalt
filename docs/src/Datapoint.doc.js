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
<Datapoint size="lg" tooltipText="The number of times your ads were seen, including earned impressions" title="Total impressions" value="2.34M" trend={{value: 30, accessibilityLabel: "Trending up"}} />
`}
    badge="pilot"
  />,
);

card(
  <PropTable
    Component={Datapoint}
    props={[
      {
        name: 'tooltipText',
        type: 'string',
        description:
          'Contextual information displayed in a tooltip to describe the Datapoint. See the [tooltipText](#Tooltip-text) variant to learn more.',
      },
      {
        name: 'size',
        type: `'md' | 'lg'`,
        defaultValue: 'md',
        description:
          'Used to set the size of the datapoint. See the [size](#Size) variant to learn more.',
      },
      {
        name: 'title',
        type: 'string',
        description: 'The header for the component.',
        required: true,
      },
      {
        name: 'trend',
        type: '{| accessibilityLabel: string, value: number |}',
        description: `Object detailing the trend value (change in time - e.g., +30%), and accessibilityLabel to describe the trend's icon (e.g., "Trending up").  See the [trend](#Trend) variant to learn more.`,
      },
      {
        name: 'trendSentiment',
        type: `'good' | 'bad' | 'neutral' | 'auto'`,
        defaultValue: 'auto',
        description: `A visual indicator whether the trend is considered "good", "bad" or "neutral". By setting \`trendSentiment\` to \`auto\`, a positive trend will be considered "good", a negative trend will be considered "bad" and a trend of zero will be considered "neutral".  See the [trendSentiment](#Trend-sentiment) variant to learn more.`,
      },
      {
        name: 'value',
        type: 'string',
        description: 'The main datapoint value (e.g., 1.23M)',
        required: true,
      },
    ]}
  />,
);

card(
  <MainSection
    name="Localization"
    description={`Be sure to localize the \`title\`, \`tooltipText\` and trend \`accessibilityLabel\` props. Note that localization can lengthen text by 20 to 30 percent.`}
  />,
);

card(
  <MainSection name="Variants">
    <MainSection.Subsection columns={2} title="Size">
      <MainSection.Card
        cardSize="md"
        title="size=md"
        defaultCode={`
        <Datapoint size="md" title="Spend" value="$1.23M" />
`}
      />
      <MainSection.Card
        cardSize="md"
        title="size=lg"
        defaultCode={`
        <Datapoint size="lg" title="Spend" value="$1.23M" />
`}
      />
    </MainSection.Subsection>

    <MainSection.Subsection
      description={`Use \`trend\` to display the change in the value of a Datapoint over time. Make sure to provide an \`accessibilityLabel\` when the trend is above or below zero.`}
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
      description={`By default, a positive trend will be considered "good" (displayed as a green trend), a negative trend "bad" (displayed as a red trend) and a trend of 0 "neutral" (displayed as a dark gray trend). However, the \`trendSentiment\` property can be used to explicitly set whether the \`trend\` is considered "good", "bad" or "neutral", as demonstrated below.`}
      title="Trend sentiment"
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
<Flex direction="column" gap={4}>
  <Datapoint title="Bounce rate" value="86.3%" trend={{value: 29, accessibilityLabel: "Trending up"}} trendSentiment="bad" />
  <Datapoint title="Conversion falloffs" value="92" trend={{value: -10, accessibilityLabel: "Tending down"}} trendSentiment="good" />
  <Datapoint title="Spend" value="$19.3k" trend={{value: -4, accessibilityLabel: "Trending down"}} trendSentiment="neutral"  />
</Flex>
`}
      />
    </MainSection.Subsection>

    <MainSection.Subsection
      description={`The \`tooltipText\` prop is intended to provide the user context, detail and/or framing for a Datapoint through a [Tooltip](/Tooltip).`}
      title="Tooltip text"
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
<Datapoint title="Spend" value="$5.7k" tooltipText="Total ad spend in the selected time period" />
    `}
      />
    </MainSection.Subsection>
  </MainSection>,
);

export default cards;
