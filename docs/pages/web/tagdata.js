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
import baseColor from '../../examples/tagdata/baseColor.js';
import colors from '../../examples/tagdata/colors.js';
import disabled from '../../examples/tagdata/disabled.js';
import dismissable from '../../examples/tagdata/dismissable.js';
import doChangeBaseColor from '../../examples/tagdata/doChangeBaseColor.js';
import dontChangeBaseColor from '../../examples/tagdata/dontChangeBaseColor.js';
import dontMixStyles from '../../examples/tagdata/dontMixStyles.js';
import dontUseLongLabels from '../../examples/tagdata/dontUseLongLabels.js';
import doUseSameStyle from '../../examples/tagdata/doUseSameStyle.js';
import doUseShortLabels from '../../examples/tagdata/doUseShortLabels.js';
import group from '../../examples/tagdata/group.js';
import main from '../../examples/tagdata/main.js';
import sizes from '../../examples/tagdata/sizes.js';
import tooltip from '../../examples/tagdata/tooltip.js';

export default function TagDataPage({ generatedDocGen }: {| generatedDocGen: DocGen |}): Node {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader name={generatedDocGen?.displayName} description={generatedDocGen?.description}>
        <SandpackExample code={main} name="Main Tagdata Example" hideEditor previewHeight={150} />
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
      - Progressing or regressing a user through a step in a flow. Use a [Button](https://gestalt.pinterest.systems/web/button) instead
      - In conjunction with [TextField](https://gestalt.pinterest.systems/web/textfield#tagsExample), [TextArea](https://gestalt.pinterest.systems/web/textarea#tagsExample), and [ComboBox](https://gestalt.pinterest.systems/web/combobox#Tags). Use [Tag](https://gestalt.pinterest.systems/web/tag) instead
    `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            type="do"
            description="Choose the right soft background to help it stand out in dense data interfaces. If using against a gray background, for example, adopt a white fill"
            sandpackExample={
              <SandpackExample
                code={doChangeBaseColor}
                name="show one selected tile"
                hideEditor
                previewHeight={200}
              />
            }
          />
          <MainSection.Card
            cardSize="sm"
            type="don't"
            description="Match the TagData fill with the background as it isn't clear the TagData is selectable."
            sandpackExample={
              <SandpackExample
                code={dontChangeBaseColor}
                name="show one tile not selected"
                hideEditor
                hideControls
                previewHeight={200}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            type="do"
            description="Use the same properties in TagData in a group, depending on what type of behavior TagData should have."
            sandpackExample={
              <SandpackExample
                code={doUseSameStyle}
                name="show multiple with checkboxes"
                hideEditor
                previewHeight={200}
              />
            }
          />
          <MainSection.Card
            cardSize="sm"
            type="don't"
            description="Mix the TagData variants in the same group. This creates an unclear pattern for the user to understand what TagDatas are removable or not."
            sandpackExample={
              <SandpackExample
                code={dontMixStyles}
                name="not show multiple with checkboxes"
                hideEditor
                hideControls
                previewHeight={200}
              />
            }
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            type="do"
            description="Use short and clear labels for easier comprehension — ideally one to two words."
            sandpackExample={
              <SandpackExample
                code={doUseShortLabels}
                name="show multiple with checkboxes"
                hideEditor
                previewHeight={200}
              />
            }
          />
          <MainSection.Card
            cardSize="sm"
            type="don't"
            description="Use long sentences in a label, since the text in TagData truncates as needed to preserve max-width."
            sandpackExample={
              <SandpackExample
                code={dontUseLongLabels}
                name="not show multiple with checkboxes"
                hideEditor
                hideControls
                previewHeight={200}
              />
            }
          />
        </MainSection.Subsection>
      </MainSection>

      <AccessibilitySection
        name={generatedDocGen?.displayName}
        description="Users should be able to navigate or activate a TagData using a keyboard or other input modalities. Be sure to include an `accessibilityRemoveIconLabel` and `tooltip.accessibilityLabel` for the screen reader with the `dismissable` prop and `tooltip` prop. "
      />

      <MainSection
        name="Localization"
        description={`
        
      Be sure to localize \`accessibilityRemoveIconLabel\` ,\`tooltip.accessibilityLabel\`, and \`text\` properties in TagData.  

      When the title of the TagData reaches its max width, either intentionally or through localization, the text will be truncated with ellipsis as needed to preserve the max-width. Keep this in mind when selecting wording for TagData. Note that localization can lengthen text by 20 to 30 percent.`}
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          description={`TagData is available in 3 fixed sizes. Each with a varying height. You can set the \`size\` prop to be \`lg\`, \`md\` or \`sm\`
          - **Large** has height of 48px. Text has a fixed size of 16px. 
          - **Medium** has height of 40px. Text has a fixed size of 14px. 
          - **Small** has height of 32px. Text has a fixed size of 14px.
          `}
          title="Size"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={sizes} name="Size Variant" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="TagData's `baseColor` prop can be set depending on the background TagData is placed on. We recommend using a `baseColor` of `white` when on a gray UI background."
          title="Base Color"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={baseColor} name="Base Color Variant" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="TagData can be used along side the colors provided from the Data Visualization [Color Palette](https://gestalt.pinterest.systems/foundations/data_visualization/palette#12-Color-categorical-palette). You may use colors to distinguish different data lines. These are visible when TileData is selected."
          title="Colors"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={colors} name="Colors Variant" />}
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
        <MainSection.Subsection
          description={`Includes a "X" affordance. If not disabled, Tags are dismissable by the "X" affordance, which triggers the \`onRemove\` callback. If your app uses DefaultLabelProvider, a default value for this label will be used. This can be overridden with a more specific label if desired.`}
          title="Dismissable"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={dismissable} name="Dismissable Variant" />}
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
          description="Disabled TagData cannot be interacted with using the mouse or keyboard. This is commonly used to disable interaction when there are pending permissions or data pre-requisites have not been met."
          title="Disabled"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={disabled} name="Disabled variant" />}
          />
        </MainSection.Subsection>
      </MainSection>

      <QualityChecklist component={generatedDocGen?.displayName} />

      <MainSection name="Related">
        <MainSection.Subsection
          description={`
    **[Tag](/web/tag)**
    Tags are objects that hold text and have a delete icon to remove them. They can appear within [TextFields](https://gestalt.pinterest.systems/web/textfield#tagsExample), [TextAreas](https://gestalt.pinterest.systems/web/textarea#tagsExample), [ComboBox](https://gestalt.pinterest.systems/web/combobox#Tags) or as standalone components.
    
    **[TileData](/web/tiledata)**
    TileData is a flexible, visually rich component that can be used as single or multiple selections on should be only used with data visualizations.
  `}
        />
      </MainSection>
    </Page>
  );
}

export async function getStaticProps(): Promise<{| props: {| generatedDocGen: DocGen |} |}> {
  return {
    props: { generatedDocGen: await docgen({ componentName: 'TagData' }) },
  };
}
