// @flow strict
import { type Node } from 'react';
import { Box, SlimBanner } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import CombinationNew from '../../docs-components/CombinationNew.js';
import { type DocGen, multipleDocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import PatternBarFill from '../../docs-components/PatternBarFill.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import accessibility from '../../examples/chartgraph/accessibility.js';
import barColumn from '../../examples/chartgraph/barColumn.js';
import barHorizontal from '../../examples/chartgraph/barHorizontal.js';
import biaxial from '../../examples/chartgraph/biaxial.js';
import colors from '../../examples/chartgraph/colors.js';
import combo from '../../examples/chartgraph/combo.js';
import controlledCategorical from '../../examples/chartgraph/controlledCategorical.js';
import controlledTimeseries from '../../examples/chartgraph/controlledTimeseries.js';
import customTooltip from '../../examples/chartgraph/customTooltip.js';
import decalBars from '../../examples/chartgraph/decalBars.js';
import decalLines from '../../examples/chartgraph/decalLines.js';
import doColor from '../../examples/chartgraph/doColor.js';
import doLimit from '../../examples/chartgraph/doLimit.js';
import dontLimit from '../../examples/chartgraph/dontLimit.js';
import doSameColor from '../../examples/chartgraph/doSameColor.js';
import labelMap from '../../examples/chartgraph/labelMap.js';
import layout from '../../examples/chartgraph/layout.js';
import legend from '../../examples/chartgraph/legend.js';
import line from '../../examples/chartgraph/line.js';
import main from '../../examples/chartgraph/main.js';
import noTooltip from '../../examples/chartgraph/noTooltip.js';
import precision from '../../examples/chartgraph/precision.js';
import range from '../../examples/chartgraph/range.js';
import referenceArea from '../../examples/chartgraph/referenceArea.js';
import responsive from '../../examples/chartgraph/responsive.js';
import stackedBar from '../../examples/chartgraph/stackedBar.js';
import tickFormatter from '../../examples/chartgraph/tickFormatter.js';
import tiledata from '../../examples/chartgraph/tiledata.js';
import timeseries from '../../examples/chartgraph/timeseries.js';
import title from '../../examples/chartgraph/title.js';
import tooltip from '../../examples/chartgraph/tooltip.js';

export default function ComponentPage({
  generatedDocGen,
}: {|
  generatedDocGen: {| [string]: DocGen |},
|}): Node {
  return (
    <Page title={generatedDocGen.ChartGraph?.displayName}>
      <PageHeader
        name={generatedDocGen.ChartGraph?.displayName}
        description={generatedDocGen.ChartGraph?.description}
        slimBanner={
          <SlimBanner
            type="error"
            iconAccessibilityLabel="Info"
            message="ChartGraph is still under development. The component API, style, and behaviour might change in follow-up releases."
          />
        }
      >
        <SandpackExample code={main} name="Main Avatar example" hideEditor previewHeight={150} />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen.ChartGraph} />

      <MainSection
        name="Usage guidelines"
        description="These are overall guidelines for using Chart. For guidelines on using specific charts, see our [Chart and graph guidelines](/foundations/data_visualization/charts_and_graphs)."
      >
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
- To compare data sets
- To show trends, frequency of occurrences and distribution of data across time
- To visually summarize and explain complex data sets and concepts        `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
- To show parts-to-whole. Use a pie or donut chart instead.
- To visualize a series of stages in a sequence that get smaller over time. Use a funnel chart instead.
- To show large data sets that are too hard to show in a chart. Use [Table](/web/table) instead.        `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection
        name="Best practices"
        description="These are overall best practices for Chart. For best practices on specific charts, see our [Chart and graph guidelines](/foundations/data_visualization/charts_and_graphs)."
      >
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description="Limit the amount of data you show in a graph so that it is readable and easy to follow."
            sandpackExample={
              <SandpackExample name="Do Data" code={doLimit} layout="column" hideEditor />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Add a lot of data to a graph that makes it hard to read. If you need to show a lot of data, use [Table](/web/table) instead. Another option is using multiple graphs in a grid."
            sandpackExample={
              <SandpackExample
                name="Don't Data"
                code={dontLimit}
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
            description="When displaying multiple categories in lines or bars, stick to the default color sequence provided since it has been optimized for color blindness."
            sandpackExample={
              <SandpackExample
                name="Do different color"
                code={doColor}
                layout="column"
                hideEditor
              />
            }
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description="Pick colors that are too similar to each other and hard to tell apart, especially for those with visual impairments."
            sandpackExample={
              <SandpackExample
                name="Don't same color"
                code={doSameColor}
                layout="column"
                hideEditor
                hideControls
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen.ChartGraph?.displayName}>
        <MainSection.Subsection
          title="Visual patterns"
          description={`Charts use color to represent discrete categories. For people with color blindness or that experience difficulty in telling solid colors apart, the default color palette might be difficult to differentiate for some viewers. However, people with color blindness or other visual impairments may have difficulty telling certain colors apart.

Therefore, ChartGraph provides an accessibility view mode where colors in bars and lines are replaced with visual patterns to help in their interpretation. Bar charts use pattern fills and line charts use series markers with different shapes to help distinguish between data points without using color alone. Each pattern fill and time series shape corresponds to one of the colors in our 12-color categorical palette.

ChartGraph provides \`visualPatternSelected\` and \`onVisualPatternChange\` props to manage the visual state of the component externally. If a person selects Low Vision Features in the settings or enables the visual patterns in one component, other charts can also be enabled at the same time to adapt to a user’s accessibility preferences.

ChartGraph displays an IconButton in the header section that allows to enable the visual pattern from the component itself.`}
        >
          <MainSection.Card cardSize="lg" title="Bar pattern fills">
            <PatternBarFill />
          </MainSection.Card>
          <MainSection.Card
            cardSize="lg"
            title="Bar pattern fills example"
            sandpackExample={
              <SandpackExample code={decalBars} name="Visual pattern for bars" layout="column" />
            }
          />
          <MainSection.Card
            cardSize="lg"
            title="Line series markers"
            description="For line graphs, shapes are used to help tell categories apart."
          >
            <PatternBarFill />
          </MainSection.Card>
          <MainSection.Card
            cardSize="lg"
            title="Line series markers example"
            sandpackExample={
              <SandpackExample code={decalLines} name="Visual pattern for lines" layout="column" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="ARIA attributes"
          description={`Charts are presented as images to screen readers. Provide a description using the \`accessibilityLabel\` to provide more context around ChartGraph’s content.

Don't use \`accessibilityLabel\` to describe the ChartGraph content itself. We’re working on adding a  Table view feature to access the detailed data of ChartGraph in a more granular and accessible way.

\`accessibilityLabel\` is automatically prefixed with "ChartGraph." to differentiate ChartGraph from other images.
          `}
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={accessibility} name="Accessibility label" />}
          />
        </MainSection.Subsection>
      </AccessibilitySection>

      <MainSection
        name="Localization"
        description="Be sure to localize text and ARIA attributes. Any abbreviations for dates and numerals should also be localized.  Note that localization can lengthen text by 20 to 30%."
      >
        <MainSection.Subsection>
          <MainSection.Card
            sandpackExample={<SandpackExample code={labelMap} name="Localization" />}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Subcomponents">
        <MainSection.Subsection
          title={generatedDocGen.LegendIcon?.displayName}
          description={generatedDocGen.LegendIcon?.description}
        >
          <GeneratedPropTable
            name={generatedDocGen.LegendIcon?.displayName}
            id={generatedDocGen.LegendIcon?.displayName}
            generatedDocGen={generatedDocGen.LegendIcon}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Variants">
        <MainSection.Subsection title="Controlled component">
          <MainSection.Card
            cardSize="lg"
            title="Categorical"
            sandpackExample={
              <SandpackExample code={controlledCategorical} name="Categorical" layout="column" />
            }
          />
          <MainSection.Card
            cardSize="lg"
            title="Time series"
            sandpackExample={
              <SandpackExample code={controlledTimeseries} name="Time series" layout="column" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Bar horizontal"
          description={`Arrange bars in rows that stack from top to bottom when horizontal space and you have longer text labels. Also known as a "horizontal bar chart".`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={barHorizontal} name="Bar horizontal" layout="column" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="Bar column"
          description="In a column chart, bars are ordered horizontally. Use this when you have a small amount of data to compare and the horizontal space to do so. This includes text labels. If text labels are long, use a Row chart instead."
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={barColumn} name="Bar vertical" layout="column" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Stacked bar"
          description="Stacked bar charts break bars into smaller categories so that their relationship to the whole can be seen."
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={stackedBar} name="Stacked bar" layout="column" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Line"
          description="A line graph plots numeric values for categorical data as a line that shows a progression through time."
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={line} name="Line" layout="column" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Combo"
          description="This combines a bar graph with a line graph. It is useful to see both categories and a trend or range over time."
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={combo} name="Combo" layout="column" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Biaxial"
          description="Biaxial graphs show two y-axis. They're used when different amounts need to be displayed per each category represented in the graph."
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={biaxial} name="Biaxial" layout="column" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Title & description"
          description="A title for the graph in case it’s not displayed elsewhere on the screen. An optional description is available if more context is needed."
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={title} name="Title & description" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Tooltip"
          columns={2}
          description="For showing more precise details on hover."
        >
          <MainSection.Card
            cardSize="lg"
            title="Default tooltip"
            sandpackExample={<SandpackExample code={tooltip} name="Default tooltip" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="lg"
            title="No tooltip"
            sandpackExample={<SandpackExample code={noTooltip} name="No tooltip" />}
          />
          <MainSection.Card
            cardSize="lg"
            title="Custom tooltip"
            sandpackExample={<SandpackExample code={customTooltip} name="Custom tooltip" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Legend"
          description="Graphs that show more than one category should include a legend to clarify what color or pattern belongs to which category. For single axis charts, a legend isn’t needed when [TagData](/web/tagdata) or [TileData](/web/tiledata) are being used."
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={legend} name="Legend" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="ReferenceArea"
          description="Use to highlight an area in a graph for extra context. A common example is showing when data isn’t available."
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={referenceArea} name="ReferenceArea" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Precision in line graphs"
          description="To show exact and accurate data, lines should be rectilinear. When showing trends, forecasts and imprecise data, then lines should be curved to denote that these are just approximations."
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={precision} name="Precision" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Colors">
          <CombinationNew cardSize="xs" color={['01', '02', '03', '04', '05', '06']}>
            {({ color }) => (
              <Box
                dangerouslySetInlineStyle={{
                  __style: {
                    backgroundColor: `var(--g-colorDataVisualization${color})`,
                  },
                }}
                height={100}
                width={100}
              />
            )}
          </CombinationNew>
          <CombinationNew cardSize="xs" color={['07', '08', '09', '10', '11', '12']}>
            {({ color }) => (
              <Box
                dangerouslySetInlineStyle={{
                  __style: {
                    backgroundColor: `var(--g-colorDataVisualization${color})`,
                  },
                }}
                height={100}
                width={100}
              />
            )}
          </CombinationNew>
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={colors} name="Colors" layout="column" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Layout">
          <MainSection.Card sandpackExample={<SandpackExample code={layout} name="Layout" />} />
        </MainSection.Subsection>

        <MainSection.Subsection title="Responsive">
          <MainSection.Card
            sandpackExample={<SandpackExample code={responsive} name="Responsive" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Time series">
          <MainSection.Card
            sandpackExample={<SandpackExample code={timeseries} name="Time series" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Tick format">
          <MainSection.Card
            sandpackExample={<SandpackExample code={tickFormatter} name="Tick format" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Range">
          <MainSection.Card sandpackExample={<SandpackExample code={range} name="Range" />} />
        </MainSection.Subsection>

        <MainSection.Subsection title="TileData">
          <MainSection.Card sandpackExample={<SandpackExample code={tiledata} name="TileData" />} />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Writing">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            description={`
- Keep labels short so that they don’t wrap and make it hard to read data
- Use abbreviations that are commonly understood and can be translated to all supported languages. For more on abbreviations, see our [Content standards](/foundations/content_standards/formatting#Dates-and-abbreviations).
`}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            description={`
- Create extra-long labels that have to wrap or truncate
- Use abbreviations that are only understood internally or that don't translate well.`}
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen.ChartGraph?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
**[Data visualization guidelines](/foundations/data_visualization/overview)**
Principles, use cases and guidelines for charts, graphs and micro-visualizations

**[TagData](/web/tagdata)**
TagData enables people to select multiple categories to compare with each other in a graph or chart.

**[TileData](/web/tiledata)**
TileData enables users to select multiple categories to compare with each other in a graph or chart view, while still being able to see all of the data points.

**[Table](/web/table)**
Tables show data that's more complex and granular.      `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{|
  props: {| generatedDocGen: {| [string]: DocGen |} |},
|}> {
  return {
    props: {
      generatedDocGen: await multipleDocGen(['ChartGraph', 'LegendIcon']),
    },
  };
}
