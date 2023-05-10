// @flow strict
import { type Node } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection.js';
import docgen, { type DocGen } from '../../docs-components/docgen.js';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable.js';
import MainSection from '../../docs-components/MainSection.js';
import Page from '../../docs-components/Page.js';
import PageHeader from '../../docs-components/PageHeader.js';
import QualityChecklist from '../../docs-components/QualityChecklist.js';
import SandpackExample from '../../docs-components/SandpackExample.js';
import color from '../../examples/tiledata/color.js';
import disabled from '../../examples/tiledata/disabled.js';
import group from '../../examples/tiledata/group.js';
import mainExample from '../../examples/tiledata/main.js';
import tooltip from '../../examples/tiledata/tooltip.js';

export default function TileDataPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description}>
        <SandpackExample code={mainExample} name="No image source" hideEditor previewHeight={150} />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            type="do"
            title="When to use"
            description={`
        - When selecting and/or comparing categories with an accompanying chart or graph view that displays at-a-glance data for a user to quickly view key metrics
      `}
          />
          <MainSection.Card
            cardSize="md"
            type="don't"
            title="When not to use"
            description={`
        - When grouping Datapoints that aren't selectable
        - For selectable information that is not part of a data visualization
      `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        {/* <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            type="do"
            description="Use TileData paired with data visualization colors to make a visual connection between a chart and its related data"
            defaultCode={`<TileData color="data-visualization-01" title="Blah" value="2" selected /> `}
          />

          <MainSection.Card
            cardSize="sm"
            type="don't"
            description="Use colors outside of the Data Visualization palette. Please refer to the [Usage](/foundations/data_visualization/usage) and [Palette](/data_visualization/palette)."
          />
</MainSection.Subsection> */}
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            type="do"
            description="Always present one tile in its selected state on default."
            defaultCode={`<TileData color="01" title="Impressions" value="2M" selected trend={{ value: 5, accessibilityLabel: 'Trending up' }} /> `}
          />

          <MainSection.Card
            cardSize="sm"
            type="don't"
            description="Use it to present a single option, since they don't need to be selected. Use a [Datapoint](/web/datapoint) instead."
            defaultCode={`<TileData color="01" title="Impressions" value="2M" trend={{ value: 1, accessibilityLabel: 'Trending up' }}/> `}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            type="do"
            description="Use TileData to switch between data on charts."
          />
          <MainSection.Card
            cardSize="sm"
            type="don't"
            description="Use for page-level navigation, as TileData is to be used in conjunction with a chart. Use [Tabs](/web/tabs), [SegmentedControl](/web/segmentedcontrol), [SideNavigation](/web/sidenavigation), or another local navigation instead."
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection
        name={generatedDocGen?.displayName}
        description="Users should be able to navigate or activate TileData using a keyboard or other input modalities. Be sure to include an `accessibilityLabel` for the screen reader within the child element."
      />

      <MainSection
        name="Localization"
        description="Make sure content that is placed in a Datapoint is set-up to work in RTL languages. Be sure to localize `title`, `value` and `trend.accessibilityLabel` in TileData and all subcomponents as well. When the title of the TileData reaches its max width, either intentionally or through localization, the title will wrap as needed to display the full text. Keep this in mind when selecting wording for your TileData menu items. Note that localization can lengthen text by 20 to 30 percent. "
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          description={`Use TileData's Data Visualization to display multiple colors.`}
          title="Colors"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={color} name="Colors Variant" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="TileData can be used with a tooltip to display clarifying information."
          title="Tooltip"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={tooltip} name="Tooltip variant" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description="Removes interactivity from the element."
          title="Disabled"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={disabled} name="Disabled variant" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`Use checkboxes when enabling a multi-select experience. You can manage state by passing the \`selected\` prop.`}
          title="Group"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={group} name="Checkbox Variant" />}
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
      **[Datapoint](/Datapoint)**
      Datapoint displays at-a-glance data for a user to quickly view key metrics.
    `}
        />
      </MainSection>
    </Page>
  );
}

export async function getServerSideProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'TileData' }) },
  };
}
