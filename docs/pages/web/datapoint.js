// @flow strict
import { type Node as ReactNode } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { type DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import displayChangeInValueOverTime from '../../examples/datapoint/displayChangeInValueOverTime';
import dontUseForLargeVolumesOfData from '../../examples/datapoint/dontUseForLargeVolumesOfData';
import dontUseLongDecimalValuesForTrend from '../../examples/datapoint/dontUseLongDecimalValuesForTrend';
import dontUseSubjectiveValuesForValue from '../../examples/datapoint/dontUseSubjectiveValuesForValue';
import explicitTrendSentimentSettings from '../../examples/datapoint/explicitTrendSentimentSettings';
import mainExample from '../../examples/datapoint/mainExample';
import makeSureToLocalizeNumericValues from '../../examples/datapoint/makeSureToLocalizeNumericValues';
import provideContextDetailFramingWithTooltip from '../../examples/datapoint/provideContextDetailFramingWithTooltip';
import sizeExample1 from '../../examples/datapoint/sizeExample1';
import sizeExample2 from '../../examples/datapoint/sizeExample2';
import useFullNumberWithLocaleSeparators from '../../examples/datapoint/useFullNumberWithLocaleSeparators';
import usePositiveTrendSentiment from '../../examples/datapoint/usePositiveTrendSentiment';
import withBadgeExample from '../../examples/datapoint/withBadgeExample';

export default function DocsPage({ generatedDocGen }: { generatedDocGen: DocGen }): ReactNode {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader description={generatedDocGen?.description} name={generatedDocGen?.displayName}>
        <SandpackExample
          code={mainExample}
          hideEditor
          layout="column"
          name="Main Example"
          previewHeight={160}
        />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
          - To display a single numerical metric.
        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
          - When the information to convey is qualitative (e.g., “In Progress” or “Healthy”). Use [Status](/web/status) instead.
          - When the Datapoint’s metric/value is not clear or understandable in isolation.
        `}
            title="When not to use"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Whenever possible, use the full number with locale-specific separators to ensure clarity across all languages."
            sandpackExample={
              <SandpackExample
                code={useFullNumberWithLocaleSeparators}
                hideEditor
                layout="column"
                name="Use Full Number With Locale Separators"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use long decimal values for `trend`. Limit the trend to one decimal point."
            sandpackExample={
              <SandpackExample
                code={dontUseLongDecimalValuesForTrend}
                hideControls
                hideEditor
                layout="column"
                name="Don't Use Long Decimal Values For Trend"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            // This example should also display a localized trend value, but given trend accepts only a number,
            // the value cannot be localized. Once the API is changed, we should add a localized trend to this example.
            cardSize="md"
            description="Make sure to localize numeric values."
            sandpackExample={
              <SandpackExample
                code={makeSureToLocalizeNumericValues}
                hideEditor
                layout="column"
                name="Make Sure To Localize Numeric Values"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use subjective values for Datapoint's value."
            sandpackExample={
              <SandpackExample
                code={dontUseSubjectiveValuesForValue}
                hideControls
                hideEditor
                layout="column"
                name="Don't Use Subjective Values For Value"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Be certain to use a positive `trendSentiment` only when the trend is overtly positive for the end user. Use a neutral `trendSentiment` in cases of ambiguity."
            sandpackExample={
              <SandpackExample
                code={usePositiveTrendSentiment}
                hideEditor
                layout="column"
                name="Use Positive Trend Sentiment Only When Positive"
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
Be cautious of using Datapoint for large volumes of data. In cases where the content is tabular, use [Table](/web/table).
`}
            sandpackExample={
              <SandpackExample
                code={dontUseForLargeVolumesOfData}
                hideControls
                hideEditor
                layout="column"
                name="Don't Use For Large Volumes Of Data"
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection
        description={`Datapoint's trend prop requires an \`accessibilityLabel\` to describe the trend icon (e.g., Trending up).`}
        name={generatedDocGen?.displayName}
      />

      <LocalizationSection
        name={generatedDocGen?.displayName}
        noDefaultLabelProvider
        notes={`Of particular importance is the need to localize the \`value\` prop. Similar to text, numerical data needs to be localized with regard to characters displayed, separators used, currency, percentages, and other considerations`}
      />

      <MainSection name="Variants">
        <MainSection.Subsection columns={2} title="Size">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={sizeExample1} layout="column" name="Size Example 1" />
            }
            title="Medium"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={sizeExample2} layout="column" name="Size Example 2" />
            }
            title="Large"
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
                code={displayChangeInValueOverTime}
                name="Display Change In Value Over Time"
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
                code={explicitTrendSentimentSettings}
                name="Explicit Trend Sentiment Settings"
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
                code={provideContextDetailFramingWithTooltip}
                name="Provide Context Detail Framing With Tooltip"
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="With a badge">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={withBadgeExample} name="With A Badge Example" />
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

export async function getServerSideProps(): Promise<{
  props: { generatedDocGen: DocGen },
}> {
  return {
    props: { generatedDocGen: await docGen('Datapoint') },
  };
}
