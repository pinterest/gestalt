import { ReactNode } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import color from '../../examples/tiledata/color';
import disabled from '../../examples/tiledata/disabled';
import group from '../../examples/tiledata/group';
import main from '../../examples/tiledata/main';
import multipleCheckboxDo from '../../examples/tiledata/multipleCheckboxDo';
import multipleCheckboxDont from '../../examples/tiledata/multipleCheckboxDont';
import singleTileDo from '../../examples/tiledata/singleTileDo';
import singleTileDont from '../../examples/tiledata/singleTileDont';
import tooltip from '../../examples/tiledata/tooltip';

export default function TileDataPage({ generatedDocGen }: { generatedDocGen: DocGen }) {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader description={generatedDocGen?.description} name={generatedDocGen?.displayName}>
        <SandpackExample code={main} hideEditor name="Main TileData Example" previewHeight={150} />
      </PageHeader>

      <GeneratedPropTable generatedDocGen={generatedDocGen} />

      <MainSection name="Usage guidelines">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="md"
            description={`
        - When selecting and/or comparing categories with an accompanying chart or graph view that displays at-a-glance data for a user to quickly view key metrics
      `}
            title="When to use"
            type="do"
          />
          <MainSection.Card
            cardSize="md"
            description={`
        - When grouping data points that aren't selectable
        - For selectable information that is not part of a data visualization
      `}
            title="When not to use"
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            description="Always present one tile in its selected state on default."
            sandpackExample={
              <SandpackExample
                code={singleTileDo}
                hideEditor
                name="show one selected tile"
                previewHeight={200}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="sm"
            description="Use TileData to present a single option. If TileData's don't need to be selected, then use [Datapoint](https://gestalt.pinterest.systems/web/datapoint) instead."
            sandpackExample={
              <SandpackExample
                code={singleTileDont}
                hideControls
                hideEditor
                name="show one tile not selected"
                previewHeight={200}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            description="Use the `showCheckbox` prop when multiple Tiledatas can be selected. See the [group variant](https://gestalt.pinterest.systems/web/tiledata#Group) for more details."
            sandpackExample={
              <SandpackExample
                code={multipleCheckboxDo}
                hideEditor
                name="show multiple with checkboxes"
                previewHeight={200}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="sm"
            description="Use TileData when multiple items can be selected without a visible checkbox."
            sandpackExample={
              <SandpackExample
                code={multipleCheckboxDont}
                hideControls
                hideEditor
                name="not show multiple with checkboxes"
                previewHeight={200}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection
        description="Users should be able to navigate or activate TileData using a keyboard or other input modalities. Be sure to include an `accessibilityLabel` for the screen reader if you're using the `trend` or `tooltip` props."
        name={generatedDocGen?.displayName}
      />

      <LocalizationSection
        name={generatedDocGen?.displayName}
        noDefaultLabelProvider
        notes="When the title of TileData reaches its max width, either intentionally or through localization, the title will wrap as needed to display the full text. Keep this in mind when selecting wording for TileData menu items."
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          description="TileData can be used along side the colors provided from the Data Visualization [color palette](https://gestalt.pinterest.systems/foundations/data_visualization/color/palette#12-Color-categorical-palette). You may use colors to distinguish different data lines."
          title="Colors"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={color} name="Colors Variant" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="Use `tooltip` to display clarifying information on hover/focus. We recommend using tooltips when trying to provide the user additional context/details.  You can also pass in a list of strings to create multi-line tooltips for TileData."
          title="Tooltip"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={tooltip} name="Tooltip variant" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description="Disabled TileDatas cannot be interacted with using the mouse or keyboard. This is commonly used to disable interaction when there are pending permissions or data prerequisites have not been met."
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

export async function getServerSideProps(): Promise<{
  props: {
    generatedDocGen: DocGen;
  };
}> {
  return {
    props: { generatedDocGen: await docGen('TileData') },
  };
}
