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
import dismissible from '../../examples/tagdata/dismissible.js';
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
      - Progressing or regressing a user through a step in a flow. Use [Button](https://gestalt.pinterest.systems/web/button) instead
      - In conjunction with [TextField](https://gestalt.pinterest.systems/web/textfield#Tags), [TextArea](https://gestalt.pinterest.systems/web/textarea#With-tags), and [ComboBox](https://gestalt.pinterest.systems/web/combobox#Tags). Use [Tag](https://gestalt.pinterest.systems/web/tag) instead
    `}
          />
        </MainSection.Subsection>
      </MainSection>

      <MainSection name="Best practices">
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            type="do"
            description="Choose the right background to help it stand out in dense data interfaces. For example, set `baseColor=secondary` when using TagData against a gray background."
            sandpackExample={
              <SandpackExample
                code={doChangeBaseColor}
                name="show one selected tile"
                hideEditor
                hideControls
                previewHeight={200}
              />
            }
          />
          <MainSection.Card
            cardSize="sm"
            type="don't"
            description="Match TagData fill with the surrounding background color. Using the same color can make it unclear that TagData is selectable."
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
            description="Use the same variants of TagData in a group, depending on the type of behavior TagData should have."
            sandpackExample={
              <SandpackExample
                code={doUseSameStyle}
                name="show multiple with checkboxes"
                hideEditor
                hideControls
                previewHeight={200}
              />
            }
          />
          <MainSection.Card
            cardSize="sm"
            type="don't"
            description="Mix TagData variants in the same group. This creates an unclear pattern for the user to understand which TagDatas are removable or not."
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
            description="Use short and clear labels for easier comprehension — ideally one or two words."
            sandpackExample={
              <SandpackExample
                code={doUseShortLabels}
                name="show multiple with checkboxes"
                hideEditor
                hideControls
                previewHeight={200}
              />
            }
          />
          <MainSection.Card
            cardSize="sm"
            type="don't"
            description="Use long sentences in the `text` prop, since the text in TagData truncates as needed to preserve the max width."
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
        description="Users should be able to navigate or activate TagData using a keyboard or other input modalities. Be sure to include an `accessibilityRemoveIconLabel` and `tooltip.accessibilityLabel` for the screen reader with the `onRemove` prop and `tooltip` prop."
      />

      <MainSection
        name="Localization"
        description={`
        
      Be sure to localize \`accessibilityRemoveIconLabel\` ,\`tooltip.accessibilityLabel\`, and \`text\` props in TagData.  

      When the \`text\` of TagData reaches its max width, either intentionally or through localization, the text will be truncated with ellipses as needed to preserve the max-width. Keep this in mind when selecting wording for TagData. Note that localization can lengthen text by 20 to 30 percent.`}
      />

      <MainSection name="Variants">
        <MainSection.Subsection
          description={`TagData is available in 3 fixed sizes.
          - **lg** has height of 48px. Text has a fixed size of 16px. 
          - **md** has height of 40px. Text has a fixed size of 14px. 
          - **sm** has height of 32px. Text has a fixed size of 14px.
          `}
          title="Size"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={sizes} name="Size Variant" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`By default, TagData uses a light gray fill, which is suitable for placement on a white background. When used on a gray background, use \`baseColor="secondary"\` for a white fill.`}
          title="Base Color"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={baseColor} name="Base Color Variant" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="TagData is available in the colors from our [data visualization color palette](https://gestalt.pinterest.systems/foundations/data_visualization/palette#12-Color-categorical-palette). Match each TagData's `color` to its respective data line, which will be visible when TagData is selected."
          title="Colors"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={colors} name="Colors Variant" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description={`Use TagData's \`showCheckbox\` prop to display a checkbox. This is useful when presenting the user with a multi-select experience.`}
          title="Group"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={group} name="Checkbox Variant" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description={`Provide an \`onRemove\` callback to make TagData dismissible. Tags are dismissible by the "X" affordance, which triggers the \`onRemove\` callback. \`onRemove\` should be used to update the external state that is keeping track of TagDatas. If your app uses [DefaultLabelProvider](https://gestalt.pinterest.systems/web/utilities/defaultlabelprovider), a default accessibility label for the remove icon will be used. This can be overridden with a more specific label if desired.`}
          title="Dismissible"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={dismissible} name="Dismissible Variant" />}
          />
        </MainSection.Subsection>
        <MainSection.Subsection
          description="Use `tooltip` to display clarifying information on hover or focus. We recommend using tooltips to provide the user additional context/details."
          title="Tooltip"
        >
          <MainSection.Card
            sandpackExample={<SandpackExample code={tooltip} name="Tooltip variant" />}
          />
        </MainSection.Subsection>

        <MainSection.Subsection
          description="Disabled TagData cannot be interacted with using the mouse or keyboard. This is commonly used to disable interaction when there are pending permissions or data prerequisites have not been met."
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
    Tags are objects that hold text and have a delete icon to remove them. They can appear within [TextFields](https://gestalt.pinterest.systems/web/textfield#Tags), [TextAreas](https://gestalt.pinterest.systems/web/textarea#With-tags), [ComboBox](https://gestalt.pinterest.systems/web/combobox#Tags) or as standalone components.
    
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
