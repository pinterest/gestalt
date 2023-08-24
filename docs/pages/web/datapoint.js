// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import docGen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import displayChangeInValueOverTime from '../../examples/datapoint/displayChangeInValueOverTime.js';
import dontUseForLargeVolumesOfData from '../../examples/datapoint/dontUseForLargeVolumesOfData.js';
import dontUseLongDecimalValuesForTrend from '../../examples/datapoint/dontUseLongDecimalValuesForTrend.js';
import dontUseSubjectiveValuesForValue from '../../examples/datapoint/dontUseSubjectiveValuesForValue.js';
import explicitTrendSentimentSettings from '../../examples/datapoint/explicitTrendSentimentSettings.js';
import mainExample from '../../examples/datapoint/mainExample.js';
import makeSureToLocalizeNumericValues from '../../examples/datapoint/makeSureToLocalizeNumericValues.js';
import provideContextDetailFramingWithTooltip from '../../examples/datapoint/provideContextDetailFramingWithTooltip.js';
import sizeExample1 from '../../examples/datapoint/sizeExample1.js';
import sizeExample2 from '../../examples/datapoint/sizeExample2.js';
import useFullNumberWithLocaleSeparators from '../../examples/datapoint/useFullNumberWithLocaleSeparators.js';
import usePositiveTrendSentiment from '../../examples/datapoint/usePositiveTrendSentiment.js';
import withBadgeExample from '../../examples/datapoint/withBadgeExample.js';

export default function DocsPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description}>
        <SandpackExample
          name="Main Example"
          code={mainExample}
          layout="column"
          hideEditor
          previewHeight={160}
        />
      </PageHeader>

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
            sandpackExample={
              <SandpackExample
                name="Use Full Number With Locale Separators"
                code={useFullNumberWithLocaleSeparators}
                layout="column"
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use long decimal values for `trend`. Limit the trend to one decimal point."
            sandpackExample={
              <SandpackExample
                name="Don't Use Long Decimal Values For Trend"
                code={dontUseLongDecimalValuesForTrend}
                layout="column"
                hideEditor
                hideControls
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            // This example should also display a localized trend value, but given trend accepts only a number,
            // the value cannot be localized. Once the API is changed, we should add a localized trend to this example.
            cardSize="md"
            type="do"
            description="Make sure to localize numeric values."
            sandpackExample={
              <SandpackExample
                name="Make Sure To Localize Numeric Values"
                code={makeSureToLocalizeNumericValues}
                layout="column"
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Use subjective values for Datapoint's value."
            sandpackExample={
              <SandpackExample
                name="Don't Use Subjective Values For Value"
                code={dontUseSubjectiveValuesForValue}
                layout="column"
                hideEditor
                hideControls
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Be certain to use a positive `trendSentiment` only when the trend is overtly positive for the end user. Use a neutral `trendSentiment` in cases of ambiguity."
            sandpackExample={
              <SandpackExample
                name="Use Positive Trend Sentiment Only When Positive"
                code={usePositiveTrendSentiment}
                layout="column"
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`
Be cautious of using Datapoint for large volumes of data. In cases where the content is tabular, use [Table](/web/table).
`}
            sandpackExample={
              <SandpackExample
                name="Don't Use For Large Volumes Of Data"
                code={dontUseForLargeVolumesOfData}
                layout="column"
                hideEditor
                hideControls
              />
            }
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
            cardSize="lg"
            title="Medium"
            sandpackExample={
              <SandpackExample name="Size Example 1" code={sizeExample1} layout="column" />
            }
          />
          <MainSection.Card
            cardSize="lg"
            title="Large"
            sandpackExample={
              <SandpackExample name="Size Example 2" code={sizeExample2} layout="column" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`Use \`trend\` to display the change in the value of a Datapoint over time. Make sure to provide an \`accessibilityLabel\` when the trend is above or below zero.`}
          title="Trend"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Display Change In Value Over Time"
                code={displayChangeInValueOverTime}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`By default, a positive trend will be considered "good" (displayed as a green trend), a negative trend "bad" (displayed as a red trend) and a trend of 0 "neutral" (displayed as a dark gray trend). However, the \`trendSentiment\` property can be used to explicitly set whether the \`trend\` is considered "good", "bad" or "neutral", as demonstrated below.`}
          title="Trend sentiment"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Explicit Trend Sentiment Settings"
                code={explicitTrendSentimentSettings}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`The \`tooltipText\` prop is intended to provide the user context, detail and/or framing for a Datapoint through a [Tooltip](/web/tooltip).`}
          title="Tooltip text"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                name="Provide Context Detail Framing With Tooltip"
                code={provideContextDetailFramingWithTooltip}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="With a badge">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample name="With A Badge Example" code={withBadgeExample} />
            }
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
