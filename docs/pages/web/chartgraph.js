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
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import accessibility from '../../examples/chartgraph/accessibility.js';
import bar from '../../examples/chartgraph/bar.js';
import colors from '../../examples/chartgraph/colors.js';
import composed from '../../examples/chartgraph/composed.js';
import controlledCategorical from '../../examples/chartgraph/controlledCategorical.js';
import controlledTimeseries from '../../examples/chartgraph/controlledTimeseries.js';
import customTooltip from '../../examples/chartgraph/customTooltip.js';
import decalBars from '../../examples/chartgraph/decalBars.js';
import decalLines from '../../examples/chartgraph/decalLines.js';
import grouped from '../../examples/chartgraph/grouped.js';
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
import stacked from '../../examples/chartgraph/stacked.js';
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

      <MainSection name="Best practices" />

      <AccessibilitySection name={generatedDocGen.ChartGraph?.displayName}>
        <MainSection.Subsection
          title="Visual patterns"
          description={`Charts use color to represents discrete categories. For users with color blindness or that experience difficulty in telling solid colors apart, the default color palette might be difficult to differentiate for some viewers.

ChartGraph provides an accessibility view model where color in bars and lines are replaced with visual patterns to assist in their interpretation. Bar charts use pattern fills and line charts use series markers with different shapes to help distinguish between data points without the use of color.

ChartGraph provides \`visualPatternSelected\` and \`onVisualPatternChange\` props to externally manage the visual state of the component. If a users selects Low Vision Features in the settings or enables the visual patterns in one components, we can also enable other charts at the same time to adapt to the selected user experience.

ChartGraph displays an IconButton in the header section that allows to enable the visual pattern from the component itself.

The following examples display all patterns and series markers; however, it's recommended to follow best practices and limit the number of categories to prevent visual overload and increase chart comprehension.
        `}
        >
          <MainSection.Card
            cardSize="lg"
            title="Bar pattern fills"
            sandpackExample={
              <SandpackExample code={decalBars} name="Visual pattern for bars" layout="column" />
            }
          />
          <MainSection.Card
            cardSize="lg"
            title="Line series markers"
            sandpackExample={
              <SandpackExample code={decalLines} name="Visual pattern for lines" layout="column" />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          title="ARIA attributes"
          description={`Charts are presented as images to screen readers. Provide a description using the \`accessibilityLabel\` to provide more context around ChartGraph’s content.

Don't use \`accessibilityLabel\` to describe the ChartGraph content itself. We re working on adding a new Table view feature to access the detailed data of ChartGraph in a granular way.

\`accessibilityLabel\` is automatically prefixed with "ChartGraph." to differenciate ChartGraph from other images.
          `}
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={accessibility} name="Accessibility label" />}
          />
        </MainSection.Subsection>
      </AccessibilitySection>

      <MainSection name="Localization">
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
        <MainSection.Subsection title="Types" columns={2}>
          <MainSection.Card
            cardSize="lg"
            title="Bar"
            sandpackExample={<SandpackExample code={bar} name="Bar" />}
          />
          <MainSection.Card
            cardSize="lg"
            title="Line"
            sandpackExample={<SandpackExample code={line} name="Line" />}
          />
          <MainSection.Card
            cardSize="lg"
            title="Composed"
            sandpackExample={<SandpackExample code={composed} name="Composed" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Grouped & Stacked bars" columns={2}>
          <MainSection.Card
            cardSize="lg"
            title="Grouped"
            sandpackExample={<SandpackExample code={grouped} name="Grouped" layout="column" />}
          />
          <MainSection.Card
            cardSize="lg"
            title="Stacked"
            sandpackExample={<SandpackExample code={stacked} name="Stacked" layout="column" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Colors">
          <CombinationNew
            cardSize="xs"
            color={['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']}
          >
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

        <MainSection.Subsection title="Title & description">
          <MainSection.Card
            sandpackExample={<SandpackExample code={title} name="Title & description" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Tooltip" columns={2}>
          <MainSection.Card
            cardSize="lg"
            title="Default tooltip"
            sandpackExample={<SandpackExample code={tooltip} name="Default tooltip" />}
          />
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

        <MainSection.Subsection title="Legend">
          <MainSection.Card
            cardSize="lg"
            sandpackExample={<SandpackExample code={legend} name="Legend" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="ReferenceArea">
          <MainSection.Card
            sandpackExample={<SandpackExample code={referenceArea} name="ReferenceArea" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Responsive">
          <MainSection.Card
            sandpackExample={<SandpackExample code={responsive} name="Responsive" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection title="Precision">
          <MainSection.Card
            sandpackExample={<SandpackExample code={precision} name="Precision" />}
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

      <MainSection name="Writing" />

      <QualityChecklist component={generatedDocGen.ChartGraph?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
      **[ChartGraph](/ChartGraph)**
      Details about why to use this over current component.
    `}
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
