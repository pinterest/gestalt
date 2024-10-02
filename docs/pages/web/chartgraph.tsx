import { BannerSlim, Box } from 'gestalt';
import {
  TOKEN_COLOR_DATA_VISUALIZATION_01,
  TOKEN_COLOR_DATA_VISUALIZATION_02,
  TOKEN_COLOR_DATA_VISUALIZATION_03,
  TOKEN_COLOR_DATA_VISUALIZATION_04,
  TOKEN_COLOR_DATA_VISUALIZATION_05,
  TOKEN_COLOR_DATA_VISUALIZATION_06,
  TOKEN_COLOR_DATA_VISUALIZATION_07,
  TOKEN_COLOR_DATA_VISUALIZATION_08,
  TOKEN_COLOR_DATA_VISUALIZATION_09,
  TOKEN_COLOR_DATA_VISUALIZATION_10,
  TOKEN_COLOR_DATA_VISUALIZATION_11,
  TOKEN_COLOR_DATA_VISUALIZATION_12,
} from 'gestalt-design-tokens';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import CombinationNew from '../../docs-components/CombinationNew';
import { multipleDocGen, MultipleDocGenType } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import PatternBarFill from '../../docs-components/PatternBarFill';
import PatternLineMarker from '../../docs-components/PatternLineMarker';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import accessibility from '../../examples/chartgraph/accessibility';
import barColumn from '../../examples/chartgraph/barColumn';
import barHorizontal from '../../examples/chartgraph/barHorizontal';
import biaxial from '../../examples/chartgraph/biaxial';
import colors from '../../examples/chartgraph/colors';
import combo from '../../examples/chartgraph/combo';
import customTooltip from '../../examples/chartgraph/customTooltip';
import decalBars from '../../examples/chartgraph/decalBars';
import decalLines from '../../examples/chartgraph/decalLines';
import doBiaxial from '../../examples/chartgraph/doBiaxial';
import doColor from '../../examples/chartgraph/doColor';
import doLimit from '../../examples/chartgraph/doLimit';
import dontBiaxial from '../../examples/chartgraph/dontBiaxial';
import dontLimit from '../../examples/chartgraph/dontLimit';
import doSameColor from '../../examples/chartgraph/doSameColor';
import layout from '../../examples/chartgraph/layout';
import legend from '../../examples/chartgraph/legend';
import line from '../../examples/chartgraph/line';
import localizationLabels from '../../examples/chartgraph/localizationLabels';
import main from '../../examples/chartgraph/main';
import precision from '../../examples/chartgraph/precision';
import range from '../../examples/chartgraph/range';
import referenceArea from '../../examples/chartgraph/referenceArea';
import responsive from '../../examples/chartgraph/responsive';
import tagdata from '../../examples/chartgraph/selectorTagData';
import tiledata from '../../examples/chartgraph/selectorTileData';
import stackedBar from '../../examples/chartgraph/stackedBar';
import tickFormatter from '../../examples/chartgraph/tickFormatter';
import timeseries from '../../examples/chartgraph/timeseries';
import title from '../../examples/chartgraph/title';
import tooltip from '../../examples/chartgraph/tooltip';

const DOC_NAMES = ['ChartGraph', 'LegendIcon'] as const;
type GeneratedDocGen = MultipleDocGenType<typeof DOC_NAMES[number]>;

