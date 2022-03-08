// @flow strict
import { type Node } from 'react';
import GeneratedPropTable from '../components/GeneratedPropTable.js';
import PageHeader from '../components/PageHeader.js';
import MainSection from '../components/MainSection.js';
import docgen, { type DocGen } from '../components/docgen.js';
import Page from '../components/Page.js';

export default function DatapointPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title="Datapoint">
      <PageHeader
        name="Datapoint"
        description={generatedDocGen?.description}
        defaultCode={`
<Datapoint size="lg" tooltipText="The number of times your ads were seen, including earned impressions" title="Total impressions" value="2.34M" trend={{value: 30, accessibilityLabel: "Trending up"}} />
`}
        badge="pilot"
      />
      <GeneratedPropTable generatedDocGen={generatedDocGen} />
      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
          - To display a single numerical metric.
        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
          - When the information to convey is qualitative (e.g., “In Progress” or “Healthy”). Use [Status](/status) instead.
          - When the Datapoint’s metric/value is not clear or understandable in isolation.
        `}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection
        name="Localization"
        description={`Be sure to localize the \`title\`, \`tooltipText\` and trend \`accessibilityLabel\` props. Note that localization can lengthen text by 20 to 30 percent.`}
      />
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
      </MainSection>{' '}
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'Datapoint' }) },
  };
}
