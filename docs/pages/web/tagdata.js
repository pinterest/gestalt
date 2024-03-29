// @flow strict
import { type Node as ReactNode } from 'react';
import AccessibilitySection from '../../docs-components/AccessibilitySection';
import docGen, { type DocGen } from '../../docs-components/docgen';
import GeneratedPropTable from '../../docs-components/GeneratedPropTable';
import LocalizationSection from '../../docs-components/LocalizationSection';
import MainSection from '../../docs-components/MainSection';
import Page from '../../docs-components/Page';
import PageHeader from '../../docs-components/PageHeader';
import QualityChecklist from '../../docs-components/QualityChecklist';
import SandpackExample from '../../docs-components/SandpackExample';
import baseColor from '../../examples/tagdata/baseColor';
import colors from '../../examples/tagdata/colors';
import disabled from '../../examples/tagdata/disabled';
import dismissible from '../../examples/tagdata/dismissible';
import doChangeBaseColor from '../../examples/tagdata/doChangeBaseColor';
import dontChangeBaseColor from '../../examples/tagdata/dontChangeBaseColor';
import dontMixStyles from '../../examples/tagdata/dontMixStyles';
import dontUseLongLabels from '../../examples/tagdata/dontUseLongLabels';
import doUseSameStyle from '../../examples/tagdata/doUseSameStyle';
import doUseShortLabels from '../../examples/tagdata/doUseShortLabels';
import group from '../../examples/tagdata/group';
import localizationLabels from '../../examples/tagdata/localizationLabels';
import main from '../../examples/tagdata/main';
import sizes from '../../examples/tagdata/sizes';
import tooltip from '../../examples/tagdata/tooltip';

export default function TagDataPage({ generatedDocGen }: { generatedDocGen: DocGen }): ReactNode {
  return (
    <Page title={generatedDocGen?.displayName}>
      <PageHeader description={generatedDocGen?.description} name={generatedDocGen?.displayName}>
        <SandpackExample code={main} hideEditor name="Main Tagdata Example" previewHeight={150} />
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
      - Progressing or regressing a user through a step in a flow. Use [Button](https://gestalt.pinterest.systems/web/button) instead
      - In conjunction with [TextField](https://gestalt.pinterest.systems/web/textfield#Tags), [TextArea](https://gestalt.pinterest.systems/web/textarea#With-tags), and [ComboBox](https://gestalt.pinterest.systems/web/combobox#Tags). Use [Tag](https://gestalt.pinterest.systems/web/tag) instead
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
            description="Choose the right background to help it stand out in dense data interfaces. For example, set `baseColor=secondary` when using TagData against a gray background."
            sandpackExample={
              <SandpackExample
                code={doChangeBaseColor}
                hideControls
                hideEditor
                name="show one selected tile"
                previewHeight={200}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="sm"
            description="Match TagData fill with the surrounding background color. Using the same color can make it unclear that TagData is selectable."
            sandpackExample={
              <SandpackExample
                code={dontChangeBaseColor}
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
            description="Use the same variants of TagData in a group, depending on the type of behavior TagData should have."
            sandpackExample={
              <SandpackExample
                code={doUseSameStyle}
                hideControls
                hideEditor
                name="show multiple with checkboxes"
                previewHeight={200}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="sm"
            description="Mix TagData variants in the same group. This creates an unclear pattern for the user to understand which TagDatas are removable or not."
            sandpackExample={
              <SandpackExample
                code={dontMixStyles}
                hideControls
                hideEditor
                name="not show multiple with checkboxes"
                previewHeight={200}
              />
            }
            type="don't"
          />
        </MainSection.Subsection>
        <MainSection.Subsection columns={2}>
          <MainSection.Card
            cardSize="sm"
            description="Use short and clear labels for easier comprehension — ideally one or two words."
            sandpackExample={
              <SandpackExample
                code={doUseShortLabels}
                hideControls
                hideEditor
                name="show multiple with checkboxes"
                previewHeight={200}
              />
            }
            type="do"
          />
          <MainSection.Card
            cardSize="sm"
            description="Use long sentences in the `text` prop, since the text in TagData truncates as needed to preserve the max width."
            sandpackExample={
              <SandpackExample
                code={dontUseLongLabels}
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
        description="Users should be able to navigate or activate TagData using a keyboard or other input modalities. Be sure to include an `accessibilityRemoveIconLabel` and `tooltip.accessibilityLabel` for the screen reader with the `onRemove` prop and `tooltip` prop."
        name={generatedDocGen?.displayName}
      />

      <LocalizationSection
        code={localizationLabels}
        name={generatedDocGen?.displayName}
        notes={`
When the \`text\` of TagData reaches its max width, either intentionally or through localization, the text will be truncated with ellipses as needed to preserve the max-width.

Note that \`accessibilityRemoveIconLabel\` is optional as DefaultLabelProvider provides default strings. Use custom labels if they need to be more specific.`}
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
          description="TagData is available in the colors from our [data visualization color palette](https://gestalt.pinterest.systems/foundations/data_visualization/color/palette#12-Color-categorical-palette). Match each TagData's `color` to its respective data line, which will be visible when TagData is selected."
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
          description="Use `tooltip` to display clarifying information on hover or focus. We recommend using tooltips to provide the user additional context/details. You can also pass in a list of strings to create multi-line tooltips for TagData."
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

export async function getServerSideProps(): Promise<{ props: { generatedDocGen: DocGen } }> {
  return {
    props: { generatedDocGen: await docGen('TagData') },
  };
}