export default function ComponentPage({ generatedDocGen }: { generatedDocGen: GeneratedDocGen }) {
  const MEDIUM_HEIGHT = 300;
  const SMALL_HEIGHT = 250;
  const LARGE_HEIGHT = 400;
  const EXTRA_LARGE_HEIGHT = 500;

  return (
    <Page title={generatedDocGen.ChartGraph?.displayName}>
      <PageHeader
        bannerSlim={
          <BannerSlim
            iconAccessibilityLabel="Warning"
            message="ChartGraph is still under development. The component API, style, and behaviour might change in follow-up releases."
            type="warning"
          />
        }
        description={generatedDocGen.ChartGraph?.description}
        name={generatedDocGen.ChartGraph?.displayName}
      >
        <SandpackExample
          code={main}
          hideEditor
          name="Main Avatar example"
          previewHeight={MEDIUM_HEIGHT}
        />
      </PageHeader>
      <GeneratedPropTable generatedDocGen={generatedDocGen.ChartGraph} />
      <MainSection
        description={`These are overall guidelines for ChartGraph. For usage guidelines on specific graphs, see:
        - [Bar graph usage guidelines](../foundations/data_visualization/charts_and_graphs/bar_graphs#Usage-guidelines)
        - [Line graph usage guidelines](../foundations/data_visualization/charts_and_graphs/line_graphs#Usage-guidelines)
        - [Charts and graphs general guidelines](../foundations/data_visualization/charts_and_graphs/general_guidelines)
        `}
        name="Usage guidelines"
      >
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
- To compare data sets
- To show trends, frequency of occurrences and distribution of data across time
- To visually summarize and explain complex data sets and concepts        `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
- To show parts-to-whole. Use a pie or donut chart instead.
- To visualize a series of stages in a sequence that get smaller over time. Use a funnel chart instead.
- To show large data sets that are too hard to show in a chart. Use [Table](/web/table) instead.        `}
            title="When not to use"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection
        description={`These are overall best practices for ChartGraph. For best practices on specific graphs, see:
        - [Bar graph best practices](../foundations/data_visualization/charts_and_graphs/bar_graphs#Best-practices)
        - [Line graph best practices](../foundations/data_visualization/charts_and_graphs/line_graphs#Best-practices)
        - [Charts and graphs general guidelines](../foundations/data_visualization/charts_and_graphs/general_guidelines)
        `}
        name="Best practices"
      >
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Limit the amount of data you show in a graph so that it is readable and easy to follow."
            sandpackExample={
              <SandpackExample
                code={doLimit}
                hideEditor
                layout="column"
                name="Do Data"
                previewHeight={SMALL_HEIGHT}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Add a lot of data to a graph that makes it hard to read. If you need to show a lot of data, use [Table](/web/table) instead. Another option is using multiple graphs in a grid."
            sandpackExample={
              <SandpackExample
                code={dontLimit}
                hideControls
                hideEditor
                layout="column"
                name="Don't Data"
                previewHeight={SMALL_HEIGHT}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="When displaying multiple categories in lines or bars, stick to the default color sequence provided since it has been optimized for color blindness."
            sandpackExample={
              <SandpackExample
                code={doColor}
                hideEditor
                layout="column"
                name="Do different color"
                previewHeight={SMALL_HEIGHT}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Pick colors that are too similar to each other and hard to tell apart, especially for those with visual impairments."
            sandpackExample={
              <SandpackExample
                code={doSameColor}
                hideControls
                hideEditor
                layout="column"
                name="Don't same color"
                previewHeight={SMALL_HEIGHT}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description="Use a biaxial chart when there is a significant difference between values. A suggestion is a 50%+ difference."
            sandpackExample={
              <SandpackExample
                code={doBiaxial}
                hideEditor
                layout="column"
                name="Do biaxial"
                previewHeight={SMALL_HEIGHT}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description="Use a biaxial chart when there is a very minor difference between values being compared. Use a chart with a single axis instead."
            sandpackExample={
              <SandpackExample
                code={dontBiaxial}
                hideControls
                hideEditor
                layout="column"
                name="Don't biaxial"
                previewHeight={SMALL_HEIGHT}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>
      <AccessibilitySection name={generatedDocGen.ChartGraph?.displayName}>
        <MainSection.Subsection
          description={`Charts use color to represent discrete categories. However, people with color blindness or other visual impairments may have difficulty telling certain colors apart.

Therefore, ChartGraph provides an accessibility view mode where colors in bars and lines are replaced with visual patterns to help in their interpretation. Bar charts use pattern fills and line charts use series markers with different shapes to help distinguish between data points without using color alone. Each pattern fill and time series shape corresponds to one of the colors in our 12-color categorical palette.

ChartGraph provides \`visualPatternSelected\` and \`onVisualPatternChange\` props to manage the visual state of the component externally. If a person selects Low Vision Features in the settings or enables the visual patterns in one component, other charts can also be enabled at the same time to adapt to a user’s accessibility preferences.

ChartGraph displays an IconButton in the header section that allows to enable the visual pattern from the component itself.`}
          title="Visual patterns"
        >
          <MainSection.Card cardSize="lg" title="Bar pattern fills">
            <PatternBarFill />
          </MainSection.Card>
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={decalBars} layout="column" name="Visual pattern for bars" />
            }
            title="Bar pattern fills example"
          />
          <MainSection.Card
            cardSize="lg"
            description="For line graphs, shapes are used to help tell categories apart."
            title="Line series markers"
          >
            <PatternLineMarker />
          </MainSection.Card>

          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={decalLines} layout="column" name="Visual pattern for lines" />
            }
            title="Line series markers example"
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`Charts are presented as images to screen readers. Provide a description using the \`accessibilityLabel\` to provide more context around ChartGraph’s content.

Don't use \`accessibilityLabel\` to describe the ChartGraph content itself. We’re working on adding a  Table view feature to access the detailed data of ChartGraph in a more granular and accessible way.

\`accessibilityLabel\` is automatically prefixed with "ChartGraph." to differentiate ChartGraph from other images.
          `}
          title="ARIA attributes"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={accessibility} name="Accessibility label" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`
An additional button is available to show chart data as a table so that it’s easier to

- navigate with a screen reader
- read data for those who have difficulty processing visual information
- download data to view in a person’s own tools

The tabular data is also available to download as a .csv file.
          `}
          title="Tabular representation"
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
          description={generatedDocGen.LegendIcon?.description}
          title={generatedDocGen.LegendIcon?.displayName}
        >
          <GeneratedPropTable
            generatedDocGen={generatedDocGen.LegendIcon}
            id={generatedDocGen.LegendIcon?.displayName}
            name={generatedDocGen.LegendIcon?.displayName}
          />
        </MainSection.Subsection>
      </MainSection>
      <MainSection name="Variants">
        <MainSection.Subsection
          description={`Arrange bars in rows that stack from top to bottom when horizontal space and you have longer text labels. Also known as a "horizontal bar chart".

Props: \`type="bar"\` \`elements=[{..., type:'bar'}]\` \`layout="horizontal"\`

`}
          title="Bar horizontal"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={barHorizontal} layout="column" name="Bar horizontal" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`In a column chart, bars are ordered horizontally. Use this when you have a small amount of data to compare and the horizontal space to do so. This includes text labels. If text labels are long, use Bar horizontal instead.

Props: \`type="bar"\` \`layout="horizontal"\`
          `}
          title="Bar column"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={barColumn} layout="column" name="Bar vertical" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`Stacked bar charts break bars into smaller categories so that their relationship to the whole can be seen.

Props: \`type="bar"\` \`stacked={true}\`

          `}
          title="Stacked bars"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={stackedBar} layout="column" name="Stacked bars" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`A line graph plots numeric values for categorical data as a line that shows a progression through time.

Props:  \`type="line"\`  \`elements=[{..., type:'line'}]\`
          `}
          title="Line"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={line} layout="column" name="Line" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`This combines a bar graph with a line graph. It is useful to see both categories and a trend or range over time.

Props:  \`type="combo"\` \`elements=[{..., type:'bar' or type:'line'}]\`
          `}
          title="Combo"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={combo} layout="column" name="Combo" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`Biaxial graphs show two y-axis. They're used when either comparing two categories with mixed types of data—for example, clicks vs spend—or when there is a significant difference between values. A suggestion is to move to a biaxial chart if there is a 50%+ difference between compared values.

Props:  \`layout="verticalBiaxial"\`  \`layout="horizontalBiaxial"\`
`}
          title="Biaxial"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={biaxial} layout="column" name="Biaxial" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`ChartGraph's header support a title, description, a HelpButton, and the accessibility features: tabular data and visual patterns switch buttons.

1. Title. A title for the graph in case it’s not displayed elsewhere on the screen.
2. Description. An optional description is available if more context is needed.
3. HelpButton
4. Tabular data switch button. Not available yet.
4. Visual pattern switch button.


Props:  \`title\`  \`description\` \`helpButton\`
`}
          title="Header"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={title} layout="column" name="Title & description" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          columns={2}
          description={`For showing more precise details on hover.

Props: \`renderTooltip\`
          `}
          title="Tooltip"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={tooltip} layout="column" name="Default tooltip" />
            }
            title="Default tooltip"
          />
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample code={customTooltip} layout="column" name="Custom tooltip" />
            }
            title="Custom tooltip"
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`Graphs that show more than one category should include a legend to clarify what color or pattern belongs to which category. For single axis charts, a legend isn’t needed when [TagData](/web/tagdata) or [TileData](/web/tiledata) are being used. Legend positions automatically on each layout for easier comprehension.

Props: \`legend\`
          `}
          title="Legend"
        >
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={legend} layout="column" name="Legend" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`Use to highlight an area in a graph for extra context. A common example is showing when data isn’t available.

Props: \`referenceAreas\`
          `}
          title="ReferenceArea"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={referenceArea} layout="column" name="ReferenceArea" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`To show exact and accurate data, lines should be rectilinear. When showing trends, forecasts and imprecise data, then lines should be curved to denote that these are just approximations.


Props: \`elements=[{..., type:'line', precision='estimate'}]\`
          `}
          title="Precision in line graphs"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={precision} layout="column" name="Precision" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`Colors on data series are set automatically for best contrast.

If different graphs need to be compared simultaneously, see example below, color in time series can be set in the \`elements\` prop setting each color \`color='01'\` individually.
        `}
          title="Colors"
        >
          {/* @ts-expect-error - TS2322 - Type '{ children: ({ color }: { [key: string]: any; }) => Element; cardSize: "xs"; color: string[]; }' is not assignable to type 'IntrinsicAttributes & Props'. */}
          <CombinationNew cardSize="xs" color={['01', '02', '03', '04', '05', '06']}>
            {({ color }) => {
              function getToken(value: string): string {
                switch (value) {
                  case '01':
                    return TOKEN_COLOR_DATA_VISUALIZATION_01;
                  case '02':
                    return TOKEN_COLOR_DATA_VISUALIZATION_02;
                  case '03':
                    return TOKEN_COLOR_DATA_VISUALIZATION_03;
                  case '04':
                    return TOKEN_COLOR_DATA_VISUALIZATION_04;
                  case '05':
                    return TOKEN_COLOR_DATA_VISUALIZATION_05;
                  case '06':
                    return TOKEN_COLOR_DATA_VISUALIZATION_06;
                  default:
                    return TOKEN_COLOR_DATA_VISUALIZATION_01;
                }
              }

              return (
                <Box
                  dangerouslySetInlineStyle={{
                    __style: {
                      backgroundColor: getToken(color),
                    },
                  }}
                  height={80}
                  width={80}
                />
              );
            }}
          </CombinationNew>
          {/* @ts-expect-error - TS2322 - Type '{ children: ({ color }: { [key: string]: any; }) => Element; cardSize: "xs"; color: string[]; }' is not assignable to type 'IntrinsicAttributes & Props'. */}
          <CombinationNew cardSize="xs" color={['07', '08', '09', '10', '11', '12']}>
            {({ color }) => {
              function getToken(value: string): string {
                switch (value) {
                  case '07':
                    return TOKEN_COLOR_DATA_VISUALIZATION_07;
                  case '08':
                    return TOKEN_COLOR_DATA_VISUALIZATION_08;
                  case '09':
                    return TOKEN_COLOR_DATA_VISUALIZATION_09;
                  case '10':
                    return TOKEN_COLOR_DATA_VISUALIZATION_10;
                  case '11':
                    return TOKEN_COLOR_DATA_VISUALIZATION_11;
                  case '12':
                    return TOKEN_COLOR_DATA_VISUALIZATION_12;
                  default:
                    return TOKEN_COLOR_DATA_VISUALIZATION_07;
                }
              }

              return (
                <Box
                  dangerouslySetInlineStyle={{
                    __style: {
                      backgroundColor: getToken(color),
                    },
                  }}
                  height={80}
                  width={80}
                />
              );
            }}
          </CombinationNew>
          <MainSection.Card
            cardSize="lg"
            sandpackExample={
              <SandpackExample
                code={colors}
                layout="column"
                name="Colors"
                previewHeight={EXTRA_LARGE_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`ChartGraph supports 4 layouts. Legend positions automatically on each layout for easier comprehension.

Single axis:
1. vertical (default)
2. horizontal

Dual axis:

3. verticalBiaxial
4. horizontalBiaxial

Props: \`layout\`

        `}
          title="Layout"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={layout}
                layout="column"
                name="Layout"
                previewHeight={LARGE_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`ChartGraph automatically sets the minimum and maximum axis values. The \`range\` prop allows  adjusting them in case we need broader range values in the axis.

Props: \`range\`

        `}
          title="Range"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={range}
                layout="column"
                name="Range"
                previewHeight={LARGE_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`ChartGraph is responsive. ChartGraph's width adjusts to the parent container. In order to render properly, ChartGraph requires a parent container with set dimensions.

For vertical layouts, ChartGraph has a set height based on the amount of ticks (five or three). For horizontal layouts, ChartGraph has a set height.

When ChartGraphs are contained within small containers (under 576px wide), set \`initialTicks={3}\` to prevent ChartGraph to flick.
          `}
          title="Responsive"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={responsive}
                layout="column"
                name="Responsive"
                previewHeight={EXTRA_LARGE_HEIGHT}
              />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`ChartGraph supports [TileData](/web/tiledata) and [TagData](/web/tagdata). The selection of TileData and TagData controls the data series displayed on ChartGraph.
          `}
          title="Selectors"
        >
          <MainSection.Card sandpackExample={<SandpackExample code={tiledata} name="TileData" />} />
          <MainSection.Card sandpackExample={<SandpackExample code={tagdata} name="TagData" />} />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`ChartGraph allows to format the values in the axis' ticks. For example, to translate numeric values to shorter ones (1000 => 1k) or to format dates based on locale.

Props: \`tickFormatter\`.

When localizing dates, use \`tickFormatter.timestamps\` as it traslates the values in the tooltip as well. Avoid using comma separators for dates as .csv files use them for cell separation. \`tickFormatter.xAxisBottom\` overrides \`tickFormatter.timeseries\` when both are present, in case tooltip and x axis present different date formats.
`}
          title="Tick format"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample code={tickFormatter} layout="column" name="Tick format" />
            }
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`ChartGraph supports timeseries. To enable timeseries, set \`tickFormatter.timeseries\`. Time series charts are only supported in vertical layout.

Props: \`tickFormatter.timeseries\`.
            `}
          title="Time series"
        >
          <MainSection.Card
            sandpackExample={
              <SandpackExample
                code={timeseries}
                layout="column"
                name="Time series"
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
            description={`
- Keep labels short so that they don’t wrap and make it hard to read data
- Use abbreviations that are commonly understood and can be translated to all supported languages. For more on abbreviations, see our [Content standards](/foundations/content_standards/formatting#Dates-and-abbreviations).
`}
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
- Create extra-long labels that have to wrap or truncate
- Use abbreviations that are only understood internally or that don't translate well.`}
            type="don't"
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
  props: {
    generatedDocGen: GeneratedDocGen;
  };
}> {
  return {
    props: {
      generatedDocGen: await multipleDocGen(DOC_NAMES),
    },
  };
}
