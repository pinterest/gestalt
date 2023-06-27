// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import docGen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader
        name={generatedDocGen?.displayName}
        description={generatedDocGen?.description}
        defaultCode={`
<Datapoint
  size="lg"
  title="Total impressions"
  tooltipText="The number of times your ads were seen, including earned impressions"
  trend={{ value: 30, accessibilityLabel: "Trending up" }}
  value="2.34m"
/>
`}
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
          - When the information to convey is qualitative (e.g., “In Progress” or “Healthy”). Use [Status](/web/status) instead.
          - When the Datapoint’s metric/value is not clear or understandable in isolation.
        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Whenever possible, use the full number with locale-specific separators to ensure clarity across all languages."
            defaultCode={`
<Datapoint
  size="lg"
  title="Total impressions"
  value="1,451"
  trend={{ value: 10.1, accessibilityLabel: "Trending up" }}
/>
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use long decimal values for `trend`. Limit the trend to one decimal point."
            defaultCode={`
<Datapoint
  size="lg"
  title="Saves"
  value="10,392"
  trend={{ value: -12.193, accessibilityLabel: "Trending down" }}
/>
`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            // This example should also display a localized trend value, but given trend accepts only a number,
            // the value cannot be localized. Once the API is changed, we should add a localized trend to this example.
            cardSize="md"
            type="do"
            description="Make sure to localize numeric values."
            defaultCode={`
<Datapoint size="lg" title="Leistung" value="3.000,25" />
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use subjective values for Datapoint's value."
            defaultCode={`
<Datapoint size="lg" title="Performance" value="Bad" />

`}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Be certain to use a positive `trendSentiment` only when the trend is overtly positive for the end user. Use a neutral `trendSentiment` in cases of ambiguity."
            defaultCode={`
<Datapoint
  size="lg"
  title="Total spend"
  value="$14,325"
  trend={{ value: 5.6, accessibilityLabel: "Trending up" }}
  trendSentiment="neutral"
/>
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`
Be cautious of using Datapoint for large volumes of data. In cases where the content is tabular, use [Table](/web/table).
`}
            defaultCode={`
<Flex direction="column" gap={{ column: 4, row: 0 }}>
  <Datapoint size="md" title="January spend" value="$14,325"  />
  <Datapoint size="md" title="February spend" value="$12,150"  />
  <Datapoint size="md" title="March spend" value="$23,700"  />
  <Datapoint size="md" title="April spend" value="$9,525"  />
  <Datapoint size="md" title="May spend" value="$10,750"  />
</Flex>
`}
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection
        name={generatedDocGen?.displayName}
        description={`Datapoint's trend prop requires an \`accessibilityLabel\` to describe the trend icon (e.g., Trending up).`}
      />
      <MainSection
        name="Localization"
        description={`
        Be sure to localize the \`title\`, \`tooltipText\` and trend \`accessibilityLabel\` props. Note that localization can lengthen text by 20 to 30 percent.

        Of particular importance is the need to localize the \`value\` prop. Similar to text, numerical data needs to be localized with regard to characters displayed, separators used, currency, percentages, and other considerations.
        `}
      />

      <MainSection name="Variants">
        <MainSection.Subsection columns={2} title="Size">
          <MainSection.Card
            cardSize="md"
            title="Medium"
            defaultCode={`
        <Datapoint size="md" title="Spend" value="$1.23m" />
`}
          />
          <MainSection.Card
            cardSize="md"
            title="Large"
            defaultCode={`
        <Datapoint size="lg" title="Spend" value="$1.23m" />
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
<Flex direction="column" gap={{ column: 4, row: 0 }}>
  <Datapoint
    title="Pin clicks"
    value="1.23k"
    trend={{ value: 12, accessibilityLabel: "Trending up" }}
  />
  <Datapoint
    title="Saves"
    value="123"
    trend={{ value: 0, accessibilityLabel: "" }}
  />
  <Datapoint
    title="Total impressions"
    value="1.23m"
    trend={{ value: -5, accessibilityLabel: "Trending down" }}
  />
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
<Flex direction="column" gap={{ column: 4, row: 0 }}>
  <Datapoint
    title="Bounce rate"
    value="86.3%"
    trend={{ value: 29, accessibilityLabel: "Trending up" }}
    trendSentiment="bad"
  />
  <Datapoint
    title="Conversion falloffs"
    value="92"
    trend={{ value: -10, accessibilityLabel: "Tending down" }}
    trendSentiment="good"
  />
  <Datapoint
    title="Spend"
    value="$19.3k"
    trend={{ value: -4, accessibilityLabel: "Trending down" }}
    trendSentiment="neutral"
  />
</Flex>
`}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`The \`tooltipText\` prop is intended to provide the user context, detail and/or framing for a Datapoint through a [Tooltip](/web/tooltip).`}
          title="Tooltip text"
        >
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Datapoint
  title="Spend"
  value="$5.7k"
  tooltipText="Total ad spend in the selected time period"
/>
    `}
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="With a badge">
          <MainSection.Card
            cardSize="lg"
            defaultCode={`
<Datapoint
  title="Spend"
  value="$5.7k"
  tooltipText="Total ad spend in the selected time period"
  badge={{ text: "Early access" }}
/>
    `}
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Table](/web/table)**
Use Table when displaying a large volume of data values and trends (for instance, 10 or more).

**[Status](/web/status)**
Use Status in instances where information is more categorical or qualitative (such as health or phase).
      `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docGen('Datapoint') },
  };
}
