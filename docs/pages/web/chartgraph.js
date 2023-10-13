// @flow strict
import { type Node } from 'react';
import { Box, SlimBanner } from 'gestalt';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import CombinationNew from '../../docs-components/CombinationNew.js';
import { type DocGen, multipleDocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import LocalizationSection from '../../docs-components/LocalizationSection.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import PatternBarFill from '../../docs-components/PatternBarFill.js';
import PatternLineMarker from '../../docs-components/PatternLineMarker.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import accessibility from '../../examples/chartgraph/accessibility.js';
import barColumn from '../../examples/chartgraph/barColumn.js';
import barHorizontal from '../../examples/chartgraph/barHorizontal.js';
import biaxial from '../../examples/chartgraph/biaxial.js';
import colors from '../../examples/chartgraph/colors.js';
import combo from '../../examples/chartgraph/combo.js';
import customTooltip from '../../examples/chartgraph/customTooltip.js';
import decalBars from '../../examples/chartgraph/decalBars.js';
import decalLines from '../../examples/chartgraph/decalLines.js';
import doColor from '../../examples/chartgraph/doColor.js';
import doLimit from '../../examples/chartgraph/doLimit.js';
import dontLimit from '../../examples/chartgraph/dontLimit.js';
import doSameColor from '../../examples/chartgraph/doSameColor.js';
import layout from '../../examples/chartgraph/layout.js';
import legend from '../../examples/chartgraph/legend.js';
import line from '../../examples/chartgraph/line.js';
import localizationLabels from '../../examples/chartgraph/localizationLabels.js';
import main from '../../examples/chartgraph/main.js';
import precision from '../../examples/chartgraph/precision.js';
import range from '../../examples/chartgraph/range.js';
import referenceArea from '../../examples/chartgraph/referenceArea.js';
import responsive from '../../examples/chartgraph/responsive.js';
import tagdata from '../../examples/chartgraph/selectorTagData.js';
import tiledata from '../../examples/chartgraph/selectorTileData.js';
import stackedBar from '../../examples/chartgraph/stackedBar.js';
import tickFormatter from '../../examples/chartgraph/tickFormatter.js';
import timeseries from '../../examples/chartgraph/timeseries.js';
import title from '../../examples/chartgraph/title.js';
import tooltip from '../../examples/chartgraph/tooltip.js';

export default function ComponentPage({
  generatedDocGen,
}: {
  generatedDocGen: { [string]: DocGen },
}): Node {
  const MEDIUM_HEIGHT = 300;
  const SMALL_HEIGHT = 250;
  const LARGE_HEIGHT = 400;
  const EXTRA_LARGE_HEIGHT = 500;

  return (
    <Page title={generatedDocGen.ChartGraph?.displayName}>
      <PageHeader
        name={generatedDocGen.ChartGraph?.displayName}
        description={generatedDocGen.ChartGraph?.description}
        slimBanner={
          <SlimBanner
            type="warning"
            iconAccessibilityLabel="Warning"
            message="ChartGraph is still under development. The component API, style, and behaviour might change in follow-up releases."
          />
        }
      >
        <SandpackExample
          code={main}
          name="Main Avatar example"
          hideEditor
          previewHeight={MEDIUM_HEIGHT}
        />
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
              <SandpackExample
                name="Do Data"
                code={doLimit}
                layout="column"
                hideEditor
                previewHeight={SMALL_HEIGHT}
              />
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
                previewHeight={SMALL_HEIGHT}
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
                previewHeight={SMALL_HEIGHT}
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
                previewHeight={SMALL_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection name={generatedDocGen.ChartGraph?.displayName}>
        <MainSection.Subsection
          title="Visual patterns"
          description={`Charts use color to represent discrete categories. However, people with color blindness or other visual impairments may have difficulty telling certain colors apart.

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
            <PatternLineMarker />
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

        <MainSection.Subsection
          title="Tabular representation"
          description={`
An additional button is available to show chart data as a table so that it’s easier to

- navigate with a screen reader
- read data for those who have difficulty processing visual information
- download data to view in a person’s own tools

The tabular data is also available to download as a .csv file.
          `}
        />
      </AccessibilitySection>

      <LocalizationSection
        code={localizationLabels}
        name={generatedDocGen.ChartGraph?.displayName}
        notes={`To localize data content, use the \`labelMap\` prop. See the example for detailed implementation guidance.

To localize dates in time series, use the \`tickFormatter.timeseries\` prop. See the [time series example](#Time-series) for detailed implementation guidance.`}
      />

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
        <MainSection.Subsection
          title="Bar horizontal"
          description={`Arrange bars in rows that stack from top to bottom when horizontal space and you have longer text labels. Also known as a "horizontal bar chart".

Props: \`type="bar"\` \`elements=[{..., type:'bar'}]\` \`layout="horizontal"\`

`}
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
          description={`In a column chart, bars are ordered horizontally. Use this when you have a small amount of data to compare and the horizontal space to do so. This includes text labels. If text labels are long, use Bar horizontal instead.

Props: \`type="bar"\` \`layout="horizontal"\`
          `}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={barColumn} name="Bar vertical" layout="column" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Stacked bars"
          description={`Stacked bar charts break bars into smaller categories so that their relationship to the whole can be seen.

Props: \`type="bar"\` \`stacked={true}\`

          `}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={stackedBar} name="Stacked bars" layout="column" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Line"
          description={`A line graph plots numeric values for categorical data as a line that shows a progression through time.

Props:  \`type="line"\`  \`elements=[{..., type:'line'}]\`
          `}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={line} name="Line" layout="column" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Combo"
          description={`This combines a bar graph with a line graph. It is useful to see both categories and a trend or range over time.

Props:  \`type="combo"\` \`elements=[{..., type:'bar' or type:'line'}]\`
          `}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={combo} name="Combo" layout="column" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Biaxial"
          description={`Biaxial graphs show two y-axis. They're used when different amounts need to be displayed per each category.

Props:  \`layout="verticalBiaxial"\`  \`layout="horizontalBiaxial"\`
`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={biaxial} name="Biaxial" layout="column" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Header"
          description={`ChartGraph's header support a title, description, a HelpButton, and the accessibility features: tabular data and visual patterns switch buttons.

1. Title. A title for the graph in case it’s not displayed elsewhere on the screen.
2. Description. An optional description is available if more context is needed.
3. HelpButton
4. Tabular data switch button. Not available yet.
4. Visual pattern switch button.


Props:  \`title\`  \`description\` \`helpButton\`
`}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={title} name="Title & description" layout="column" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Tooltip"
          columns={2}
          description={`For showing more precise details on hover.

Props: \`renderTooltip\`
          `}
        >
          <MainSection.Card
            cardSize="lg"
            title="Default tooltip"
            sandpackExample={
              <SandpackExample code={tooltip} name="Default tooltip" layout="column" />
            }
          />
          <MainSection.Card
            cardSize="lg"
            title="Custom tooltip"
            sandpackExample={
              <SandpackExample code={customTooltip} name="Custom tooltip" layout="column" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Legend"
          description={`Graphs that show more than one category should include a legend to clarify what color or pattern belongs to which category. For single axis charts, a legend isn’t needed when [TagData](/web/tagdata) or [TileData](/web/tiledata) are being used. Legend positions automatically on each layout for easier comprehension.

Props: \`legend\`
          `}
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={legend} name="Legend" layout="column" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="ReferenceArea"
          description={`Use to highlight an area in a graph for extra context. A common example is showing when data isn’t available.

Props: \`referenceAreas\`
          `}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={referenceArea} name="ReferenceArea" layout="column" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Precision in line graphs"
          description={`To show exact and accurate data, lines should be rectilinear. When showing trends, forecasts and imprecise data, then lines should be curved to denote that these are just approximations.


Props: \`elements=[{..., type:'line', precision='estimate'}]\`
          `}
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={precision} name="Precision" layout="column" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Colors"
          description={`Colors on data series are set automatically for best contrast.

If different graphs need to be compared simultaneously, see example below, color in time series can be set in the \`elements\` prop setting each color \`color='01'\` individually.
        `}
        >
          <CombinationNew cardSize="xs" color={['01', '02', '03', '04', '05', '06']}>
            {({ color }) => (
              <Box
                dangerouslySetInlineStyle={{
                  __style: {
                    backgroundColor: `var(--g-colorDataVisualization${color})`,
                  },
                }}
                height={80}
                width={80}
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
                height={80}
                width={80}
              />
            )}
          </CombinationNew>
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={colors}
                name="Colors"
                layout="column"
                previewHeight={EXTRA_LARGE_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Layout"
          description={`ChartGraph supports 4 layouts. Legend positions automatically on each layout for easier comprehension.

Single axis:
1. vertical (default)
2. horizontal

Dual axis:

3. verticalBiaxial
4. horizontalBiaxial

Props: \`layout\`

        `}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={layout}
                name="Layout"
                layout="column"
                previewHeight={LARGE_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Range"
          description={`ChartGraph automatically sets the minimum and maximum axis values. The \`range\` prop allows  adjusting them in case we need broader range values in the axis.

Props: \`range\`

        `}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={range}
                name="Range"
                layout="column"
                previewHeight={LARGE_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Responsive"
          description={`ChartGraph is responsive. ChartGraph's width adjusts to the parent container. In order to render properly, ChartGraph requires a parent container with set dimensions.

For vertical layouts, ChartGraph has a set height based on the amount of ticks (five or three). For horizontal layouts, ChartGraph has a set height.

When ChartGraphs are contained within small containers (under 576px wide), set \`initialTicks={3}\` to prevent ChartGraph to flick.
          `}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={responsive}
                name="Responsive"
                layout="column"
                previewHeight={EXTRA_LARGE_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Selectors"
          description={`ChartGraph supports [TileData](/web/tiledata) and [TagData](/web/tagdata). The selection of TileData and TagData controls the data series displayed on ChartGraph.
          `}
        >
          <MainSection.Card sandpackExample={<SandpackExample code={tiledata} name="TileData" />} />
          <MainSection.Card sandpackExample={<SandpackExample code={tagdata} name="TagData" />} />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Tick format"
          description={`ChartGraph allows to format the values in the axis' ticks. For example, to translate numeric values to shorter ones (1000 => 1k) or to format dates based on locale.

Props: \`tickFormatter\`.

When localizing dates, use \`tickFormatter.timestamps\` as it traslates the values in the tooltip as well. Avoid using comma separators for dates as .csv files use them for cell separation. \`tickFormatter.xAxisBottom\` overrides \`tickFormatter.timeseries\` when both are present, in case tooltip and x axis present different date formats.
`}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={tickFormatter} name="Tick format" layout="column" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          title="Time series"
          description={`ChartGraph supports timeseries. To enable timeseries, set \`tickFormatter.timeseries\`. Time series charts are only supported in vertical layout.

Props: \`tickFormatter.timeseries\`.
            `}
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={timeseries}
                name="Time series"
                layout="column"
                previewHeight={LARGE_HEIGHT}
              />
            }
          />
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

export async function getServerSideProps(): Promise<{
  props: { generatedDocGen: { [string]: DocGen } },
}> {
  return {
    props: {
      generatedDocGen: await multipleDocGen(['ChartGraph', 'LegendIcon']),
    },
  };
}
