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
import multipleCheckboxDo from '../../examples/tiledata/multipleCheckboxDo.js';
import multipleCheckboxDont from '../../examples/tiledata/multipleCheckboxDont.js';
import singleTileDo from '../../examples/tiledata/singleTileDo.js';
import singleTileDont from '../../examples/tiledata/singleTileDont.js';
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
            sandpackExample={
              <SandpackExample
                code={singleTileDo}
                name="show one selected tile"
                hideEditor
                previewHeight={200}
              />
            }
          />
          <MainSection.Card
            cardSize="sm"
            type="don't"
            description="Use TileData to present a single option. If TileData's don't need to be selected, then use a [Datapoint](https://gestalt.pinterest.systems/web/datapoint) instead."
            sandpackExample={
              <SandpackExample
                code={singleTileDont}
                name="show one tile not selected"
                hideEditor
                previewHeight={200}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            type="do"
            description="Use the `showCheckbox` property when multiple Tiledata can be selected. See the [group](https://gestalt.pinterest.systems/web/tiledata#Group) variant for more details."
            sandpackExample={
              <SandpackExample
                code={multipleCheckboxDo}
                name="show multiple with checkboxes"
                hideEditor
                previewHeight={200}
              />
            }
          />
          <MainSection.Card
            cardSize="sm"
            type="don't"
            description="Use TileData when multiple items can be selected without a visible checkbox."
            sandpackExample={
              <SandpackExample
                code={multipleCheckboxDont}
                name="not show multiple with checkboxes"
                hideEditor
                previewHeight={200}
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection
        name={generatedDocGen?.displayName}
        description="Users should be able to navigate or activate TileData using a keyboard or other input modalities. Be sure to include an `accessibilityLabel` for the screen reader if you're using the `trend` or `tooltip` props."
      />

      <MainSection
        name="Localization"
        description={`
        Be sure to localize \`title\`, \`value\`, \`trend.accessibilityLabel\`, and \`tooltip.accessibilityLabel\` in TileData. 

        When the title of the TileData reaches its max width, either intentionally or through localization, the title will wrap as needed to display the full text. Keep this in mind when selecting wording for your TileData menu items. Note that localization can lengthen text by 20 to 30 percent. `}
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          description="TileData can be used along side the colors provided from the Data Visualization [Color Palette](https://gestalt.pinterest.systems/foundations/data_visualization/palette#12-Color-categorical-palette). You may use colors to distinguish different data lines."
          title="Colors"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={color} name="Colors Variant" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="Use `tooltip` to display clarifying information on hover/focus. We recommend using tooltips when trying to provide the user additional context/details."
          title="Tooltip"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={tooltip} name="Tooltip variant" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description="Disabled TileData cannot be interacted with using the mouse or keyboard. This is commonly used to disable interaction when there are pending permissions or data pre-requisites have not been met."
          title="Disabled"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={disabled} name="Disabled variant" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`Use checkboxes when enabling a multi-select experience. You can show a checkbox state by passing the \`showCheckbox\` prop.`}
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
      **[Datapoint](/web/datapoint)**
      Used to display data at-a-glance data for a user to quickly view key metrics.
      
      **[Checkbox](/web/checkbox)**
      Used when presenting a user with a list of choices for which there can be multiple selections.

      **[RadioGroup](/web/radiogroup)**
      Use when presenting a user with a list of choices for which there can only be one selection.
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
