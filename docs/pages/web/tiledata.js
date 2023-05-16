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
import main from '../../examples/tiledata/main.js';
import tooltip from '../../examples/tiledata/tooltip.js';

export default function TileDataPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description}>
        <SandpackExample code={main} name="Main TileData Example" hideEditor previewHeight={150} />
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
            description="Use TileData to present a single option, since TileData's don't need to be selected. Use [Datapoint](https://gestalt.pinterest.systems/web/datapoint) instead."
            defaultCode={`<TileData color="01" title="Impressions" value="2M" trend={{ value: 1, accessibilityLabel: 'Trending up' }}/> `}
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            type="do"
            description="Use the `showCheckbox` property when multiple Tiledatas can be selected. See the [group](https://gestalt.pinterest.systems/web/tiledata#Group) variant."
            defaultCode={`<Flex gap={2}> <TileData color="01" title="Impressions" selected value="2M" showCheckbox trend={{ value: 1, accessibilityLabel: 'Trending up' }}/> <TileData color="02" title="Impressions" selected showCheckbox value="2M" trend={{ value: 1, accessibilityLabel: 'Trending up' }}/>   </Flex>`}
          />
          <MainSection.Card
            cardSize="sm"
            type="don't"
            description="Use Tiledata when multiple items can be selected without a visible checkbox."
            defaultCode={`<Flex gap={2}> <TileData color="01" title="Impressions" selected value="2M"  trend={{ value: 1, accessibilityLabel: 'Trending up' }}/> <TileData color="02" title="MAU" selected  value="2M" trend={{ value: 1, accessibilityLabel: 'Trending up' }}/>   </Flex>`}
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection
        name={generatedDocGen?.displayName}
        description="Users should be able to navigate or activate TileData using a keyboard or other input modalities. Be sure to include an `accessibilityLabel` for the screen reader if you're using the `trend` label"
      />

      <MainSection
        name="Localization"
        description={`
          Make sure that is placed in a Datapoint is set-up to work in RTL languages. Be sure to localize \`title\`, \`value\`, \`trend.accessibilityLabel\`, and \`tooltip.accessibilityLabel\` in TileData. 

        When the title of the TileData reaches its max width, either intentionally or through localization, the title will wrap as needed to display the full text. Keep this in mind when selecting wording for your TileData menu items. Note that localization can lengthen text by 20 to 30 percent. `}
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          description={`Use TileData's disabled prop to remove interactivity from the element. This is commonly used to ______`}
          title="Colors"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={color} name="Colors Variant" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="Use tooltip to display clarifying information on hover/focus. We recommend using tooltips when trying to provide the user additional context/details."
          title="Tooltip"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={tooltip} name="Tooltip variant" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description="Disabled TileData cannot be interacted with using the mouse or keyboard. This is commonly used to disable interaction when there are pending permissions or data pre-requisites have not been met"
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
